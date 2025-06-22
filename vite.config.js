import { defineConfig } from 'vite'
import StimulusHMR from 'vite-plugin-stimulus-hmr'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    StimulusHMR(),
    tailwindcss(),
  ],
  preview: {
    open: true,
  },
  server: {
    open: true,
  },
})
