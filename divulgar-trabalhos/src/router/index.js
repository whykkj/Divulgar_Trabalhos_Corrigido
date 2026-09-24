import { createRouter, createWebHistory } from 'vue-router'

import InicioView from '../views/InicioView.vue'
import ConstrucaoView from '../views/ConstrucaoView.vue'
import BelezaView from '../views/BelezaView.vue'
import ServicosGeraisView from '../views/ServicosGeraisView.vue'
import TecnologiaView from '../views/TecnologiaView.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import CadastroClienteView from '../views/CadastroClienteView.vue'
import CadastroEmpreendedorView from '../views/CadastroEmpreendedorView.vue'
import PerfilEmpreendedorView from '../views/PerfilEmpreendedorView.vue'
import FotografiaView from '../views/FotografiaView.vue'
import EventosView from '../views/EventosView.vue'

const router = createRouter({
history: createWebHistory(),

routes: [
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  { path: '/eventos',
    name: 'eventos',
    component: 
    EventosView 
  },
  {
    path: '/fotografia',
    name: 'fotografia',
     component: FotografiaView
  },
  {
   path: '/cadastro/empreendedor/perfil',
   component: PerfilEmpreendedorView
  },
  {
    path: '/cadastro/empreendedor',
    component: CadastroEmpreendedorView
  },
  {
    path: '/cadastro/cliente',
    component: CadastroClienteView
  },
  {
    path: '/cadastro',
    component: CadastroView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/construcao',
    name: 'construcao',
    component: ConstrucaoView
  },
  {
    path: '/beleza',
    name: 'beleza',
    component: BelezaView
  },
  {
    path: '/servicos-gerais',
    name: 'servicos-gerais',
    component: ServicosGeraisView
  },
  {
    path: '/tecnologia',
    name: 'tecnologia',
    component: TecnologiaView
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
],

scrollBehavior(to) {
  if (to.hash) return { el: to.hash, top: 88, behavior: 'smooth' }
  return {
    top: 0
  }
}
})

export default router
