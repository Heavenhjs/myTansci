import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import * as ELementPluseIconsVue from '@element-plus/icons-vue';
import 'element-plus/theme-chalk/el-message.css';
// 解决element-plus自动引入后ElLoading、ElMessage、ElNotification、ElMessageBox样式丢失的问题
import "element-plus/dist/index.css";
// 配置多语言
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

//创建vue实例
const app = createApp(App);
//挂载pinia
app.use(store);
//挂载router
app.use(router);

//挂载实例
app.mount("#app");
//
app.use(ElementPlus, {
    locale: zhCn,
  })

for (const[key, component] of Object.entries(ELementPluseIconsVue)){
    app.component(key, component);
}