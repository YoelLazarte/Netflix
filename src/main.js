import { createApp } from 'vue'
import './main.css' // Usamos nuestro archivo principal de Tailwind
import App from './App.vue'
import router from './router/router' // 1. Importamos nuestra configuración del router

const app = createApp(App)

app.use(router) // 2. Le decimos a la app de Vue que use el router

app.mount('#app')
