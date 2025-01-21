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
                        <VaIcon style="color: white !important;" color="textInverted" name="search"></VaIcon>
                    </template>
                </VaInput>
            </div>

            <div class="flex-none h-6 w-6">
                <VaButtonDropdown class="w-full" preset="plain" color="textInverted" hide-icon placement="bottom-left">
                    <template #label>
                        <VaIcon class="w-full mb-3" name="settings" size="large" />
                    </template>
                    <div class="z-40">
                        <VaMenuList>
                            <VaMenuItem @selected="alert" icon="account_circle">
                                Perfil
                            </VaMenuItem>
                            <VaMenuItem @selected="exitApp()"
                            icon="exit_to_app">
                                Sair
                            </VaMenuItem>
                        </VaMenuList>
                    </div>
                </VaButtonDropdown>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';

const alert = (...args) => window.alert(...args)

const exitApp = () => {
    window.localStorage.removeItem('authToken');
    window.localStorage.removeItem('gifts');
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
    min-width: 130px;
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
}
</style>