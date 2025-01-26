<template>
    <header>
        <div
            class="header fixed top-4 left-1/2 transform -translate-x-1/2 max-w-[968px] w-[90%] py-2 px-4 flex items-center gap-3 justify-between z-10 shadow-md">
            <div class="flex-none h-6 w-6">
                <img class="w-full" src="../assets/logo.svg" alt="LoG">
            </div>

            <div class="flex-grow">
                <VaInput class="w-full" v-model="search" placeholder="Procurar presente..." :clearable="true"
                    color="textInverted">
                    <template #prependInner>
                        <VaIcon  style="color: white !important;" color="textInverted" name="search"></VaIcon>
                    </template>
                </VaInput>
            </div>

            <div class="flex-none h-6 w-6">
                <VaButtonDropdown class="w-full" preset="plain" color="textInverted" hide-icon placement="left-bottom">
                    <template #label>
                        <VaIcon class="w-full" name="settings" size="" />
                    </template>
                    <div class="z-40">
                        <VaMenuList>
                            <VaMenuItem @selected="openPerfilModal()" icon="account_circle">
                                Perfil
                            </VaMenuItem>

                            <VaMenuItem @selected="exitApp()" icon="exit_to_app">
                                Sair
                            </VaMenuItem>
                        </VaMenuList>
                    </div>
                </VaButtonDropdown>
                <UserDetailModal @canceled="closePerfilModal()" :is-active="showModal" :item="perfil" />
            </div>
        </div>

    </header>
</template>

<script setup>
import { ref } from 'vue';
import UserDetailModal from './UserDetailModal.vue';

const perfil = ref(JSON.parse(localStorage.getItem('user')));

const openPerfilModal = () => {
    showModal.value = true;
}

const closePerfilModal = () => {
    showModal.value = false;
}

const showModal = ref(false);

const exitApp = () => {
    window.localStorage.clear();
    window.location.href = '/auth';
}

const search = ref('');
</script>

<style>
.header {
    background: var(--va-custom-bg);
    border-radius: var(--border-radius);
    backdrop-filter: blur(6px);
}

.va-menu-list {
    max-width: 100px !important;
    min-width: 100px !important;
}

.va-input-wrapper__size-keeper {
    width: 100%;
}

.va-input-wrapper__text input {
    color: white;
}

.va-icon.va-icon {
    color: white !important;
}

.va-dropdown__content {
    z-index: 1000 !important;
    max-width: 120px;
}
</style>