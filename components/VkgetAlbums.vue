<script setup lang="ts">
function getUserAlbums() {
  VK.Api.call('photos.getAlbums', {
    need_system: 1,
    v: '5.194'
  }, function(r) {
    if (r.response) {
      console.log('Albums: ', r.response.items);
    } else {
      console.error(r, 'Error fetching albums');
    }
  });
}
</script>

<template>
  <div>
    <v-row>
      <v-col>
        <v-btn @click="getUserAlbums">
          Check my albums
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>

</style>