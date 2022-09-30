import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const proxyTargetUrl =
    mode === 'development' ? env.VITE_DEV_BASE_URL : env.VITE_PROD_BASE_URL

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: proxyTargetUrl,
          changeOrigin: true,
          rewrite: path => path.replace(/\/api/, '')
        }
      }
    }
  }
})
