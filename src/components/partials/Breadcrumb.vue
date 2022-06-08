<template>
    <ol class="flex items-center gap-2 text-sm">
        <template v-for="(breadcrumb, idx) in breadcrumbs" :key="idx">
            <li :class="{ 'text-indigo-600': !!breadcrumb.link }">
                <button @click="routeTo(idx)" class="font-medium">
                    {{ breadcrumb.name }}
                </button>
            </li>
            <li v-if="breadcrumb.link">
                <span class="mx-1 text-gray-500">/</span>
            </li>
        </template>
    </ol>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const breadcrumbs = ref([]);
const route = useRoute();
const router = useRouter();

const updateList = () => {
    breadcrumbs.value = route.meta.breadcrumbs;
};

const routeTo = (pRouteTo) => {
    if (breadcrumbs.value[pRouteTo].link)
        router.push(breadcrumbs.value[pRouteTo].link);
};

watchEffect(() => updateList());
onMounted(() => updateList());
</script>
