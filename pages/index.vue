
<script lang="ts" setup>

import JSZip from "jszip"
import FileSaver from "file-saver"

const { $token } = useNuxtApp()
const url = ref('')
const results = ref({})
const { t } = useI18n()
const download_as = ref('')
const { setError } = useGlobalError()
const message = ref('')
const loading = ref(false)
const albums = ref({})
const selectedItems = ref([])
const owner_id = ref('')
const progress = ref(0)
const albumName = ref('')

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

function clear(){
  url.value = ''
  message.value = ''
  download_as.value = ''
  albums.value = {}
  results.value = {}
  selectedItems.value = []
  progress.value = 0
  albumName.value = ''
}

function check() {

  const parsedUrl = new URL(url.value);
  const pathname = parsedUrl.pathname;
  let album_id: string | undefined;
  const path = pathname.split('_');

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

  getUserAlbums(owner_id.value, album_id).then((result:never) => {
    console.log(result)
    if (result.items.length > 0) {
      results.value = result
      if (download_as.value ==='albums'){
        message.value = `${t('found')} ${result.items.length} ${t('albums')}`
      }else{
        message.value = `${t('found')} ${result.items[0]['size']} ${t('photos')} ${t('album')} ${result.items[0]['title']}`
      }
    } else {
      message.value = t('error_find');
      results.value = {};
      download_as.value = '';
    }
  }).catch((error: never) => {
    console.error(error);
    setError(t('error_fetching'));
    message.value = t('error_find');
    results.value = {};
    download_as.value = '';
  });
}

function getUserAlbums(owner_id: number, album_id?: number) {
  return new Promise((resolve, reject) => {
    const params: Record<string, never> = {
      owner_id: owner_id,
      v: '5.199'
    };

    // Only add album_ids if it's defined and valid
    if (typeof album_id === 'number' && !isNaN(album_id)) {
      params.album_ids = album_id;
    }

    VK.Api.call('photos.getAlbums', params, (response) => {
      if (response.response) {
        resolve(response.response);
      } else {
        console.error('API Error:', response);
        setError(t('error_fetching'));
        reject(new Error(t('error_fetching')));
      }
    });
  });
}

function getUserPhotos(owner_id: string, album_id: string) {

  const count = 1000;
  let offset = 0;
  const version = "5.199";

  function fetchPhotos() {
    return new Promise((resolve, reject) => {
      const code = `return API.photos.get({
        "album_id": ${album_id},
        "owner_id": ${owner_id},
        "count": ${count},
        "offset": ${offset},
        "need_system": 1,
        "v": "${version}"
      });`;

      VK.Api.call('execute', { code, "v": version }, function(response) {
        if (response.response) {
          resolve(response.response.items);
        } else {
          reject(new Error('Error fetching photos'));
          message.value = t('error_fetching')
          console.log(response)
        }
      });
    });
  }

  // Recursive function to fetch all photos
  function fetchAllPhotos():never {
    return fetchPhotos().then(items => {
      if (items.length === count) {
        offset += count;
        return fetchAllPhotos().then(moreItems => items.concat(moreItems));
      }
      return items;
    });
  }

  // Start fetching photos and return the promise
  return fetchAllPhotos()
      .then(allPhotos => {
        console.log('All photos fetched', allPhotos);
        if (allPhotos.length > 1000){
          message.value = t('download_archive_too_many')
        }
        return allPhotos.length ? allPhotos : false;
      })
      .catch(error => {
        console.error(error);
        return false;
      });
}

function extractLargestImages(images: never[]) {
  const sortedSizes = images.sort((a, b) => b.width - a.width);
  const maxSize = sortedSizes[0];
  return maxSize.url;
}

async function createAndDownloadZips() {
  try {

    //dropped the idea to use native file system for now
    //const dirHandle = await window.showDirectoryPicker();

    //re-assign results to albums if find by album
    const albums = download_as.value === 'albums' ? selectedItems.value : results.value.items

    if (albums.length > 10){
      message.value = t('download_all_too_many')
    }

    for (const album of albums) {
      console.log(album)
      const photos = await getUserPhotos(owner_id.value, album.id);
      const zip = new JSZip

      loading.value = true
      progress.value = 0
      albumName.value = album.title

      for (const [index, photo] of photos.entries()) {
        const largestImage = extractLargestImages(photo.sizes);
        const response = await fetch(largestImage);
        if (!response.ok) {
          continue
        }
        const blob = await response.blob();
        zip.file(`image_${index}.png`, blob);
        progress.value = ((index + 1) / photos.length) * 100;
      }

      zip.generateAsync({type:"blob"}).then(function (blob) {
        FileSaver.saveAs(blob, `${album.title}.zip`);
      }, function (error) {
        console.error(error);
        setError(t('error_creating_zip'));
      });
    }

    message.value = t('done');
    loading.value = false
    progress.value = 0
    url.value = ''
    download_as.value = ''
    albums.value = {}
    results.value = {}
    selectedItems.value = []
    albumName.value = ''

  } catch (error) {
    console.error(error);
    setError(t('error_creating_zip'));
  }
}

const toggleSelection = (item) => {
  const index = selectedItems.value.findIndex(selected => selected.id === item.id);
  console.log(item, index, selectedItems.value)
  if (index !== -1) {
    selectedItems.value.splice(index, 1);
  } else {
    selectedItems.value.push({ id: item.id, title:item.title });
  }
};

const isSelected = (item) => {
  return selectedItems.value.some(selected => selected.id === item.id) ? 'tonal' : 'outlined';
};

const selectAllAlbums = () => {
  if (selectedItems.value.length === results.value.length) {
    selectedItems.value = [];
  } else {
    selectedItems.value = results.value.items.map(item => ({ id: item.id, title:item.title }));
  }
};

</script>

<template>
  <div>
    <div v-if="$token">
      <v-form
        fast-fail
        @submit.prevent
      >
        <v-spacer />
        <v-row>
          <v-col
            cols="12"
            md="8"
          >
            <v-text-field
              v-model="url"
              :rules="urlRules"
              label="URL"
              required
            />
          </v-col>
          <v-col
            cols="4"
            md="2"
          >
            <v-btn
              type="submit"
              :disabled="!isValid"
              block=""
              @click="check"
            >
              {{ t('check') }}
            </v-btn>
          </v-col>
          <v-col
            cols="4"
            md="2"
          >
            <v-btn
              type="submit"
              @click="clear"
            >
              {{ t('clear') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <v-col>
          <h2>
            {{ message }}
          </h2>
        </v-col>
        <v-col>
          <p v-if="loading">
            {{ t('download_process') }}
          </p>
        </v-col>
        <v-col>
          <div>
            {{albumName}}
          </div>
          <v-progress-linear
              v-if="loading"
              v-model="progress"
              color="primary"
              height="25"
              rounded
          >
            <strong>{{ Math.ceil(progress) }}%</strong>
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row align="start">
        <v-col md="8">
          <div
            v-if="download_as === 'albums'"
            class="d-flex flex-wrap justify-start"
          >
            <!-- Iterate over albums and create buttons -->
            <v-btn
              v-for="item in results.items"
              :id="item.id"
              :key="item.id"
              class="ma-2 pa-2"
              :variant="isSelected(item)"
              @click="toggleSelection(item)"
            >
              {{ item.title.slice(0, 14) }}
            </v-btn>
          </div>
        </v-col>
        <v-col md="4">
          <div>
            <div v-if="download_as === 'photos'">
              <v-btn
                :loading="loading"
                @click="createAndDownloadZips"
              >
                {{ t('download_by_photos') }}
              </v-btn>
            </div>
            <div
              v-if="download_as === 'albums'"
              class="d-flex align-content-start flex-wrap"
            >
              <v-btn
                :disabled="!selectedItems.length"
                :loading="loading"
                style="margin-bottom: 20px"
                @click="createAndDownloadZips"
              >
                {{ selectedCount }}
              </v-btn>
              <v-btn @click="selectAllAlbums">
                {{ selectedItems.length === results.length ? t('download_all_albums_deselect') : t('download_all_albums_select') }}
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
    <vk-auth />
  </div>
</template>

<style lang="less">
  .results{
    justify-content: start;
  }
</style>