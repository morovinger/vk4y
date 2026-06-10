// composables/useAlbumZipDownloader.ts
import JSZip from 'jszip'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGlobalError } from '~/composables/useGlobalError'
import type { VkPhotoService } from '~/services/vkPhotoService'
import type { Album, Photo } from '~/types/global'

// Maximum images per zip; larger albums are split into multiple parts
const MAX_IMAGES_PER_ZIP = 1500

function fileExtensionFromContentType(contentType: string): string {
    const subtype = contentType.split('/')[1]
    return subtype ? subtype.replace('jpeg', 'jpg') : 'jpg'
}

function saveBlobAsFile(blob: Blob, filename: string) {
    const blobUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = filename
    link.click()
    // Free memory after download starts
    setTimeout(() => {
        URL.revokeObjectURL(blobUrl)
    }, 1000)
}

/**
 * Encapsulates the album -> ZIP download pipeline: fetching photos,
 * adding them (and optional metadata) to ZIPs in batches of
 * MAX_IMAGES_PER_ZIP, and saving each ZIP to disk.
 */
export function useAlbumZipDownloader(vkPhotoService: VkPhotoService) {
    const { t } = useI18n()
    const { setError } = useGlobalError()

    const loading = ref(false)
    const progress = ref(0)
    const message = ref('')
    const albumName = ref('')

    async function generateAndSaveZip(zip: JSZip, filename: string) {
        try {
            const blob = await zip.generateAsync({ type: 'blob' })
            saveBlobAsFile(blob, filename)
        } catch (error) {
            console.error(error)
            setError(t('error_creating_zip'))
        }
    }

    async function downloadAlbum(ownerId: string, album: Album, withMetadata: boolean) {
        message.value = t('fetching_photos_for') + ': ' + album.title

        let photos: Photo[]
        try {
            photos = await vkPhotoService.getUserPhotos(ownerId, String(album.id))
        } catch (error) {
            console.error('Error fetching photos for album:', album.title, error)
            setError(t('error_fetching'))
            return
        }

        if (photos.length === 0) {
            setError(t('error_no_result'))
            return
        }

        progress.value = 0
        albumName.value = album.title
        message.value = t('downloading') + ': ' + album.title

        const splitIntoParts = photos.length > MAX_IMAGES_PER_ZIP
        const zipFileName = (part: number) =>
            splitIntoParts ? `${album.title}_part${part}.zip` : `${album.title}.zip`

        let imagesInCurrentZip = 0
        let totalImageCounter = 0
        let zipPart = 1
        let currentZip = new JSZip()

        for (const [index, photo] of photos.entries()) {
            try {
                const largestImage = vkPhotoService.extractLargestImages(photo.sizes)
                const response = await fetch(largestImage)

                if (!response.ok) {
                    continue
                }

                const blob = await response.blob()
                const contentType = response.headers.get('Content-Type') || 'image/jpeg'
                const fileExtension = fileExtensionFromContentType(contentType)

                currentZip.file(`image_${totalImageCounter}.${fileExtension}`, blob)

                if (withMetadata) {
                    try {
                        const metadata = await vkPhotoService.getPhotoMetadata(ownerId, photo.id, photo)
                        currentZip.file(`image_${totalImageCounter}_metadata.json`, vkPhotoService.createMetadataJson(metadata))
                    } catch (error) {
                        console.error('Error getting metadata for photo:', photo.id, error)
                        // Continue without metadata for this photo
                    }
                }

                imagesInCurrentZip++
                totalImageCounter++
                progress.value = ((index + 1) / photos.length) * 100

                if (imagesInCurrentZip >= MAX_IMAGES_PER_ZIP) {
                    await generateAndSaveZip(currentZip, zipFileName(zipPart))
                    currentZip = new JSZip()
                    zipPart++
                    imagesInCurrentZip = 0
                }
            } catch (error) {
                console.error('Error processing photo:', error)
                // Continue with next photo
            }
        }

        if (imagesInCurrentZip > 0) {
            await generateAndSaveZip(currentZip, zipFileName(zipPart))
        }
    }

    /**
     * Download each album as one or more ZIP files.
     * Returns true when the whole run finished without a fatal error.
     */
    async function downloadAlbums(ownerId: string, albums: Album[], withMetadata: boolean): Promise<boolean> {
        try {
            loading.value = true
            message.value = t('preparing_download')
            progress.value = 0

            if (albums.length > 10) {
                message.value = t('download_all_too_many')
            }

            for (const album of albums) {
                await downloadAlbum(ownerId, album, withMetadata)
            }

            message.value = t('done')
            return true
        } catch (error) {
            console.error(error)
            setError(t('error_creating_zip'))
            return false
        } finally {
            loading.value = false
            progress.value = 0
            albumName.value = ''
        }
    }

    return { loading, progress, message, albumName, downloadAlbums }
}
