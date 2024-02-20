
<script lang="ts" setup>
  const { t } = useI18n()
</script>

<template>
  <v-col>
    <v-list>
      <v-list-item>
        {{ t('about_about') }}
      </v-list-item>
      <v-list-item>
        {{ t('about_move_photo') }}
      </v-list-item>
    </v-list>
  </v-col>
</template>
