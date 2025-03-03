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

const { $token } = useNuxtApp()
const vkPhotoService = new VkPhotoService();

// State
const url = ref('')
const results = ref({})
const { t } = useI18n()
const download_as = ref('')
const { setError } = useGlobalError()
const message = ref('')
const loading = ref(false)
const selectedItems = ref([])
const owner_id = ref('')
const progress = ref(0)
const albumName = ref('')

// URL validation
const urlRules = [
  v => !!v || t('url_not_url'),
  v => /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/.test(v) || t('url_not_valid'),
  v => v.includes('vk.com') || t('url_not_vk'),
  v => v.includes('album') || t('url_not_album'),
  v => v.includes('https://') || t('url_not_https'),
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
    const albums = download_as.value === 'albums' ? selectedItems.value : results.value.items

    if (albums.length > 10){
      message.value = t('download_all_too_many')
    }

    for (const album of albums) {
      const photos = await vkPhotoService.getUserPhotos(owner_id.value, album.id);

      if (!photos || photos.length === 0) {
        setError(t('error_no_result'));
        continue;
      }

      const zip = new JSZip();

      loading.value = true;
      progress.value = 0;
      albumName.value = album.title;

      for (const [index, photo] of photos.entries()) {
        try {
          const largestImage = vkPhotoService.extractLargestImages(photo.sizes);
          const response = await fetch(largestImage);

          if (!response.ok) {
            continue;
          }

          const blob = await response.blob();
          zip.file(`image_${index}.png`, blob);
          progress.value = ((index + 1) / photos.length) * 100;
        } catch (error) {
          console.error('Error processing photo:', error);
          // Continue with next photo
        }
      }

      zip.generateAsync({type:"blob"})
          .then(function (blob) {
            FileSaver.saveAs(blob, `${album.title}.zip`);
          })
          .catch(function (error) {
            console.error(error);
            setError(t('error_creating_zip'));
          });
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

const toggleSelection = (item) => {
  const index = selectedItems.value.findIndex(selected => selected.id === item.id);
  if (index !== -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push({ id: item.id, title: item.title });
  }
};

const selectAllAlbums = () => {
  if (selectedItems.value.length === results.value.items?.length) {
    selectedItems.value = [];
  } else {
    selectedItems.value = results.value.items.map(item => ({ id: item.id, title: item.title }));
  }
};
</script>

<style lang="less">
.results {
  justify-content: start;
}
</style>