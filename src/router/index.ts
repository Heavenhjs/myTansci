import { createRouter, createWebHistory} from "vue-router";

// 路由模块分类
import layout from "./layout";
import menu from "./menu";

const router = createRouter({
  history: createWebHistory(),
  routes: [...layout, ...menu],
});
export default router;
