import path from 'path'
import { defineConfig, loadEnv } from 'vite'

import presets from './build/presets'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'
  const env = loadEnv(mode, process.cwd(), '')

  return {
    base: './',
    plugins: [presets(env, isBuild)],
    resolve: {
      // 设置别名
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    assetsInclude: ['**/*.gltf'],
    server: {
      host: '0.0.0.0', // 主机名
      port: 5177, // 端口
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      // 接口代理
      proxy: {
        '/api': {
          // 本地 8000 前端代码的接口 代理到 8888 的服务端口
          target: 'http://localhost:8888/',
          changeOrigin: true, // 允许跨域
          rewrite: (path) => path.replace('/api/', '/')
        }
      }
    },
    build: {
      sourcemap: true,
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 在生产环境移除console.log
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      assetsDir: 'static/assets',
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
