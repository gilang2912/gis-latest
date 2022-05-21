<template>
    <PageComponent heading="Dashboard">
        <div class="overflow-hidden rounded-lg shadow-md bg-slate-800">
            <div id="map"></div>
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from '@/components/PageComponent.vue';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { onMounted, reactive } from 'vue';

const data = reactive({
    map: null,
    center: [119.42379, -5.135399],
});

const fScreen = new mapboxgl.FullscreenControl();
const navigation = new mapboxgl.NavigationControl();

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

onMounted(() => {
    loadMap();
});
</script>

<style scoped>
#map {
    height: 650px;
}
</style>
