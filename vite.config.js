const { defineConfig } = require("vite");

module.exports = defineConfig({
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
