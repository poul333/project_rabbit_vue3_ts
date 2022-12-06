import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// const path = require("path");
import { resolve } from "path";
// 组件name插件
import vueSetupExtend from "vite-plugin-vue-setup-extend";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueSetupExtend(),
  ],
  // 配置路径别名
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    // QQ三方登录的回调uri为：http://www.corho.com:8080/#/login/callback
    // vite 中配置： www.corho.com:8080
    host: "www.corho.com", // 主机地址
    open: true, // 自动打开浏览器
    port: 8080, // 端口号
    cors: true, // 允许开发时的 ajax 跨域
  },
  // 配置css全局注入
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@/assets/styles/variables.less";
          @import "@/assets/styles/mixins.less";
        `,
      },
    },
  },
});
