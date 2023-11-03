import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SimpleView from '../views/SimpleView.vue'
import LoginView from '../views/LoginView.vue'
import CallView from '../views/CallView.vue'
import SettingView from '../views/SettingView.vue'
import OpeningView from '../views/OpeningView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/simple',
      name: 'simple',
      component: SimpleView
    },
    {
      path: '/call',
      name: 'call',
      component: CallView
    },
    {
      path: '/setting',
      name: 'setting',
      component: SettingView
    },
    {
      path: '/open',
      name: 'open',
      component: OpeningView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
