import { createApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './router'
import { setupAuthInterceptor } from './services/authService'

const app = createApp(App)

setupAuthInterceptor()
setupRouter(app)

app.mount('#app')
