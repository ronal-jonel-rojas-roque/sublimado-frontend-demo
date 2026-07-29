import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // Si está en producción usa la URL de GitHub, si está en desarrollo local usa '/'
  base: command === 'serve' ? '/' : 'https://ronal-jonel-rojas-roque.github.io/sublimado-frontend-demo/',
}))