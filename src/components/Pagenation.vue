<template>
  <div>
    <ul>
      <li v-for="item in paginatedItems" :key="item.id">{{ item.name }}</li>
    </ul>
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      @input="updateCurrentPage"
    ></v-pagination>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
// import { useRoute } from 'vue-router';

const props = defineProps({
  items: {
    type: Object as () => {
      id: number;
      name: string;
    }[],
    required: true,
  },
});

const itemsPerPage = 2;
const currentPage = ref(1);

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return props.items.slice(startIndex, endIndex);
});

const pageCount = computed(() => Math.ceil(props.items.length / itemsPerPage));

function updateCurrentPage(page: number) {
  currentPage.value = page;
}
</script>

<style>
/* Add your custom styles here */
</style>
