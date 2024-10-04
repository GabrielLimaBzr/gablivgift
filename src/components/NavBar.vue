<template>
    <header>
        <div class="header py-3 px-8 mt-8">
            <div>
                <img class="logo" src="../assets/logo.svg" alt="LoG">
            </div>
            <div class="actions">
                <VaInput class="ac" v-model="search" placeholder="Procure eventos..." :clearable="true"
                    color="textInverted">
                    <template #prependInner>
                        <VaIcon color="textInverted" name="search"></VaIcon>
                    </template>
                </VaInput>
            </div>
            <div>
                <VaButtonDropdown preset="plain" color="textInverted" hide-icon>
                    <template #label>
                        <VaIcon name="settings" size="large" />
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
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
    background-color: var(--va-background-secondary);
    border-radius: 50px;
    justify-content: space-between;
}

.logo {
    width: 25px;
    height: 25px;
}

.actions {
    width: 100%;
}

.ac {
    width: 100%;
}
</style>