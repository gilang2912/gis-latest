import { clientLocal } from '@/http';

export const namespaced = true;

export const state = {
    loading: false,
    token: localStorage.getItem('gis_token'),
    data: {},
};

export const mutations = {
    setUserData: (state, data) => {
        state.data = data;
    },
    setToken: (state, token) => {
        state.token = token;
        localStorage.setItem('gis_token', token);
    },
    setLogout: (state) => {
        state.data = {};
        state.token = null;
        localStorage.removeItem('gis_token');
    },
};

export const actions = {
    async login({ commit }, param) {
        const { data } = await clientLocal.post('/login', param);
        commit('setUserData', data.data);
        commit('setToken', data.token);
        return data;
    },
    async authUser({ commit }) {
        const { data } = await clientLocal.get('/me');
        commit('setUserData', data);
        return data;
    },
    async logout({ commit }) {
        const data = await clientLocal.post('/logout');
        commit('setLogout');
        return data;
    },
};

export const getters = {};
