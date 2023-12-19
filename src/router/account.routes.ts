export default [
  {
    path: "register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "mypage",
    name: "MyPage",
    component: () => import("@/views/MyPage.vue"),
    meta: { requiresAuth: true },
  },
];
