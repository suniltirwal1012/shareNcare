import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   '/api': 'http://localhost:8000', // Proxy requests with http://localhost:8000/api to http://localhost:8000
    // },
  },
  plugins: [react()],
})
