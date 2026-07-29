import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  base:'https://ronal-jonel-rojas-roque.github.io/sublimado-frontend-demo/',
})