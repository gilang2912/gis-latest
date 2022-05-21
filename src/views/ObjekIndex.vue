<template>
    <PageComponent heading="Objek Pajak">
        <tabs>
            <tab title="Tab 1">
                <h3>This is Tab First</h3>
            </tab>
            <tab title="Tab 2">
                <h3>This is Tab Second</h3>
            </tab>
        </tabs>
    </PageComponent>
</template>

<script setup>
import PageComponent from '@/components/PageComponent.vue';
import Tabs from '@/components/Tabs.vue';
import Tab from '@/components/Tab.vue';
</script>
