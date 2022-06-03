import { clientLocal } from '@/http';

export const namespaced = true;

export const state = {
    loading: false,
    data: [],
    current: {},
};

export const mutations = {
    setOpLoading: (state, loading) => {
        state.loading = loading;
    },
    setOp: (state, data) => {
        state.data = data;
    },
    setCurrentOp: (state, data) => {
        state.current = data;
    },
};

export const actions = {
    async getOp({ commit }) {
        commit('setOpLoading', true);
        const { data } = await clientLocal.get('/objek-pajak');
        commit('setOpLoading', false);
        commit('setOp', data);
        return data;
    },
    async getCurrent({ commit }, kd_op) {
        const { data } = await clientLocal.post('/objek-pajak/detail', {
            kd_op: kd_op,
        });
        commit('setCurrentOp', data.data);
        return data;
    },
    async update({ dispatch }, data) {
        const res = await clientLocal.put('/objek-pajak/update', data);
        dispatch('getOp');
        return res;
    },
    async delete({ dispatch }, kd_op) {
        const res = await clientLocal.post('/objek-pajak/delete', kd_op);
        dispatch('getOp');
        return res;
    },
    async getWithPayment({ commit }, kd_op) {
        commit('setOpLoading', true);
        const { data } = await clientLocal.get(
            `/objek-pajak/withpayment?kd_op=${kd_op}`,
        );
        commit('setOpLoading', false);
        commit('setCurrentOp', data);
        return data;
    },
};

export const getters = {};
