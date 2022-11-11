import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import * as ELementPluseIconsVue from '@element-plus/icons-vue';
import 'element-plus/theme-chalk/el-message.css';
//创建vue实例
const app = createApp(App);
//挂载pinia
app.use(store);
//挂载router
app.use(router);

//挂载实例
app.mount("#app");

for (const[key, component] of Object.entries(ELementPluseIconsVue)){
    app.component(key, component);
}