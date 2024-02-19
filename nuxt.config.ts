// https://nuxt.com/docs/api/configuration/nuxt-config

const title = "Vk.com album downloader";
const description = "Download you favorite photos form Vk.com for free";
const image = "https://vk.com/images/icons/pwa/apple/default.png?15";
const url = "https://vk4y.github.io";

export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enabled: false
  },
  modules: [
    'vuetify-nuxt-module',
    '@nuxtjs/eslint-module',
    '@nuxtjs/i18n',
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
      /* vuetify options */
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
    head: {
      title: "Vk.com album downloader|vk4y",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: url },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: description,
        },
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        {
          hid: "og:url",
          property: "og:url",
          content: url,
        },
        {
          hid: "og:image:secure_url",
          property: "og:image:secure_url",
          content: image,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: image,
        },
      ],
    },
  },
})