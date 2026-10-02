<script lang="ts" setup>
// Static how-to content for the home page. Rendered outside <ClientOnly> so
// the prerendered HTML carries real text for search engines and AI overviews.
const { t } = useI18n()
const localePath = useLocalePath()

const STEP_KEYS = [1, 2, 3, 4, 5] as const
const WHAT_KEYS = [1, 2, 3, 4, 5] as const
const WHY_KEYS = [1, 2, 3, 4, 5, 6] as const
</script>

<template>
  <section class="home-guide mt-12">
    <h2 class="text-h5 mb-4">
      {{ t('guide_title') }}
    </h2>
    <ol class="mb-8">
      <li
        v-for="n in STEP_KEYS"
        :key="n"
        class="text-body-1 mb-2"
      >
        {{ t(`guide_step${n}`) }}
      </li>
    </ol>

    <h2 class="text-h5 mb-4">
      {{ t('what_title') }}
    </h2>
    <ul class="mb-8">
      <li
        v-for="n in WHAT_KEYS"
        :key="n"
        class="text-body-1 mb-2"
      >
        {{ t(`what_item${n}`) }}
      </li>
    </ul>

    <h2 class="text-h5 mb-4">
      {{ t('why_title') }}
    </h2>
    <ul class="mb-8">
      <li
        v-for="n in WHY_KEYS"
        :key="n"
        class="text-body-1 mb-2"
      >
        {{ t(`why_item${n}`) }}
      </li>
    </ul>

    <h2 class="text-h5 mb-4">
      {{ t('archive_title') }}
    </h2>
    <p class="text-body-1 mb-8">
      {{ t('archive_text') }}
    </p>

    <NuxtLink :to="localePath('about')">
      {{ t('faq_link') }}
    </NuxtLink>
  </section>
</template>

<style lang="less">
.home-guide {
  ol, ul {
    padding-left: 1.5em;
  }
}
</style>
