import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/auth',
    component: () => import('@/views/AuthView.vue')
  },
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/board', component: () => import('@/views/KanbanView.vue') },
  { path: '/contacts', component: () => import('@/views/ContactsView.vue') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;