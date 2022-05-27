<template>
    <label
        :for="id"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-300"
    >
        {{ label }}
    </label>
    <input
        v-bind="$attrs"
        :type="type"
        :id="id"
        @input="emits('update:modelValue', $event.target.value)"
        class="block w-full p-2.5 border rounded-md shadow-inner outline-none border-slate-800 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 focus:ring-indigo-600 focus:ring-1 focus:border-indigo-600 transition duration-150 ease-linear"
        :class="{ 'bg-slate-200 dark:bg-slate-600': readonly }"
        :required="required"
        :readonly="readonly"
        :placeholder="placeholder"
    />
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
    modelValue: {
        type: [String, Number],
    },
    required: {
        type: Boolean,
        default: false,
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    placeholder: String,
});

const emits = defineEmits(['update:modelValue']);

const id = computed(
    () => props.id || 'id-' + Math.floor(Math.random() * 10000),
);
</script>
