import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { auth } from '@/firebase/config';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      protected: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.protected)) {
    if (auth.currentUser) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router;
