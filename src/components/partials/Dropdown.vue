<template>
    <div v-click-outside="hide" class="relative">
        <button
            @click="show"
            class="inline-flex items-center gap-1 py-2 font-medium capitalize transition duration-150 ease-linear md:text-sm hover:text-slate-800 hover:dark:text-slate-600"
        >
            <span v-if="name">{{ name }}</span>
            <slot name="name"></slot>
            <ChevronDownIcon
                class="w-4 h-4 transition-transform duration-200 transform"
                :class="{
                    'rotate-180': isOpen,
                    'rotate-0': !isOpen,
                }"
            />
        </button>
        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <div
                v-show="isOpen"
                class="absolute right-0 z-30 w-48 mt-1 origin-top-right rounded shadow bg-slate-200 dark:bg-slate-700"
            >
                <div class="py-1">
                    <slot />
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/outline';
import { ref } from 'vue';

defineProps({
    name: String,
});

const isOpen = ref(false);

function show() {
    isOpen.value = !isOpen.value;
}

function hide() {
    isOpen.value = false;
}
</script>
