import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ecological-constellation/',
  build: {
    outDir: 'docs',
    emptyOutDir: true
  }
})