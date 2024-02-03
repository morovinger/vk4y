<template>
  <div>
    <v-btn @click="authenticateWithVK">
      Login with VKontakte
    </v-btn>
  </div>
</template>

<script>
import {useGlobalUserState} from '~/composables/useGlobalState';

export default {
  name: 'VkAuth',

  setup() {
    const globalState = useGlobalUserState();

    const authenticateWithVK = () => {
      const clientId = '51832372'; // Replace with your client ID
      const redirectUri = encodeURIComponent('https://ba71-109-229-89-229.ngrok-free.app'); // Replace with your redirect URI
      const scope = 'photos'; // Define your required scopes
      const responseType = 'token';
      const version = '5.131'; // API version
      const state = '123456'; // A unique string to be returned after auth

      window.location.href = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&v=${version}&state=${state}`;
    };

    const handleRedirect = () => {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        globalState.accessToken = params.get('access_token');
        // Assuming the user's name is also returned in the URL parameters
        globalState.userName = params.get('user_id');
        globalState.expiresIn = params.get('expires_in');

        if (globalState.accessToken) {
          console.log('Access Token:', globalState.accessToken);
          console.log('User Name:', globalState.userName);
        }
      }
    };

    return {authenticateWithVK, handleRedirect};
  },

  mounted() {
    this.handleRedirect();
  }
};
</script>
