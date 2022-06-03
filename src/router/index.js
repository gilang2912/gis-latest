import { createRouter, createWebHistory } from 'vue-router';
import DefaultLayout from '@/components/DefaultLayout.vue';
import AuthLayout from '@/components/AuthLayout.vue';
import Dashboard from '@/views/Dashboard.vue';
import ObjekIndex from '@/views/ObjekIndex.vue';
import ObjekDetail from '@/views/ObjekDetail.vue';
import Login from '@/views/auth/Login.vue';
import Test from '@/views/Test.vue';

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
            {
                path: '/objek-pajak/:kdop',
                name: 'ObjekDetail',
                component: ObjekDetail,
            },
            {
                path: '/test',
                name: 'TestPage',
                component: Test,
            },
        ],
    },
    {
        path: '/auth',
        redirect: '/login',
        component: AuthLayout,
        meta: { isGuest: true },
        children: [
            {
                path: '/login',
                name: 'Login',
                component: Login,
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
