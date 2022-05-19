<template>
    <router-link
        :to="path"
        class="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 dark:text-slate-200 dark:hover:text-white"
    >
        <span v-if="name">{{ name }}</span>
        <slot />
    </router-link>
</template>

<script setup>
defineProps({
    path: [String, Object],
    name: String,
});
</script>
