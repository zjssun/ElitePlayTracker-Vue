import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MatchView from '@/views/MatchView.vue'
import AboutView from '@/views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        { path: '', redirect: 'donk' },
        { path: 'about', component: AboutView },
        { path: ':player', component: MatchView },
      ],
    },
  ],
})

export default router
