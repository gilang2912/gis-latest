<template>
    <nav
        class="border-b border-slate-200 bg-gradient-to-r from-slate-50 via-purple-500 to-red-500 dark:from-slate-900 dark:via-purple-900 dark:to-red-900 dark:border-slate-700"
    >
        <div class="container">
            <div class="flex items-center justify-between h-16">
                <div>
                    <div class="flex items-center gap-1">
                        <img
                            src="../assets/logo-mks.png"
                            class="w-8 h-auto drop-shadow-md"
                        />
                        <LogoBapenda class="w-6 h-6" />
                        <a
                            href="#"
                            class="text-xl font-semibold tracking-tighter"
                        >
                            GIS Reklame Kota Makassar
                        </a>
                    </div>
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
                    <template v-if="auth">
                        <Dropdown v-if="role.role_id && role.role_id == 1">
                            <template #name>
                                <ViewGridIcon class="w-4 h-4" />
                                Aplikasi
                            </template>
                            <DropdownLink path="/users"
                                >Manage Users</DropdownLink
                            >
                            <DropdownLink path="#">Privileges</DropdownLink>
                            <DropdownLink path="#">Referensi</DropdownLink>
                        </Dropdown>
                    </template>
                </div>
                <div class="flex items-center">
                    <Dropdown v-if="auth" :name="auth.nama">
                        <div
                            v-if="role && role.role_id"
                            class="px-4 py-2 text-sm font-medium capitalize border-b border-slate-400 dark:border-slate-100"
                        >
                            {{ role.role_name }}
                        </div>
                        <DropdownLink path="#">
                            <div class="flex items-center gap-1">
                                <UserCircleIcon class="w-4 h-4" />
                                Profile
                            </div>
                        </DropdownLink>
                        <DropdownLink path="/ganti-password">
                            <div class="flex items-center gap-1">
                                <LockOpenIcon class="w-4 h-4" />
                                Ganti Password
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
import LogoBapenda from './LogoBapenda.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import {
    HomeIcon,
    CollectionIcon,
    ViewGridIcon,
    LogoutIcon,
    UserCircleIcon,
    LockOpenIcon,
} from '@heroicons/vue/outline';

const router = useRouter();
const store = useStore();
const modalLogout = ref(false);

store.dispatch('auth/authUser');

const auth = computed(() => store.state.auth.data);

const role = computed(() =>
    store.state.auth.data.role ? store.state.auth.data.role : '',
);

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
