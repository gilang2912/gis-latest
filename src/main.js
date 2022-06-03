import { createApp } from 'vue';
import App from './App.vue';
import './main.css';
import router from './router';
import store from './stores';

const clickOutside = {
    beforeMount(el, binding, vnode) {
        el.clickOutsideEvent = (e) => {
            if (!(el === e.target || el.contains(e.target))) {
                binding.value(e, el);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
    },
};

const app = createApp(App);

app.directive('click-outside', clickOutside);
app.use(router);
app.use(store);
app.mount('#app');
