<template>
  <v-container class="register">
    <v-row class="justify-center">
      <h2 class="mt-10 mb-10">新規登録（無料)</h2>
    </v-row>
    <v-row class="justify-center">
      <h3 class="mb-5">既にエンタープライズプランを契約していますか？</h3>
    </v-row>
    <v-radio-group
      v-model="registerType"
      inline
      class="mt-5 justify-center d-flex mb-10"
    >
      <v-radio label="契約していない" value="1"></v-radio>
      <v-radio label="契約済み" value="2"></v-radio>
    </v-radio-group>
    <v-row class="justify-center" v-if="registerType === '0'">
      <div class="board">
        <h3 class="font-weight-bold">エンタープライズプランとは</h3>
        <p>
          クリエイティブ制作部隊を設け、動画広告のPDCAを頻度高く実施される<br />企業様向けプランになります。
        </p>
        <v-btn size="x-large" variant="outlined">詳細を見る</v-btn>
      </div>
    </v-row>
    <v-row class="justify-center" v-if="registerType === '2'">
      <div class="board">
        <h3 class="font-weight-bold">エンタープライズプランとは</h3>
        <p>
          ※エンタープライズのプランを契約済みの方は、アカウント発行を弊社側で行います。<br />
          こちらのフォームでの登録は不要です。
        </p>
        <p>
          Chatwork、もしくはお問い合わせフォームで弊社担当までお問い合わせください。
        </p>
        <v-btn size="x-large" variant="outlined">お問い合わせ</v-btn>
      </div>
    </v-row>
    <v-row class="justify-center" v-if="registerType === '1'">
      <v-form ref="form" @submit="register">
        <div class="w-100 text-center mb-5">
          <h3>まずは以下の情報を入力してください。</h3>
        </div>
        <div class="board">
          <p>
            ※エンタープライズのプランを契約済みの方は、アカウント発行を弊社側で行います。
          </p>
          <p>
            こちらのフォームでの登録は不要です。Chatworkや弊社担当までお問い合わせください。
          </p>
        </div>
        <div class="w-100 mb-10 text-center">
          <a href="">その他のプラン・料金について</a>
        </div>
        <v-text-field
          type="email"
          v-model="email"
          :rules="emailRule"
          variant="outlined"
          placeholder="例：delmo@mail.com"
          class="w-100 rounded"
        >
          <template v-slot:label>
            <label>メールアドレス<span>必須</span></label>
          </template>
        </v-text-field>
        <v-text-field
          :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="passwordVisible ? 'text' : 'password'"
          v-model="password"
          :rules="passwordRule"
          variant="outlined"
          @click:append-inner="passwordVisible = !passwordVisible"
          hint="※半角英数字、小文字、大文字をそれぞれ含む8文字以上の組み合わせ"
          class="w-100 rounded"
        >
          <template v-slot:label>
            <label>パスワード<span>必須</span></label>
          </template>
        </v-text-field>
        <div class="flex-fill input-group">
          <label>会員種別<span>必須</span></label>
          <v-radio-group v-model="member" inline>
            <v-radio label="個人" value="1"></v-radio>
            <v-radio label="法人" value="2"></v-radio>
          </v-radio-group>
        </div>
        <v-text-field
          v-if="member === '2'"
          type="text"
          v-model="company"
          :rules="[(v) => !!v || '法人名を入力する必要があります。']"
          variant="outlined"
          placeholder="例：マキヤマブラザーズ株式会社"
          class="w-100 rounded"
        >
          <template v-slot:label>
            <label>法人名<span>必須</span></label>
          </template>
        </v-text-field>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              type="text"
              v-model="name1.first"
              :rules="nameRule1"
              variant="outlined"
              placeholder="例：田中"
              class="rounded"
            >
              <template v-slot:label>
                <label>(姓)<span>必須</span></label>
              </template>
            </v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              type="text"
              v-model="name1.last"
              variant="outlined"
              :rules="nameRule1"
              placeholder="例：太郎"
              class="rounded"
            >
              <template v-slot:label>
                <label>(名)<span>必須</span></label>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-text-field
            type="text"
            v-model="name2.first"
            variant="outlined"
            :rules="nameRule2"
            placeholder="例：タナカ"
            class="rounded w-50 px-3"
          >
            <template v-slot:label>
              <label>(セイ)<span>必須</span></label>
            </template>
          </v-text-field>
          <v-text-field
            type="text"
            v-model="name2.last"
            :rules="nameRule2"
            variant="outlined"
            placeholder="例：タロウ"
            class="rounded w-50 px-3"
          >
            <template v-slot:label>
              <label>(メイ)<span>必須</span></label>
            </template>
          </v-text-field>
        </v-row>
        <v-text-field
          type="text"
          v-model="code"
          variant="outlined"
          class="rounded"
        >
          <template v-slot:label>
            <label>キャンペーンコード<span class="ignore">任意</span></label>
          </template>
        </v-text-field>
        <v-row class="justify-center">
          <v-checkbox
            v-model="agree"
            :rules="[(v) => !!v || '続行するには同意する必要があります。']"
            label="利用規約とプライバシーポリシーに同意する"
          ></v-checkbox>
        </v-row>
        <v-row class="justify-center">
          <v-btn type="submit" color="indigo" size="x-large">確認画面へ</v-btn>
        </v-row>
      </v-form>
    </v-row>
  </v-container>
  <v-dialog v-model="dialog" max-width="400">
    <v-card :color="dlgColor">
      <v-card-text>{{ msg }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="閉じる" @click="dialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";

const registerType = ref("0");
const email = ref();
const password = ref();
const member = ref("1");
const company = ref();
const name1 = ref({ first: "田中", last: "太郎" });
const name2 = ref({ first: "タナカ", last: "タロウ" });
const code = ref();
const agree = ref(false);
const passwordVisible = ref(false);

const form: any = ref();

const dialog = ref(false);
const dlgColor = ref("green-accent-2");
const msg = ref();

const emailRule = [
  (value: string) => {
    if (!value) return "メールアドレスを入力する必要があります。";
    else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
      return true;
    return "入力したメールアドレスが間違っています。";
  },
];

const passwordRule = [
  (value: string) => {
    if (!value) return "パスワードを入力する必要があります。";
    else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value))
      return true;
    return "半角英数字、小文字、大文字をそれぞれ含む8文字以上の組み合わせ。";
  },
];

const nameRule1 = [
  (value: string) => {
    if (!value) return "必須項目です。";
    else if (/^[\u4E00-\u9FFF\u3400-\u4DBF]+$/.test(value)) return true;
    return "正しい文字を入力してください。";
  },
];

const nameRule2 = [
  (value: string) => {
    if (!value) return "必須項目です。";
    else if (/^[\u30A0-\u30FF]+$/.test(value)) return true;
    return "正しい文字を入力してください。";
  },
];

const register = (e: Event) => {
  e.preventDefault();

  if (form.value && !form.value.isValid) {
    return;
  }

  const payload = {
    email: email.value,
    password: password.value,
    member: member.value,
    company: company.value,
    name1: name1.value,
    name2: name2.value,
    code: code.value,
  };

  axios
    .post("/api/v1/register", payload)
    .then((res) => {
      msg.value = res.data.message;
      dialog.value = true;
      dlgColor.value = "success";
    })
    .catch((err) => {
      const code = err.response.status;
      if (code === 404) msg.value = "サーバーAPIに接続できません。";
      else msg.value = err.response.data.message;
      dlgColor.value = "error";
      dialog.value = true;
      console.log(err);
    });
};
</script>

<style lang="scss" scoped>
.register {
  padding: 50px 0;
  font-weight: 200;
  font-size: 1rem;

  h2,
  h3 {
    font-weight: 600;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }

  .v-text-field,
  .input-group {
    max-width: 800px;
    margin-bottom: 20px;

    label {
      font-size: 1rem;
      font-weight: bold;

      span {
        color: white;
        background-color: rgb(48, 48, 73);
        font-size: 0.7rem;
        font-weight: 100;
        padding: 2px 10px 2px 10px;
        margin-top: 5px;
        margin-left: 10px;
        height: 30px;
        line-height: 1;
        border-radius: 4px;
      }
      span.ignore {
        color: black;
        background-color: rgb(184, 181, 181);
      }
    }

    span {
      font-size: 0.8rem;
      font-weight: 100;
    }

    input {
      height: 48px;
      border: 0.5px solid rgb(173, 173, 173);
      padding-left: 10px;
      outline: none;
    }
  }

  .board {
    display: block;
    margin-bottom: 20px;
    max-width: 800px;
    padding: 20px 0;
    width: 100%;
    text-align: center;
    background-color: rgb(242 240 233);
    color: #af8c58;
    align-items: center;

    h3 {
      font-weight: 400;
      margin-bottom: 10px;
    }

    p {
      display: block;
      font-size: 0.95rem;
      font-weight: 300;
      line-height: 2;
    }

    button {
      margin-top: 20px;
      background-color: white;
    }
  }
}
</style>
