import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setupPlugins } from './plugins'
import { useLoginStore } from './store'

import '@/assets/styles/main.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'

const app = createApp(App)

app.use(createPinia())
const loginStore = useLoginStore()
loginStore.setupLocal()

app.use(router)
setupPlugins(app)

app.mount('#app')
