<template>
  <div class="thumbnail">
    <div class="mark d-flex">
      <div class="new" v-if="props.new">New</div>
      <div class="srank" v-if="props.srank">Sランク</div>
    </div>
    <a :href="props.item.url === '/categories' ? undefined : props.item.url">
      <v-img
        :src="props.item.thumbnail"
        :lazy-src="testImg"
        :aspect-ratio="props.aspect"
        cover
        class="bg-grey-lighten-2"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" justify="center" align="center">
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <div :class="props.item.url === '/categories' ? undefined : 'overlay'"></div>
      </v-img>
    </a>
    <div class="category" v-if="showText">
      <span class="category">{{ props.item.category }}</span>
      <div
        class="subcategory"
        v-for="sub in props.item.subcategory"
        :key="sub.title"
      >
        <a :href="`${props.item.url}${sub.url}`">{{ sub.title }}</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ThumbnailItem } from "@/services/Interfaces";
import testImg from "@/assets/example.jpg"; //test image for development

const props = defineProps({
  item: {
    type: Object as () => ThumbnailItem,
    required: true,
  },
  showText: {
    type: Boolean,
    required: true,
  },
  aspect: {
    type: String,
    required: false,
  },
  new: {
    type: Boolean,
    required: false,
  },
  srank: {
    type: Boolean,
    required: false,
  },
});
</script>

<style scoped lang="scss">
.thumbnail {
  width: 100%;
  .mark {
    position: absolute;
    gap: 5px;
    margin-top: 5px;
    margin-left: 5px;
    // top: 2px;
    // left: 2px;
    z-index: 9000;
    font-size: 12px;
    .new {
      display: inline-block;
      color: #9e9d24;
      background-color: white;
      border: 1px solid #9e9d24;
      padding: 2px 5px;
    }
    .srank {
      display: inline-block;
      color: white;
      background-color: #9e9d24;
      border: 1px solid #9e9d24;
      padding: 2px 5px;
    }
  }
  a {
    text-decoration: none;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .overlay:hover {
    opacity: 1;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0) 0%,
      rgba(34, 34, 34, 0.3) 51.56%,
      rgba(34, 34, 34, 0.8) 100%
    );
    transition: opacity 0.3s ease;
  }

  .category {
    color: #000;
    display: block;
    padding-top: 5px;
    font-weight: 600;
    font-size: 1.2rem;
  }
  .subcategory {
    font-size: 1rem;
    font-weight: 400;
    text-align: left;
    a {
      color: #000;
    }
    a:hover {
      color: #00e;
    }
  }
}
</style>
@/services/Interfaces
