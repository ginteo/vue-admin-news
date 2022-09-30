import type { App } from 'vue'
import { setupTailwindcss } from './tailwindcss'

export function setupPlugins(app: App) {
  console.log(app)
  setupTailwindcss()
}
