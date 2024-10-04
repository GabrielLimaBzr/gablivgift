<template>
    <div class="layout">
        <div class="lay-cont p-3">
            <NavBar />
            <div class="">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
</script>

<style>
.layout {
    background-color: var(--va-background-primary);
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    align-items: center;
    min-width: 425px;
}

.lay-cont{
    display: flex;
    flex-direction: column;
    border: 1px solid red;
    width: 100%;
    max-width: 1000px;
}
</style>