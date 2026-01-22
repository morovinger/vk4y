// https://nuxt.com/docs/api/configuration/nuxt-config

import {md2} from "vuetify/blueprints";

export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      vkAppId: process.env.NUXT_PUBLIC_VK_APP_ID || '6656971'
    }
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext'
      }
    }
  },

  robots: {
    robotsTxt: false,
  },  

  devtools: {
    enabled: process.env.NODE_ENV === 'development'
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
    vueI18n: '../i18n.config.ts',
    baseUrl: 'https://morovinger.github.io/',
    defaultLocale: 'ru',
    locales: [
      { code: 'en', iso: 'en-US' },
      { code: 'ru', iso: 'ru-RU' },
    ],
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
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

  plugins: [
    '~/plugins/globalToken.ts'
  ],

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
    description: 'Скачайте ваши альбомы с Vk.com бесплатно без сервера. Приватный и безопасный сервис.',
    defaultLocale: 'ru',
  },

  sitemap: {
    enabled: true,
  },

  ogImage: {
    enabled: true,
    defaults: {
      component: 'OgImage',
      width: 1200,
      height: 630,
    }
  },

  app: {
    baseURL: '/vk4y/', // baseURL: '/<repository>/'
    buildAssetsDir: 'assets', // don't use "_" at the begining
    "head": {
      "title": "Скачать альбомы с Vk.com бесплатно",
      "htmlAttrs": {
        "lang": "ru"
      },
      "meta": [
        {
          "charset": "utf-8"
        },
        {
          "yandex-verification": "28b4b35a5f077347"
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
          "content": "Скачайте ваши альбомы с Vk.com бесплатно. Не требует сервера, работает полностью в браузере."
        },
        {
          "name": "keywords",
          "content": "Скачать альбом, ВК, Вконтакте, VK, VK.com, фотографии, загрузить альбом"
        },
        {
          "property": "og:type",
          "content": "website"
        },
        {
          "property": "og:url",
          "content": "https://morovinger.github.io/vk4y/"
        },
        {
          "property": "og:title",
          "content": "Скачать альбомы с Vk.com"
        },
        {
          "property": "og:description",
          "content": "Скачайте ваши альбомы с Vk.com бесплатно без сервера. Приватный и безопасный сервис."
        },
        {
          "property": "og:image",
          "content": "https://morovinger.github.io/vk4y/og-image.svg"
        },
        {
          "property": "twitter:card",
          "content": "summary_large_image"
        },
        {
          "property": "twitter:url",
          "content": "https://morovinger.github.io/vk4y/"
        },
        {
          "property": "twitter:title",
          "content": "Скачать альбомы с Vk.com бесплатно"
        },
        {
          "property": "twitter:description",
          "content": "Скачайте ваши альбомы с Vk.com бесплатно без сервера. Приватный и безопасный сервис."
        },
        {
          "property": "twitter:image",
          "content": "https://morovinger.github.io/vk4y/og-image.svg"
        },
        {
          "name": "google-site-verification",
          "content": "BhfaizbYuIdqztjCdfOiDnBZBO3YXQamuTziXDfwzXo"
        },
        {
          "name": "yandex-verification",
          "content": "437f6eaf73eaa859"
        }
      ],
      "link": [
        {
          "rel": "canonical",
          "href": "https://morovinger.github.io/vk4y/"
        }
      ]
    }
  },

  compatibilityDate: "2024-07-25",
})