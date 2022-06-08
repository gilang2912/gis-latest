import { clientLocal } from '@/http';

export const namespaced = true;

export const state = {
    loading: false,
    data: [],
    current: {},
};

export const mutations = {
    setData: (state, data) => {
        state.data = data;
    },
    setLoading: (state, loading) => {
        state.loading = loading;
    },
    setCurrent: (state, current) => {
        state.current = current;
    },
};

export const actions = {
    async getAll({ commit }, param = { q: '', page: '' }) {
        commit('setLoading', true);
        const { data } = await clientLocal.get(
            `/users?q=${param.q}&page=${param.page}`,
        );
        commit('setLoading', false);
        commit('setData', data);
        return data;
    },
    async store({ dispatch, commit }, param) {
        commit('setLoading', true);
        const data = await clientLocal.post('/users/create', param);
        commit('setLoading', false);
        dispatch('getAll');
        return data;
    },
    async getCurrent({ commit }, param) {
        const { data } = await clientLocal.get(`/users/${param}`);
        commit('setCurrent', data.data);
        return data;
    },
    async update({ dispatch }, param) {
        const data = await clientLocal.put(`/users/${param.id}`, param);
        dispatch('getAll');
        return data;
    },
    async delete({ dispatch }, id) {
        const data = await clientLocal.delete(`/users/${id}`);
        dispatch('getAll');
        return data;
    },
};

export const getters = {};
