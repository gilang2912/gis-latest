<template>
    <header class="bg-slate-50 dark:bg-slate-900">
        <div class="container">
            <div class="flex items-center justify-between py-4">
                <h4 v-if="heading" class="font-semibold tracking-tight">
                    {{ heading }}
                </h4>
                <slot name="heading"></slot>
            </div>
        </div>
    </header>
    <main>
        <div class="container pt-3 pb-6">
            <slot />
        </div>
    </main>
</template>

<script setup>
defineProps({
    heading: String,
});
</script>
