import { clientLocal } from '@/http';

export const namespaced = true;

export const state = {
    loading: false,
    data: [],
    current: {},
    roles: [],
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
    setRoles: (state, roles) => {
        state.roles = roles;
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
    async roles({ commit }) {
        const { data } = await clientLocal.get('/roles');
        commit('setRoles', data);
        return data;
    },
    async grantRole({ dispatch }, param) {
        const data = await clientLocal.post('/roles/grant', param);
        dispatch('getAll');
        return data;
    },
    async changePass({ dispatch }, param) {
        const data = await clientLocal.post('/users/change-pass', param);
        return data;
    },
};

export const getters = {};
