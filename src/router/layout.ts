export default [
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import("@/pages/login.vue"),
  },
  {
    path: "/",
    name: "Index",
    meta: {
      title: "首页",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("@/pages/Index.vue"),
  },
  {
    path: "/vueUse",
    name: "vueUse",
    meta: {
      title: "vueUse",
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import("@/pages/vueUse.vue"),
  },
  {
    path: "/main",
    name: "main",
    meta: { title: "首页" },
    component: () => import("@/pages/Layout.vue"),
    // children: [{
    //     path: "/main",
    //     name: "main",
    //     meta: { title: "首页" },
    //     component: () => import('@/views/common/Main.vue')
    // }]
  },
];
