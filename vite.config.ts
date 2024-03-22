import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const viteConfig = defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  console.log(env.VITE_API_URL, 'VITE_API_URL')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      port: env.VITE_PORT as unknown as number,
      proxy: {
        '/api': {
          target: 'http://localhost:9090/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    base: process.env.NODE_ENV === 'production' ? '/scan-mobile/' : '/',
    build: {
      outDir: 'docs'
    }
  }
})
export default viteConfig
