import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,         // now test, expect, etc. are true globals
    environment: 'jsdom',  // for React Testing Library
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}']
  }
})
