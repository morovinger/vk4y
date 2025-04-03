<script lang="ts" setup>
  const { t } = useI18n()
  
  // SEO optimization for About page
  useSeoMeta({
    title: () => t('about'),
    ogTitle: () => t('about'),
    description: () => t('about_no_server'),
    ogDescription: () => t('about_no_server'),
    ogImage: '/vk4y/og-image.svg',
  })
</script>

<template>
  <v-col>
    <v-list>
      <v-list-item>
        {{ t('about_no_server') }}
      </v-list-item>
      <v-list-item>
        <b>
          {{ t('about_about') }}
        </b>
      </v-list-item>
    </v-list>
  </v-col>
</template>
