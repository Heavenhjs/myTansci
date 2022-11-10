export default [
    {
      path: "/console",
      name: "Console",
      meta: {
        title: "工作台",
        keepAlive: true,
        requireAuth: false,
      },
      component: () => import("@/pages/system/console.vue"),
    },
    {
        path: "/infoman",
        name: "InfoMan",
        meta: {
          title: "消息管理",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/infoMan.vue"),
      },
      {
        path: "/userlist",
        name: "",
        meta: {
          title: "用户列表",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/userList.vue"),
      },
      {
        path: "/menuman",
        name: "menuMan",
        meta: {
          title: "菜单管理",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/menuMan.vue"),
      },
      {
        path: "/userman",
        name: "userMan",
        meta: {
          title: "角色管理",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/userMan.vue"),
      },
      {
        path: "/taskman",
        name: "taskMan",
        meta: {
          title: "角色管理",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/taskMan.vue"),
      },
      {
        path: "/sysydoc",
        name: "apiDoc",
        meta: {
          title: "API文档",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/sysDoc.vue"),
      },
  ];