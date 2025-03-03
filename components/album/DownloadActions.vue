<template>
  <div>
    <div v-if="downloadAs === 'photos'">
      <v-btn
          :loading="loading"
          @click="$emit('download')"
      >
        {{ t('download_by_photos') }}
      </v-btn>
    </div>
    <div
        v-if="downloadAs === 'albums'"
        class="d-flex align-content-start flex-wrap"
    >
      <v-btn
          :disabled="!selectedItems.length"
          :loading="loading"
          style="margin-bottom: 20px"
          @click="$emit('download')"
      >
        {{ selectedCount }}
      </v-btn>
      <v-btn @click="$emit('select-all')">
        {{ selectedItems.length === results.items?.length ? t('download_all_albums_deselect') : t('download_all_albums_select') }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  downloadAs: {
    type: String,
    default: ''
  },
  loading: {
    type: Boolean,
    default: false
  },
  selectedItems: {
    type: Array,
    default: () => []
  },
  results: {
    type: Object,
    default: () => ({})
  },
  selectedCount: {
    type: String,
    required: true
  }
});

defineEmits(['download', 'select-all']);

const { t } = useI18n();
</script>