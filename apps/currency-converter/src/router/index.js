import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'current',
    component: () => import('../views/Current.vue')
  },
  {
    path: '/convert',
    name: 'convert',
    component: () => import('../views/Convert.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
