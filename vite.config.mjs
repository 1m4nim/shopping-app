// vite.config.mjs
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/firebase-storage": {
        target: "https://firebasestorage.googleapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/firebase-storage/, ""),
      },
    },
  },
});
