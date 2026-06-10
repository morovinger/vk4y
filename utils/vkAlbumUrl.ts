// utils/vkAlbumUrl.ts

/** Result of parsing a VK album URL */
export type VkAlbumUrlTarget =
    | { mode: 'albums'; ownerId: string }
    | { mode: 'photos'; ownerId: string; albumId: number | 'saved' }

/**
 * Parse a VK photo album URL into an owner/album target.
 *
 * Supported paths:
 *  - /albums{owner_id}            -> all albums of a user or group
 *  - /album{owner_id}_{album_id}  -> a specific album, where the album part
 *    `0` means wall photos (-6), `00` profile photos (-7) and
 *    `000`/`saved` means saved photos (not downloadable)
 */
export function parseVkAlbumUrl(url: string): VkAlbumUrlTarget | null {
    let pathname: string
    try {
        pathname = new URL(url).pathname
    } catch {
        return null
    }

    const albumsMatch = pathname.match(/^\/albums(-?\d+)$/)
    if (albumsMatch) {
        return { mode: 'albums', ownerId: albumsMatch[1] }
    }

    const albumMatch = pathname.match(/^\/album(-?\d+)_(saved|0{1,3}|\d+)$/)
    if (albumMatch) {
        const idPart = albumMatch[2]
        const albumId: number | 'saved' =
            idPart === '0' ? -6 :
            idPart === '00' ? -7 :
            idPart === '000' || idPart === 'saved' ? 'saved' :
            parseInt(idPart, 10)
        return { mode: 'photos', ownerId: albumMatch[1], albumId }
    }

    return null
}
