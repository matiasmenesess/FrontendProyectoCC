import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/dev/*': {
        target: 'https://6bk8qafhu6.execute-api.us-east-1.amazonaws.com',  // API común para todos
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/dev/, ''),  // Elimina '/dev' de todas las rutas
      },
    },
  },
})
