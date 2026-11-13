import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/tablero' },
        { path: '/login', component: () => import('./pages/Login.vue'), meta: { publico: true } },
        { path: '/tablero', component: () => import('./pages/Tablero.vue') },
        { path: '/reportes', component: () => import('./pages/Reportes.vue') },
        { path: '/cargar-insumos', component: () => import('./pages/CargarInsumos.vue') },
    ],
});
