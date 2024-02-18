<template>
  <v-card
    v-if="showError"
    class="error-card"
  >
    {{ error }}
    <v-btn
      color="red"
      text
      @click="closeError"
    >
      Close
    </v-btn>
  </v-card>
</template>

<script setup>
import { useGlobalError } from '@/composables/useGlobalError';

const { error, showError, clearError } = useGlobalError();

function closeError() {
  clearError();
}
</script>

<style scoped>
.error-card {
  color: white;
  background-color: red;
  padding: 16px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
