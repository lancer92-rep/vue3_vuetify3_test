<template>
  <v-app-bar elevation="2">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        class="nav-icon"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title class="font-weight-bold">
      <a href="/" class="logo">ムビスト</a>
    </v-app-bar-title>
    <v-spacer />
    <div class="nav-menu">
      <template v-for="item in headerNavs" :key="item.title">
        <template v-if="item.role.indexOf(role) !== -1">
          <v-btn
            v-if="item.submenu === undefined"
            @click="
              () => {
                if (item.url !== '') {
                  if (item.query) {
                    windows.location.href = item.url + '?type=' + item.query;
                  } else {
                    $router.push({ path: item.url });
                  }
                }
              }
            "
          >
            <v-icon v-if="item.icon !== ''">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-menu open-on-hover open-on-click v-else>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props">
                <v-icon>{{ item.icon }}</v-icon
                >{{ item.title }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="m7 10l5 5l5-5z" />
                </svg>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(subitem, index) in item.submenu"
                :key="index"
                :link="true"
                @click="$router.push({ path: subitem.url })"
              >
                {{ subitem.title }}
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </template>
      <v-btn @click="handleLogout" v-if="authStore.user !== null"
        ><v-icon>mdi-logout</v-icon>ログアウト</v-btn
      >
      <v-btn @click="handleLogin" v-if="authStore.user === null"
        ><v-icon>mdi-login</v-icon>ログイン</v-btn
      >
      <!-- <v-btn @click="$emit('toggle')" prepend-icon="mdi-moon-waning-crescent">Dark Mode</v-btn> -->
    </div>
  </v-app-bar>
  <v-navigation-drawer
    class="drawer-nav"
    v-model="drawer"
    location="end"
    temporary
  >
    <v-list density="compact" nav>
      <v-list-item
        title="ログアウト"
        prepend-icon="mdi-logout"
        @click="handleLogout"
        v-if="authStore.user !== null"
      />
      <v-list-item
        title="ログイン"
        prepend-icon="mdi-login"
        @click="handleLogin"
        v-if="authStore.user === null"
      />
      <v-divider />
      <template v-for="item in headerNavs" :key="item.title">
        <template v-if="item.role.indexOf(role) !== -1">
          <template v-if="item.submenu === undefined">
            <v-list-item
              :title="item.title"
              :prepend-icon="item.icon"
              @click="
                () => {
                  if (item.url !== '') {
                    if (item.query) {
                      $router.push({
                        path: item.url,
                        query: { type: item.query },
                      });
                    } else {
                      $router.push({ path: item.url });
                    }
                  }
                }
              "
            />
          </template>
          <template v-else>
            <v-divider />
            <v-list-item :title="item.title" :prepend-icon="item.icon" />
            <v-list-item
              v-for="(subitem, index) in item.submenu"
              :key="index"
              :link="true"
              :title="subitem.title"
              prepend-icon="mdi-filetree"
              class="subnavLink"
              @click="$router.push({ path: subitem.url })"
            />
          </template>
        </template>
      </template>
      <v-divider />
      <v-list-item
        v-for="item in footerNavs"
        :key="item.title"
        :title="item.title"
        :prepend-icon="item.icon"
        @click="
          () => {
            if (item.url !== '') $router.push({ path: item.url });
          }
        "
      />
    </v-list>
    <!-- <v-btn @click="$emit('toggle')" prepend-icon="mdi-moon-waning-crescent">Dark Mode</v-btn> -->
  </v-navigation-drawer>

  <Login
    :isOpen="loginDialog"
    :openDialog="(state: boolean) => loginDialog = state"
    v-if="!isLogin"
  />
</template>

<script lang="ts" setup>
import Login from "@/components/Login.vue";
import { computed, ref } from "vue";
import { headerNavs, footerNavs } from "@/services/Links";
import { useAuthStore } from "@/stores";

const authStore = useAuthStore();
const drawer = ref(false);
const loginDialog = ref(false);
const windows = ref(window);
const role = computed(() => {
  return !authStore.user ? "none" : authStore.user.role;
});
const isLogin = computed(() => {
  return !authStore.user ? false : true;
});

const handleLogout = () => {
  drawer.value = false;
  authStore.logout();
};
const handleLogin = () => {
  var pos = 0;
  var interval = setInterval(function () {
    if (pos >= window.pageYOffset) {
      clearInterval(interval);
    }
    window.scrollTo(0, pos);
    pos += 5;
  }, 100);
  loginDialog.value = true;
  drawer.value = false;
};
</script>

<style lang="scss" scoped>
.nav-icon {
  display: none !important;

  @media (max-width: 700px) {
    display: block !important;
  }
}

.logo {
  text-decoration: none;
  color: rgb(29, 29, 29);
  font-size: 2rem;
  font-weight: bold;
}

.nav-menu {
  display: block !important;

  @media (max-width: 700px) {
    display: none !important;
  }
}
</style>
@/services/Links
