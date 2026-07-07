import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.ts'
import NutUI from '@nutui/nutui'
import '@nutui/nutui/dist/style.css'
import API from '@/api/index.ts'

const app = createApp(App)

app.config.globalProperties.$API = API

app.use(NutUI)
app.use(router)
app.mount('#app')
