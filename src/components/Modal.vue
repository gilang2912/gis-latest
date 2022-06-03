<template>
    <transition>
        <div class="fixed inset-0 z-50 overflow-y-auto">
            <div
                class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
            >
                <div
                    class="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                >
                    <div
                        @click="emits('close')"
                        class="absolute inset-0 opacity-75 bg-slate-600 dark:bg-slate-900"
                    ></div>
                </div>
                <span
                    class="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                    >&#8203;</span
                >
                <div
                    class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl lg:max-w-xl sm:max-w-lg sm:my-8 sm:align-middle sm:w-full dark:bg-slate-900"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div class="pt-4 pb-2 mb-2 border-b dark:border-slate-800">
                        <div class="flex items-center">
                            <div
                                class="mt-1 text-center sm:mt-0 sm:ml-4 sm:text-left"
                            >
                                <h3
                                    class="inline-flex items-center gap-2 font-semibold leading-6 text-gray-900 dark:text-slate-50"
                                    id="modal-headline"
                                >
                                    <template v-if="title">
                                        {{ title }}
                                    </template>
                                    <slot name="title"></slot>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div
                        class="px-6 border-b text-slate-800 dark:text-slate-50 dark:border-slate-800"
                    >
                        <slot />
                    </div>
                    <div
                        class="px-4 py-3 bg-gray-50 dark:bg-slate-900 sm:px-6 sm:flex sm:flex-row-reverse"
                    >
                        <button
                            type="button"
                            @click="emits('actionForm')"
                            class="inline-flex items-center justify-center w-full gap-1 px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            :class="{ 'bg-red-600 hover:bg-red-800': danger }"
                        >
                            {{ submitName }}
                        </button>
                        <button
                            type="button"
                            @click="emits('close')"
                            class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
defineProps({
    title: String,
    submitName: String,
    danger: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['actionForm', 'close']);
</script>
