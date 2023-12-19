export default [
  {
    path: "creators",
    name: "Creators",
    component: () => import("@/views/Creators.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "creators/:creatorid/creatives/",
    name: "CreativeByCreator",
    component: () => import("@/views/CreativeByCreator.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "categories/:category/tags",
    name: "Tags",
    component: () => import("@/views/Tags.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "tags/:tagid/creatives",
    name: "CreativeByTag",
    component: () => import("@/views/CreativeByTag.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "creative/:creativeid",
    name: "Creative",
    component: () => import("@/views/Creative.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "search",
    name: "Search",
    component: () => import("@/views/Search.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "price-new",
    name: "Price",
    component: () => import("@/views/Price.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "payment",
    name: "Payment",
    component: () => import("@/views/Payment.vue"),
    meta: { requiresAuth: false },
  }
];
