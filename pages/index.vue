<template>
  <div>
    <div v-if="$token">
      <AlbumUrlForm
          v-model="url"
          :is-valid="isValid"
          @check="check"
          @clear="clear"
      />
      <StatusDisplay
          :message="message"
          :loading="loading"
          :album-name="albumName"
          :progress="progress"
      />
      
      <!-- Metadata Settings Component -->
      <MetadataSettings
          v-if="results.items && results.items.length > 0"
          v-model:enabled="metadataEnabled"
          v-model:options="metadataOptions"
      />
      
      <v-row align="start">
        <v-col md="8">
          <AlbumSelector
              v-if="download_as === 'albums'"
              :albums="results.items || []"
              :selected-items="selectedItems"
              @toggle-selection="toggleSelection"
          />
        </v-col>
        <v-col md="4">
          <DownloadActions
              :download-as="download_as"
              :loading="loading"
              :selected-items="selectedItems"
              :results="results"
              :selected-count="selectedCount"
              @download="createAndDownloadZips"
              @select-all="selectAllAlbums"
          />
        </v-col>
        </v-row>
    </div>
    <vk-auth />
  </div>
</template>

<script lang="ts" setup>
import JSZip from "jszip"
import { VkPhotoService } from '~/services/vkPhotoService';
import DownloadActions from "~/components/album/DownloadActions.vue";
import StatusDisplay from "~/components/common/StatusDisplay.vue";
import MetadataSettings from "~/components/album/MetadataSettings.vue";
import type { Album } from '~/types/global';

const { $token } = useNuxtApp()
const vkPhotoService = new VkPhotoService();

// State
const url = ref('')
const results = ref<{ items?: Album[] }>({})
const { t } = useI18n()
const download_as = ref('')
const { setError } = useGlobalError()
const message = ref('')
const loading = ref(false)
const selectedItems = ref<Album[]>([])
const owner_id = ref('')
const progress = ref(0)
const albumName = ref('')

// Metadata settings
const metadataEnabled = ref(false)
const metadataOptions = ref({
  likes: true,
  comments: true,
  tags: true,
  dateInfo: true
})

// SEO optimization
useSeoMeta({
  title: () => t('title'),
  ogTitle: () => t('title'),
  description: () => t('use'),
  ogDescription: () => t('use'),
  ogImage: '/vk4y/og-image.svg',
})

// URL validation
const urlRules = [
  (v: string) => !!v || t('url_not_url'),
  (v: string) => /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/.test(v) || t('url_not_valid'),
  (v: string) => v.includes('vk.com') || t('url_not_vk'),
  (v: string) => v.includes('album') || t('url_not_album'),
  (v: string) => v.includes('https://') || t('url_not_https'),
];

const isValid = computed(() => {
  return urlRules.every(rule => rule(url.value) === true);
});

const selectedCount = computed(() => {
  return selectedItems.value.length ? `${t('download')} ${selectedItems.value.length} ${t('albums')}` : t('download_by_album')
});

function clear() {
  url.value = ''
  message.value = ''
  download_as.value = ''
  results.value = {}
  selectedItems.value = []
  progress.value = 0
  albumName.value = ''
}

function check() {
  const parsedUrl = new URL(url.value);
  const pathname = parsedUrl.pathname;
  let album_id;

  // Match URLs like /albums-12345 or /albums12345 (owner's albums list)
  const albumsMatch = pathname.match(/^\/albums(-?\d+)$/);

  // Match URLs like /album-12345_67890 or /album12345_000 (specific album)
  const albumMatch = pathname.match(/^\/album(-?\d+)_(saved|0{1,3}|\d+)$/);

  if (albumsMatch) {
    // Handle album list case
    owner_id.value = albumsMatch[1];
    download_as.value = 'albums';
  } else if (albumMatch) {
    // Handle specific album case
    owner_id.value = albumMatch[1];
    const albumIdPart = albumMatch[2];
    
    // Convert to numbers where appropriate - only special cases get special treatment
    album_id = albumIdPart === '0' ? -6 :      // Wall photos
        albumIdPart === '00' ? -7 :     // Profile photos
            albumIdPart === '000' ? 'saved' : // Saved photos
                parseInt(albumIdPart, 10);      // Regular numeric IDs
    
    // Add debugging information
    console.log(`Album match: owner_id=${owner_id.value}, albumIdPart=${albumIdPart}, parsed album_id=${album_id}`);
    
    // Fix: Ensure we're not misinterpreting regular album IDs
    // Regular album IDs are typically large numbers like 309556498
    if (typeof album_id === 'number' && album_id > 0) {
      // This is a regular album, not a system album
      download_as.value = 'photos';
      console.log(`Regular album detected: ${album_id}`);
    } else {
      // This is a system album
      download_as.value = 'photos';
      console.log(`System album detected: ${album_id}`);
    }
    
    // If the owner ID is negative (a group/community) and it's a system album,
    // we need to ensure we're in 'photos' mode, not 'albums' mode
    if (parseInt(owner_id.value) < 0 && typeof album_id === 'number' && album_id < 0) {
      console.log(`System album for group: ${owner_id.value}, album: ${album_id}`);
    }
  } else {
    message.value = t('url_not_valid');
    return;
  }

  //if its SAVED album we cant download it, we don't have the permissions
  if (album_id === 'saved'){
    message.value = t('error_saved') + ' https://vk.com/movephotos'
    return
  }

  vkPhotoService.getUserAlbums(owner_id.value, album_id)
      .then((result) => {
        if (result.items.length > 0) {
          results.value = result
          if (download_as.value === 'albums'){
            message.value = `${t('found')} ${result.items.length} ${t('albums')}`
          } else {
            // For specific album, fetch photos to get the count
            vkPhotoService.getUserPhotos(owner_id.value, String(result.items[0].id))
              .then(photos => {
                console.log(`Found ${photos.length} photos in the album "${result.items[0].title}"`);
                
                // Update the album size with the actual photo count
                result.items[0].size = photos.length;
                
                // Display message with the album title (which should already be correct from getUserAlbums)
                message.value = `${t('found')} ${photos.length} ${t('photos')} ${t('album')} ${result.items[0].title}`;
              })
              .catch(error => {
                console.error('Error fetching photos:', error);
                message.value = `${t('found')} ${result.items[0].size || 0} ${t('photos')} ${t('album')} ${result.items[0].title}`;
              });
          }
        } else {
          message.value = t('error_find');
          results.value = {};
          download_as.value = '';
        }
      })
      .catch((error) => {
        console.error(error);
        setError(t('error_fetching'));
        message.value = t('error_find');
        results.value = {};
        download_as.value = '';
      });
}

async function createAndDownloadZips() {
  try {
    // Show loading indicator immediately
    loading.value = true;
    message.value = t('preparing_download');
    progress.value = 0;
    
    //re-assign results to albums if find by album
    const albums = download_as.value === 'albums'
        ? selectedItems.value
        : results.value.items || [];

    if (albums.length > 10){
      message.value = t('download_all_too_many')
    }

    for (const album of albums) {
      message.value = t('fetching_photos_for') + ': ' + album.title;
      const photos = await vkPhotoService.getUserPhotos(owner_id.value, String(album.id));

      if (!photos || photos.length === 0) {
        setError(t('error_no_result'));
        continue;
      }

      progress.value = 0;
      albumName.value = album.title;
      message.value = t('downloading') + ': ' + album.title;

      const currentBatchSize = 1500; // Maximum images per zip
      let imageCounter = 0;
      let totalImageCounter = 0; // Keep track of the total image count across all zips
      let zipPart = 1;
      let currentZip = new JSZip();

      for (const [index, photo] of photos.entries()) {
        try {
          const largestImage = vkPhotoService.extractLargestImages(photo.sizes);
          const response = await fetch(largestImage);

          if (!response.ok) {
            continue;
          }

          const blob = await response.blob();

          // Determine file extension from Content-Type
          const contentType = response.headers.get('Content-Type') || 'image/jpeg';
          let fileExtension = 'jpg';

          if (contentType.includes('/')) {
            const parts = contentType.split('/');
            if (parts.length > 1) {
              fileExtension = parts[1].replace('jpeg', 'jpg');
            }
          }

          currentZip.file(`image_${totalImageCounter}.${fileExtension}`, blob);
          
          // Add metadata if enabled
          if (metadataEnabled.value) {
            try {
              const metadata = await vkPhotoService.getPhotoMetadata(owner_id.value, photo.id, photo);
              const metadataJson = vkPhotoService.createMetadataJson(metadata);
              currentZip.file(`image_${totalImageCounter}_metadata.json`, metadataJson);
            } catch (error) {
              console.error('Error getting metadata for photo:', photo.id, error);
              // Continue without metadata for this photo
            }
          }
          
          imageCounter++;
          totalImageCounter++;
          progress.value = ((index + 1) / photos.length) * 100;

          // Create a new zip every 1500 images
          if (imageCounter >= currentBatchSize) {
            // Generate and download the current batch
            const zipFileName = photos.length > currentBatchSize 
              ? `${album.title}_part${zipPart}.zip` 
              : `${album.title}.zip`;
              
            try {
              const blob = await currentZip.generateAsync({type:"blob"});
              const blobUrl = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = blobUrl;
              link.download = zipFileName;
              link.click();
              // Free memory after download starts
              setTimeout(() => {
                URL.revokeObjectURL(blobUrl);
              }, 1000);
            } catch (error) {
              console.error(error);
              setError(t('error_creating_zip'));
            }

            // Start a new zip file for the next batch of 1500 images
            currentZip = new JSZip();
            zipPart++;
            imageCounter = 0; // Reset the batch counter
            // Note: totalImageCounter is not reset
          }
        } catch (error) {
          console.error('Error processing photo:', error);
          // Continue with next photo
        }
      }

      // Generate the final zip if there are any remaining images
      if (imageCounter > 0) {
        const zipFileName = photos.length > currentBatchSize
          ? `${album.title}_part${zipPart}.zip`
          : `${album.title}.zip`;

        try {
          const blob = await currentZip.generateAsync({type:"blob"});
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = zipFileName;
          link.click();
          // Free memory after download starts
          setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
          }, 1000);
        } catch (error) {
          console.error(error);
          setError(t('error_creating_zip'));
        }
      }
    }

    message.value = t('done');
    loading.value = false;
    progress.value = 0;
    url.value = '';
    download_as.value = '';
    results.value = {};
    selectedItems.value = [];
    albumName.value = '';

  } catch (error) {
    console.error(error);
    setError(t('error_creating_zip'));
    loading.value = false;
  }
}

const toggleSelection = (item: Album) => {
  const index = selectedItems.value.findIndex(selected => selected.id === item.id);
  if (index !== -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push(item);
  }
};

const selectAllAlbums = () => {
  if (selectedItems.value.length === results.value.items?.length) {
    selectedItems.value = [];
  } else {
    selectedItems.value = results.value.items?.map(item => ({ ...item })) || [];
  }
};
</script>

<style lang="less">
.results {
  justify-content: start;
}
</style>