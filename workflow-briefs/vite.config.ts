import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

export default defineConfig({
  plugins: [
    vue(),
    ui({
      colorMode: false, // stop auto-registering useDark
      ui: {
        colors: {
          neutral: 'neutral' // true black/gray, no blue tint
        }
      }
    })
  ]
})