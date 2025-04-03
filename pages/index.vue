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
import FileSaver from "file-saver"
import { VkPhotoService } from '~/services/vkPhotoService';
import DownloadActions from "~/components/album/DownloadActions.vue";
import StatusDisplay from "~/components/common/StatusDisplay.vue";
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

    // Convert to numbers where appropriate
    album_id = albumIdPart === '0' ? -6 :      // Wall photos
        albumIdPart === '00' ? -7 :     // Profile photos
            albumIdPart === '000' ? 'saved' : // Saved photos
                parseInt(albumIdPart, 10);      // Regular numeric IDs
    download_as.value = 'photos';
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
            message.value = `${t('found')} ${result.items[0]['size']} ${t('photos')} ${t('album')} ${result.items[0]['title']}`
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
    //re-assign results to albums if find by album
    const albums = download_as.value === 'albums'
        ? selectedItems.value
        : results.value.items || [];

    if (albums.length > 10){
      message.value = t('download_all_too_many')
    }

    for (const album of albums) {
      const photos = await vkPhotoService.getUserPhotos(owner_id.value, String(album.id));

      if (!photos || photos.length === 0) {
        setError(t('error_no_result'));
        continue;
      }

      loading.value = true;
      progress.value = 0;
      albumName.value = album.title;

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
              FileSaver.saveAs(blob, zipFileName);
              // Free memory after saving
              setTimeout(() => {
                URL.revokeObjectURL(URL.createObjectURL(blob));
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

          // Explicitly free memory
          URL.revokeObjectURL(largestImage); // If largestImage is an object URL
          // We don't cancel response.body as it's already consumed by blob()
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
          FileSaver.saveAs(blob, zipFileName);
          // Free memory after saving
          setTimeout(() => {
            URL.revokeObjectURL(URL.createObjectURL(blob));
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