import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import UnoCSS from "unocss/vite";
// import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  plugins: [react()],
})