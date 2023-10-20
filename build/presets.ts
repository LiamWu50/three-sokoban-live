import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react-swc';
// rollup打包分析插件
import { visualizer } from 'rollup-plugin-visualizer'
import glsl from 'vite-plugin-glsl'

export default (env, isBuild) => {
  const plugins = [react(), eslintPlugin(), glsl()]

  if (isBuild) {
    plugins.push(
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true
      })
    )
  }

  return plugins
}
