import { clientLocal } from '@/http';

export const namespaced = true;

export const state = {
    loading: false,
    data: [],
};

export const mutations = {
    setLoading: (state, loading) => {
        state.loading = loading;
    },
    setData: (state, data) => {
        state.data = data;
    },
};

export const actions = {
    async getListOp({ commit }, param = '') {
        commit('setLoading', true);
        const { data } = await clientLocal.get(`/dashboard?q=${param}`);
        commit('setLoading', false);
        commit('setData', data);
        return data;
    },
};

export const getters = {};
