<template>
    <PageComponent heading="Test Component">
        <TabCustom>
            <template #tabTitle1>
                <ViewListIcon class="w-4 h-4" />
                Objek Pajak
            </template>
            <template #tabTitle2>
                <PencilAltIcon class="w-4 h-4" />
                Input Objek Pajak
            </template>
            <template #tabContent1>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                accusamus aut asperiores consectetur consequuntur magnam porro
                officiis! Hic reiciendis pariatur qui totam quidem ab recusandae
                ea nobis, porro non quibusdam.
            </template>
            <template #tabContent2>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                accusamus magnam expedita quo! Veritatis rem fugiat eveniet
                eligendi est dolorum quibusdam expedita mollitia voluptatem.
                Veniam reprehenderit asperiores quidem commodi adipisci?
            </template>
        </TabCustom>
    </PageComponent>
</template>

<script setup>
import PageComponent from '@/components/PageComponent.vue';
import TabCustom from '@/components/TabCustom.vue';
import { ViewListIcon, PencilAltIcon } from '@heroicons/vue/outline';
</script>
