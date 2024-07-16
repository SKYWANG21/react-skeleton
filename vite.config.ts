/*
 * @Author: SKYWANG21 614234058@qq.com
 * @Date: 2024-04-18 22:05:24
 * @LastEditors: SKYWANG21 614234058@qq.com
 * @LastEditTime: 2024-07-11 15:51:02
 * @FilePath: \react-skeleton\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    UnoCSS(),
    AutoImport({
      imports: ["react", "react-router-dom"],
      // dirs: ["./src/utils/*", './src/api/*'],
      dts: "typings/auto-imports.d.ts",
    }),
  ],
  server: {
    // 自动打开浏览器
    open: true,
    host: true,
    port: 8000,
    proxy: {},
  },
});
