<template>
    <nav
        class="border-b bg-slate-50 border-slate-200 dark:bg-slate-900 dark:border-slate-700"
    >
        <div class="container">
            <div class="flex items-center justify-between h-16">
                <div>
                    <a class="text-xl font-bold tracking-tighter">
                        GIS Reklame
                    </a>
                </div>
                <div class="flex items-center gap-4 font-medium">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/objek-pajak">Objek Pajak</NavLink>
                    <Dropdown name="Aplikasi">
                        <DropdownLink path="#">Manage Users</DropdownLink>
                        <DropdownLink path="#">Privileges</DropdownLink>
                        <DropdownLink path="#">Referensi</DropdownLink>
                    </Dropdown>
                </div>
                <div class="flex items-center">
                    <Dropdown name="Nama">
                        <DropdownLink path="#">Profile</DropdownLink>
                        <DropdownLink path="#" name="Logout" />
                    </Dropdown>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import Dropdown from './partials/Dropdown.vue';
import DropdownLink from './partials/DropdownLink.vue';
import NavLink from './partials/NavLink.vue';
</script>
