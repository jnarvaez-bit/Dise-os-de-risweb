import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/tablero' },
        { path: '/login', component: () => import('./pages/Login.vue'), meta: { publico: true } },
        { path: '/tablero', component: () => import('./pages/Tablero.vue') },
        { path: '/reportes', component: () => import('./pages/Reportes.vue') },
        { path: '/parametros', component: () => import('./pages/Parametros.vue') },
        { path: '/entidades', component: () => import('./pages/Entidades.vue') },
        { path: '/declaraciones', component: () => import('./pages/Declaraciones.vue') },
        { path: '/parametrizacion', component: () => import('./pages/Parametrizacion.vue') },
        { path: '/cargar-insumos', component: () => import('./pages/CargarInsumos.vue') },
        { path: '/:pathMatch(.*)*', redirect: '/tablero' },
    ],
});
