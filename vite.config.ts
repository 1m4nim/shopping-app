import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase", // クラス名を camelCase に変換する設定
    },
  },
  server: {
    hmr: {
      protocol: "ws", // WebSocketのプロトコル設定
      host: "localhost", // ローカルホストの設定
      port: 5173, // 使用するポート番号
    },
  },
});
