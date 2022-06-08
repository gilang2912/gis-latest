<template>
    <div class="flex flex-wrap">
        <div class="w-full">
            <ul class="flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none">
                <li class="flex-auto mr-2 -mb-px text-center last:mr-0">
                    <a
                        class="block px-5 py-3 text-xs font-bold leading-normal capitalize rounded shadow-lg cursor-pointer"
                        v-on:click="toggleTabs(1)"
                        v-bind:class="{
                            'text-slate-600 dark:text-slate-50 bg-white dark:bg-slate-900':
                                openTab !== 1,
                            'text-slate-50 bg-indigo-600 dark:bg-indigo-800':
                                openTab === 1,
                        }"
                    >
                        <div class="flex items-center justify-center gap-2">
                            <span v-if="tabTitle1">{{ tabTitle1 }}</span>
                            <slot name="tabTitle1"></slot>
                        </div>
                    </a>
                </li>
                <li class="flex-auto mr-2 -mb-px text-center last:mr-0">
                    <a
                        class="block px-5 py-3 text-xs font-bold leading-normal capitalize rounded shadow-lg cursor-pointer"
                        v-on:click="toggleTabs(2)"
                        v-bind:class="{
                            'text-slate-600 dark:text-slate-50 bg-white dark:bg-slate-900':
                                openTab !== 2,
                            'text-slate-50 bg-indigo-600 dark:bg-indigo-800':
                                openTab === 2,
                        }"
                    >
                        <div class="flex items-center justify-center gap-2">
                            <span v-if="tabTitle2">{{ tabTitle2 }}</span>
                            <slot name="tabTitle2"></slot>
                        </div>
                    </a>
                </li>
            </ul>
            <div
                class="relative flex flex-col w-full min-w-0 mb-6 break-words bg-transparent"
            >
                <div class="flex-auto px-2 py-2">
                    <div class="tab-content tab-space">
                        <div
                            v-bind:class="{
                                hidden: openTab !== 1,
                                block: openTab === 1,
                            }"
                        >
                            <slot name="tabContent1"></slot>
                        </div>
                        <div
                            v-bind:class="{
                                hidden: openTab !== 2,
                                block: openTab === 2,
                            }"
                        >
                            <slot name="tabContent2"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    tabTitle1: String,
    tabTitle2: String,
});

const openTab = ref(1);

const toggleTabs = (tabNumber) => {
    openTab.value = tabNumber;
};
</script>
