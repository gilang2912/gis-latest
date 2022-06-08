<template>
    <RenderlessPagination
        :data="data"
        :limit="limit"
        :show-disabled="showDisabled"
        :size="size"
        :align="align"
        @pagination-change-page="onPaginationChangePage"
        v-slot="slotProps"
    >
        <div
            v-bind="$attrs"
            class="flex flex-col items-center px-4 py-4 border-t rounded-b-lg bg-slate-200 dark:bg-slate-900 xs:flex-row xs:justify-between"
        >
            <span
                class="mb-1 text-sm font-medium text-gray-900 dark:text-slate-50 xs:text-xs"
            >
                Menampikan {{ slotProps.computed.from }} sampai
                {{ slotProps.computed.to }} dari
                {{ slotProps.computed.total }} total data
            </span>
            <div
                class="inline-flex mt-2 xs:mt-0"
                v-if="slotProps.computed.total > slotProps.computed.perPage"
            >
                <button
                    class="px-4 py-2 text-sm font-semibold transition duration-150 bg-indigo-600 rounded-l text-indigo-50 hover:bg-indigo-500"
                    :class="{
                        'bg-slate-400 hover:bg-slate-500 cursor-not-allowed':
                            !slotProps.computed.prevPageUrl,
                    }"
                    :tabindex="!slotProps.computed.prevPageUrl && -1"
                    v-on="slotProps.prevButtonEvents"
                    :disabled="!slotProps.computed.prevPageUrl"
                >
                    Prev
                </button>
                &nbsp; &nbsp;
                <button
                    class="px-4 py-2 text-sm font-semibold transition duration-150 bg-indigo-600 rounded-r text-indigo-50 hover:bg-indigo-500"
                    :class="{
                        'bg-slate-400 hover:bg-slate-500 cursor-not-allowed':
                            !slotProps.computed.nextPageUrl,
                    }"
                    :tabindex="!slotProps.computed.nextPageUrl && -1"
                    v-on="slotProps.nextButtonEvents"
                    :disabled="!slotProps.computed.nextPageUrl"
                >
                    Next
                </button>
            </div>
        </div>
    </RenderlessPagination>
</template>

<script>
import RenderlessPagination from './RenderlessPagination.vue';
export default {
    inheritAttrs: false,
    emits: ['pagination-change-page'],
    components: { RenderlessPagination },
    props: {
        data: {
            type: Object,
            default: () => {},
        },
        limit: {
            type: Number,
            default: 0,
        },
        showDisabled: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'default',
            validator: (value) => {
                return ['small', 'default', 'large'].indexOf(value) !== -1;
            },
        },
        align: {
            type: String,
            default: 'left',
            validator: (value) => {
                return ['left', 'center', 'right'].indexOf(value) !== -1;
            },
        },
    },
    methods: {
        onPaginationChangePage(page) {
            this.$emit('pagination-change-page', page);
        },
    },
};
</script>
