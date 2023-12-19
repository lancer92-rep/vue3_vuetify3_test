export const headerNavs = [
  {
    title: "新着",
    role: ["none","user", "admin"],
    url: "/search",
    icon: "mdi-folder-play-outline",
    query: "new-videos"
  },
  {
    title: "管理ページ",
    url: "",
    role: ["admin"],
    icon: "mdi-cog",
    submenu: [
      {
        title: "ユーザーリスト",
        url: "/admin/users",
        role: "",
      },
      {
        title: "カテゴリ",
        url: "/admin/categories",
        role: "",
      },
      {
        title: "クリエイティブ",
        url: "/admin/creatives",
        role: "",
      },
    ]
  },
  {
    title: "マイページ",
    url: "/mypage",
    role: ["user", "admin"],
    icon: "mdi-account",
  },
  {
    title: "新規登録",
    url: "/register",
    role: ["none"],
    icon: "mdi-account-plus",
  },
];

export const footerNavs = [
  {
    title: "利用規約",
    url: "",
    role: ["none","user", "admin"],
    icon: "",
  },
  {
    title: "特定商取引法",
    url: "",
    role: ["none","user", "admin"],
    icon: "",
  },
  {
    title: "プライバシーポリシー",
    url: "/register",
    role: ["none","user", "admin"],
    icon: "",
  },
  {
    title: "お問い合わせ",
    url: "",
    role: ["none","user", "admin"],
    icon: "",
  },
];
