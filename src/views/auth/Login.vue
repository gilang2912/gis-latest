<template>
    <main>
        <transition>
            <AlertBanner
                v-show="toast.show"
                :message="toast.message"
                :color="toast.color"
                @close="closeToast"
            />
        </transition>
        <section class="absolute w-full h-full">
            <div
                class="absolute top-0 w-full h-full bg-slate-100 dark:bg-slate-900"
                style="background-size: 100%; background-repeat: no-repeat"
                :style="{
                    'background-image': 'url(' + image + ')',
                }"
            ></div>
            <div class="container h-full px-4 mx-auto">
                <div
                    class="flex flex-col items-center content-center justify-center h-full"
                >
                    <div class="w-full px-4 lg:w-4/12">
                        <div
                            class="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-slate-300"
                        >
                            <div class="px-6 py-6 mb-0 rounded-t">
                                <div
                                    class="flex flex-col items-center justify-center gap-2"
                                >
                                    <div class="inline-flex items-center gap-1">
                                        <img
                                            class="w-14 h-14 drop-shadow-lg"
                                            src="../../assets/logo-mks.png"
                                        />
                                        <LogoBapenda
                                            class="h-11 w-11 drop-shadow-lg"
                                        />
                                    </div>
                                    <h2
                                        class="text-2xl font-bold tracking-tighter"
                                    >
                                        GIS Reklame Kota Makassar
                                    </h2>
                                </div>
                                <hr class="mt-6 border-slate-400 border-b-1" />
                            </div>
                            <div class="flex-auto px-4 py-10 pt-0 lg:px-10">
                                <form @submit.prevent="handleLogin">
                                    <div class="mb-4">
                                        <FloatInputOutline
                                            label="Username"
                                            id="username"
                                            v-model="model.username"
                                            :required="true"
                                        />
                                    </div>
                                    <div class="mb-4">
                                        <FloatInputOutline
                                            type="password"
                                            label="Password"
                                            id="password"
                                            v-model="model.password"
                                            :required="true"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="inline-flex items-center cursor-pointer"
                                            ><input
                                                id="customCheckLogin"
                                                type="checkbox"
                                                class="w-5 h-5 ml-1 text-gray-800 border-0 rounded form-checkbox"
                                                style="
                                                    transition: all 0.15s ease
                                                        0s;
                                                "
                                            /><span
                                                class="ml-2 text-sm font-semibold text-gray-700"
                                                >Ingat saya</span
                                            ></label
                                        >
                                    </div>
                                    <div class="mt-6 text-center">
                                        <button
                                            class="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold uppercase rounded shadow outline-none text-slate-800 dark:text-slate-50 hover:shadow-lg focus:outline-none bg-gradient-to-r from-slate-50 via-purple-500 to-red-500 dark:from-slate-900 dark:via-purple-900 dark:to-red-900 dark:border-slate-700"
                                            type="submit"
                                            style="
                                                transition: all 0.15s ease 0s;
                                            "
                                        >
                                            <div
                                                class="flex items-center justify-center gap-1"
                                            >
                                                <RefreshIcon
                                                    v-if="auth.loading"
                                                    class="w-4 h-4 animate-spin"
                                                />
                                                Login
                                            </div>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import LogoBapenda from '@/components/LogoBapenda.vue';
import AlertBanner from '@/components/partials/AlertBanner.vue';
import FloatInputOutline from '@/components/partials/FloatInputOutline.vue';
import { RefreshIcon } from '@heroicons/vue/outline';
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const image = 'src/assets/register_bg_2.png';

const store = useStore();
const router = useRouter();
const model = reactive({
    username: '',
    password: '',
});
const toast = ref({
    show: false,
    message: '',
    color: '',
});

const handleLogin = () => {
    store.state.auth.loading = true;
    store
        .dispatch('auth/login', model)
        .then(() => {
            store.state.auth.loading = false;
            router.push({ name: 'Dashboard' });
        })
        .catch((err) => {
            store.state.auth.loading = false;
            toast.value.show = true;
            toast.value.color = 'error';
            toast.value.message = err.response.data.message;
            setTimeout(() => {
                toast.value.show = false;
                toast.value.color = '';
                toast.value.message = '';
            }, 3000);
        });
};

const closeToast = () => {
    toa.valuest.value.show = false;
    toast.value.color = '';
    toast.value.message = '';
};

const auth = computed(() => store.state.auth);
</script>
