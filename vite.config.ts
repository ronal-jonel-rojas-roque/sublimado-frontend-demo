/* import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react(), tailwindcss(),
    visualizer({
      open: true,
      gzipSize: true,
      filename: "stats.html",
    }),],
  base:'https://ronal-jonel-rojas-roque.github.io/sublimado-frontend-demo/',
}) */

  // vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from "rollup-plugin-visualizer";
export default defineConfig({
   plugins: [react(), tailwindcss(),
    visualizer({
      open: true,
      gzipSize: true,
      filename: "stats.html",
    }),],
  base:'https://ronal-jonel-rojas-roque.github.io/sublimado-frontend-demo/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Separa Three.js y Fiber
            if (id.includes('three') || id.includes('@react-three')) {
              return 'engine-3d';
            }
            // Separa Framer Motion
            if (id.includes('framer-motion') || id.includes('motion-dom')) {
              return 'engine-motion';
            }
            // CAPTURA DE ÍCONOS: Aísla lucide-animated y lucide-react
            if (id.includes('lucide-animated') || id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // Separa librerías base de React
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            return 'vendor-core';
          }
        },
      },
    },
  },
});