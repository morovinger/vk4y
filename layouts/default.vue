
<script lang="tsx" setup>

  const drawer = ref(false)
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()
  const currentRoute = useRoute()
  const { locale,t } = useI18n()
  const theme = useTheme()

  useSeoMeta({
    title: t('title'),
    ogTitle: t('title'),
    description: t('description'),
    ogDescription: t('description'),
    ogImage: 'https://example.com/image.png',
  })

  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
  const getInactiveRoute = () => {
    const baseRoute = currentRoute.name.split('___')
    return  baseRoute[0] === 'index' ? 'about' : 'index'
  };

</script>

<template>
  <VApp>
    <v-navigation-drawer
      v-model="drawer"
      :disable-resize-watcher="false"
      app
    >
      <v-list>
        <v-list-subheader>
          Vk4you
        </v-list-subheader>
        <v-list-item>
          <NuxtLink :to="localePath(getInactiveRoute())">
            <v-btn>
              {{ t(getInactiveRoute()) }}
            </v-btn>
          </NuxtLink>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-container>
        <v-row
          align="center"
          justify="end"
        >
          <v-col
            sm="2"
            md="7"
          >
            <v-app-bar-title class="text-h5">
              Vk4you
            </v-app-bar-title>
          </v-col>
          <v-col
            class="hidden-sm-and-down text-center"
          >
            <NuxtLink :to="localePath(getInactiveRoute())">
              <v-btn>
                {{ t(getInactiveRoute()) }}
              </v-btn>
            </NuxtLink>
          </v-col>
          <v-col sm="1">
            <NuxtLink
              v-if="locale === 'ru'"
              :to="switchLocalePath('en')"
            >
              <v-btn>
                <Icon
                  name="twemoji:flag-england"
                  size="2em"
                />
              </v-btn>
            </NuxtLink>
            <NuxtLink
              v-else
              :to="switchLocalePath('ru')"
            >
              <v-btn>
                <Icon
                  name="fxemoji:russianflag"
                  size="2em"
                />
              </v-btn>
            </NuxtLink>
          </v-col>
          <v-col>
            <v-btn @click="toggleTheme">
              <Icon
                name="tabler:sun-moon"
                size="2em"
              />
            </v-btn>
          </v-col>
          <v-col>
            <v-app-bar-nav-icon
              class="hidden-md-and-up"
              color="red"
              @click.stop="drawer = !drawer"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <error />
      <v-container>
        <v-row>
          <v-col cols="10">
            {{ t("title") }}
          </v-col>
        </v-row>
      </v-container>
      <!-- Main content goes here -->
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-footer app>
      <v-container>
        <!-- Footer content here -->
        <v-row justify="center">
          <v-col cols="10">
            Vk4y is free and open-source
          </v-col>
          <v-col cols="2">
            <a
              href="https://github.com/morovinger/vk4y"
              target="_blank"
            >
              <Icon
                name="uil:github"
                color="black"
                size="2em"
              />
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </VApp>
</template>

<style lang="less">

</style>