import type { PluginOption } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export function autoImport(plugins: PluginOption[]) {
  plugins.push(
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: ['vue', 'vue-router'],
      dts: 'types/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: true }
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'types/components.d.ts'
    })
  )
}
