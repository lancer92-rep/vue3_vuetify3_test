<template>
  <Banner :items="category" v-if="authStore.user === null" />
  <Search :items="category" v-if="authStore.user !== null" />
  <v-snackbar
    style="position: absolute; top: 80px; right: 10px"
    v-model="showSnackbar"
    :timeout="3000"
    location="top right"
    color="#f08703"
    min-height="30"
    min-width="100"
  >
    <v-icon left>mdi-alert-outline</v-icon>
    {{ snapbarContent }}
  </v-snackbar>
  <v-container>
    <section class="text-center">
      <h1 class="mt-10 mb-2">クリエイターから探す</h1>
      <v-row>
        <v-col
          v-for="item in data.creatorItem"
          :key="item.id"
          class="d-flex child-flex"
          md="3"
          cols="6"
        >
          <Thumbnail :item="item" :show-text="true" />
        </v-col>
      </v-row>
      <v-btn
        size="x-large"
        color="indigo mt-5"
        variant="outlined"
        @click="$router.push({ path: '/creators', query: { generation: '0' } })"
        >クリエイター一覧から探す</v-btn
      >
    </section>
    <section class="text-center">
      <h1 class="mt-15 mb-2">カテゴリから探す</h1>
      <v-row>
        <v-col
          v-for="item in categoryItem"
          :key="item.id"
          class="d-flex child-flex"
          md="3"
          cols="6"
        >
          <Thumbnail :item="item" :show-text="true" />
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import Banner from "@/components/Banner.vue";
import Search from "@/components/Search.vue";
import Thumbnail from "@/components/Thumbnail.vue";
import { useAuthStore } from "@/stores";
import api from "@/services/api";

interface Data {
  creatorItem: any[];
}

const data: Data = reactive({
  creatorItem: [],
});

const showSnackbar = ref(false);

const categoryItem = ref([] as any[]);

const category = ref([] as any[]);

const snapbarContent = ref("");

onBeforeMount(() => {
  api.get("/api/v1/list/creator").then((rst) => {
    data.creatorItem = rst.data.map((item: any) => {
      let category = "";
      item.age === 1 && (category = "20代");
      item.age === 2 && (category = "30代");
      item.age === 3 && (category = "40代");
      item.age === 4 && (category = "50代");
      return {
        id: item.id,
        thumbnail: `/api/v1/list/thumbnail/${
          item.thumbnail.destination.split("/")[2]
        }/${item.thumbnail.filename}`,
        category: category,
        url: `/creators?generation=${item.age}`,
      };
    });
  });

  api.get("/api/v1/list/all-category").then((res) => {
    categoryItem.value = res.data;
  });

  api.get("/api/v1/list/get-subcategory").then((res) => {
    category.value = res.data.map((item: any) => {
      return {
        title: item.name,
        url: `/categories/${item.id}/tags`,
      };
    });
  });

  api.get("/api/v1/list/get-membership").then((res) => {
    if (res.data.success) {
      snapbarContent.value = res.data.message;
      showSnackbar.value = true;
    }
  });
});

const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
section {
  h1 {
    font-size: 32px;
  }
}
</style>
