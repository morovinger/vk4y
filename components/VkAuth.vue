
<script setup>
import { useGlobalToken } from '~/composables/useGlobalToken';
import { useGlobalId } from '~/composables/useGlobalID';
import { useGlobalError } from '~/composables/useGlobalError';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const apiId = useGlobalId();
const permissions = 4 | 2;
const token = ref(useGlobalToken());
const { setError } = useGlobalError();

const login = () => {
  if (!window.VK) {
    setError(t('error_login'));
    return;
  }

  VK.Auth.login((response) => {
    if (response.session) {
      console.log('User successfully logged in', response);
      location.reload();
    } else {
      console.log('User failed to login or denied access', response);
      setError(t('error_login'));
    }
  }, permissions);
};

const logout = () => {
  if (!window.VK) {
    setError(t('error_login'));
    return;
  }

  VK.Auth.logout(() => {});
};

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://vk.com/js/api/openapi.js';
  script.onload = () => {
    console.log('VK openapi is loaded');
    VK.init({ apiId: apiId.value });
  };
  document.head.appendChild(script);
});
</script>

<template>
  <div class="flex auth">
    <div
      v-if="token"
      class="logout"
    >
      <p>{{ $t('logged') }}</p>
      <v-btn
        color="primary"
        @click="logout"
      >
        {{ $t('logout') }}
      </v-btn>
    </div>
    <div
      v-else
      class="login"
    >
      <v-btn @click="login">
        {{ $t('login') }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="less">
.auth {
  justify-content: end;
  margin-top: 50px;
}
</style>