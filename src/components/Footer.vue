<template>
    <footer
        class="absolute bottom-0 left-0 z-30 w-full shadow h-14 md:flex md:items-center md:justify-between bg-gradient-to-r from-slate-50 via-purple-500 to-red-500 dark:from-slate-900 dark:via-purple-900 dark:to-red-900 dark:border-slate-700"
    >
        <div class="container">
            <div class="flex items-center justify-between">
                <span
                    class="inline-flex items-center gap-1 text-sm text-gray-800 sm:text-center dark:text-gray-300"
                    >© 2022
                    <a href="https://flowbite.com" class="hover:underline"
                        >GIS Reklame Kota Makassar.</a
                    >
                    Develop by
                    <EmojiHappyIcon class="w-4 h-4 text-yellow-500" />
                </span>
                <ul
                    class="flex flex-wrap items-center mt-3 text-sm text-gray-800 dark:text-gray-300 sm:mt-0"
                >
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6"
                            >About</a
                        >
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6"
                            >Privacy Policy</a
                        >
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6"
                            >Licensing</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { EmojiHappyIcon } from '@heroicons/vue/outline';
</script>
