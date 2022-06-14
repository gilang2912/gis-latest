<template>
    <AlertBanner
        v-show="toast.show"
        :color="toast.color"
        :message="toast.message"
        @close="toast.show = false"
    />
    <PageComponent heading="Objek Pajak">
        <TabCustom>
            <template #tabTitle1>
                <ViewListIcon class="w-4 h-4" />
                Objek Pajak
            </template>
            <template #tabTitle2>
                <PlusCircleIcon class="w-4 h-4" />
                Input Objek Pajak
            </template>
            <template #tabContent1>
                <div
                    class="relative mt-1 overflow-x-auto shadow-md bg-slate-50 dark:bg-slate-900 sm:rounded-lg md:rounded-md"
                >
                    <div class="px-3 py-4">
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
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition duration-150 ease-linear"
                                placeholder="Cari Objek Pajak"
                                v-model="query"
                                @keyup.enter="searchOp"
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
                                <th scope="col" class="px-6 py-3">NO.</th>
                                <th scope="col" class="px-6 py-3">
                                    Kode Objek Pajak
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nama Wajib Pajak
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Objek Pajak
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Lokasi Objek Pajak
                                </th>
                                <th scope="col" class="px-6 py-3">Ket.</th>
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-if="op.loading"
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
                                v-else-if="!op.data.data.length"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td
                                    class="px-6 py-4 font-semibold text-center"
                                    colspan="7"
                                >
                                    Data objek pajak tidak ditemukan.
                                </td>
                            </tr>
                            <tr
                                v-else
                                v-for="(item, index) in op.data.data"
                                :key="index"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                >
                                    {{ index + 1 }}
                                </th>
                                <td class="px-6 py-4">{{ item.kd_op }}</td>
                                <td class="px-6 py-4">{{ item.nm_wp }}</td>
                                <td class="px-6 py-4">
                                    {{ item.objek_pajak }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ item.lokasi_objek }}
                                </td>
                                <td class="px-6 py-4">
                                    {{ item.keterangan }}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex items-center gap-2">
                                        <router-link
                                            title="Lihat Detail"
                                            :to="{
                                                name: 'ObjekDetail',
                                                params: {
                                                    kdop: item.kd_op,
                                                },
                                            }"
                                            class="font-medium text-slate-600 dark:text-slate-300 hover:underline"
                                        >
                                            <EyeIcon class="w-5 h-5" />
                                        </router-link>
                                        <button
                                            v-if="
                                                (role && role.role_id == 1) ||
                                                (role && role.role_id == 2)
                                            "
                                            @click="openEdit(item.kd_op)"
                                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            <PencilAltIcon class="w-5 h-5" />
                                        </button>
                                        <button
                                            v-if="
                                                (role && role.role_id == 1) ||
                                                (role && role.role_id == 2)
                                            "
                                            @click="openDelete(item.kd_op)"
                                            class="font-medium text-red-600 dark:text-red-500 hover:underline"
                                        >
                                            <TrashIcon class="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination
                    :data="op.data"
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
                                            label="Kode Objek Pajak"
                                            id="kd_op"
                                            @keyup.stop="getOpDetail"
                                            :required="true"
                                            v-model="state.kd_op"
                                            :value="state.kd_op"
                                        />
                                    </div>
                                    <div>
                                        <InputControl
                                            label="NPWPD"
                                            id="npwpd"
                                            :required="true"
                                            v-model="state.npwpd"
                                            :readonly="true"
                                            :value="state.npwpd"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputControl
                                            label="Nama Wajib Pajak"
                                            id="nm_wp"
                                            :required="true"
                                            :readonly="true"
                                            v-model="state.nm_wp"
                                            :value="state.nm_wp"
                                        />
                                    </div>
                                    <div>
                                        <InputControl
                                            label="Objek Pajak"
                                            id="op"
                                            :required="true"
                                            :readonly="true"
                                            v-model="state.objek_pajak"
                                            :value="state.objek_pajak"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputControl
                                            label="Lokasi Reklame"
                                            id="lokasi_reklame"
                                            :required="true"
                                            :readonly="true"
                                            v-model="state.lokasi_objek"
                                            :value="state.lokasi_objek"
                                        />
                                    </div>
                                    <div>
                                        <InputControl
                                            label="Jenis Reklame"
                                            id="jns_reklame"
                                            :required="true"
                                            :readonly="true"
                                            v-model="state.jns_reklame"
                                            :value="state.jns_reklame"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputControl
                                            label="longitude"
                                            id="long"
                                            :required="true"
                                            v-model="state.long"
                                            :value="state.long"
                                        />
                                    </div>
                                    <div>
                                        <InputControl
                                            label="Latitude"
                                            id="lat"
                                            :required="true"
                                            v-model="state.lat"
                                            :value="state.lat"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    for="image_reklame"
                                    >Upload foto reklame</label
                                >
                                <input
                                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="image_reklame"
                                    type="file"
                                    @change="onImageChange"
                                    multiple
                                />
                                <div
                                    class="mt-1 text-sm text-slate-500 dark:text-slate-300"
                                    id="user_avatar_help"
                                >
                                    Maximum ukuran foto yang diupload 1MB
                                </div>
                            </div>
                            <div class="mb-4">
                                <label
                                    for="message"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                    >Keterangan</label
                                >
                                <textarea
                                    id="message"
                                    rows="4"
                                    class="block p-2.5 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-600 dark:focus:border-indigo-500 transition duration-150 ease-linear"
                                    placeholder="Keterangan"
                                    v-model="state.ket"
                                >
                                    {{ state.ket }}
                                </textarea>
                            </div>
                            <div class="flex items-center justify-end gap-2">
                                <BtnDark type="reset">Reset</BtnDark>
                                <BtnPrimary type="submit">
                                    <div class="flex items-center gap-1">
                                        <RefreshIcon
                                            v-if="state.loading"
                                            class="w-4 h-4 animate-spin"
                                        />
                                        Simpan
                                    </div>
                                </BtnPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </template>
        </TabCustom>
    </PageComponent>
    <!-- Modal Update OP -->
    <Modal
        v-show="modal.edit.show"
        title="Edit Objek Pajak"
        submitName="Update"
        @actionForm="handleUpdate"
        @close="closeEdit"
    >
        <form>
            <div class="mb-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <InputControl
                            label="Objek Pajak"
                            id="Objek Pajak"
                            :required="true"
                            v-model="state.objek_pajak"
                            :value="state.objek_pajak"
                        />
                    </div>
                    <div>
                        <InputControl
                            label="Lokasi Objek Pajak"
                            id="lokasi_objek"
                            :required="true"
                            v-model="state.lokasi_objek"
                            :value="state.lokasi_objek"
                        />
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <InputControl
                            label="longitude"
                            id="long"
                            :required="true"
                            v-model="state.long"
                            :value="state.long"
                        />
                    </div>
                    <div>
                        <InputControl
                            label="Latitude"
                            id="lat"
                            :required="true"
                            v-model="state.lat"
                            :value="state.lat"
                        />
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    for="image_reklame"
                    >Upload foto reklame</label
                >
                <input
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    id="image_reklame"
                    type="file"
                    @change="onImageChange"
                    multiple
                />
                <div
                    class="mt-1 text-sm text-slate-500 dark:text-slate-300"
                    id="user_avatar_help"
                >
                    Maximum ukuran foto yang diupload 1MB
                </div>
            </div>
            <div class="mb-4">
                <label
                    for="message"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                    >Keterangan</label
                >
                <textarea
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full outline-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-600 dark:focus:border-indigo-500 transition duration-150 ease-linear"
                    placeholder="Keterangan"
                    v-model="state.ket"
                >
                {{ state.ket }}
                </textarea>
            </div>
        </form>
    </Modal>
    <!-- Modal Delete OP -->
    <Modal
        v-show="modal.delete.show"
        submitName="Delete"
        @actionForm="handleDelete"
        @close="closeDelete"
        :danger="true"
    >
        <template #title>
            <TrashIcon class="w-4 h-4" />
            Hapus Objek Pajak
        </template>
        <h1 class="py-2 text-sm font-medium">
            Anda yakin menghapus data objek pajak ini?
        </h1>
    </Modal>
</template>

<script setup>
import PageComponent from '@/components/PageComponent.vue';
import TabCustom from '@/components/TabCustom.vue';
import InputControl from '@/components/partials/InputControl.vue';
import BtnPrimary from '@/components/partials/BtnPrimary.vue';
import BtnDark from '@/components/partials/BtnDark.vue';
import AlertBanner from '@/components/partials/AlertBanner.vue';
import { computed, reactive, ref } from 'vue';
import { clientLocal } from '@/http';
import { useStore } from 'vuex';
import {
    PencilAltIcon,
    PlusCircleIcon,
    TrashIcon,
    EyeIcon,
    ViewListIcon,
    RefreshIcon,
} from '@heroicons/vue/outline';
import Modal from '@/components/Modal.vue';
import Pagination from '@/components/partials/Pagination.vue';

const store = useStore();

const state = reactive({
    kd_op: '',
    npwpd: '',
    nm_wp: '',
    objek_pajak: '',
    lokasi_objek: '',
    jns_reklame: '',
    kecamatan: '',
    panjang: '',
    lebar: '',
    tinggi: '',
    ket: '',
    long: '',
    lat: '',
    images: [],
    img_tmp: [],
    loading: false,
});

const toast = ref({
    show: false,
    message: '',
    color: '',
});

const modal = reactive({
    edit: {
        show: false,
    },
    delete: {
        show: false,
    },
});

const query = ref('');

store.dispatch('op/getOp');

const op = computed(() => store.state.op);

const role = computed(() =>
    store.state.auth.data.role ? store.state.auth.data.role : '',
);

async function searchOp() {
    store.dispatch('op/getOp', query.value);
}

async function list(page = 1) {
    store.commit('op/setOpLoading', true);
    await clientLocal
        .get(`/objek-pajak?q=${query.value}&page=${page}`)
        .then(({ data }) => {
            store.commit('op/setOpLoading', false);
            store.commit('op/setOp', data);
        });
}

async function getOpDetail() {
    await clientLocal
        .post('/paylist', {
            kd_op: state.kd_op,
        })
        .then(({ data }) => {
            state.npwpd = data.data.npwpd;
            state.nm_wp = data.data.nm_wp;
            state.objek_pajak = data.data.objek_pajak;
            state.lokasi_objek = data.data.lokasi_reklame;
            state.jns_reklame = data.data.jns_reklame;
            state.kecamatan = data.data.kecamatan;
            state.panjang = data.data.panjang;
            state.lebar = data.data.lebar;
            state.tinggi = data.data.tinggi;
        })
        .catch((err) => {
            if (err.response.status == 404) {
                toast.value.color = 'error';
                toast.value.message = err.response.data.message;
                toast.value.show = true;
            }
        });
}

function onImageChange(e) {
    state.images = [];
    state.img_tmp = [];
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
        state.img_tmp.push(files[i]);
    }

    for (let i = 0; i < state.img_tmp.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
            state.images[i] = reader.result;
        };
        reader.readAsDataURL(state.img_tmp[i]);
    }
}

async function handleSubmit() {
    state.loading = true;
    await clientLocal
        .post('/objek-pajak/create', state)
        .then((res) => {
            if (res.status == 201) {
                state.loading = false;
                store.dispatch('op/getOp');
                toast.value.color = 'success';
                toast.value.message = res.data.message;
                toast.value.show = true;

                state.kd_op = '';
                state.npwpd = '';
                state.nm_wp = '';
                state.objek_pajak = '';
                state.lokasi_objek = '';
                state.jns_reklame = '';
                state.kecamatan = '';
                state.panjang = '';
                state.lebar = '';
                state.tinggi = '';
                state.long = '';
                state.lat = '';
                state.images = [];
                state.ket = '';

                setTimeout(() => {
                    toast.value.show = false;
                    toast.value.color = '';
                    toast.value.message = '';
                }, 2000);
            }
        })
        .catch((err) => {
            state.loading = false;
            console.error(err);
        });
}

function handleUpdate() {
    store
        .dispatch('op/update', state)
        .then((res) => {
            if (res.status == 200) {
                alert(res.data.message);
                modal.edit.show = false;
            }
        })
        .catch((err) => console.error(err));
}

function openEdit(kd_op) {
    state.kd_op = kd_op;
    modal.edit.show = true;
    store.dispatch('op/getCurrent', kd_op).then((res) => {
        state.objek_pajak = res.data.objek_pajak;
        state.lokasi_objek = res.data.lokasi_objek;
        state.long = res.data.coordinate.long;
        state.lat = res.data.coordinate.lat;
        state.ket = res.data.keterangan;
    });
}

function closeEdit() {
    state.kd_op = '';
    state.objek_pajak = '';
    state.lokasi_objek = '';
    state.long = '';
    state.lat = '';
    state.ket = '';
    state.images = [];
    modal.edit.show = false;
}

function handleDelete() {
    const param = {
        kd_op: state.kd_op,
    };
    store.dispatch('op/delete', param).then((res) => {
        if (res.status == 204) {
            modal.delete.show = false;
        }
    });
}

function openDelete(kd_op) {
    state.kd_op = kd_op;
    modal.delete.show = true;
}

function closeDelete() {
    state.kd_op = '';
    modal.delete.show = false;
}
</script>
