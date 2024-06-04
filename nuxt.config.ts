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
    'nuxt-icon'
  ],
  eslint: {
    // options here
  },
  i18n: {
     vueI18n: './i18n.config.ts',
     locales: ['en', 'ru'], // used in URL path prefix
     defaultLocale: 'ru', // default locale of your project for Nuxt pages and routings
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
  app: {
    baseURL: '/vk4y/', // baseURL: '/<repository>/'
    buildAssetsDir: 'assets', // don't use "_" at the begining
    "head": {
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
          "content": "Скачать альбомы с Vk.com"
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