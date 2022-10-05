import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/layout' },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/login.vue')
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/layouts/layout.vue')
    }
  ]
})

export default router
