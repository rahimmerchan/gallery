import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8081'
    }
  },
  plugins: [react()],
})
