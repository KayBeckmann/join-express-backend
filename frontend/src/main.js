import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Pinia Store initialisieren
const pinia = createPinia()

// Vue App erstellen
const app = createApp(App)

// Plugins registrieren
app.use(pinia)
app.use(router)

// Mounten
app.mount('#app')

// Service Worker für PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}