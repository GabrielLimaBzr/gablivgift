<template>
    <header>
        <div
            class="header fixed top-4 left-1/2 transform -translate-x-1/2 max-w-[968px] w-[90%] py-2 px-4 flex items-center gap-3 justify-between z-10 shadow-md">
            <div class="flex-none h-6 w-6">
                <img class="w-full" src="../assets/logo.svg" alt="LoG">
            </div>

            <div class="flex-grow">
                <VaInput class="w-full sea" v-model="search" @keydown.enter="emitSearch" :clearable="true"
                    color="textInverted" :required="false" @clear="emitSearchClear" placeholder="Buscar Presente">
                    <template #append>
                        <!-- Botão com texto para telas maiores -->
                        <va-button class="hidden md:flex" :disabled="search.length <= 2 || search.length > 100"
                            icon-right="search" size="medium" icon-color="#f32c42" @click="emitSearch">
                            Pesquisar
                        </va-button>

                        <!-- Botão somente com ícone para telas menores -->
                        <va-button class="px-1 md:hidden" :disabled="search.length <= 2 || search.length > 100"
                            icon-right="search" icon-color="#f32c42" @click="emitSearch">
                        </va-button>
                    </template>
                </VaInput>
            </div>

            <div class="flex h-6 w-6 items-center">
                <VaButtonDropdown class="w-full" preset="plain" color="textInverted" hide-icon placement="left-bottom">
                    <template #label>
                        <VaIcon class="w-full" name="settings" size="medium" />
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
import { store } from '@/eventBus';
import { useToast } from 'vuestic-ui'
import { useRouter } from 'vue-router';
const router = useRouter();

const perfil = ref(JSON.parse(localStorage.getItem('user')));

const { init } = useToast()

const openPerfilModal = () => {
    showModal.value = true;
}

const closePerfilModal = () => {
    showModal.value = false;
}

const showModal = ref(false);

const exitApp = () => {
    init({ message: 'Logout realizado.', color: 'info' });
    window.localStorage.clear();
    router.push(`/auth/login`);
}

const search = ref("")

const emitSearchClear = () => {
    store.val = search.value; // Atualiza o estado no EventBus
}

const emitSearch = () => {
    if (search.value.length <= 2) {
        init({ message: 'Digite pelo menos 3 caracteres', color: 'info' });
        return;
    }

    if (search.value.length >= 100) {
        init({ message: 'Muitos caracteres', color: 'info' });
        return;
    }
    store.val = search.value; // Atualiza o estado no EventBus
}

</script>

<style scoped>
.header {
    background: var(--va-custom-bg);
    border-radius: var(--border-radius);
    backdrop-filter: blur(6px);
}
</style>