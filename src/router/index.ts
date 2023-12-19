import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore, useAlertStore } from "@/stores";
import accountRoutes from "./account.routes";
import usersRoutes from "./users.routes";
import adminRoutes from "./admin.routes";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: { requiresAuth: false },
      },
      ...accountRoutes,
      ...usersRoutes,
      ...adminRoutes,
      { path: "/:pathMatch(.*)*", redirect: "/" },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: "active",
  routes,
});

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ["/", "/register"];
  // const authRequired = !publicPages.includes(to.path);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const authStore = useAuthStore();

  if (requiresAuth && !authStore.user) {
    authStore.returnUrl = to.fullPath;
    return "/";
  }
});

export default router;
