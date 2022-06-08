import { createStore } from 'vuex';
import * as op from './modules/objekPajak';
import * as dashboard from './modules/dashboard';
import * as auth from './modules/auth';
import * as users from './modules/users';

const store = createStore({
    modules: {
        auth,
        op,
        dashboard,
        users,
    },
});

export default store;
