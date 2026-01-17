import path from "path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".scss", ".sass", ".css"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Silence deprecation warnings
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  build: {
    target: "esnext",
    outDir: "dist",
  },
  base: "/nexis-proj/",
  server: {
    port: 3000,
    open: true,
  },
});
