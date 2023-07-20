import { createRouter, createWebHistory } from 'vue-router';

const routerList = [];

const routes = [
  ...routerList,
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: { title: ['home'] }
  },
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/views/404.vue')
  }
];

const router = createRouter({
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from) => {
  // console.log('from: ', from);
  // console.log('to: ', to);

  return true;
});

export default router;