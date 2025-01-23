import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import FullReload from "vite-plugin-full-reload";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte({}), FullReload("src/**")],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'eo-calendar.js' // Personaliza el nombre del archivo de salida aquí
      }
    }
  }
})
