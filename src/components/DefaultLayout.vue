<template>
    <div
        class="relative min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-50"
    >
        <Navigation />
        <router-view :key="$route.path" v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
        <Footer />
    </div>
</template>

<script setup>
import Navigation from './Navigation.vue';
import Footer from './Footer.vue';
</script>
