import axios from 'axios';
import store from './stores';
import router from './router';

const clientLocal = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/gis/v1`,
});

clientLocal.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.state.auth.token}`;
    return config;
});

clientLocal.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('gis_token');
            router.push({ name: 'Login' });
        }
        throw error;
    },
);

export { clientLocal };
