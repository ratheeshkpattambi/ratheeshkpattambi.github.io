import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Set the source directory
  base: './', // Ensures relative paths for assets
  build: {
    outDir: '../', // Output files directly into `tools/video-resize`
    emptyOutDir: false, // Clean the folder before building
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});