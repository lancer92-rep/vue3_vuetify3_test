<template>
  <div class="login" v-if="props.isOpen">
    <v-fade-transition hide-on-leave v-if="!resetDialog">
      <v-card
        append-icon="$close"
        class="mx-auto"
        elevation="16"
        max-width="450"
        title=""
      >
        <template v-slot:append>
          <v-btn
            icon="$close"
            variant="text"
            @click="props.openDialog(false)"
          />
        </template>
        <v-form ref="loginForm" @submit="handleLogin">
          <div class="py-5 text-center">
            <div class="text-h7 font-weight-bold">
              サービスをご利用いただくにはログインが必要です
            </div>
          </div>
          <v-alert
            v-if="loginError"
            variant="outlined"
            density="compact"
            color="warning"
            :text="loginError"
            class="mx-10"
          ></v-alert>
          <div class="py-5 px-10">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              :counter="10"
              label="メールアドレス"
              required
              hide-details
            />
          </div>
          <div class="py-5 px-10">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              :counter="10"
              label="パスワード"
              required
              type="password"
              hide-details
            />
          </div>
          <div class="py-5 px-10">
            <v-btn type="submit" class="w-100" color="indigo" size="x-large">
              ログインする
            </v-btn>
          </div>
        </v-form>
        <div class="pb-15 text-center">
          <a href="#" class="text-h7" @click="handleResetDialog">
            パスワードをお忘れになった方はこちら
          </a>
        </div>
      </v-card>
    </v-fade-transition>
    <v-fade-transition hide-on-leave v-if="resetDialog">
      <v-card
        append-icon="$close"
        class="mx-auto"
        elevation="16"
        max-width="400"
        title=""
      >
        <template v-slot:append>
          <v-btn
            icon="$close"
            variant="text"
            @click="props.openDialog(false)"
          />
        </template>
        <div class="py-5 text-center">
          <div class="text-h7 font-weight-bold">パスワードの変更</div>
        </div>
        <div class="py-5 px-10">
          <v-text-field
            v-model="email"
            :rules="emailRules"
            :counter="10"
            label="メールアドレス"
            required
            hide-details
          />
        </div>
        <div class="py-5 px-10">
          <v-btn
            class="w-100"
            color="indigo"
            size="x-large"
            :disabled="!Boolean(email)"
          >
            再設定する
          </v-btn>
        </div>
        <div class="pb-15 text-center">
          <a href="#" class="text-h7" @click="handleResetDialog">
            ログインする方はこちら
          </a>
        </div>
      </v-card>
    </v-fade-transition>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore, useAlertStore } from "@/stores";
import { ref } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  openDialog: {
    type: Function,
    required: true,
  },
});

const loginError = ref("");
const loginForm: any = ref();
const resetDialog = ref(false);
const email = ref("");
const password = ref("");

const emailRules = [
  (value: any) => {
    if (value) return true;
    return "メールアドレスは必須です。";
  },
  (value: any) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
      return true;
    return "メールアドレスが間違っています。";
  },
];

const passwordRules = [
  (value: any) => {
    if (value) return true;
    return "パスワードが必要です。";
  },
];

const handleResetDialog = (e: Event) => {
  e.preventDefault();
  resetDialog.value = !resetDialog.value;
};

const handleLogin = async (e: Event) => {
  e.preventDefault();
  if (!loginForm.value.isValid) {
    return;
  }
  const authStore = useAuthStore();
  const alertStore = useAlertStore();
  await authStore.login(email.value, password.value);
  const error: any = alertStore.alert;
  if (error === null) {
    loginError.value = "";
    email.value = "";
    password.value = "";
    props.openDialog(false);
  } else {
    loginError.value = error.message;
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(200, 200, 200, 0.8);

  .v-card {
    top: 50vh;
    // left: 0;
    transform: translate(0, -50%);

    a {
      font-size: 0.9rem;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  z-index: 100;
}
</style>
