import { createRouter, createWebHistory } from 'vue-router'
import CardapioView from '../views/CardapioView.vue'
import PedidoView from '../views/PedidoView.vue'
import ContaView from '../views/ContaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'cardapio',
      component: CardapioView
    },
    {
      path: '/pedido',
      name: 'pedido',
      component: PedidoView
    },
    {
      path: '/conta',
      name: 'conta',
      component: ContaView
    }
  ]
})

export default router
