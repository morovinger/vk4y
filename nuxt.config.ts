// https://nuxt.com/docs/api/configuration/nuxt-config

import {md2} from "vuetify/blueprints";

export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: false
  },
  modules: [
    'vuetify-nuxt-module',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    'nuxt-icon',
    "@nuxtjs/seo"
  ],
  eslint: {
    // options here
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    baseUrl: 'https://morovinger.github.io/vk4y/',
    defaultLocale: 'ru',
    locales: [
      { code: 'en', iso: 'en-US' },
      { code: 'ru', iso: 'ru-RU' },
    ],
  },
  css: [
    "~/assets/style.less",
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      blueprint: md2,
    }
  },
  build: {
    transpile: ["vuetify"]
  },
  vite: {
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['md-linedivider'].includes(tag),
        }
      }
    },
  },
  site: {
    url: 'https://morovinger.github.io/vk4y/',
    name: 'vk4y',
    description: 'Скачайте ваши альбомы с Vk.com бесплатно',
    defaultLocale: 'ru',
  },
  app: {
    baseURL: '/vk4y/', // baseURL: '/<repository>/'
    buildAssetsDir: 'assets', // don't use "_" at the begining
    "head": {
      "title": "Скачать альбомы с Vk.com бесплатно",
      "meta": [
        {
          "charset": "utf-8"
        },
        {
          "name": "viewport",
          "content": "width=device-width, initial-scale=1"
        },
        {
          "name": "title",
          "content": "Скачать альбомы с Vk.com бесплатно"
        },
        {
          "name": "description",
          "content": "Скачайте ваши альбомы с Vk.com бесплатно"
        },
        {
          "name": "keywords",
          "content": "Скачать альбом, ВК, Вконтакте, VK, VK.com"
        },
        {
          "property": "og:title",
          "content": "Скачать альбомы с Vk.com"
        },
        {
          "property": "og:description",
          "content": "Скачайте ваши альбомы с Vk.com бесплатно"
        },
        {
          "name": "google-site-verification",
          "content": "BhfaizbYuIdqztjCdfOiDnBZBO3YXQamuTziXDfwzXo"
        },
        {
          "name": "yandex-verification",
          "content": "437f6eaf73eaa859"
        }
      ]
      }
  },
})