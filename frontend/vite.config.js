import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   '/api': 'https://mern-fullstack-72ou.onrender.com', // Proxy requests with https://mern-fullstack-72ou.onrender.com/api to http://localhost:8000
    // },
  },
  plugins: [react()],
})
