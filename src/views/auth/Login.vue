<template>
    <main>
        <section class="absolute w-full h-full">
            <div
                class="absolute top-0 w-full h-full bg-slate-100 dark:bg-slate-900"
                style="background-size: 100%; background-repeat: no-repeat"
            ></div>
            <div class="container h-full px-4 mx-auto">
                <div
                    class="flex items-center content-center justify-center h-full"
                >
                    <div class="w-full px-4 lg:w-4/12">
                        <div
                            class="relative flex flex-col w-full min-w-0 mb-6 break-words border-0 rounded-lg shadow-lg bg-slate-300"
                        >
                            <div class="px-6 py-6 mb-0 rounded-t">
                                <div
                                    class="flex flex-col items-center justify-center gap-2"
                                >
                                    <div class="inline-flex items-center gap-1">
                                        <img
                                            class="w-14 h-14 drop-shadow-lg"
                                            src="../../assets/logo-mks.png"
                                        />
                                        <LogoBapenda
                                            class="w-12 h-12 drop-shadow-lg"
                                        />
                                    </div>
                                    <h2
                                        class="text-2xl font-bold tracking-tighter"
                                    >
                                        GIS Reklame Kota Makassar
                                    </h2>
                                </div>
                                <hr class="mt-6 border-slate-400 border-b-1" />
                            </div>
                            <div class="flex-auto px-4 py-10 pt-0 lg:px-10">
                                <div
                                    class="mb-3 font-bold text-center text-gray-500"
                                >
                                    <small>Sign in with credentials</small>
                                </div>
                                <form>
                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block mb-2 text-xs font-bold text-gray-700 uppercase"
                                            for="grid-password"
                                            >Username</label
                                        ><input
                                            type="text"
                                            class="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring"
                                            placeholder="Username"
                                            style="
                                                transition: all 0.15s ease 0s;
                                            "
                                        />
                                    </div>
                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block mb-2 text-xs font-bold text-gray-700 uppercase"
                                            for="grid-password"
                                            >Password</label
                                        ><input
                                            type="password"
                                            class="w-full px-3 py-3 text-sm text-gray-700 placeholder-gray-400 bg-white border-0 rounded shadow focus:outline-none focus:ring"
                                            placeholder="Password"
                                            style="
                                                transition: all 0.15s ease 0s;
                                            "
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="inline-flex items-center cursor-pointer"
                                            ><input
                                                id="customCheckLogin"
                                                type="checkbox"
                                                class="w-5 h-5 ml-1 text-gray-800 border-0 rounded form-checkbox"
                                                style="
                                                    transition: all 0.15s ease
                                                        0s;
                                                "
                                            /><span
                                                class="ml-2 text-sm font-semibold text-gray-700"
                                                >Remember me</span
                                            ></label
                                        >
                                    </div>
                                    <div class="mt-6 text-center">
                                        <button
                                            class="w-full px-6 py-3 mb-1 mr-1 text-sm font-bold text-white uppercase bg-gray-900 rounded shadow outline-none active:bg-gray-700 hover:shadow-lg focus:outline-none"
                                            type="button"
                                            style="
                                                transition: all 0.15s ease 0s;
                                            "
                                        >
                                            Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="flex flex-wrap mt-6">
                            <div class="w-1/2">
                                <a href="#pablo" class="text-gray-300"
                                    ><small>Forgot password?</small></a
                                >
                            </div>
                            <div class="w-1/2 text-right">
                                <a href="#pablo" class="text-gray-300"
                                    ><small>Create new account</small></a
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import LogoBapenda from '@/components/LogoBapenda.vue';
</script>
