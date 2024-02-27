
<script lang="ts" setup>

import {useGlobalToken} from "~/composables/useGlobalToken";

const url = ref('')
const token = useGlobalToken()
let results = {}
const { t } = useI18n()
const download_as = ref('')
const { setError } = useGlobalError()
const message = ref('')
const loading = ref(false)
const albums = ref({})
const items = ref();
const selectedItems = ref([]);

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

function downloadImages(){
  loading.value = true
  saveFiles(extractLargestImages(results))
  loading.value = false
  download_as.value = ''
}

function clear(){
  url.value = ''
  message.value = ''
  download_as.value = ''
  albums.value = {}
}

function check() {

  const parsedUrl = new URL(url.value);
  const pathname = parsedUrl.pathname;
  const owner_id = pathname.includes('-') ? '-' + pathname.match(/\d+/)[0] : pathname.match(/\d+/)[0];
  const path = pathname.split('_');
  const isAlbums = url.value.includes('albums');
  const album_id = path[1] === "0" ? "-6" : path[1] === "00" ? "-7" : path[1] === "000" ? "saved" : path[1];

  //if its SAVED album we cant download it, we dont have the permissions
  if (album_id === 'saved'){
    message.value = t('error_saved') + ' https://vk.com/movephotos'
    return
  }

  console.log(owner_id, album_id, path)

  getUserAlbums(owner_id, album_id).then((result:any) => {
    console.log(result)
    if (result.items.length > 0) {
      results = result.items
      if (isAlbums){
        download_as.value = 'albums'
        message.value = `${t('found')} ${result.items.length} ${t('albums')}`
      }else{
        download_as.value = 'photos'
        message.value = `${t('found')} ${result.items[0]['size']} ${t('photos')} ${t('album')} ${result.items[0]['title']}`
      }
    } else {
      message.value = t('error_find');
      results = {};
      download_as.value = '';
    }
  }).catch((error: any) => {
    console.error(error);
    setError(t('error_fetching'));
    results = {};
    download_as.value = '';
  });
}

function getUserAlbums(owner_id: string, album_id: string|undefined) {
  return new Promise((resolve, reject) => {

    VK.Api.call('photos.getAlbums', {
      owner_id: owner_id,
      album_ids: album_id,
      v: '5.199'
    }, function(response: { response: { items: unknown; }; }) {
      if (response.response) {
        resolve(response.response)
      } else {
        console.error(response)
        setError(t('error_fetching'))
        reject(new Error(t('error_fetching')))
      }
    });
  });
}

function getUserPhotos(owner_id: string, album_id: string) {

  const count = 1000;
  let offset = 0;
  const version = "5.199";

  console.log(album_id, owner_id)

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

async function saveZip(images: any[]) {
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

const toggleSelection = (item) => {
  const index = selectedItems.value.findIndex(selected => selected.id === item.id);
  if (index !== -1) {
    selectedItems.value.splice(index, 1); // Remove if already selected
  } else {
    selectedItems.value.push({ id: item.id, name: item.name }); // Add if not selected
  }
};

const isSelected = (item) => {
  return selectedItems.value.some(selected => selected.id === item.id);
};

</script>

<template>
  <div>
    <div v-if="token">
      <v-form
        fast-fail
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
              {{ t('check') }}
            </v-btn>
          </v-col>
          <v-col cols="2">
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
          <div v-if="download_as === 'albums'">
            <!-- Iterating over items and creating buttons -->
            <v-btn
              v-for="item in results"
              :key="item.id"
              :class="{'selected-button': isSelected(item)}"
              @click="toggleSelection(item)"
            >
              {{ item.title }}
            </v-btn>
          </div>
        </v-col>
        <v-col>
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
          />
          <div v-if="download_as === 'photos'">
            <v-btn
              @click="downloadImages"
            >
              {{ t('download_by_photos') }}
            </v-btn>
          </div>
          <div v-if="download_as === 'albums'">
            <v-btn :disabled="true">
              {{ t('download_by_album') }}
            </v-btn>
            <v-btn>
              {{ t('download_all_albums') }}
            </v-btn>
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
  .selected-button {
    background-color: blue; /* Change the color as needed */
    color: white;
  }
</style>