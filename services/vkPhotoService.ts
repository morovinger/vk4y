// services/vkPhotoService.ts
import { useGlobalError } from '~/composables/useGlobalError';
import { useI18n } from 'vue-i18n';

export class VkPhotoService {
    private readonly VERSION = '5.199';

    constructor() {
        this.setError = useGlobalError().setError;
        this.t = useI18n().t;
    }

    private setError: (message: string) => void;
    private t: any;

    /**
     * Get user albums from VK API
     */
    getUserAlbums(owner_id: string | number, album_id?: string | number): Promise<any> {
        return new Promise((resolve, reject) => {
            // Handle system albums specially - create a fake album response
            if (typeof album_id === 'number' && album_id < 0) {
                // These are system albums like wall photos (-6) or profile photos (-7)
                // For these, we'll create a fake album entry with appropriate title
                const albumTitle = album_id === -6 ? this.t('wall_photos') : 
                                  album_id === -7 ? this.t('profile_photos') : 
                                  `${this.t('system_album')} ${album_id}`;
                
                // Create a fake response with a single album
                resolve({
                    count: 1,
                    items: [{
                        id: album_id,
                        owner_id: owner_id,
                        title: albumTitle,
                        size: 0, // Size will be updated when we fetch photos
                        thumb_id: 0,
                        thumb_src: '',
                        system: true
                    }]
                });
                return;
            }

            // For specific regular album (positive ID), also create a simplified response
            // This prevents downloading ALL albums when we just want one specific album
            if (typeof album_id === 'number' && album_id > 0) {
                console.log(`Creating simplified response for specific album: ${album_id}`);
                resolve({
                    count: 1,
                    items: [{
                        id: album_id,
                        owner_id: owner_id,
                        title: this.t('album') + ' ' + album_id, // Temporary title, will be updated with photos
                        size: 0, // Size will be updated when we fetch photos
                        thumb_id: 0,
                        thumb_src: '',
                        system: false
                    }]
                });
                return;
            }

            const params: Record<string, any> = {
                owner_id,
                v: this.VERSION,
                need_system: 1
            };

            // This block will now only execute when requesting ALL albums
            // (album_id is undefined or album_id === 'all')
            if (album_id === 'all') {
                console.log('Fetching ALL albums');
            } else if (typeof album_id === 'number' && !isNaN(album_id)) {
                // If we specifically want one album's details, include it
                params.album_ids = album_id;
            }

            // @ts-ignore
            VK.Api.call('photos.getAlbums', params, (response: any) => {
                if (response.response) {
                    resolve(response.response);
                } else {
                    console.error('API Error:', response);
                    this.setError(this.t('error_fetching'));
                    reject(new Error(this.t('error_fetching')));
                }
            });
        });
    }

    /**
     * Get photos from an album
     */
    getUserPhotos(owner_id: string, album_id: string): Promise<any> {
        const count = 1000;
        let offset = 0;

        const fetchPhotos = (): Promise<any> => {
            return new Promise((resolve, reject) => {
                const code = `return API.photos.get({
          "album_id": ${album_id},
          "owner_id": ${owner_id},
          "count": ${count},
          "offset": ${offset},
          "need_system": 1,
          "v": "${this.VERSION}"
        });`;

                // @ts-ignore
                VK.Api.call('execute', { code, v: this.VERSION }, (response: any) => {
                    if (response.response) {
                        resolve(response.response.items);
                    } else {
                        reject(new Error('Error fetching photos'));
                        console.log(response);
                    }
                });
            });
        };

        // Recursive function to fetch all photos
        const fetchAllPhotos = async (): Promise<any> => {
            try {
                const items = await fetchPhotos();
                if (items.length === count) {
                    offset += count;
                    const moreItems = await fetchAllPhotos();
                    return [...items, ...moreItems];
                }
                return items;
            } catch (error) {
                console.error('Error fetching all photos:', error);
                throw error;
            }
        };

        // Start fetching photos and return the promise
        return fetchAllPhotos()
            .then(allPhotos => {
                console.log('All photos fetched', allPhotos.length);
                return allPhotos.length ? allPhotos : [];
            })
            .catch(error => {
                console.error('Error in getUserPhotos:', error);
                this.setError(this.t('error_fetching'));
                return [];
            });
    }

    /**
     * Extract the largest image URL from photo sizes
     */
    extractLargestImages(images: any[]): string {
        if (!images || images.length === 0) {
            console.warn('No images provided to extractLargestImages');
            return '';
        }

        try {
            // Size type priority map (from smallest to largest)
            const typeWeights: Record<string, number> = {
                's': 1,  // small
                'm': 2,  // medium
                'o': 3,  // 
                'p': 4,  // 
                'q': 5,  // 
                'r': 6,  // 
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
        } catch (error) {
            console.error('Error extracting largest image:', error);
            return images[0]?.url || '';
        }
    }
}