import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SimpleView from '../views/SimpleView.vue'
import LoginView from '../views/LoginView.vue'
import CallView from '../views/CallView.vue'
import SettingView from '../views/SettingView.vue'
import OpeningView from '../views/OpeningView.vue'
import { useUserStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{ requiresAuth: true , reload: true}
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { layout: 'empty' }
  },
  {
    path: '/simple',
    name: 'simple',
    component: SimpleView,
    meta:{ requiresAuth: true , reload: true}
  },
  {
    path: '/call',
    name: 'call',
    component: CallView,
    meta:{ requiresAuth: true , reload: true}
  },
  {
    path: '/setting',
    name: 'setting',
    component: SettingView,
    meta:{ requiresAuth: true , reload: true}
  },
  {
    path: '/open',
    name: 'open',
    component: OpeningView,
    meta:{ requiresAuth: true , reload: true}
  },
  { 
    path: '/:catchAll(.*)',
    component: OpeningView,
  // component: 
   }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  if (to.meta.requiresAuth && !store.user) {
    next('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
  } else {
    next(); // Permettre l'accès à la page demandée
  }
});
export default router