export default [
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "主页",
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import("@/pages/Home.vue"),
  },
  {
    path: "/console",
    name: "Console",
    meta: {
      title: "工作台",
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import("@/pages/menu/console.vue"),
  },
  {
    path: "/infoman",
    name: "InfoMan",
    meta: {
      title: "消息管理",
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import("@/pages/menu/infoMan.vue"),
  },
  {
    path: "/userlist",
    name: "",
    meta: {
      title: "用户列表",
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import("@/pages/menu/system/userList.vue"),
  },
  {
    path: "/menuman",
    name: "menuMan",
    meta: {
      title: "菜单管理",
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import("@/pages/menu/system/menuMan.vue"),
  },
  {
    path: "/userman",
    name: "userMan",
    meta: {
      title: "角色管理",
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import("@/pages/menu/system/userMan.vue"),
  },
  {
    path: "/taskman",
    name: "taskMan",
    meta: {
      title: "任务管理",
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import("@/pages/menu/taskMan.vue"),
  },
  {
    path: "/sysydoc",
    name: "apiDoc",
    meta: {
      title: "API文档",
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import("@/pages/menu/sysDoc.vue"),
  },
];
