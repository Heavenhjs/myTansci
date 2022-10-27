import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
//element plus 自动导入
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

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
        target: "https://www.fastmock.site/mock/661e5fcc775d88185f2191085b5384c4",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
    },
  },
});
