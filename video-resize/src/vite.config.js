import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Set the source directory
  build: {
    outDir: '../', // Output files directly into `tools/video-resize`
    emptyOutDir: true, // Clean the folder before building
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});