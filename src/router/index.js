import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/about'
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FAQView.vue')
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/main/MainView.vue'),
    },
    {
      path: '/home/search',
      name: 'Search',
      component: () => import('../views/main/SearchView.vue'),
    },
    {
      path: '/home/vcmgt',
      name: 'ValueChainMgt',
      component: () => import('../views/main/ValueChainDataMgtView.vue'),
    },
    {
      path: '/home/vcmgt/map',
      name: 'Map',
      component: () => import('../views/map/MapView.vue'),
    }
  ]
})

export default router
