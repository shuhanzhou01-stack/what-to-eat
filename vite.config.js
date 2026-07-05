import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Ignore heavy or locked asset files (fonts, large svgs) to avoid EBUSY on Windows
      ignored: ['**/src/assets/fonts/**', '**/node_modules/**'],
    },
  },
})
