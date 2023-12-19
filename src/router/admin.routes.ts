export default [
  {
    path: "admin/users",
    name: "Admin_user",
    component: () => import("@/views/admin/Users.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "admin/categories",
    name: "Admin_categories",
    component: () => import("@/views/admin/Categories.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "admin/creatives",
    name: "Admin_creatives",
    component: () => import("@/views/admin/Creatives.vue"),
    meta: { requiresAuth: true },
  },
];
