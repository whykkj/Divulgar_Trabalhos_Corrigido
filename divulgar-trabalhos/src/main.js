import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

document.addEventListener('error', (evento) => {
  const imagem = evento.target
  if (imagem instanceof HTMLImageElement && !imagem.dataset.fallback) {
    imagem.dataset.fallback = 'true'
    imagem.src = `${import.meta.env.BASE_URL}perfil-placeholder.svg`
  }
}, true)

createApp(App)
  .use(router)
  .mount('#app')
