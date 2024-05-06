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
});
