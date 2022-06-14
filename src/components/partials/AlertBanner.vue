<template>
    <div class="fixed top-0 z-40 w-full alert-banner">
        <input type="checkbox" class="hidden" id="banneralert" />

        <label
            class="flex items-center justify-between w-full px-4 py-2 font-medium text-white shadow cursor-pointer close"
            title="close"
            for="banneralert"
            :class="{
                'bg-blue-500': color == 'blue',
                'bg-green-500': color == 'success',
                'bg-yellow-500': color == 'warning',
                'bg-red-500': color == 'error',
            }"
        >
            <div class="flex items-center gap-1">
                <InformationCircleIcon v-if="color == 'blue'" class="w-5 h-5" />
                <ExclamationCircleIcon
                    v-if="color == 'warning' || color == 'error'"
                    class="w-5 h-5"
                />
                <CheckCircleIcon v-if="color == 'success'" class="w-5 h-5" />
                {{ message }}
            </div>
            <button @click="emits('close')">
                <svg
                    class="text-white fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                >
                    <path
                        d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
                    ></path>
                </svg>
            </button>
        </label>
    </div>
</template>

<script setup>
import {
    InformationCircleIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
} from '@heroicons/vue/outline';

defineProps({
    message: String,
    color: {
        type: String,
        default: 'blue',
    },
});
const emits = defineEmits(['close']);
</script>
