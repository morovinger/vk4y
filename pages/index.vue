
//format of token
https://5dde-109-229-89-229.ngrok-free.app/?payload={%22type%22:%22silent_token%22,%22auth%22:1,%22user%22:{%22id%22:2675433,%22first_name%22:%22%D0%AE%D1%80%D0%B0%22,%22last_name%22:%22%D0%AE.%22,%22avatar%22:%22https://sun9-46.userapi.com/s/v1/ig2/Gjg-Kwny_JnvOT6OGE3YzKklbxDingyzZbZx9QbpyvTqwmlqhxOAf1RaZpym83pLgOyJH0k0CsVc9zAMxpIv6AMM.jpg?size=200x200%26quality=95%26crop=0,0,1000,1000%26ava=1%22,%22avatar_base%22:null,%22phone%22:%22%2B7+***+***+**+76%22},%22token%22:%22466aa8D39Vt6QbbO-C0Ey-PwpJfuuWDeu3gtB5LURfQI_IC3aGzDD9ki2IUwawPuUR93F4clIgMOgJDTaMUQNM02FLFwO6wsJOOZc5p2eRZEmzFiWAZfgBw_SiqJVl_cZSldvF474syayiidrkFC0Tw3mqx4PX2j4lxLDqrR2p2F5MSHJfXJLWEf_8bRpAwWEEdpKbfpIiIHjB072DupRt8gvCX4pK_8lE3MJMhSUrYAE4OTen5w_XjMlvd_n-RJtcNV4LFzWhuDCHdcxlRuNiGCgf81DousmOO3mkjdG8SzAMDKn1ZeKYuv9SaEsYc00qOPOy5BaQxFmYsCLk-oC_1uu5n6wXx8sGmEhJTUdJc%22,%22ttl%22:600,%22uuid%22:%22mbmvgq%22,%22hash%22:%22OUHURI2niozb72TpWPvj1BZXQOBjbrIeKaRVwwFSsX8%22,%22loadExternalUsers%22:false}

<script lang="ts">

import VkAuth from "~/components/VkAuth.vue";

export default {
  components: {VkAuth},
  data() {
    return {
      url:'',
      urlRules:[
        (v: any) => !!v || 'URL is required',
        (v: string) => /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/.test(v) || 'Must be valid URL',
        (v: string | string[]) => v.includes('vk.com') || 'Must be VK.com URL',
      ],
    }
  },
  methods: {
    clear() {
      this.url = ''; // This will clear the input field
    },
  },
}
</script>

<template>
  <div>
    <v-form
      fast-fail="true"
      @submit.prevent
    >
      <v-spacer />
      <v-row>
        <v-col cols="10">
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
            @click="clear"
          >
            clear
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

    <vk-auth />
  </div>
</template>
