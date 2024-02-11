
<script lang="ts" setup>

import {useGlobalToken} from "~/composables/useGlobalToken";

const url = ref('')
const token = useGlobalToken()
console.log(token)
const urlRules = [
  v => !!v || 'URL is required',
  v => /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/.test(v) || 'Must be valid URL',
  v => v.includes('vk.com') || 'Must be VK.com URL',
  v => v.includes('album') || 'Must contain `album` in URL',
];

const isValid = computed(() => {
  return urlRules.every(rule => rule(url.value) === true);
});

function check(){

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
    </div>
    <div v-else>
      <vk-auth />
    </div>
  </div>
</template>
