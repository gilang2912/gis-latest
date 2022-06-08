<template>
    <router-link
        v-bind="$attrs"
        :to="path"
        class="block px-4 py-2 transition duration-150 ease-linear md:text-sm hover:text-slate-600"
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
