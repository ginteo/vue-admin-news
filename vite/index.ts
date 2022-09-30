import type { PluginOption } from 'vite'
import { autoImport } from './autoimport'

export function setupVitePlugins() {
  const plugins: PluginOption[] = []

  autoImport(plugins)

  return plugins
}
