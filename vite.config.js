import { defineConfig } from 'vite'
import StimulusHMR from 'vite-plugin-stimulus-hmr'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { readdirSync, statSync } from 'fs'

function getHtmlEntries(dir) {
  let results = []
  for (const file of readdirSync(dir)) {
    const fullPath = path.join(dir, file)
    if (statSync(fullPath).isDirectory()) {
      results = results.concat(getHtmlEntries(fullPath))
    } else if (file.endsWith('.html')) {
      results.push(fullPath)
    }
  }
  return results
}

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
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...getHtmlEntries(path.resolve(__dirname, 'pages')).reduce((acc, file) => {
          const name = path.basename(file, '.html')
          acc[name] = path.resolve(__dirname, file)
          return acc
        }, {})
      },
    },
  },
})
