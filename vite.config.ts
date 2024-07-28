import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      includeAssets: ["icon.ico"],
      workbox: {
        globIgnores: ["**/index.html"],
        globPatterns: ["**/*.{js,wasm,css,html,svg}"],
        dontCacheBustURLsMatching: /-[a-zA-Z0-9]{8}\./,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
