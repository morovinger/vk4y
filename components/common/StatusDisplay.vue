<template>
  <v-row>
    <v-col>
      <h2>{{ message }}</h2>
    </v-col>
    <v-col v-if="loading">
      <p>{{ t('download_process') }}</p>
    </v-col>
    <v-col>
      <div>{{ albumName }}</div>
      <v-progress-linear
          v-if="loading"
          :model-value="progress"
          color="primary"
          height="25"
          rounded
      >
        <strong>{{ Math.ceil(progress) }}%</strong>
      </v-progress-linear>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  albumName: {
    type: String,
    default: ''
  },
  progress: {
    type: Number,
    default: 0
  }
});

const { t } = useI18n();
</script>