import { clientLocal } from '@/http';

export const namespaced = true;

export const state = {
    loading: false,
    data: localStorage.getItem('map-data')
        ? JSON.parse(localStorage.getItem('map-data'))
        : [],
};

export const mutations = {
    setLoading: (state, loading) => {
        state.loading = loading;
    },
    setData: (state, data) => {
        state.data = data;
    },
    initialiseLocal: (state, data) => {
        localStorage.setItem('map-data', JSON.stringify(data));
        state.loading = false;
        state.data = JSON.parse(localStorage.getItem('map-data'));
    },
};

export const actions = {
    async getListOp({ commit }, param = '') {
        commit('setLoading', true);
        const { data } = await clientLocal.get(`/dashboard?q=${param}`);
        commit('setLoading', false);
        commit('setData', data);
        commit('initialiseLocal', data);
        return data;
    },
};

export const getters = {
    getMapData: (state) => state.data,
};
