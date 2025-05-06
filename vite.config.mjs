import Inspect from 'vite-plugin-inspect'
export default {
  build: {
    lib: {
      entry: {
        index: "src/index.ts",
        runtime: "src/runtime/entry.ts",
      },
      name: "VitePluginImmersiveTranslate",
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [Inspect()],
};