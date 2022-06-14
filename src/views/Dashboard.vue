<template>
    <PageComponent heading="Dashboard">
        <div class="relative overflow-hidden rounded-lg shadow-md bg-slate-800">
            <div class="sidebar">
                <div
                    class="flex items-center justify-between p-4 shadow bg-gradient-to-r from-slate-50 via-purple-500 to-red-500 dark:from-slate-900 dark:via-purple-900 dark:to-red-900 dark:border-slate-700"
                >
                    <h2
                        class="inline-flex items-center gap-1 font-medium text-slate-50"
                    >
                        <LocationMarkerIcon class="w-4 h-4" />
                        List Objek Pajak
                    </h2>
                    <button @click="reloadMapOp">
                        <RefreshIcon class="w-5 h-5 drop-shadow-md" />
                    </button>
                </div>
                <div class="p-2 border-b dark:border-slate-800">
                    <input
                        type="text"
                        class="block w-full px-3 py-2 transition duration-200 ease-linear border rounded shadow-inner outline-none text-slate-800 border-slate-400 focus:ring-1 focus:border-indigo-600 focus:ring-indigo-500 dark:text-slate-50 dark:bg-slate-900 dark:border-slate-800"
                        placeholder="Cari Objek Pajak"
                        v-model="data.query"
                        @keyup="filterOp"
                    />
                </div>
                <div id="listings" class="listings">
                    <div
                        v-if="opListing.loading"
                        class="flex items-center justify-center gap-1 pt-6 font-medium"
                    >
                        <RefreshIcon class="w-4 h-4 animate-spin" />
                        Loading
                    </div>
                    <div
                        v-else-if="!opListing.data.length"
                        class="flex items-center justify-center gap-1 pt-6 text-sm font-medium"
                    >
                        <InformationCircleIcon class="w-4 h-4" />
                        Data objek pajak tidak ditemukan.
                    </div>
                    <div
                        v-else
                        v-for="(op, index) in filterOp"
                        :key="index"
                        :id="`listing-${index}`"
                        class="item"
                    >
                        <button
                            :id="`link-${index}`"
                            type="button"
                            class="title"
                            @click="getMarker"
                        >
                            {{ op.nm_wp }}
                        </button>
                        <div class="flex flex-col gap-1 mt-1 font-medium">
                            <small class="font-semibold">{{
                                op.objek_pajak
                            }}</small>
                            <small>{{ op.jns_reklame }}</small>
                            <small class="capitalize">{{ op.kecamatan }}</small>
                            <small>{{ op.lokasi_objek }}</small>
                        </div>
                    </div>
                </div>
            </div>
            <div id="map" class="h-screen"></div>
        </div>
        <VueEasyLightBox
            escDisabled
            moveDisabled
            scrollDisabled
            :visible="data.visible"
            :imgs="data.img"
            :index="data.index"
            @hide="hide"
        ></VueEasyLightBox>
    </PageComponent>
</template>

<script setup>
import PageComponent from '@/components/PageComponent.vue';
import PopupMarker from '@/components/PopupMarker.vue';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import {
    computed,
    onMounted,
    reactive,
    defineComponent,
    nextTick,
    createApp,
} from 'vue';
import {
    LocationMarkerIcon,
    RefreshIcon,
    ChevronRightIcon,
    InformationCircleIcon,
} from '@heroicons/vue/outline';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import VueEasyLightBox from 'vue-easy-lightbox';

const router = useRouter();
const store = useStore();

const data = reactive({
    map: null,
    center: [119.42379, -5.135399],
    query: '',
    currentMarker: [],
    visible: false,
    img: '',
    index: 0,
});

const fScreen = new mapboxgl.FullscreenControl();
const navigation = new mapboxgl.NavigationControl();

// Load api mapbox
const loadMap = async () => {
    mapboxgl.accessToken = `${import.meta.env.VITE_MAPBOX_KEY}`;
    try {
        data.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/bapendapajak1/ckv4zjsme660y14qkbw6h6ekw',
            center: data.center,
            zoom: 12.3,
        });

        data.map.addControl(fScreen);
        data.map.addControl(navigation);
    } catch (err) {
        console.log(`Map error: ${err}`);
    }
};

async function reloadMapOp() {
    localStorage.removeItem('map-data');
    if (data.currentMarker.length) {
        for (let i = 0; i < data.currentMarker.length; i++) {
            data.currentMarker[i].remove();
        }
    }
    getMapOp();
}

async function getMapOp() {
    // Get all data objek pajak
    if (localStorage.getItem('map-data')) {
        store.state.dashboard.data.forEach((mark, key) => {
            const pin = document.createElement('div');
            pin.id = `marker-${key}`;
            pin.className = 'pin';

            switch (mark.payment.status) {
                case 3:
                    pin.classList.add('pin-red');
                    break;
                case 2:
                    pin.classList.add('pin-yellow');
                    break;
                case 4:
                    pin.classList.add('pin-yellow');
                    break;
                case 1:
                    pin.classList.add('pin-green');
            }

            marker(mark, pin);

            pin.addEventListener('click', (e) => {
                flyStore(mark);
                createPopup(mark);
                const activeItem = document.getElementsByClassName('active');
                e.stopPropagation();
                if (activeItem[0]) {
                    activeItem[0].classList.remove('active');
                }
                const listing = document.getElementById(`listing-${key}`);
                listing.classList.add('active');
            });
        });
    } else {
        store.dispatch('dashboard/getListOp').then((data) => {
            data.forEach((mark, key) => {
                const pin = document.createElement('div');
                pin.id = `marker-${key}`;
                pin.className = 'pin';

                switch (mark.payment.status) {
                    case 3:
                        pin.classList.add('pin-red');
                        break;
                    case 2:
                        pin.classList.add('pin-yellow');
                        break;
                    case 4:
                        pin.classList.add('pin-yellow');
                        break;
                    case 1:
                        pin.classList.add('pin-green');
                }

                marker(mark, pin);

                pin.addEventListener('click', (e) => {
                    flyStore(mark);
                    createPopup(mark);
                    const activeItem =
                        document.getElementsByClassName('active');
                    e.stopPropagation();
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    const listing = document.getElementById(`listing-${key}`);
                    listing.classList.add('active');
                });
            });
        });
    }
}

const opListing = computed(() => store.state.dashboard);
// Search data objek pajak
const filterOp = computed(() => {
    let op = store.state.dashboard.data;
    if (data.query) {
        if (data.currentMarker.length) {
            for (let i = 0; i < data.currentMarker.length; i++) {
                data.currentMarker[i].remove();
            }
        }
        op = op.filter((mark, key) => {
            if (mark.nm_wp.toLowerCase().includes(data.query.toLowerCase())) {
                const pin = document.createElement('div');
                pin.id = `marker-${key}`;
                pin.className = 'pin';
                switch (mark.payment.status) {
                    case 3:
                        pin.classList.add('pin-red');
                        break;
                    case 2:
                        pin.classList.add('pin-yellow');
                        break;
                    case 4:
                        pin.classList.add('pin-yellow');
                        break;
                    case 1:
                        pin.classList.add('pin-green');
                }
                marker(mark, pin);
                pin.addEventListener('click', (e) => {
                    flyStore(mark);
                    createPopup(mark);
                    const activeItem =
                        document.getElementsByClassName('active');
                    e.stopPropagation();
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    const listing = document.getElementById(`listing-${key}`);
                    listing.classList.add('active');
                });

                return mark.nm_wp
                    .toLowerCase()
                    .includes(data.query.toLowerCase());
            }

            if (
                mark.kecamatan.toLowerCase().includes(data.query.toLowerCase())
            ) {
                const pin = document.createElement('div');
                pin.id = `marker-${key}`;
                pin.className = 'pin';
                switch (mark.payment.status) {
                    case 3:
                        pin.classList.add('pin-red');
                        break;
                    case 2:
                        pin.classList.add('pin-yellow');
                        break;
                    case 4:
                        pin.classList.add('pin-yellow');
                        break;
                    case 1:
                        pin.classList.add('pin-green');
                }
                marker(mark, pin);
                pin.addEventListener('click', (e) => {
                    flyStore(mark);
                    createPopup(mark);
                    const activeItem =
                        document.getElementsByClassName('active');
                    e.stopPropagation();
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    const listing = document.getElementById(`listing-${key}`);
                    listing.classList.add('active');
                });

                return mark.kecamatan
                    .toLowerCase()
                    .includes(data.query.toLowerCase());
            }

            if (mark.npwpd.toLowerCase().includes(data.query.toLowerCase())) {
                const pin = document.createElement('div');
                pin.id = `marker-${key}`;
                pin.className = 'pin';
                switch (mark.payment.status) {
                    case 3:
                        pin.classList.add('pin-red');
                        break;
                    case 2:
                        pin.classList.add('pin-yellow');
                        break;
                    case 4:
                        pin.classList.add('pin-yellow');
                        break;
                    case 1:
                        pin.classList.add('pin-green');
                }
                marker(mark, pin);
                pin.addEventListener('click', (e) => {
                    flyStore(mark);
                    createPopup(mark);
                    const activeItem =
                        document.getElementsByClassName('active');
                    e.stopPropagation();
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    const listing = document.getElementById(`listing-${key}`);
                    listing.classList.add('active');
                });

                return mark.npwpd
                    .toLowerCase()
                    .includes(data.query.toLowerCase());
            }

            if (
                mark.jns_reklame
                    .toLowerCase()
                    .includes(data.query.toLowerCase())
            ) {
                const pin = document.createElement('div');
                pin.id = `marker-${key}`;
                pin.className = 'pin';
                switch (mark.payment.status) {
                    case 3:
                        pin.classList.add('pin-red');
                        break;
                    case 2:
                        pin.classList.add('pin-yellow');
                        break;
                    case 4:
                        pin.classList.add('pin-yellow');
                        break;
                    case 1:
                        pin.classList.add('pin-green');
                }
                marker(mark, pin);
                pin.addEventListener('click', (e) => {
                    flyStore(mark);
                    createPopup(mark);
                    const activeItem =
                        document.getElementsByClassName('active');
                    e.stopPropagation();
                    if (activeItem[0]) {
                        activeItem[0].classList.remove('active');
                    }
                    const listing = document.getElementById(`listing-${key}`);
                    listing.classList.add('active');
                });

                return mark.jns_reklame
                    .toLowerCase()
                    .includes(data.query.toLowerCase());
            }
        });
    }
    return op;
});

function getMarker(e) {
    let id = e.target.id;
    const activeItem = document.getElementsByClassName('active');

    if (activeItem[0]) {
        activeItem[0].classList.remove('active');
    }

    for (let no = 0; no < opListing.value.data.length; no++) {
        if (id === `link-${no}`) {
            flyStore(opListing.value.data[no]);
            createPopup(opListing.value.data[no]);

            const listing = document.getElementById(`listing-${no}`);
            listing.classList.add('active');
        }
    }
}

// Create pin marker and add to map
const marker = (currentFeature, pin) => {
    const coordiate = [
        currentFeature.coordinate.long,
        currentFeature.coordinate.lat,
    ];
    let mark = new mapboxgl.Marker(pin).setLngLat(coordiate).addTo(data.map);

    data.currentMarker.push(mark);
};

const createPopup = (currentFeature) => {
    const coordiate = [
        currentFeature.coordinate.long,
        currentFeature.coordinate.lat,
    ];
    const popups = document.getElementsByClassName('mapboxgl-popup');
    if (popups.length) popups[0].remove();
    const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
    });
    popup.remove();
    popup.setLngLat(coordiate);
    popup.setHTML('<div id="popup-content"></div>');
    popup.addTo(data.map);

    const popupEl = defineComponent({
        extends: PopupMarker,
        components: { ChevronRightIcon },
        setup() {
            const model = reactive({
                kd_op: currentFeature.kd_op,
                nm_wp: currentFeature.nm_wp,
                op: currentFeature.objek_pajak,
                jns_reklame: currentFeature.jns_reklame,
                lokasi_objek: currentFeature.lokasi_objek,
                status: currentFeature.payment.status,
                images: currentFeature.images,
                img: [],
            });

            const payStatus = computed(() => {
                let payStat;
                switch (currentFeature.payment.status) {
                    case 4:
                        payStat = 'Bukti bayar belum disetor.';
                        break;
                    case 3:
                        payStat = 'Jatuh Tempo';
                        break;
                    case 2:
                        payStat = 'Mendekati Jatuh Tempo';
                        break;
                    case 1:
                        payStat = 'Pajak Aktif';
                }
                return payStat;
            });

            const showSingle = () => {
                currentFeature.images.forEach((img, key) => {
                    model.img.push(img.path_name);
                });
                data.img = model.img;
                data.index = 1;
                show();
            };

            const show = () => {
                data.visible = true;
            };

            return {
                model,
                showSingle,
                payStatus,
            };
        },
    });

    nextTick(() => createApp(popupEl).use(router).mount('#popup-content'));
};

const flyStore = (currentFeature) => {
    const coordiate = [
        currentFeature.coordinate.long,
        currentFeature.coordinate.lat,
    ];
    data.map.flyTo({
        center: coordiate,
        zoom: 15,
    });
};

const hide = () => {
    data.visible = false;
};

onMounted(() => {
    loadMap();
    getMapOp();
});
</script>
