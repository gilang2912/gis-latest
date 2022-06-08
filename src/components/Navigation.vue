<template>
    <nav
        class="border-b bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-700"
    >
        <div class="container">
            <div class="flex items-center justify-between h-16">
                <div>
                    <a class="text-xl font-bold tracking-tighter">
                        GIS Reklame
                    </a>
                </div>
                <div class="flex items-center gap-4 font-medium">
                    <NavLink to="/dashboard">
                        <div class="flex items-center gap-1">
                            <HomeIcon class="w-4 h-4" />
                            Dashboard
                        </div>
                    </NavLink>
                    <NavLink to="/objek-pajak">
                        <div class="flex items-center gap-1">
                            <CollectionIcon class="w-4 h-4" />
                            Objek Pajak
                        </div>
                    </NavLink>
                    <Dropdown>
                        <template #name>
                            <ViewGridIcon class="w-4 h-4" />
                            Aplikasi
                        </template>
                        <DropdownLink path="/users">Manage Users</DropdownLink>
                        <DropdownLink path="#">Privileges</DropdownLink>
                        <DropdownLink path="#">Referensi</DropdownLink>
                    </Dropdown>
                </div>
                <div class="flex items-center">
                    <Dropdown v-if="auth" :name="auth.nama">
                        <DropdownLink path="#">
                            <div class="flex items-center gap-1">
                                <UserCircleIcon class="w-4 h-4" />
                                Profile
                            </div>
                        </DropdownLink>
                        <button
                            @click="openLogout"
                            class="inline-flex items-center w-full gap-1 px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white"
                        >
                            <LogoutIcon class="w-4 h-4" />
                            Logout
                        </button>
                    </Dropdown>
                </div>
            </div>
        </div>
    </nav>
    <Modal
        v-show="modalLogout"
        submitName="Logout"
        @actionForm="handleLogout"
        @close="closeLogout"
    >
        <template #title>
            <LogoutIcon class="w-4 h-4" />
            Logout
        </template>
        <h4 class="py-2">Anda yakin akan logout?</h4>
    </Modal>
</template>

<script setup>
import Dropdown from './partials/Dropdown.vue';
import DropdownLink from './partials/DropdownLink.vue';
import NavLink from './partials/NavLink.vue';
import Modal from './Modal.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import {
    HomeIcon,
    CollectionIcon,
    ViewGridIcon,
    LogoutIcon,
    UserCircleIcon,
} from '@heroicons/vue/outline';

const router = useRouter();
const store = useStore();
const modalLogout = ref(false);

store.dispatch('auth/authUser');

const auth = computed(() => store.state.auth.data);

const handleLogout = () => {
    store.dispatch('auth/logout').then(() => {
        modalLogout.value = false;
        router.push({ name: 'Login' });
    });
};

const openLogout = () => {
    modalLogout.value = true;
};

const closeLogout = () => {
    modalLogout.value = false;
};
</script>
