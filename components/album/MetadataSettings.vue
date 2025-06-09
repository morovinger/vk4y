<template>
  <v-card class="metadata-settings">
    <v-card-title>
      <Icon name="mdi:information-outline" />
      {{ t('metadata_settings') }}
    </v-card-title>
    
    <v-card-text>
      <v-switch
        v-model="enableMetadata"
        :label="t('include_metadata')"
        color="primary"
        @update:model-value="emit('update:enabled', $event)"
      />
      
      <div v-if="enableMetadata" class="metadata-options">
        <v-checkbox
          v-model="options.likes"
          :label="t('include_likes')"
          density="compact"
          @update:model-value="emitOptions"
        />
        
        <v-checkbox
          v-model="options.comments"
          :label="t('include_comments')"
          density="compact"
          @update:model-value="emitOptions"
        />
        
        <v-checkbox
          v-model="options.tags"
          :label="t('include_tags')"
          density="compact"
          @update:model-value="emitOptions"
        />
        
        <v-checkbox
          v-model="options.dateInfo"
          :label="t('include_date_info')"
          density="compact"
          @update:model-value="emitOptions"
        />
      </div>
      
      <v-alert 
        v-if="enableMetadata"
        type="info" 
        variant="tonal"
        class="mt-3"
      >
        <template #text>
          {{ t('metadata_warning') }}
        </template>
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
interface MetadataOptions {
  likes: boolean;
  comments: boolean;
  tags: boolean;
  dateInfo: boolean;
}

const props = defineProps({
  enabled: {
    type: Boolean,
    default: false
  },
  defaultOptions: {
    type: Object as PropType<MetadataOptions>,
    default: () => ({
      likes: true,
      comments: true,
      tags: true,
      dateInfo: true
    })
  }
});

const emit = defineEmits(['update:enabled', 'update:options']);

const { t } = useI18n();

const enableMetadata = ref(props.enabled);
const options = ref<MetadataOptions>({ ...props.defaultOptions });

const emitOptions = () => {
  emit('update:options', options.value);
};

watch(() => props.enabled, (newVal) => {
  enableMetadata.value = newVal;
});

watch(() => props.defaultOptions, (newVal) => {
  options.value = { ...newVal };
}, { deep: true });
</script>

<style lang="less" scoped>
.metadata-settings {
  margin: 16px 0;
}

.metadata-options {
  margin-left: 16px;
}
</style> 