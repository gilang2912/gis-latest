import { createStore } from 'vuex';
import * as op from './modules/objekPajak';
import * as dashboard from './modules/dashboard';

const store = createStore({
    modules: {
        op,
        dashboard,
    },
});

export default store;
