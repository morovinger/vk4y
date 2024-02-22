
<script lang="ts" setup>

import {useGlobalToken} from "~/composables/useGlobalToken";
import {useGlobalId} from "~/composables/useGlobalID";

const apiId = useGlobalId()
const permissions = 4|2
const token = ref(useGlobalToken())
const { setError } = useGlobalError()
const { t } = useI18n()

// VK Login function
const login = () => {
  VK.Auth.login((response: { session: { user: { first_name: string; }; }; }) => {
    if (response.session) {
      console.log('User successfully logged in', response)
      location.reload()
    } else {
      console.log('User failed to login or denied access', response)
      setError(t('error_login'))
    }
  }, permissions);
};

const logout = () => {
  VK.Auth.logout(() => {
  });
};

onMounted( () => {
  VK.init({
    apiId: apiId.value
  });
});

</script>

<template>
  <div class="flex auth">
    <div
      v-if="token"
      class="logout"
    >
      <p>{{ t('logged') }}</p>
      <v-btn
        color="primary"
        @click="logout"
      >
        {{ t('logout') }}
      </v-btn>
    </div>

    <div
      v-else
      class="login"
    >
      <v-btn @click="login">
        {{ t('login') }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="less">
.auth{
  justify-content: end;
  margin-top: 50px;
}
</style>