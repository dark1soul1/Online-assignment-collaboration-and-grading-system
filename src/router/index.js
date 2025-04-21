import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/home', name: 'Home', component:()=>import('../layouts/BasicLayout.vue'),},
  { path: '/test', name: 'Test', component:()=>import('../layouts/testCom.vue'),},
  { path: '/', redirect: '/home' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;