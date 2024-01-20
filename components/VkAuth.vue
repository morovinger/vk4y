<template>
  <div>
    <v-btn @click="authenticateWithVK">Login with VKontakte</v-btn>
  </div>
</template>

<script>
export default {
  name: 'VkAuth',

  methods: {
    authenticateWithVK() {
      const clientId = '51832372'; // Replace with your client ID
      const redirectUri = encodeURIComponent('https://5dde-109-229-89-229.ngrok-free.app/'); // Replace with your redirect URI
      const scope = 'photos'; // Define your required scopes
      const responseType = 'token';
      const version = '5.131'; // API version
      const state = '123456'; // A unique string to be returned after auth

      window.location.href = `https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}&v=${version}&state=${state}`;
    },

    handleRedirect() {
      if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const expiresIn = params.get('expires_in');
        const userId = params.get('user_id');

        if (accessToken) {
          // Handle the access token (store it, etc.)
          console.log('Access Token:', accessToken);
          // Additional handling here
        }
      }
    }
  },

  mounted() {
    this.handleRedirect();
  }
};
</script>
