<template>
    <PageComponent heading="Detail Objek Pajak">
        <div class="flex items-center justify-center">
            <div
                v-if="currentOp.loading"
                class="flex items-center justify-center gap-2 w-[650px] p-6 text-slate-50"
            >
                <RefreshIcon class="w-5 h-5 animate-spin" />
                <p class="font-medium">Loading</p>
            </div>
            <template v-else>
                <div
                    class="relative flex items-center rounded-md shadow bg-slate-50 dark:bg-slate-900"
                >
                    <button
                        @click="prev"
                        class="absolute px-4 py-2 rounded hover:ring-1 hover:ring-slate-800"
                    >
                        <ChevronLeftIcon
                            class="z-50 w-8 h-8 rounded shadow opacity-75 bg-slate-200 text-slate-900 dark:text-slate-50 dark:bg-slate-900"
                        />
                    </button>
                    <div
                        @click="showSingle"
                        v-for="index in [slider.currentIndex]"
                        :key="index"
                        class="flex items-center w-[550px] xl:h-[630px] lg:h-[530px] md:h-[400px] sm:h-[350px] cursor-pointer"
                    >
                        <img
                            class="object-cover w-full h-full rounded-t-lg md:rounded-none md:rounded-l-lg"
                            :src="currentImage"
                        />
                    </div>
                    <button
                        @click="next"
                        class="absolute right-0 px-4 py-2 rounded hover:ring-1 hover:ring-slate-800"
                    >
                        <ChevronRightIcon
                            class="z-50 w-8 h-8 rounded shadow opacity-75 bg-slate-200 text-slate-900 dark:text-slate-50 dark:bg-slate-900"
                        />
                    </button>
                </div>
                <div
                    class="relative flex flex-col items-start w-auto gap-2 p-6 bg-slate-50 dark:bg-slate-900 xl:h-[630px] lg:h-[530px] md:h-[400px] sm:h-[350px] rounded-md"
                >
                    <h3
                        class="inline-flex items-center gap-2 text-xl font-semibold"
                    >
                        <FolderOpenIcon class="w-5 h-5 text-yellow-500" />
                        {{ currentOp.current.nm_wp }}
                    </h3>
                    <div class="flex items-center w-full gap-2 pb-2 border-b">
                        <h4 class="text-lg font-semibold">
                            {{ currentOp.current.npwpd }}
                        </h4>
                        <h5 class="pl-2 font-semibold capitalize border-l-2">
                            {{ currentOp.current.jns_reklame }}
                        </h5>
                        <h5
                            v-if="currentOp.current.coordinate"
                            class="inline-flex items-center gap-1 pl-2 font-semibold border-l-2"
                        >
                            <LocationMarkerIcon class="w-4 h-4" />
                            {{ currentOp.current.coordinate.long }},
                            {{ currentOp.current.coordinate.lat }}
                        </h5>
                    </div>
                    <p class="flex items-center gap-2">
                        <span class="font-semibold w-44">Kode Objek Pajak</span>
                        <span>{{ currentOp.current.kd_op }}</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="font-semibold w-44">Objek Pajak</span>
                        <span>{{ currentOp.current.objek_pajak }}</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="font-semibold w-44">Lokasi Objek</span>
                        <span>{{ currentOp.current.lokasi_objek }}</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="font-semibold w-44">Panjang</span>
                        <span>{{ currentOp.current.panjang }} m</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="font-semibold w-44">Lebar</span>
                        <span>{{ currentOp.current.lebar }} m</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="font-semibold w-44">Tinggi</span>
                        <span>{{ currentOp.current.tinggi }} m</span>
                    </p>
                    <p
                        v-if="currentOp.current.payment"
                        class="flex items-center gap-2"
                    >
                        <span class="font-semibold w-44"
                            >Masa Pajak Terakhir</span
                        >
                        <span>{{ currentOp.current.payment.masa_pajak }}</span>
                    </p>
                    <p
                        v-if="currentOp.current.payment"
                        class="flex items-center gap-2"
                    >
                        <span class="font-semibold w-44"
                            >Peroide Awal Pajak</span
                        >
                        <span>{{ currentOp.current.payment.p_awal }}</span>
                    </p>
                    <p
                        v-if="currentOp.current.payment"
                        class="flex items-center gap-2"
                    >
                        <span class="font-semibold w-44"
                            >Peroide Akhir Pajak</span
                        >
                        <span>{{ currentOp.current.payment.p_akhir }}</span>
                    </p>
                    <p class="flex items-center gap-2">
                        <span class="font-semibold w-44"
                            >Status Pembayaran</span
                        >
                        <span
                            v-if="currentOp.current.payment"
                            class="px-3 py-1 text-sm font-semibold rounded"
                            :class="{
                                'bg-red-500 text-slate-50':
                                    currentOp.current.payment.status === 3,
                                'bg-green-500 text-slate-50':
                                    currentOp.current.payment.status === 1,
                                'bg-yellow-500 text-slate-50':
                                    currentOp.current.payment.status === 2,
                                'bg-blue-500 text-slate-50':
                                    currentOp.current.payment.status === 4,
                            }"
                        >
                            {{ payStatus }}
                        </span>
                    </p>
                    <div
                        class="absolute bottom-0 right-0 flex items-center pb-6 pr-6"
                    >
                        <button
                            @click="openModalDelete(currentOp.current.kd_op)"
                            type="button"
                            title="Hapus objek pajak"
                        >
                            <TrashIcon class="w-6 h-6 text-red-500" />
                        </button>
                    </div>
                </div>
            </template>
        </div>
        <VueEasyLightbox
            escDisabled
            moveDisabled
            scrollDisabled
            :visible="slider.visible"
            :imgs="slider.imgs"
            :index="slider.index"
            @hide="hide"
        ></VueEasyLightbox>
    </PageComponent>
    <Modal
        v-show="modal.delete.show"
        @actionForm="handleDeleteOp"
        @close="closeModalDelete"
        submitName="Hapus"
        :danger="true"
    >
        <template #title>
            <TrashIcon class="w-4 h-4" />
            Hapus objek pajak
        </template>
        <h1 class="py-2 text-sm font-medium">
            Anda yakin menghapus data objek pajak ini?
        </h1>
    </Modal>
</template>

<script setup>
import PageComponent from '@/components/PageComponent.vue';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    FolderOpenIcon,
    LocationMarkerIcon,
    RefreshIcon,
    TrashIcon,
} from '@heroicons/vue/outline';
import { computed, reactive } from 'vue';
import VueEasyLightbox from 'vue-easy-lightbox';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Modal from '@/components/Modal.vue';

const router = useRouter();
const route = useRoute();
const store = useStore();

const slider = reactive({
    imgs: [],
    visible: false,
    index: 0,
    timer: null,
    currentIndex: 0,
});

const modal = reactive({
    delete: {
        show: false,
        kd_op: '',
    },
});

store.dispatch('op/getWithPayment', route.params.kdop);

const currentOp = computed(() => store.state.op);

const payStatus = computed(() => {
    let payStat = '';

    if (currentOp.value.current.payment) {
        switch (currentOp.value.current.payment.status) {
            case 4:
                payStat = 'Pajak telah ditetapkan, Bukti bayar belum disetor.';
                break;
            case 3:
                payStat = 'Jatuh tempo';
                break;
            case 2:
                payStat = 'Mendekati jatuh tempo';
                break;
            case 1:
                payStat = 'Pajak Aktif';
        }
    }

    return payStat;
});

const next = () => {
    slider.currentIndex += 1;
};

const prev = () => {
    slider.currentIndex -= 1;
};

const showSingle = () => {
    currentOp.value.current.images.forEach((img, key) => {
        slider.imgs.push(img.path_name);
    });

    slider.index = 0;
    show();
};

const show = () => {
    slider.visible = true;
};

const hide = () => {
    slider.visible = false;
};

const currentImage = computed(() =>
    currentOp.value.current.images
        ? currentOp.value.current.images[
              Math.abs(slider.currentIndex) %
                  currentOp.value.current.images.length
          ].path_name
        : '',
);

const handleDeleteOp = () => {
    store
        .dispatch('op/delete', {
            kd_op: modal.delete.kd_op,
        })
        .then((res) => {
            if (res.status == 204) {
                modal.delete.show = false;
                router.push({
                    name: 'ObjekIndex',
                });
            }
        });
};

const openModalDelete = (kdop) => {
    modal.delete.kd_op = kdop;
    modal.delete.show = true;
};

const closeModalDelete = () => {
    modal.delete.show = false;
};
</script>
