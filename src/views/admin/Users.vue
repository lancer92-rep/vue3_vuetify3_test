<template>
  <v-container class="mypage">
    <v-row class="page" align-content="center">
      <!-- ジャンル	金額	支払い日	残りのDL数	領収書 -->
      <h2 class="font-weight-bold text-center"></h2>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="userItems"
        :items-length="totalItems"
        :loading="loading"
        @update:options="loadItems"
        no-data-text="データがありません。"
        items-per-page-text="ページごとの項目"
        class="elevation-1"
      >
        <template v-slot:[`item.name1`]="{ item }">
          {{ userItems[item.index].name1.first }}
          {{ userItems[item.index].name1.last }}
        </template>
        <template v-slot:[`item.name2`]="{ item }">
          {{ userItems[item.index].name2.first }}
          {{ userItems[item.index].name2.last }}
        </template>
        <template v-slot:[`item.member`]="{ item }">
          {{ userItems[item.index].member === 1 ? "個人" : "法人" }}
        </template>
        <template v-slot:[`item.role`]="{ item }">
          {{ userItems[item.index].role ? "管理者" : "" }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn
            color="warning"
            size="small"
            v-if="userItems[item.index].state"
            @click="changeState(userItems[item.index].id, false)"
            >禁止</v-btn
          >
          <v-btn
            color="success"
            size="small"
            v-if="!userItems[item.index].state"
            @click="changeState(userItems[item.index].id, true)"
            >承認</v-btn
          >
          <v-btn
            color="error"
            size="small"
            class="ml-2"
            @click="[(userid = userItems[item.index].id), (showConfirm = true)]"
            >削除</v-btn
          >
        </template>
      </v-data-table-server>
    </v-row>
  </v-container>
  <v-dialog v-model="showConfirm" max-width="400">
    <v-card>
      <v-card-text>選択したユーザーを削除しますか？</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="はい" @click="removeUser()"></v-btn>
        <v-btn text="いいえ" @click="showConfirm = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { DataTableHeader, UserItem } from "@/services/Interfaces";
import api from "@/services/api";

const headers = [
  { title: "ID", align: "start", sortable: true, key: "id" },
  { title: "メールアドレス", align: "start", sortable: true, key: "email" },
  { title: "お名前", align: "end", sortable: true, key: "name1" },
  { title: "お名前（カナ）", align: "end", sortable: true, key: "name2" },
  { title: "個人/法人", align: "end", sortable: true, key: "member" },
  { title: "キャンペーンコード", align: "end", sortable: true, key: "code" },
  { title: "ロール", align: "end", sortable: true, key: "role" },
  { title: "法人名", align: "end", sortable: true, key: "company" },
  { title: "アクション", align: "end", sortable: false, key: "actions" },
] as DataTableHeader[];

const itemsPerPage = ref(10);
const totalItems = ref(10);
const loading = ref(true);
const userItems = ref([] as UserItem[]);

const showConfirm = ref(false);
const userid = ref();

const loadItems = ({ page, itemsPerPage, sortBy }: any) => {
  loading.value = true;
  api
    .get("/api/v1/manager/user", { params: { page, itemsPerPage, sortBy } })
    .then((res) => {
      const data = res.data;
      userItems.value = data.items;
      loading.value = data.value;
      totalItems.value = data.total;
    })
    .catch((error) => {
      console.log(error);
    });
};

const changeState = (id: any, state: any) => {
  api
    .put("/api/v1/manager/user", { id, state })
    .then((res) => {
      const { data } = res;
      userItems.value = userItems.value.map((item) => {
        if (item.id === data.id) {
          return { ...item, state: data.state };
        }
        return item;
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const removeUser = () => {
  showConfirm.value = false;
  api
    .delete("/api/v1/manager/user", { params: { id: userid.value } })
    .then((res) => {
      const { data } = res;
      userItems.value = userItems.value.filter((item) => item.id !== data.id);
    })
    .catch((error) => {
      console.log(error);
    });
};
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
    overflow: auto !important;

    @media (min-width: $md) {
      padding: 20px;
      line-height: 4rem;
    }
  }
  .v-table {
    min-width: 800px !important;
  }
}
</style>
