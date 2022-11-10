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
        path: "/infoMan",
        name: "InfoMan",
        meta: {
          title: "消息管理",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/infoMan.vue"),
      },
      {
        path: "/userList",
        name: "",
        meta: {
          title: "用户列表",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/userList.vue"),
      },
      {
        path: "/menuMan",
        name: "menuMan",
        meta: {
          title: "菜单管理",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/menuMan.vue"),
      },
      {
        path: "/userMan",
        name: "userMan",
        meta: {
          title: "角色管理",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/userMan.vue"),
      },
      {
        path: "/taskMan",
        name: "taskMan",
        meta: {
          title: "角色管理",
          keepAlive: true,
          requireAuth: false,
        },
        component: () => import("@/pages/system/taskMan.vue"),
      },
  ];