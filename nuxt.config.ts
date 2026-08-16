// https://nuxt.com/docs/api/configuration/nuxt-config

import {md2} from "vuetify/blueprints";

export default defineNuxtConfig({
  // SSR is used only for static prerendering (nuxt generate) so crawlers get
  // full HTML; all VK API work still happens in the browser (see <ClientOnly>).
  ssr: true,

  runtimeConfig: {
    public: {
      vkAppId: process.env.NUXT_PUBLIC_VK_APP_ID || '6656971',
      yandexMetrikaId: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID || '106410313'
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
    "@nuxtjs/seo",
    'yandex-metrika-module-nuxt3'
  ],

  yandexMetrika: {
    id: process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID,
    enabled: !!process.env.NUXT_PUBLIC_YANDEX_METRIKA_ID,
    options: {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true
    }
  },

  eslint: {
    // options here
  },

  i18n: {
    vueI18n: '../i18n.config.ts',
    baseUrl: 'https://vk4y.ru',
    defaultLocale: 'ru',
    locales: [
      { code: 'en', language: 'en-US' },
      { code: 'ru', language: 'ru-RU' },
    ],
    strategy: 'prefix_except_default',
    // Disabled to keep "/" a stable 200 serving the default (ru) locale.
    // Browser-language auto-redirect bounced "/" -> "/en" for English clients
    // (incl. Googlebot), which Search Console flagged as "Page with redirect".
    detectBrowserLanguage: false,
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
    url: 'https://vk4y.ru',
    name: 'vk4y',
    description: 'Скачайте ваши альбомы с Vk.com бесплатно без сервера. Приватный и безопасный сервис.',
    defaultLocale: 'ru',
  },

  sitemap: {
    enabled: true,
  },

  // Social previews use the static /og-image.png (SVG is not supported by
  // VK/Telegram/Facebook scrapers), so runtime og-image generation is off.
  ogImage: {
    enabled: false,
  },

  app: {
    baseURL: '/', // Custom domain, no subdirectory needed
    buildAssetsDir: 'assets', // don't use "_" at the begining
    "head": {
      "title": "Скачать альбомы с Vk.com бесплатно",
      // html lang, canonical, og:url and hreflang are set per page by
      // useLocaleHead() in layouts/default.vue — do not hardcode them here.
      "meta": [
        {
          "charset": "utf-8"
        },
        {
          "name": "yandex-verification",
          "content": "ceb5afb38a9e216a"
        },
        {
          "name": "google-site-verification",
          "content": "yyT6Uc8VW-q9yeeF7gIVozPqFctscH-WGKU1TfGrjLY"
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
          "property": "og:title",
          "content": "Скачать альбомы с Vk.com"
        },
        {
          "property": "og:description",
          "content": "Скачайте ваши альбомы с Vk.com бесплатно без сервера. Приватный и безопасный сервис."
        },
        {
          "property": "og:image",
          "content": "https://vk4y.ru/og-image.png"
        },
        {
          "property": "twitter:card",
          "content": "summary_large_image"
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
          "content": "https://vk4y.ru/og-image.png"
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

  compatibilityDate: "2024-07-25",
})