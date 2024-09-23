import path from "path";

import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";

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
    // 同步tsconfig.json的path设置alias
    // tsconfigPaths(),
  ],
  server: {
    // 自动打开浏览器
    open: true,
    host: true,
    port: 8000,
    proxy: {},
  },
});
