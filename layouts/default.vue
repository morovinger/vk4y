
<script setup>
  const drawer = ref(false)
  const localePath = useLocalePath()
</script>

<template>
  <VApp>
    <v-navigation-drawer
      v-model="drawer"
      :disable-resize-watcher="false"
      app
    >
      <v-list>
        <v-list-item>
          <v-list-subheader>
            Vk4you
          </v-list-subheader>
          <v-btn>
            <NuxtLink :to="localePath('index')">
              {{ $t('home') }}
            </NuxtLink>
          </v-btn>
          <v-btn>
            <NuxtLink :to="localePath('index')">
              {{ $t('about') }}
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
      <!-- Main content goes here -->
      <v-container>
        <slot />
      </v-container>
    </v-main>

    <v-footer app>
      <!-- Footer content here -->
      <v-row justify="center">
        This is a footer
      </v-row>
    </v-footer>
  </VApp>
</template>