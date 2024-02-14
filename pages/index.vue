
<script lang="ts" setup>

import {useGlobalToken} from "~/composables/useGlobalToken";

const url = ref('')
const token = useGlobalToken()
const results = ref('')

const urlRules = [
  v => !!v || 'URL is required',
  v => /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/.test(v) || 'Must be valid URL',
  v => v.includes('vk.com') || 'Must be VK.com URL',
  v => v.includes('album') || 'Must contain `album` or `albums` in URL',
];

const isValid = computed(() => {
  return urlRules.every(rule => rule(url.value) === true);
});

function check(){
  const parsedUrl = new URL(url.value);
  return url.value.includes('albums') ? getUserAlbums(parsedUrl) : getUserPhotos(parsedUrl)
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
      console.log(response.response);
      results.value = response.response.count ? 'We found ' + response.response.count + ' albums' : 'Can`t find any albums by this URL'
    } else {
      console.error(response);
      results.value = 'Error fetching albums'
    }
  });
}

function getUserPhotos(parsedUrl: URL){
  const pathname = parsedUrl.pathname
  const album_id = pathname.split('_')[1];

  VK.Api.call('photos.get', {
    album_id: album_id,
    need_system: 1,
    v: '5.194'
  }, function(response: any) {
    if (response.response) {
      console.log(response.response);
      results.value = response.response.count ? 'We found ' + response.response.count + ' photos' : 'Can`t find any photos by this URL'
    } else {
      console.error(response);
      results.value = 'Error fetching albums'
    }
  });
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
      <div class="flex results">
        <h2>
          {{ results }}
        </h2>
      </div>
    </div>
    <vk-auth />
  </div>
</template>

<style lang="less">
  .results{
    justify-content: start;
  }
</style>