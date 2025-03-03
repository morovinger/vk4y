<template>
  <div class="d-flex flex-wrap justify-start">
    <v-btn
        v-for="item in albums"
        :id="item.id"
        :key="item.id"
        class="ma-2 pa-2"
        :variant="isSelected(item)"
        @click="$emit('toggle-selection', item)"
    >
      {{ item.title.slice(0, 14) }}
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  albums: {
    type: Array,
    default: () => []
  },
  selectedItems: {
    type: Array,
    default: () => []
  }
});

defineEmits(['toggle-selection']);

const isSelected = (item) => {
  return props.selectedItems.some(selected => selected.id === item.id) ? 'tonal' : 'outlined';
};
</script>