import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => ({
  // 生产构建部署到 GitHub Pages 的 /task-hub/ 子路径；本地开发保持根路径
  base: mode === 'production' ? '/task-hub/' : '/',
  plugins: [
    vue(),
    tailwindcss(), // 激活 Tailwind v4 引擎
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rolldownOptions: {
      output: {
        // 将框架相关库拆成独立 chunk，利用浏览器长缓存
        codeSplitting: {
          groups: [
            { name: 'vue-vendor', test: /node_modules[\\/](vue|vue-router|pinia|@vue)[\\/]/ }
          ]
        }
      }
    }
  }
}))