<template>
    <div class="app-footer mt-10 mb-1 grid justify-center w-full">
        <div class="flex space-x-2 h-6 w-full justify-center">
            <img class="w-6 rounded" src="../assets/gift.ico" alt="LoG" width="24px" height="24px" fetchpriority="high">
            <p class="text-sm text-center">GabLivGifts</p>
        </div>
        <p class="text-sm">&copy; {{ new Date().getFullYear() }} GabLivGifts. Todos os direitos reservados.</p>
    </div>
</template>

<style scoped>
.app-footer {
    padding: 0.5rem;
    color: #6c757d;
    border: 1px solid #e9ecef29;
    border-radius: var(--border-radius);
}

.layout {
    background-color: rgba(14, 14, 14, 0.72);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    align-items: center;
    background-color: rgb(109, 109, 109)
}

.lay-cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
}
</style>