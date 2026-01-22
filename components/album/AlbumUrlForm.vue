<template>
  <v-form fast-fail @submit.prevent>
    <v-spacer />
    <v-row>
      <v-col cols="12" md="8">
        <v-text-field
            :model-value="modelValue"
            :rules="urlRules"
            label="URL"
            required
            @update:model-value="$emit('update:modelValue', $event)"
        />
      </v-col>
      <v-col cols="4" md="2">
        <v-btn
            type="submit"
            :disabled="!isValid"
            block
            @click="$emit('check')"
        >
          {{ t('check') }}
        </v-btn>
      </v-col>
      <v-col cols="4" md="2">
        <v-btn
            type="submit"
            @click="$emit('clear')"
        >
          {{ t('clear') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  isValid: {
    type: Boolean,
    required: true
  }
});

defineEmits(['update:modelValue', 'check', 'clear']);

const { t } = useI18n();

const urlRules = [
  v => !!v || t('url_not_url'),
  v => /^((?:https?:\/\/)?[^./]+(?:\.[^./]+)+(?:\/.*)?)$/.test(v) || t('url_not_valid'),
  v => v.includes('vk.com') || t('url_not_vk'),
  v => v.includes('album') || t('url_not_album'),
  v => v.includes('https://') || t('url_not_https'),
];
</script>