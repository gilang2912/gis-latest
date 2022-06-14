<template>
    <div class="relative">
        <input
            v-bind="$attrs"
            :type="type"
            :id="id"
            class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-800 bg-transparent rounded border border-gray-300 appearance-none dark:border-slate-600 dark:focus:border-indigo-800 focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
            @input="emits('update:modelValue', $event.target.value)"
            :required="required"
            :readonly="readonly"
            placeholder=" "
        />
        <label
            :for="id"
            class="absolute text-sm text-slate-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-slate-300 px-2 peer-focus:px-2 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >{{ label }}</label
        >
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    label: String,
    id: String,
    required: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: ' ',
    },
});

const emits = defineEmits(['update:modelValue']);

const id = computed(
    () => props.id || 'id-' + Math.floor(Math.random() * 10000),
);
</script>
