
<script lang="ts" setup>

import {useGlobalToken} from "~/composables/useGlobalToken";
import {useGlobalId} from "~/composables/useGlobalID";

const apiId = useGlobalId()
const userName = ref('')
const permissions = 4|2
const token = useGlobalToken()

// VK Login function
const login = () => {
  VK.Auth.login((response) => {
    if (response.session) {
      console.log('User successfully logged in', response)
      userName.value = response.session.user.first_name
      token.value = response.session.sid
    } else {
      console.log('User failed to login or denied access', response)
    }
  }, permissions);
};

const logout = () => {
  VK.Auth.logout(() => {
    userName.value = ''
    token.value = 0
  });
};

onMounted( () => {
  VK.init({
    apiId: apiId.value
  });
});

</script>

<template>
  <div>
    <div
      v-if="token"
      class="login"
    >
      <p>Logged in as: {{ userName }}</p>
      <v-btn
        color="primary"
        @click="logout"
      >
        Logout
      </v-btn>
    </div>
    <div
      v-else
      class="logout"
    >
      <v-btn @click="login">
        Login to VK
      </v-btn>
    </div>
  </div>
</template>
