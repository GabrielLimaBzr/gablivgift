<template>
    <header>
        <div class="header py-2 px-6 mt-4 flex items-center gap-3 justify-between">
            <div class="flex-none h-6 w-6">
                <img class="w-full" src="../assets/logo.svg" alt="LoG">
            </div>

            <div class="flex-grow">
                <VaInput class="w-full"v-model="search" placeholder="Procure eventos..." :clearable="true" color="textInverted">
                    <template #prependInner>
                        <VaIcon color="textInverted" name="search"></VaIcon>
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
    background-color: var(--va-background-secondary);
    border-radius: 50px;
}

.va-input-wrapper__size-keeper {
    width: 100%;
}
</style>