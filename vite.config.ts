import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.ico", "impostor.svg"],
      manifest: {
        name: "Impostor Online Game",
        short_name: "Impostor",
        description: "Impostor Online Game",
        theme_color: "#ffffff",
        icons: [
          {
            src: "impostor.svg",
            sizes: "48x48 72x72 96x96 128x128 192x192 256x256 512x512",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
