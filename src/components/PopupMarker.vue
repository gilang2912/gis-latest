<template>
    <div
        class="p-4 font-sans rounded shadow bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-50"
    >
        <div
            class="flex items-center justify-center w-full pb-2 mb-1 space-x-2 border-b"
        >
            <figure
                @click="showSingle"
                v-for="(img, index) in model.images"
                :key="index"
                class="block w-full p-1 transition-shadow duration-200 ease-out transform bg-white rounded cursor-pointer hover:shadow-xl dark:bg-slate-900"
            >
                <img
                    :src="img.path_name"
                    class="block object-fill w-full h-full"
                />
            </figure>
        </div>
        <div class="flex flex-col gap-2">
            <h4 class="text-sm font-semibold tracking-tighter">
                {{ model.nm_wp }}
            </h4>
            <p class="text-sm font-medium text-left">
                <small>{{ model.op }}</small>
            </p>
            <p class="text-sm font-medium text-left capitalize">
                <small>{{ model.jns_reklame }}</small>
            </p>
            <p class="pb-1 text-sm font-medium text-left border-b">
                <small>{{ model.lokasi_objek }}</small>
            </p>
            <p class="pb-2 text-sm font-medium text-left border-b">
                <span
                    class="px-2 py-1 text-xs rounded shadow"
                    :class="{
                        'bg-red-500 text-slate-50': model.status === 3,
                        'bg-green-600 text-slate-50': model.status === 1,
                        'bg-yellow-500 text-slate-50': model.status === 2,
                        'bg-sky-600 text-slate-50': model.status === 4,
                    }"
                >
                    {{ payStatus }}
                </span>
            </p>
            <router-link
                :to="{
                    name: 'ObjekDetail',
                    params: { kdop: model.kd_op },
                }"
                class="px-3 py-2 text-sm text-white bg-indigo-600 rounded shadow"
            >
                <div class="flex items-center justify-center gap-1">
                    Lihat Detail
                    <ChevronRightIcon class="w-4 h-4" />
                </div>
            </router-link>
        </div>
    </div>
</template>
