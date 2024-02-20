
<script lang="ts" setup>

import {useGlobalToken} from "~/composables/useGlobalToken";

const url = ref('')
const token = useGlobalToken()
let results = {}
const { t } = useI18n()
let images = []
const download_as = ref('')
const { setError } = useGlobalError()
const message = ref('')
const loading = ref(false)

const urlRules = [
  v => !!v || 'URL is required',
  v => /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/.test(v) || t('url_not_valid'),
  v => v.includes('vk.com') || t('url_not_vk'),
  v => v.includes('album') || t('url_not_album'),
  v => v.includes('https://') || t('url_not_https'),
];

const isValid = computed(() => {
  return urlRules.every(rule => rule(url.value) === true);
});

function downloadImages(){
  images = extractLargestImages(results)
  console.log(images)
  loading.value = true
  saveFiles(images)
  loading.value = false
  download_as.value = ''
}

function check() {
  // Check if url or url.value is null or undefined
  if (!url || !url.value) {
    console.error("URL is null or undefined");
    setError(t('error_invalid_url'));
    return;
  }

  const parsedUrl = new URL(url.value);
  const isAlbums = url.value.includes('albums');
  const promise = isAlbums ? getUserAlbums(parsedUrl) : getUserPhotos(parsedUrl);

  promise.then((result: string | any[]) => {
    if (result && result.length > 0) {
      message.value = `${t('found')} ${result.length} ${isAlbums ? t('albums') : t('photos')}`;
      results = result;
      download_as.value = isAlbums ? 'albums' : 'photos'
    } else {
      message.value = t('no_results_found');
      results = [];
      download_as.value = '';
    }
  }).catch((error: any) => {
    console.error(error);
    setError(t('error_fetching'));
    results = [];
    download_as.value = '';
  });
}

function getUserAlbums(parsedUrl:URL) {
  return new Promise((resolve, reject) => {
    const pathname = parsedUrl.pathname;
    const owner_id = pathname.includes('-') ? '-' + pathname.match(/\d+/)[0] : pathname.match(/\d+/)[0];

    VK.Api.call('photos.getAlbums', {
      owner_id: owner_id,
      need_system: 1,
      v: '5.194'
    }, function(response) {
      if (response.response) {
        console.log(response.response);
        resolve(response.response.items); // Resolve with the albums data
      } else {
        console.error(response);
        reject(new Error('Error fetching albums'));
      }
    });
  });
}

function getUserPhotos(parsedUrl:URL) {
  const pathname = parsedUrl.pathname;
  const path = pathname.split('_');
  const album_id = path[1];

  // Determine owner_id based on URL format
  const owner_id = path[0].includes('-') ? '-' + path[0].split('-')[1] : path[0].match(/\d+/)[0];

  // Constants for API requests
  const count = 1000;
  let offset = 0;
  const version = "5.194";

  // Function to fetch photos using VK API
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
        }
      });
    });
  }

  // Recursive function to fetch all photos
  function fetchAllPhotos():any {
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
        return allPhotos.length ? allPhotos : false;
      })
      .catch(error => {
        console.error(error);
        return false;
      });
}

function extractLargestImages(images: any[]) {
  return images.map(entry => {
    if (entry.sizes && entry.sizes.length > 0) {
      const largestImage = entry.sizes.reduce((prev, current) => {
        return (prev.width * prev.height > current.width * current.height) ? prev : current;
      });
      return largestImage.url;
    }
    return null;
  }).filter(url => url != null);
}

async function saveFiles(images: any[]) {
  try {
    // Request the user to select a directory
    const dirHandle = await window.showDirectoryPicker();

    for (const [index, url] of images.entries()) {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileHandle = await dirHandle.getFileHandle(`image${index}.png`, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    }
    message.value = t('done')
  } catch (error) {
    console.error(error);
  }
}

function clear(){
  url.value = ''
}

</script>

<template>
  <div>
    <div v-if="token">
      <v-form
        fast-fail="true"
        @submit.prevent
      >
        <v-spacer />
        <v-row>
          <v-col cols="8">
            <v-text-field
              v-model="url"
              :rules="urlRules"
              label="URL"
              required
            />
          </v-col>
          <v-col cols="2">
            <v-btn
              type="submit"
              :disabled="!isValid"
              block=""
              @click="check"
            >
              Check
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn
              type="submit"
              @click="clear"
            >
              Clear
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
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
          />
          <v-btn
            v-if="download_as === 'photos'"
            @click="downloadImages"
          >
            {{ $t('download_by_photos') }}
          </v-btn>
          <v-btn
            v-if="download_as === 'albums'"
            :disabled="true"
          >
            {{ $t('download_by_album') }}
          </v-btn>
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