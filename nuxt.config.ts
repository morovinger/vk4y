// https://nuxt.com/docs/api/configuration/nuxt-config

import {md2} from "vuetify/blueprints";

export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: false
  },
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/eslint-module',
    '@nuxtjs/i18n',
    'nuxt-icon'
  ],
  i18n: {
     vueI18n: './i18n.config.ts',
     locales: ['en', 'ru'], // used in URL path prefix
     defaultLocale: 'en', // default locale of your project for Nuxt pages and routings
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
  },
})