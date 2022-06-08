<template>
    <PageComponent heading="Data Pengguna">
        <TabCustom>
            <template #tabTitle1>
                <ViewListIcon class="w-4 h-4" />
                Pengguna
            </template>
            <template #tabTitle2>
                <UserAddIcon class="w-4 h-4" />
                Tambah Pengguna
            </template>
            <template #tabContent1>
                <div
                    class="relative overflow-x-auto shadow-md sm:rounded-lg dark:bg-slate-900"
                >
                    <div class="p-4">
                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative mt-1">
                            <div
                                class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                            >
                                <svg
                                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Cara pengguna"
                                v-model="query"
                                @keyup.enter="searchUser"
                            />
                        </div>
                    </div>
                    <table
                        class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                    >
                        <thead
                            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                        >
                            <tr>
                                <th scope="col" class="px-6 py-3">No.</th>
                                <th scope="col" class="px-6 py-3">Username</th>
                                <th scope="col" class="px-6 py-3">Nama</th>
                                <th scope="col" class="px-6 py-3">NIP</th>
                                <th scope="col" class="px-6 py-3">
                                    Last Login
                                </th>
                                <th scope="col" class="px-6 py-3">Role</th>
                                <th scope="col" class="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-if="users.loading"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td
                                    class="px-6 py-4 font-semibold text-center"
                                    colspan="7"
                                >
                                    Loading ...
                                </td>
                            </tr>
                            <tr
                                v-else-if="!users.data.data.length"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td
                                    class="px-6 py-4 font-semibold text-center"
                                    colspan="7"
                                >
                                    Data pengguna tidak ditemukan.
                                </td>
                            </tr>
                            <tr
                                v-else
                                v-for="(u, index) in users.data.data"
                                :key="index"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                >
                                    {{ index + 1 }}
                                </th>
                                <td class="px-6 py-4">{{ u.username }}</td>
                                <td class="px-6 py-4">{{ u.nama }}</td>
                                <td class="px-6 py-4">{{ u.nip }}</td>
                                <td class="px-6 py-4">{{ u.last_login }}</td>
                                <td class="px-6 py-4">
                                    {{ u.role.role_name }}
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <button @click="openEdit(u.id)">
                                            <PencilAltIcon
                                                class="w-5 h-5 text-blue-600"
                                            />
                                        </button>
                                        <button
                                            @click="openRole(u.id)"
                                            title="Tambah Role"
                                        >
                                            <PlusCircleIcon
                                                class="w-5 h-5 text-green-500"
                                            />
                                        </button>
                                        <button @click="openDelete(u.id)">
                                            <TrashIcon
                                                class="w-5 h-5 text-red-600"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination
                    :data="users.data"
                    @pagination-change-page="list"
                ></Pagination>
            </template>
            <template #tabContent2>
                <div class="grid grid-cols-2 gap-4 mt-1">
                    <div
                        class="p-4 rounded-md shadow bg-slate-50 dark:bg-slate-900"
                    >
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputControl
                                            label="Nama Lengkap"
                                            id="nama"
                                            :required="true"
                                            v-model="param.nama"
                                            :value="param.nama"
                                        />
                                    </div>
                                    <div>
                                        <InputControl
                                            label="Username"
                                            id="username"
                                            :required="true"
                                            v-model="param.username"
                                            :value="param.username"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputControl
                                            type="password"
                                            label="Password"
                                            id="password"
                                            :required="true"
                                            v-model="param.password"
                                            :value="param.password"
                                        />
                                    </div>
                                    <div>
                                        <InputControl
                                            type="password"
                                            label="Konfirmasi Password"
                                            id="pass_conf"
                                            :required="true"
                                            v-model="
                                                param.password_confirmation
                                            "
                                            :value="param.password_confirmation"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <InputControl
                                    label="NIP"
                                    id="nip"
                                    :required="true"
                                    v-model="param.nip"
                                    :value="param.nip"
                                />
                            </div>
                            <div class="flex items-center justify-end gap-1">
                                <BtnDark type="reset">Reset</BtnDark>
                                <BtnPrimary type="submit">Simpan</BtnPrimary>
                            </div>
                        </form>
                    </div>
                    <transition>
                        <ToastSuccess
                            v-if="toast.success.show"
                            :message="toast.success.message"
                        />
                    </transition>
                </div>
            </template>
        </TabCustom>
    </PageComponent>
    <Modal
        v-show="modal.edit.show"
        submitName="Update"
        @actionForm="handleUpdate"
        @close="closeEdit"
    >
        <template #title>
            <PencilAltIcon class="w-4 h-4" />
            Update data pengguna
        </template>
        <form>
            <div class="mb-4">
                <InputControl
                    label="Nama Lengkap"
                    id="u_nama"
                    :required="true"
                    v-model="param.nama"
                    :value="param.nama"
                />
            </div>
            <div class="mb-4">
                <InputControl
                    label="NIP"
                    id="u_nip"
                    :required="true"
                    v-model="param.nip"
                    :value="param.nip"
                />
            </div>
        </form>
    </Modal>
    <Modal
        v-show="modal.delete.show"
        :danger="true"
        submitName="Hapus"
        @actionForm="handleDelete"
        @close="closeDelete"
    >
        <template #title>
            <TrashIcon class="w-4 h-4" />
            Hapus Pengguna
        </template>
        <h4 class="py-4">Anda yakin menghapus pengguna ini?</h4>
    </Modal>
    <Modal
        v-show="modal.role.show"
        submitName="Simpan"
        @actionForm="handleAddRole"
        @close="closeRole"
    >
        <template #title>
            <PlusCircleIcon class="w-4 h-4" />
            Tambah Role Pengguna
        </template>
        <div class="mb-4">
            <label
                for="roles"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >Pilih Role</label
            >
            <select
                id="roles"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize"
                v-model="param.role_id"
            >
                <template v-for="(item, i) in users.roles" :key="i">
                    <option :value="item.role_id">{{ item.role_name }}</option>
                </template>
            </select>
        </div>
    </Modal>
</template>

<script setup>
import PageComponent from '@/components/PageComponent.vue';
import TabCustom from '@/components/TabCustom.vue';
import Pagination from '@/components/partials/Pagination.vue';
import Modal from '@/components/Modal.vue';
import InputControl from '@/components/partials/InputControl.vue';
import BtnPrimary from '@/components/partials/BtnPrimary.vue';
import BtnDark from '@/components/partials/BtnDark.vue';
import ToastSuccess from '@/components/ToastSuccess.vue';
import {
    ViewListIcon,
    PencilAltIcon,
    TrashIcon,
    UserAddIcon,
    PlusCircleIcon,
} from '@heroicons/vue/outline';
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const param = reactive({
    id: '',
    nama: '',
    username: '',
    password: '',
    password_confirmation: '',
    nip: '',
    role_id: '',
});
const modal = reactive({
    edit: {
        show: false,
    },
    delete: {
        show: false,
    },
    role: {
        show: false,
    },
});
const toast = reactive({
    success: {
        show: false,
        message: '',
    },
});
const query = ref('');

store.dispatch('users/getAll');
store.dispatch('users/roles');

const users = computed(() => store.state.users);

function searchUser() {
    store.dispatch('users/getAll', { q: query.value });
}

function list(page = 1) {
    store.dispatch('users/getAll', {
        q: query.value,
        page: page,
    });
}

function handleSubmit() {
    store
        .dispatch('users/store', param)
        .then((res) => {
            if (res.status == 201) {
                toast.success.show = true;
                toast.success.message = res.data.message;
                param.nama = '';
                param.username = '';
                param.password = '';
                param.password_confirmation = '';
                param.nip = '';

                setTimeout(() => {
                    toast.success.show = false;
                    toast.success.message = '';
                }, 1500);
            }
            0;
        })
        .catch((err) => console.log(err));
}

function handleUpdate() {
    store
        .dispatch('users/update', param)
        .then((res) => {
            alert(res.data.message);
            closeEdit();
        })
        .catch((err) => console.log(err));
}

function openEdit(id) {
    param.id = id;
    modal.edit.show = true;
    store
        .dispatch('users/getCurrent', param.id)
        .then((res) => {
            param.nama = res.data.nama;
            param.nip = res.data.nip;
        })
        .catch((err) => console.log(err));
}

function closeEdit() {
    param.id = '';
    param.nama = '';
    param.nip = '';
    modal.edit.show = false;
}

function handleDelete() {
    store
        .dispatch('users/delete', param.id)
        .then((res) => {
            if (res.status == 204) {
                closeDelete();
            }
        })
        .catch((err) => console.log(err));
}

function openDelete(id) {
    param.id = id;
    modal.delete.show = true;
}

function closeDelete() {
    param.id = '';
    modal.delete.show = false;
}

function handleAddRole() {
    const data = {
        user_id: param.id,
        role_id: param.role_id,
    };
    store
        .dispatch('users/grantRole', data)
        .then((res) => {
            if (res.status == 201) {
                alert(res.data.message);
                closeRole();
            }
        })
        .catch((err) => console.log(err));
}

function openRole(id) {
    param.id = id;
    modal.role.show = true;
}

function closeRole() {
    param.id = '';
    param.role_id = '';
    modal.role.show = false;
}
</script>
