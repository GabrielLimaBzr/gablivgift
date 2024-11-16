<template>
    <header>
        <div class="header py-2 px-4 mt-4 flex items-center gap-3 justify-between">
            <div class="flex-none h-6 w-6">
                <img class="w-full" src="../assets/logo.svg" alt="LoG">
            </div>

            <div class="flex-grow">
                <VaInput class="w-full" v-model="search" placeholder="Procure eventos..." :clearable="true"
                    color="textInverted">
                    <template #prependInner>
                        <VaIcon style="color: white !important;" color="textInverted" name="search"></VaIcon>
                    </template>
                </VaInput>
            </div>

            <div class="flex-none h-6 w-6">
                <VaButtonDropdown class="w-full" preset="plain" color="textInverted" hide-icon>
                    <template #label>
                        <VaIcon class="w-full mb-3" name="settings" size="large" />
                    </template>
                    Button with custom label
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
    background: rgba(226, 226, 226, 0.253);
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

.drop-shadow {
    -webkit-box-shadow: 0px 0px 11px 5px rgba(0, 0, 0, 0.357);
    -moz-box-shadow: 0px 0px 11px 5px rgba(0, 0, 0, 0.357);
    box-shadow: 0px 0px 11px 5px rgba(95, 95, 95, 0.357);
}
</style>