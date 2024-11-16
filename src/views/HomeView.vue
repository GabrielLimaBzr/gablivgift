<template>
    <div class="flex flex-col justify-center w-full items-center py-10">
        <h1 class="title">GabLivGifts</h1>
        <p class="sub">Aqui dividimos nossa lista de <span class="fra">presentes</span>, contem uma imensa lista de desesjos!</p>
        <div class="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10 p-2">
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
        </div>
        
    </div>
</template>
<script setup>
import Card from '@/components/Card.vue';
</script>
<style >
.title{
    color: rgba(228, 228, 228, 0.77);
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 800;
}

.sub{
    color: rgba(255, 255, 255, 0.59);
    text-align: center;
}

.fra{
    color: aliceblue;
    line-height: 2.25rem;
    padding: 3px;
    border-bottom: solid 1px var(--va-primary);
}
    
</style>