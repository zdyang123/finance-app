import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Record from './Record.vue'
import Stats from './Stats.vue'
import Profile from './Profile.vue'
import AllTransactions from './AllTransactions.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/record',
    name: 'record',
    component: Record,
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats,
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/all',
    name: 'all',
    component: AllTransactions,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
