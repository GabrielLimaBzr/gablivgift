<template>
    <header>
        <div class="header fixed top-4 left-1/2 transform -translate-x-1/2 max-w-[968px] w-[90%] py-2 px-4 flex items-center gap-3 justify-between z-10 shadow-md">
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
                <VaButtonDropdown class="w-full" preset="plain" color="textInverted" hide-icon placement="left">
                    <template #label>
                        <VaIcon class="w-full mb-3" name="settings" size="large" />
                    </template>
                    <div class="z-40">
                        Button with custom label
                    </div>
                </VaButtonDropdown>
            </div>
        </div>
    </header>
</template>
<script setup>
import { ref } from 'vue';

const search = ref('');
</script>
<style>
.header {
    background: var(--va-custom-bg);
    border-radius: 50px;
    backdrop-filter: blur(6px);
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

.va-dropdown__content{
    z-index: 1000 !important;
}
</style>