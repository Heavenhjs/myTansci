import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
//element plus 自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// TSX配置
import vueJsx from "@vitejs/plugin-vue-jsx"
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      //将src的别名设置为@
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    //服务器主机名
    port: 5174,
    open: true,
    hmr: {
      host: "127.0.0.1",
      port: 5174,
    },
    // 代理跨域（mock 不需要配置跨域，直接能访问）
    proxy: {
      "/api": {
        // 目标地址(easymock:https://mock.mengxuegu.com/mock/6359dad78c51366598ff4b1c)
        // 备用地址(fastmock:https://www.fastmock.site/mock/661e5fcc775d88185f2191085b5384c4)
        target: "https://mock.mengxuegu.com/mock/6359dad78c51366598ff4b1c",
        changeOrigin: true,
        // 将/api去掉
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
      "/findIp": {
        target: "http://pv.sohu.com/cityjson?ie=utf-8",
        changeOrigin: true,
        // 将/findIp截取掉
        rewrite: (path: string) => path.replace(/^\/findIp/, ""),
      },
      "/getWeather": {
        target: "https://api.map.baidu.com",
        changeOrigin: true,
        // 将/getWeather去掉
        rewrite: (path: string) => path.replace(/^\/getWeather/, ""),
      },
    },
  },
});
