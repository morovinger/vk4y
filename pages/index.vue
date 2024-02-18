
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

const urlRules = [
  v => !!v || 'URL is required',
  v => /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/.test(v) || 'Must be valid URL',
  v => v.includes('vk.com') || 'Must be VK.com URL',
  v => v.includes('album') || 'Must contain `album` or `albums` in URL',
  v => v.includes('https://') || 'Must start with `https://',
];

const isValid = computed(() => {
  return urlRules.every(rule => rule(url.value) === true);
});

function check(){
  const parsedUrl = new URL(url.value)
  download_as.value = url.value.includes('albums') ? getUserAlbums(parsedUrl) : getUserPhotos(parsedUrl)
}

function downloadImages(){
  console.log(results)
  images = extractLargestImages(results)
  console.log(images)
}

function getUserAlbums(parsedUrl: URL) {
  const pathname = parsedUrl.pathname
  const owner_id = pathname.includes('-') ? '-' + pathname.match(/\d+/) : pathname.match(/\d+/);

  VK.Api.call('photos.getAlbums', {
    owner_id: owner_id,
    need_system: 1,
    v: '5.194'
  }, function(response: any) {
    if (response.response) {
      console.log(response.response)
      message.value = response.response.count ? `${t('found')} ${response.response.count} ${t('albums')}` : t('error_find')
      results = response.response.count ?? response.response
    } else {
      console.error(response);
      setError(t('error_fetching'))
    }
  });
  return 'albums'
}

function getUserPhotos(parsedUrl: URL) {
  const pathname = parsedUrl.pathname;
  const album_id = pathname.split('_')[1];
  let allPhotos: any[] = [];
  let offset = 0;
  const count = 1000; // Maximum number of photos to fetch per request (adjust as needed)

  function fetchPhotos() {
    const code = `return API.photos.get({
      "album_id": ${album_id},
      "count": ${count},
      "offset": ${offset},
      "need_system": 1,
      "v": "5.194"
    });`;

    VK.Api.call('execute', {
      code: code,
      "v": "5.194"
    }, function(response: any) {
      if (response.response) {
        allPhotos = allPhotos.concat(response.response.items);

        if (response.response.items.length === count) {
          offset += count;
          fetchPhotos(); // Fetch the next batch
        } else {
          console.log('All photos fetched', allPhotos)
          message.value = allPhotos.length ? `${t('found')} ${allPhotos.length} ${t('photos')}` : t('error_find')
          results = allPhotos
        }
      } else {
        console.error(response)
        setError(t('error_fetching'))
      }
    });
  }

  fetchPhotos();
  return 'photos'
}

function extractLargestImages(images: any[]) {
  console.log(images)
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