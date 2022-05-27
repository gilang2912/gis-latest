<template>
    <PageComponent heading="Objek Pajak">
        <tabs>
            <tab title="Objek Pajak">
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
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search for items"
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
                                <th scope="col" class="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" class="px-6 py-3">Color</th>
                                <th scope="col" class="px-6 py-3">Category</th>
                                <th scope="col" class="px-6 py-3">Price</th>
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                >
                                    Apple MacBook Pro 17"
                                </th>
                                <td class="px-6 py-4">Sliver</td>
                                <td class="px-6 py-4">Laptop</td>
                                <td class="px-6 py-4">$2999</td>
                                <td class="px-6 py-4 text-right">
                                    <a
                                        href="#"
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >Edit</a
                                    >
                                </td>
                            </tr>
                            <tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                >
                                    Microsoft Surface Pro
                                </th>
                                <td class="px-6 py-4">White</td>
                                <td class="px-6 py-4">Laptop PC</td>
                                <td class="px-6 py-4">$1999</td>
                                <td class="px-6 py-4 text-right">
                                    <a
                                        href="#"
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >Edit</a
                                    >
                                </td>
                            </tr>
                            <tr class="bg-white dark:bg-gray-800">
                                <th
                                    scope="row"
                                    class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                >
                                    Magic Mouse 2
                                </th>
                                <td class="px-6 py-4">Black</td>
                                <td class="px-6 py-4">Accessories</td>
                                <td class="px-6 py-4">$99</td>
                                <td class="px-6 py-4 text-right">
                                    <a
                                        href="#"
                                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >Edit</a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </tab>
            <tab title="Input Objek Pajak">
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
                                            @keyup="getOpDetail"
                                            :required="true"
                                            v-model="state.kd_op"
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
                                        />
                                    </div>
                                    <div>
                                        <InputControl
                                            label="Latitude"
                                            id="lat"
                                            :required="true"
                                            v-model="state.lat"
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
                                ></textarea>
                            </div>
                            <div class="flex items-center justify-end gap-2">
                                <BtnDark type="reset">Reset</BtnDark>
                                <BtnPrimary type="submit">Simpan</BtnPrimary>
                            </div>
                        </form>
                    </div>
                </div>
            </tab>
        </tabs>
    </PageComponent>
</template>

<script setup>
import PageComponent from '@/components/PageComponent.vue';
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';
import InputControl from '@/components/partials/InputControl.vue';
import BtnPrimary from '@/components/partials/BtnPrimary.vue';
import BtnDark from '@/components/partials/BtnDark.vue';
import { reactive } from 'vue';
import { clientLocal } from '@/http';

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
});

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
        .catch((err) => console.error(err.message));
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
    await clientLocal
        .post('/objek-pajak/create', state)
        .then((res) => {
            if (res.status == 201) {
                console.log(res.data.message);
            }
        })
        .catch((err) => console.error(err));
}
</script>
