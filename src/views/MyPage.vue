<template>
  <v-container class="mypage">
    <v-row class="child-flex">
      <v-col cols="12" md="3">
        <v-list class="menu">
          <v-list-item
            v-for="item in menuItems"
            :key="item.id"
            :link="true"
            @click="currentPage = item.id"
          >
            <v-list-item-title
              :class="item.id === currentPage ? 'font-weight-bold' : ''"
            >
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col class="pt-10" cols="12" md="9">
        <v-row class="page" v-if="currentPage === 0">
          <h2 class="font-weight-bold mb-10">現在のプラン</h2>
          <div class="w-100 d-flex justify-md-space-between flex-wrap">
            <span class="font-weight-bold">プラン</span>
            <span>無料会員</span>
            <v-btn
              @click="
                () => {
                  $router.push('/price-new');
                }
              "
              variant="outlined"
            >
              定額プランの詳細を見る
            </v-btn>
          </div>
        </v-row>

        <v-row class="page" v-if="currentPage === 1">
          <h2 class="font-weight-bold mb-10">お気に入り動画</h2>
          <div class="w-100 d-flex justify-md-space-between flex-wrap">
            <v-row class="d-flex flex-fill">
              <v-col
                v-for="item in favouriteItmes"
                :key="item.id"
                class="d-flex child-flex"
                sm="3"
                cols="6"
              >
                <a :href="`/creative/${item.id}`">
                  <video
                    :src="
                      '/api/v1/list/creative/' +
                      watermark +
                      '/' +
                      item.file?.filename +
                      '/' +
                      item.file?.mimetype.split('/')[1]
                    "
                    controls
                    width="230"
                    height="380"
                  ></video>
                </a>
              </v-col>
            </v-row>
          </div>
        </v-row>

        <v-row class="page" v-if="currentPage === 2">
          <h2 class="font-weight-bold mb-10">DL済み素材</h2>
          <div class="w-100 d-flex justify-md-space-between flex-wrap">
            <v-row class="d-flex flex-fill">
              <v-col
                v-for="item in downloadItems"
                :key="item.id"
                class="d-flex child-flex"
                sm="3"
                cols="6"
              >
                <a :href="`/creative/${item.id}`">
                  <video
                    :src="
                      '/api/v1/list/creative/' +
                      watermark +
                      '/' +
                      item.file?.filename +
                      '/' +
                      item.file?.mimetype.split('/')[1]
                    "
                    controls
                    width="230"
                    height="380"
                  ></video>
                </a>
              </v-col>
            </v-row>
          </div>
        </v-row>

        <v-row class="page" align-content="center" v-if="currentPage === 3">
          <div class="mx-auto userinfo">
            <h2 class="font-weight-bold text-center">確認画面</h2>
            <div class="d-sm-flex flex-wrap justify-center">
              <v-col class="font-weight-bold" xs="12" sm="6">
                メールアドレス
              </v-col>
              <v-col xs="12" sm="6">{{ currentUser.email }}</v-col>
              <v-col class="font-weight-bold" xs="12" sm="6">パスワード</v-col>
              <v-col xs="12" sm="6">**********</v-col>
              <v-col class="font-weight-bold" xs="12" sm="6">会員種別</v-col>
              <v-col xs="12" sm="6">
                {{
                  (currentUser.member == 1 && "個人") ||
                  (currentUser.member == 2 && "法人")
                }}
              </v-col>
              <v-col class="font-weight-bold" xs="12" sm="6">お名前</v-col>
              <v-col xs="12" sm="6">
                {{ currentUser.name1.first + currentUser.name1.last }}
              </v-col>
              <v-col class="font-weight-bold" xs="12" sm="6">
                お名前（カナ）
              </v-col>
              <v-col xs="12" sm="6">
                {{ currentUser.name2.first + currentUser.name2.last }}
              </v-col>
              <v-btn
                @click="currentPage = 5"
                class="float-center mt-5"
                color="indigo"
                size="x-large"
              >
                修正する
              </v-btn>
            </div>
          </div>
        </v-row>

        <v-row
          class="page"
          align-content="center"
          v-if="currentPage === 4"
          style="overflow: auto"
        >
          <h2 class="font-weight-bold text-center">支払い履歴</h2>
          <v-data-table-server
            v-model:items-per-page="itemsPerPage"
            :headers="headers"
            :items="membershipItems"
            :items-length="totalItems"
            item-value="name"
            :loading="loading"
            @update:options="loadItems"
            no-data-text="データがありません。"
            items-per-page-text="ページごとの項目"
            class="elevation-1"
          >
            <template v-slot:[`item.actions`]>
              <v-btn variant="outlined" color="indigo" size="small">
                領収書
              </v-btn>
            </template>
          </v-data-table-server>
        </v-row>

        <v-row class="page" align-content="center" v-if="currentPage === 5">
          <div class="mx-auto userinfo">
            <h2 class="font-weight-bold text-center">情報変更</h2>
            <div class="d-sm-flex flex-wrap justify-center mt-10">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    type="text"
                    v-model="currentUser.name1.first"
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
                    v-model="currentUser.name1.last"
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
            </div>
            <div class="d-sm-flex flex-wrap justify-center mt-5">
              <v-row>
                <v-text-field
                  type="text"
                  v-model="currentUser.name2.first"
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
                  v-model="currentUser.name2.last"
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
            </div>
            <div class="d-sm-flex flex-wrap justify-center mt-5">
              <v-btn
                @click="updateUserInfo"
                class="float-center mt-5"
                color="indigo"
                size="x-large"
              >
                修正する
              </v-btn>
            </div>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <template>
    <v-snackbar
      style="position: absolute; top: 70px; right: 10px"
      v-model="showSnackbar"
      :timeout="1500"
      location="top right"
      color="success"
      min-height="30"
      min-width="100"
    >
      ユーザー情報が更新されました。
    </v-snackbar>
  </template>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { DataTableHeader, MembershipItem } from "@/services/Interfaces";
import api from "@/services/api";

const currentUser = ref({} as any);

const showSnackbar = ref(false);

const favouriteItmes = ref([] as any[]);
const downloadItems = ref([] as any[]);

const loading = ref(true);
const membershipItems = ref([] as MembershipItem[]);
const totalItems = ref(0);

onBeforeMount(() => {
  api.get("/api/v1/list/get-current-user").then((res) => {
    currentUser.value = res.data;
  });

  api.get("/api/v1/list/get-favourite-items").then((res) => {
    favouriteItmes.value = res.data;
  });

  api.get("/api/v1/list/get-download-items").then((res) => {
    downloadItems.value = res.data;
  });
});

const updateUserInfo = () => {
  api.post("/api/v1/list/update-user", currentUser.value)

  currentPage.value = 3;
  showSnackbar.value = true;
};

const currentPage = ref(0);

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

const loadItems = ({ page, itemsPerPage, sortBy }: any) => {
  loading.value = true;
  api
    .get("/api/v1/list/get-all-membership-history-pagenation", {
      params: { page, itemsPerPage, sortBy },
    })
    .then((res) => {
      const data = res.data;
      membershipItems.value = data.items;
      loading.value = data.value;
      totalItems.value = data.total;
    })
    .catch((error) => {
      console.log(error);
    });
};

const menuItems = [
  {
    id: 0,
    title: "プランの確認・変更",
  },
  {
    id: 1,
    title: "お気に入り動画",
  },
  {
    id: 2,
    title: "DL済み素材",
  },
  {
    id: 3,
    title: "登録情報の確認・変更",
  },
  {
    id: 4,
    title: "支払い履歴",
  },
];

const itemsPerPage = ref(5);
const watermark = "watermark";
const headers = [
  { title: "金額", align: "center", sortable: true, key: "membership" },
  { title: "開始日", align: "center", sortable: true, key: "membership_start" },
  { title: "満了日", align: "center", sortable: true, key: "membership_end" },
] as DataTableHeader[];
</script>

<style lang="scss" scoped>
$md: 960px;
.mypage {
  .menu {
    padding-top: 20px;
    display: flex;
    background-color: transparent;

    a {
      font-size: 1.2rem;
      text-decoration: none;
      color: black;
      line-height: 4rem;
    }

    @media (min-width: $md) {
      border-right: 1px solid rgb(216, 216, 216);
      height: 100vh;
      display: block;
    }
  }

  .page {
    .userinfo {
      max-width: 450px;
      width: 100%;
    }

    @media (min-width: $md) {
      padding: 20px;
      line-height: 4rem;
    }
  }
  .v-table {
    min-width: 600px !important;
  }
}
</style>
