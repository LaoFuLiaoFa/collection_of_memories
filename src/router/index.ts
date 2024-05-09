import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/LoginPage'
    },
    {
      path: '/LoginPage',
      name: 'LoginPage',
      component: () => import('../views/login/LoginPage.vue')
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: () => import('../views/mains/MainPage.vue')
    }
  ]
})

export default router
