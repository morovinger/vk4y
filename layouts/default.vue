
<script lang="tsx" setup>
  const drawer = ref(false)
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()
  const { locale,t } = useI18n()

  const gitHubLink = () => (
    <a class="nav-link py-2 px-0 px-lg-2" href="https://github.com/morovinger/vk4y" target="_blank" rel="noopener">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="navbar-nav-svg" viewBox="0 0 512 499.36"
           role="img"><title>GitHub</title>
        <path fill="currentColor" fill-rule="evenodd"
              d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"></path>
      </svg>
      <small class="d-lg-none ms-2">GitHub</small>
    </a>
  );

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
          <v-btn>
            <NuxtLink :to="localePath('index')">
              {{ t('home') }}
            </NuxtLink>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn>
            <NuxtLink :to="localePath('index')">
              {{ t('about') }}
            </NuxtLink>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-container>
        <v-row
          align="center"
          justify="end"
        >
          <v-app-bar-title>Vk4you</v-app-bar-title>
          <v-col
            class="hidden-sm-and-down text-center"
            cols="4"
          >
            <v-btn>
              <NuxtLink :to="localePath('index')">
                {{ $t('home') }}
              </NuxtLink>
            </v-btn>
            <v-btn>
              <NuxtLink :to="localePath('about')">
                {{ $t('about') }}
              </NuxtLink>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn v-if="locale === 'ru'">
              <NuxtLink :to="switchLocalePath('en')">
                EN
              </NuxtLink>
            </v-btn>
            <v-btn v-else>
              <NuxtLink :to="switchLocalePath('ru')">
                RU
              </NuxtLink>
            </v-btn>
          </v-col>
          <v-app-bar-nav-icon
            class="hidden-md-and-up"
            color="red"
            @click.stop="drawer = !drawer"
          />
          <v-col />
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <error />
      <v-container>
        <v-row>
          <v-col cols="11">
            {{ t("title") }}
          </v-col>
          <v-col>
            <gitHubLink />
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
          <v-col cols="11">
            Vk4y is free and open-source
          </v-col>
          <v-col>
            <gitHubLink />
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </VApp>
</template>

<style lang="less">
/* Style for the anchor tag */
.nav-link {
  color: #333; /* Text color */
  text-decoration: none; /* Remove underline from links */
  display: flex; /* Use flexbox for alignment */
  align-items: center; /* Align items vertically */
  padding: 10px 5px; /* Padding for top/bottom and left/right */
}

/* Style specifically for large screens */
@media (min-width: 992px) {
  .nav-link {
    padding: 10px 10px; /* Increased padding on large screens */
  }
}

/* Style for the SVG within the anchor tag */
.navbar-nav-svg {
  fill: #555; /* SVG fill color */
  width: 24px; /* Width of the SVG */
  height: 24px; /* Height of the SVG */
  margin-right: 5px; /* Margin to the right of the SVG */
}

/* Style for the small tag within the anchor tag */
.nav-link .ms-2 {
  color: #666; /* Text color */
  font-size: 12px; /* Font size */
  display: none; /* Hide by default */
}

/* Show the small tag only on small screens */
@media (max-width: 992px) {
  .nav-link .ms-2 {
    display: inline; /* Make it visible on small screens */
  }
}

/* Additional styles for hover effects */
.nav-link:hover {
  background-color: #f8f8f8; /* Change background on hover */
  border-radius: 5px; /* Rounded corners on hover */
}

/* Additional styles for focus and active states */
.nav-link:focus, .nav-link:active {
  background-color: #eee; /* Change background for focus/active */
  outline: none; /* Remove outline */
}

</style>