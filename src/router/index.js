import { createRouter, createWebHistory } from 'vue-router';
import store from '@/stores';
import DefaultLayout from '@/components/DefaultLayout.vue';
import AuthLayout from '@/components/AuthLayout.vue';
import Dashboard from '@/views/Dashboard.vue';
import ObjekIndex from '@/views/ObjekIndex.vue';
import ObjekDetail from '@/views/ObjekDetail.vue';
import Login from '@/views/auth/Login.vue';
import Users from '@/views/Users.vue';
import ChangePassword from '@/views/ChangePassword.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

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
                meta: {
                    breadcrumbs: [
                        { name: 'Home', link: '/' },
                        { name: 'Dashboard' },
                    ],
                },
            },
            {
                path: '/objek-pajak',
                name: 'ObjekIndex',
                component: ObjekIndex,
                meta: {
                    breadcrumbs: [
                        { name: 'Home', link: '/' },
                        { name: 'Objek Pajak' },
                    ],
                },
            },
            {
                path: '/objek-pajak/:kdop',
                name: 'ObjekDetail',
                component: ObjekDetail,
                meta: {
                    breadcrumbs: [
                        { name: 'Home', link: '/' },
                        { name: 'Objek Pajak', link: '/objek-pajak' },
                        { name: 'Detail' },
                    ],
                },
            },
            {
                path: '/users',
                name: 'Users',
                component: Users,
                meta: {
                    breadcrumbs: [
                        { name: 'Home', link: '/' },
                        { name: 'Aplikasi', link: '#' },
                        { name: 'Manage Users' },
                    ],
                },
            },
            {
                path: '/ganti-password',
                name: 'ChangePass',
                component: ChangePassword,
                meta: {
                    breadcrumbs: [
                        { name: 'Home', link: '/' },
                        { name: 'Ganti Password' },
                    ],
                },
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
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundPage,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth && !store.state.auth.token) {
        next({ name: 'Login' });
    } else if (store.state.auth.token && to.meta.isGuest) {
        next({ name: 'Dashboard' });
    } else {
        if (to.name) {
            NProgress.start();
        }
        next();
    }
});

router.afterEach((to, from) => {
    NProgress.done();
});

export default router;
