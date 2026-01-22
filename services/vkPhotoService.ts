// services/vkPhotoService.ts
import { useGlobalError } from '~/composables/useGlobalError';
import { useI18n } from 'vue-i18n';
import type { Album, Photo, PhotoSize, PhotoLikes, PhotoComment, PhotoMetadata } from '~/types/global';

// VK API response types
interface VkAlbumsResponse {
    count: number;
    items: Album[];
}

interface VkPhotosResponse {
    count: number;
    items: Photo[];
}

interface VkLikesResponse {
    count: number;
    items: number[];
}

interface VkCommentsResponse {
    count: number;
    items: Array<{
        id: number;
        from_id: number;
        date: number;
        text: string;
        likes?: { count: number };
    }>;
}

type TranslateFunction = (key: string) => string;

export class VkPhotoService {
    private readonly VERSION = '5.199';
    private setError: (message: string) => void;
    private t: TranslateFunction;

    constructor() {
        this.setError = useGlobalError().setError;
        this.t = useI18n().t as TranslateFunction;
    }

    /**
     * Get details for a specific album by ID
     */
    getAlbumDetails(owner_id: string | number, album_id: number): Promise<Album> {
        return new Promise((resolve, reject) => {
            // For system albums, create a fixed response
            if (album_id < 0) {
                const albumTitle = album_id === -6 ? this.t('wall_photos') :
                                  album_id === -7 ? this.t('profile_photos') :
                                  `${this.t('system_album')} ${album_id}`;

                resolve({
                    id: album_id,
                    owner_id: Number(owner_id),
                    title: albumTitle,
                    description: '',
                    created: 0,
                    updated: 0,
                    size: 0,
                    can_upload: false,
                    thumb_id: 0
                });
                return;
            }

            // For regular albums, make a direct API call
            const params = {
                owner_id,
                album_ids: album_id,
                v: this.VERSION
            };

            VK.Api.call<VkAlbumsResponse>('photos.getAlbums', params, (response) => {
                if (response.response?.items && response.response.items.length > 0) {
                    resolve(response.response.items[0]);
                } else {
                    reject(new Error('Failed to get album details'));
                }
            });
        });
    }

    /**
     * Get user albums from VK API
     */
    getUserAlbums(owner_id: string | number, album_id?: string | number): Promise<VkAlbumsResponse> {
        // Handle system albums specially - create a fake album response
        if (typeof album_id === 'number' && album_id < 0) {
            const albumTitle = album_id === -6 ? this.t('wall_photos') :
                              album_id === -7 ? this.t('profile_photos') :
                              `${this.t('system_album')} ${album_id}`;

            return Promise.resolve({
                count: 1,
                items: [{
                    id: album_id,
                    owner_id: Number(owner_id),
                    title: albumTitle,
                    description: '',
                    created: 0,
                    updated: 0,
                    size: 0,
                    can_upload: false,
                    thumb_id: 0,
                    thumb_src: ''
                }]
            });
        }

        // For specific regular album (positive ID), get actual album details first
        if (typeof album_id === 'number' && album_id > 0) {
            return this.getAlbumDetails(owner_id, album_id)
                .then((albumDetails) => ({
                    count: 1,
                    items: [{
                        ...albumDetails,
                        id: albumDetails.id || album_id,
                        owner_id: albumDetails.owner_id || Number(owner_id),
                        title: albumDetails.title || this.t('album') + ' ' + album_id,
                        size: albumDetails.size || 0,
                        thumb_id: albumDetails.thumb_id || 0,
                        thumb_src: albumDetails.thumb_src || ''
                    }]
                }))
                .catch(() => ({
                    count: 1,
                    items: [{
                        id: album_id,
                        owner_id: Number(owner_id),
                        title: this.t('album') + ' ' + album_id,
                        description: '',
                        created: 0,
                        updated: 0,
                        size: 0,
                        can_upload: false,
                        thumb_id: 0,
                        thumb_src: ''
                    }]
                }));
        }

        return new Promise((resolve, reject) => {
            const params: Record<string, string | number> = {
                owner_id: owner_id,
                v: this.VERSION,
                need_system: 1
            };

            if (typeof album_id === 'number' && !isNaN(album_id)) {
                params.album_ids = album_id;
            }

            VK.Api.call<VkAlbumsResponse>('photos.getAlbums', params, (response) => {
                if (response.response) {
                    resolve(response.response);
                } else {
                    this.setError(this.t('error_fetching'));
                    reject(new Error(this.t('error_fetching')));
                }
            });
        });
    }

    /**
     * Get photos from an album
     */
    getUserPhotos(owner_id: string, album_id: string): Promise<Photo[]> {
        const count = 1000;
        let offset = 0;

        const fetchPhotos = (): Promise<Photo[]> => {
            return new Promise((resolve, reject) => {
                const code = `return API.photos.get({
          "album_id": ${album_id},
          "owner_id": ${owner_id},
          "count": ${count},
          "offset": ${offset},
          "need_system": 1,
          "v": "${this.VERSION}"
        });`;

                VK.Api.call<VkPhotosResponse>('execute', { code, v: this.VERSION }, (response) => {
                    if (response.response) {
                        resolve(response.response.items);
                    } else {
                        reject(new Error('Error fetching photos'));
                    }
                });
            });
        };

        // Recursive function to fetch all photos
        const fetchAllPhotos = async (): Promise<Photo[]> => {
            const items = await fetchPhotos();
            if (items.length === count) {
                offset += count;
                const moreItems = await fetchAllPhotos();
                return [...items, ...moreItems];
            }
            return items;
        };

        // Start fetching photos and return the promise
        return fetchAllPhotos()
            .then(allPhotos => allPhotos.length ? allPhotos : [])
            .catch(() => {
                this.setError(this.t('error_fetching'));
                return [];
            });
    }

    /**
     * Extract the largest image URL from photo sizes
     */
    extractLargestImages(images: PhotoSize[]): string {
        if (!images || images.length === 0) {
            return '';
        }

        // Size type priority map (from smallest to largest)
        const typeWeights: Record<string, number> = {
            's': 1,  // small
            'm': 2,  // medium
            'o': 3,
            'p': 4,
            'q': 5,
            'r': 6,
            'x': 7,  // extra large
            'y': 8,  // large
            'z': 9,  // very large
            'w': 10  // largest possible
        };

        // First try to sort by width if available
        if (images.some(img => img.width > 0)) {
            const sortedSizes = [...images].sort((a, b) => b.width - a.width);
            return sortedSizes[0].url;
        }

        // Fallback: sort by type when width is not available or is zero
        const sortedByType = [...images].sort((a, b) => {
            const weightA = typeWeights[a.type] || 0;
            const weightB = typeWeights[b.type] || 0;
            return weightB - weightA;
        });

        return sortedByType[0].url;
    }

    /**
     * Get likes information for a photo
     */
    getPhotoLikes(owner_id: string | number, photo_id: string | number): Promise<PhotoLikes> {
        return new Promise((resolve) => {
            const params = {
                type: 'photo',
                owner_id: owner_id,
                item_id: photo_id,
                v: this.VERSION
            };

            VK.Api.call<VkLikesResponse>('likes.getList', params, (response) => {
                if (response.response) {
                    resolve({
                        count: response.response.count,
                        users: response.response.items || []
                    });
                } else {
                    resolve({ count: 0, users: [] });
                }
            });
        });
    }

    /**
     * Get comments for a photo
     */
    getPhotoComments(owner_id: string | number, photo_id: string | number): Promise<{ count: number; items: PhotoComment[] }> {
        return new Promise((resolve) => {
            const params = {
                owner_id: owner_id,
                photo_id: photo_id,
                count: 100,
                sort: 'desc',
                v: this.VERSION
            };

            VK.Api.call<VkCommentsResponse>('photos.getComments', params, (response) => {
                if (response.response) {
                    resolve({
                        count: response.response.count,
                        items: (response.response.items || []).map(comment => ({
                            id: comment.id,
                            from_id: comment.from_id,
                            date: new Date(comment.date * 1000).toISOString(),
                            text: comment.text,
                            likes: comment.likes || { count: 0 }
                        }))
                    });
                } else {
                    resolve({ count: 0, items: [] });
                }
            });
        });
    }

    /**
     * Get complete metadata for a photo including likes and comments
     */
    async getPhotoMetadata(owner_id: string | number, photo_id: string | number, photo: Photo): Promise<PhotoMetadata> {
        try {
            const [likes, comments] = await Promise.all([
                this.getPhotoLikes(owner_id, photo_id),
                this.getPhotoComments(owner_id, photo_id)
            ]);

            return {
                photo_id: photo_id,
                owner_id: owner_id,
                date: new Date(photo.date * 1000).toISOString(),
                text: photo.text || '',
                likes: {
                    count: likes.count,
                    users: likes.users
                },
                comments: {
                    count: comments.count,
                    items: comments.items
                },
                tags: photo.tags?.map((tag) => ({
                    user_id: tag.user_id,
                    tagged_name: tag.tagged_name,
                    x: tag.x,
                    y: tag.y,
                    x2: tag.x2,
                    y2: tag.y2
                })) || [],
                album_id: photo.album_id,
                width: photo.width,
                height: photo.height,
                sizes: photo.sizes
            };
        } catch {
            return {
                photo_id: photo_id,
                owner_id: owner_id,
                date: photo.date ? new Date(photo.date * 1000).toISOString() : new Date().toISOString(),
                text: photo.text || '',
                likes: { count: 0, users: [] },
                comments: { count: 0, items: [] },
                tags: [],
                error: 'Failed to fetch complete metadata'
            };
        }
    }

    /**
     * Create a metadata JSON string for a photo
     */
    createMetadataJson(metadata: PhotoMetadata): string {
        return JSON.stringify(metadata, null, 2);
    }
}
