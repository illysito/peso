import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

// vite.config.js
export default defineConfig({
  base: './',
  plugins: [eslintPlugin({ cache: false })],
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  build: {
    minify: true,
    manifest: true,
    /*
    rollupOptions: {
      input: './src/main.js',
      output: {
        format: 'umd',
        entryFileNames: 'main.js',
        esModule: false,
        compact: true,
        globals: {
          jquery: '$',
        },
      },
      external: ['jquery'],
    },
  */
    rollupOptions: {
      input: './src/main.js',
      external: ['jquery'],
      output: {
        format: 'es', // ✅ critical
        entryFileNames: 'main.js', // stable entry URL
        chunkFileNames: 'chunks/[name]-[hash].js', // ✅ chunks here
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
