<template>
    <PageComponent heading="Ganti Password">
        <div class="grid grid-cols-3 gap-4">
            <div class="p-4 rounded-md shadow-md bg-slate-900">
                <form @submit.prevent="handleSubmit">
                    <div class="mb-4">
                        <InputControl
                            type="password"
                            label="Password Sebelumnya"
                            id="old_pass"
                            :required="true"
                            v-model="model.old_password"
                            :value="model.old_password"
                        />
                    </div>
                    <div class="mb-4">
                        <InputControl
                            type="password"
                            label="Password Baru"
                            id="new_pass"
                            :required="true"
                            v-model="model.password"
                            :value="model.password"
                        />
                    </div>
                    <div class="mb-4">
                        <InputControl
                            type="password"
                            label="Konfirmasi Password Baru"
                            id="conf_new_pass"
                            :required="true"
                            v-model="model.password_confirmation"
                            :value="model.password_confirmation"
                        />
                    </div>
                    <div class="flex items-center justify-end gap-1">
                        <BtnDark type="reset">Reset</BtnDark>
                        <BtnPrimary type="submit">Simpan</BtnPrimary>
                    </div>
                </form>
            </div>
            <transition>
                <ToastWarning
                    v-if="toast.warning.show"
                    :message="toast.warning.message"
                    @close="toast.warning.show = false"
                />
            </transition>
            <transition>
                <ToastSuccess
                    v-if="toast.success.show"
                    :message="toast.success.message"
                    @close="toast.success.show = false"
                />
            </transition>
        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from '@/components/PageComponent.vue';
import InputControl from '@/components/partials/InputControl.vue';
import BtnPrimary from '@/components/partials/BtnPrimary.vue';
import BtnDark from '@/components/partials/BtnDark.vue';
import ToastSuccess from '@/components/ToastSuccess.vue';
import ToastWarning from '@/components/ToastWarning.vue';
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const user = computed(() => store.state.auth.data);

const model = reactive({
    id: '',
    old_password: '',
    password: '',
    password_confirmation: '',
});

const toast = reactive({
    success: {
        show: false,
        message: '',
    },
    warning: {
        show: false,
        message: '',
    },
});

function handleSubmit() {
    model.id = user.value.id;
    store
        .dispatch('users/changePass', model)
        .then((res) => {
            if (res.status == 200) {
                toast.success.show = true;
                toast.success.message = res.data.message;

                setTimeout(() => {
                    toast.success.show = false;
                    toast.success.message = '';
                }, 1500);
            }
        })
        .catch((err) => {
            toast.warning.show = true;
            toast.warning.message = Object.keys(err.response.data).includes(
                'password',
            )
                ? err.response.data.password[0]
                : err.response.data.message;
        });
}
</script>
