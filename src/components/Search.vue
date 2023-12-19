<template>
  <v-container class="search">
    <div class="search-group">
      <input
        type="text"
        v-model="searchText"
        class="search"
        placeholder="キーワードを入力"
        @keyup.enter="handleSearch"
      />
      <v-btn color="indigo" @click="handleSearch">
        <v-icon color="white" icon="mdi-magnify" size="x-large"></v-icon>
      </v-btn>
    </div>
    <div class="categoriy-btn">
      <v-btn
        v-for="item in props.items"
        :key="item.title"
        variant="outlined"
        rounded="xl"
        @click="
          () => {
            $router.push({ path: item.url });
          }
        "
      >
        #{{ item.title }}
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";
import { Categories } from "@/services/Interfaces";
const props = defineProps({
  items: {
    type: Object as () => Categories[],
    required: true,
  },
});

const searchText = ref("");

const handleSearch = () => {
  router.push({ path: "/search", query: { keyword: searchText.value } });
};
</script>

<style scoped lang="scss">
$viewport-width: 100%;
$subtract-width: 100px;

.search {
  padding: 20px 0;
  text-align: left;

  .search-group {
    display: inline-flex;
    width: 100%;
    justify-content: center;
    margin-top: 10px;

    .search {
      border: none;
      height: 60px;
      width: calc(100% - 90px);
      background-color: #fff;
      padding-left: 20px;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
        0px 2px 2px 0px
          var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
        0px 1px 5px 0px
          var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
    }

    .search:focus-visible {
      outline: none;
    }

    button {
      width: 60px !important;
      height: 60px !important;
      border-radius: 0%;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  .categoriy-btn {
    margin-top: 20px;

    .v-btn {
      margin: 0 10px;
      font-size: 0.8rem;
      font-weight: 200;
      height: 28px;
      border-color: rgb(190, 190, 190);
    }
  }
}

@media (max-width: 768px) {
  .banner {
    display: none;
  }

  .title {
    font-size: 20px;
  }

  .text {
    font-size: 14px;
  }
}
</style>
@/services/Interfaces
