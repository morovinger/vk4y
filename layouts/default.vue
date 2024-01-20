
<script setup>
  const routes = useRouter().getRoutes()
  const drawer = ref(false)
</script>

<template>
		<VApp>

      <v-navigation-drawer :disable-resize-watcher="false" v-model="drawer" app>
        <v-list>
          <v-list-item v-for="link in routes">
            <v-list-subheader>
              Vk4you
            </v-list-subheader>
            <v-btn :to="link">
              {{link.name}}
            </v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app>
        <v-container>
          <v-row align="center" justify="end">
            <v-app-bar-title>Vk4you</v-app-bar-title>
            <v-col class="hidden-sm-and-down text-center" cols="2" v-for="link in routes">
              <v-btn :to="link" color="red">
                {{link.name}}
              </v-btn>
            </v-col>
            <v-app-bar-nav-icon class="hidden-md-and-up" color="red" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
        <v-row justify="center">This is a footer</v-row>
      </v-footer>

		</VApp>
</template>