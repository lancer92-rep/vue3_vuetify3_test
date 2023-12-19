<template>
  <v-footer class="bg-grey-darken-4">
    <v-btn size="x-large" color="indigo">動画のリクエストはこちらから</v-btn>
    <v-row justify="center" no-gutters class="nav">
      <template v-for="link in footerNavs" :key="link.title">
        <v-btn
          v-if="link.role.indexOf(role) !== -1"
          :key="link.title"
          color="white"
          variant="text"
          class="mx-2 footerNav"
          rounded="xl"
        >
          {{ link.title }}
        </v-btn>
      </template>
      <v-col class="text-center mt-4" cols="12">
        <span color="white">Copyright©2023 Start-X, LLC.</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts" setup>
import { footerNavs } from "@/services/Links";
import { useAuthStore } from "@/stores";
import { computed } from "vue";
const authStore = useAuthStore();
const role = computed(() => {
  return !authStore.user ? "none" : authStore.user.role;
});
</script>

<style lang="scss" scoped>
.v-footer {
  flex: none !important;
  font-weight: 400;
  button {
    font-weight: 200;
  }

  @media (max-width: 1000px) {
    display: grid;
  }

  .footerNav {
    @media (max-width: 700px) {
      display: none;
    }
  }
}
</style>
@/services/Links
