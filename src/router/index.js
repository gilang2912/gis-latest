import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/components/DefaultLayout.vue';
import Dashboard from '@/views/Dashboard.vue';
import ObjekIndex from '@/views/ObjekIndex.vue';

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        component: DefaultLayout,
        meta: { requiredAuth: true },
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard,
            },
            {
                path: '/objek-pajak',
                name: 'ObjekIndex',
                component: ObjekIndex,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
