<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen gap-4 bg-slate-100 dark:bg-slate-900"
    >
        <h4
            class="inline-flex items-center gap-2 text-3xl font-bold text-slate-800 dark:text-slate-100"
        >
            Oopss.., Cari apa cuk?
            <EmojiHappyIcon class="w-12 h-12 text-yellow-500 animate-spin" />
        </h4>
        <router-link
            :to="{ name: 'Dashboard' }"
            class="block px-3 py-2 font-semibold bg-indigo-600 rounded shadow text-slate-50"
        >
            <div class="flex items-center gap-1">
                <ArrowCircleLeftIcon class="w-5 h-5" />
                Halaman utama
            </div>
        </router-link>
    </div>
</template>

<script setup>
import { EmojiHappyIcon, ArrowCircleLeftIcon } from '@heroicons/vue/outline';
</script>
