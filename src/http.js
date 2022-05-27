import axios from 'axios';

const clientLocal = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/gis/v1`,
});

clientLocal.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${import.meta.env.VITE_TOKEN_GIS}`;
    return config;
});

export { clientLocal };
