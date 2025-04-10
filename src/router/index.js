import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/auth', name: 'Auth', component:()=>import('../layouts/AuthLayout.vue'),},
  
  { path: '/', redirect: '/auth' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;