# vk4y

Nuxt3 + Vuetify3

**Download your favorite photos from VK.com for free**

**Скачивайте ваши любимые фотоальбомы с VK.com бесплатно**

https://morovinger.github.io/vk4y/

## How The App Works

1. **Authentication**: The app requires VK authentication to access photo albums.

2. **URL Processing**:
   - Enter a VK album URL (e.g., https://vk.com/album2675433_309556498)
   - The app parses the URL to extract the owner ID and album ID
   - Supports both individual albums and album collections

3. **Data Fetching**:
   - For individual albums: loads all photos from the specified album
   - For album collections: displays all available albums for selection

4. **Photo Processing**:
   - Extracts the highest quality version of each photo
   - Handles the downloading of individual images
   - Shows progress indicator during the process

5. **ZIP Creation**:
   - Photos are packaged into ZIP archives for easy downloading
   - Large albums (over 1500 photos) are split into multiple ZIP files
   - Each ZIP is named after the album title

6. **Memory Management**:
   - The app efficiently manages memory during downloads
   - Releases resources after each download to prevent memory leaks

## Usage Instructions

1. Authenticate with your VK account
2. Enter a VK album URL in the form
3. Click "Check" to verify and load the album data
4. For album collections, select the albums you want to download
5. Click "Download" to start the download process
6. Wait for the ZIP files to be created and downloaded
7. Enjoy your photos offline!

## Technical Implementation Details

### Core Components

- **VkPhotoService**: Service class that handles all VK API interactions
- **AlbumUrlForm**: Form component for inputting and validating album URLs
- **StatusDisplay**: Component for showing download progress and status messages
- **AlbumSelector**: Component for selecting albums from a collection
- **DownloadActions**: Component for triggering download operations

### Key Functions

#### URL Processing (`check()`)
```javascript
// The check() function parses VK album URLs using regex patterns:
// - /^\/albums(-?\d+)$/ for album collections
// - /^\/album(-?\d+)_(saved|0{1,3}|\d+)$/ for individual albums
// 
// It extracts owner_id and album_id, handling special cases:
// - album_id = 0 → Wall photos (album_id = -6)
// - album_id = 00 → Profile photos (album_id = -7)
// - album_id = 000 → Saved photos
// - Regular albums → parsed as integers
```

#### Album Loading
```javascript
// vkPhotoService.getUserAlbums(owner_id, album_id) 
// - Fetches album information using VK API
// - For album collections: Returns list of all user albums
// - For individual albums: Returns details of the specific album
```

#### Photo Download Process (`createAndDownloadZips()`)
```javascript
// Main steps:
// 1. Fetch photos via vkPhotoService.getUserPhotos(owner_id, album_id)
// 2. For each photo:
//    - Extract largest image URL with vkPhotoService.extractLargestImages()
//    - Fetch image content with fetch API
//    - Add to JSZip instance
// 3. Split into batches of 1500 images per ZIP
// 4. Generate ZIP files with JSZip.generateAsync({type:"blob"})
// 5. Download with FileSaver.saveAs()
// 6. Clean up resources with URL.revokeObjectURL()
```

#### Album Selection Logic
```javascript
// toggleSelection(item) - Toggles selection state of an album
// selectAllAlbums() - Selects or deselects all albums
// selectedItems.value - Reactive array tracking selected albums
```

### Memory Management Techniques

- **Batch Processing**: Albums with >1500 photos are split into multiple ZIPs to avoid memory issues
- **Resource Cleanup**: 
  - `URL.revokeObjectURL()` frees browser memory after downloads
  - Object URLs are revoked immediately after use
- **Progressive Loading**: Photos are processed one at a time rather than all at once
- **Progress Tracking**: `progress.value` updates to show completion percentage

### State Management

- The app uses Vue's Composition API with reactive refs:
  - `url`, `results`, `loading`, `message`, `progress`, etc.
  - State is managed locally within the page component
  - No external store is needed due to the focused nature of the application

### Error Handling

- Error states are managed through the `useGlobalError()` composable
- Network errors during downloads are caught and logged
- The app continues processing remaining images when individual downloads fail