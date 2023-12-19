<template>
  <div class="banner">
    <div class="banner-title">
      <h1>現役インフルエンサー・動画クリエイターが多数登録！</h1>
      <h1>縦型の動画広告の素材収集サイトの決定版</h1>
      <h1>「ムビスト」</h1>
    </div>
    <div class="search-group">
      <input
        type="text"
        v-model="inputValue"
        class="search"
        placeholder="キーワードを入力"
      />
      <v-btn @click="handleSearch" color="indigo">
        <v-icon color="white" icon="mdi-magnify" size="x-large"></v-icon>
      </v-btn>
    </div>
    <div class="categoriy-btn">
      <v-btn
        v-for="item in props.items"
        :key="item.title"
        variant="outlined"
        color="white"
        rounded="xl"
      >
        #{{ item.title }}
      </v-btn>
    </div>
    <div class="banner-title">
      <h2>月額5万円のみ！無限にダウンロード可能</h2>
      <h2>※認定クリエイタープランもあり</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Categories } from "@/services/Interfaces";
import { ref } from "vue";
const props = defineProps({
  items: {
    type: Object as () => Categories[],
    required: true,
  },
});

const inputValue = ref("");

const handleSearch = () => {
};
</script>

<style scoped lang="scss">
.banner {
  max-width: 100vw;
  min-width: 100vw;
  background-color: #808080;
  padding: 20px 0;
  text-align: center;
  padding-top: 10px;

  .banner-title {
    padding-top: 20px;
    color: white;
  }

  .search-group {
    display: inline-flex;
    width: 100vw;
    justify-content: center;
    margin-top: 10px;

    .search {
      border: none;
      height: 60px;
      width: 50%;
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
      width: 80px !important;
      height: 60px !important;
      border-radius: 0%;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
  .categoriy-btn {
    margin: 20px 0;
    .v-btn {
      margin: 0 10px;
      font-size: 0.8rem;
      font-weight: 200;
      height: 28px;
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
