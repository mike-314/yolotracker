import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: "/", // Update this if deploying to a subdirectory
  resolve: {
    alias: {
      "@": "/src", // Optional, for cleaner imports
    },
  },
  build: {
    sourcemap: false,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
