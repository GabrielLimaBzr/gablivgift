<template>
    <div class="layout your_css_selector_here">
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
    display: flex;
    flex-direction: column;
    width: 100vw;
    min-height: 100dvh;
    align-items: center;
}

.lay-cont{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    
}.your_css_selector_here {
    background-color: hsla(79, 98%, 66%, 1);
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1799 1799' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E"), radial-gradient(circle at 94% 95%, hsla(170, 88%, 68%, 1) 3%, transparent 76%), radial-gradient(circle at 89% 34%, hsla(263, 96%, 51%, 1) 1%, transparent 86%), radial-gradient(circle at 86% 50%, hsla(318, 80%, 65%, 1) 7%, transparent 76%), radial-gradient(circle at 89% 79%, hsla(248, 76%, 53%, 1) 7%, transparent 87%), radial-gradient(circle at 15% 44%, hsla(4, 74%, 80%, 1) 15%, transparent 81%), radial-gradient(circle at 99% 20%, hsla(75, 88%, 92%, 1) 1%, transparent 68%);
    background-blend-mode: overlay, normal, normal, normal, normal, normal, normal;
}
</style>