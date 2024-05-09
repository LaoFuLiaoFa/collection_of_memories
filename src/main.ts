import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 样式相关
import 'normalize.css'
import '@/assets/index.less'
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
