import type { App } from 'vue'
import { setupElementPlusIcon } from './icon'
import { setupTailwindcss } from './tailwindcss'

export function setupPlugins(app: App) {
  setupTailwindcss()
  setupElementPlusIcon(app)
}
