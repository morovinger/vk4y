<script lang="ts" setup>
  const { t } = useI18n()

  const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7] as const

  // SEO optimization for About page
  useSeoMeta({
    title: () => t('about'),
    ogTitle: () => t('about'),
    description: () => t('about_no_server'),
    ogDescription: () => t('about_no_server'),
    ogImage: 'https://vk4y.ru/og-image.png',
  })

  // FAQPage rich-snippet markup, rebuilt per locale
  useHead(() => ({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_KEYS.map((n) => ({
            '@type': 'Question',
            name: t(`faq${n}_q`),
            acceptedAnswer: {
              '@type': 'Answer',
              text: t(`faq${n}_a`),
            },
          })),
        }),
      },
    ],
  }))
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

    <section class="faq">
      <h2 class="text-h5 mb-4">
        {{ t('faq_title') }}
      </h2>
      <div
        v-for="n in FAQ_KEYS"
        :key="n"
        class="mb-6"
      >
        <h3 class="text-h6 mb-2">
          {{ t(`faq${n}_q`) }}
        </h3>
        <p class="text-body-1">
          {{ t(`faq${n}_a`) }}
        </p>
      </div>
    </section>
  </v-col>
</template>
