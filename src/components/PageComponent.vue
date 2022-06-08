<template>
    <header class="shadow-md bg-slate-50 dark:bg-slate-900">
        <div class="container">
            <div class="flex items-center justify-between py-4">
                <h4 v-if="heading" class="font-semibold tracking-tight">
                    {{ heading }}
                </h4>
                <slot name="heading"></slot>
                <Breadcrumb />
            </div>
        </div>
    </header>
    <main>
        <div class="container pt-3 pb-16">
            <slot />
        </div>
    </main>
</template>

<script setup>
import Breadcrumb from './partials/Breadcrumb.vue';

defineProps({
    heading: String,
});
</script>
