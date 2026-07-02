import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: import('@/views/home/Home.vue'),
  },
  {
    path: '/record',
    name: 'record',
    component: import('@/views/record/Record.vue'),
  },
  {
    path: '/stats',
    name: 'stats',
    component: import('@/views/stats/Stats.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: import('@/views/profile/Profile.vue'),
  },
  {
    path: '/all',
    name: 'all',
    component: import('@/views/all/AllTransactions.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
