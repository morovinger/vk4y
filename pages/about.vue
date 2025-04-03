
<script lang="ts" setup>
  const { t } = useI18n()
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
