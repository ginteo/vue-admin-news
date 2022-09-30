import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setupPlugins } from './plugins'

const app = createApp(App)

app.use(createPinia())
app.use(router)
setupPlugins(app)

app.mount('#app')
