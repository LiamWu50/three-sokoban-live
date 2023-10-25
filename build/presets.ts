import eslintPlugin from '@nabla/vite-plugin-eslint';
// rollup打包分析插件
import { visualizer } from 'rollup-plugin-visualizer'
import glsl from 'vite-plugin-glsl'
import gltf from "vite-plugin-gltf";
import { draco } from "@gltf-transform/functions";

export default (env, isBuild) => {
  const plugins = [
    eslintPlugin(),
    glsl(),
    gltf({
      transforms: [draco()],
    }),
  ]

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
