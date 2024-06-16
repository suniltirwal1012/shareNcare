import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://main--mellow-travesseiro-e69fb6.netlify.app', // Proxy requests with /api to http://localhost:8000
    },
  },
  plugins: [react()],
})
