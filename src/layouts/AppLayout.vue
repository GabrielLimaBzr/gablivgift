<template>
    <div class="layout effect">
        <div class="lay-cont p-4 pt-14 h-full">
            <NavBar />
            <div class="h-full">
                <router-view />
            </div>
            <footer class="app-footer mt-10 mb-1 grid justify-center">
                <div class="flex space-x-2 h-6 w-full justify-center">
                    <img class="w-6 rounded" src="../assets/gift.ico" alt="LoG">
                    <p class="text-sm">GabLivGifts</p>
                </div>
                <p class="text-sm">&copy; {{ new Date().getFullYear() }} GabLivGifts. Todos os direitos reservados.</p>
            </footer>
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';


</script>

<style>
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

@keyframes hero-gradient-animation {
    0% {
        --x-0: 83%;
        --s-start-0: 13.2209727561817%;
        --s-end-0: 57.79527252984263%;
        --c-0: hsla(344.8387096774194, 76%, 52%, 0.35);
        --y-0: 8%;
        --x-1: 83%;
        --s-start-1: 13.2209727561817%;
        --s-end-1: 57.79527252984263%;
        --c-1: hsla(277.50000000000006, 18%, 7%, 0);
        --y-1: 77%;
        --c-2: hsla(221.5853522805607, 71%, 60%, 0.35);
        --x-2: 16%;
        --y-2: 80%;
        --s-start-2: 10.524512369218554%;
        --s-end-2: 41.41081577193815%;
    }

    100% {
        --x-0: 22%;
        --s-start-0: 8.7617747539524%;
        --s-end-0: 44.205465467741966%;
        --c-0: hsla(277.50000000000006, 18%, 7%, 0);
        --y-0: 81%;
        --x-1: 5%;
        --s-start-1: 8.7617747539524%;
        --s-end-1: 57.90247331543764%;
        --c-1: hsla(88.65168539325842, 71%, 47%, 0.34);
        --y-1: 6%;
        --c-2: hsla(265.2847649069393, 68%, 71%, 0.25);
        --x-2: 90%;
        --y-2: 88%;
        --s-start-2: 7.1392183644121925%;
        --s-end-2: 37.47294723125771%;
    }
}

@property --x-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 83%
}

@property --s-start-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 13.2209727561817%
}

@property --s-end-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 57.79527252984263%
}

@property --c-0 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(344.8387096774194, 76%, 52%, 0.35)
}

@property --y-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 8%
}

@property --x-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 83%
}

@property --s-start-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 13.2209727561817%
}

@property --s-end-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 57.79527252984263%
}

@property --c-1 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(277.50000000000006, 18%, 7%, 0)
}

@property --y-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 77%
}

@property --c-2 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(221.5853522805607, 71%, 60%, 0.35)
}

@property --x-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 16%
}

@property --y-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 80%
}

@property --s-start-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 10.524512369218554%
}

@property --s-end-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 41.41081577193815%
}

.effect {
    --x-0: 83%;
    --c-0: hsla(344.8387096774194, 76%, 52%, 0.35);
    --y-0: 8%;
    --x-1: 83%;
    --c-1: hsla(277.50000000000006, 18%, 7%, 0);
    --y-1: 77%;
    --c-2: hsla(221.5853522805607, 71%, 60%, 0.35);
    --x-2: 16%;
    --y-2: 80%;
    ;
    background-color: hsla(277.5, 20%, 7%, 1);
    background-image: radial-gradient(circle at var(--x-0) var(--y-0), var(--c-0) var(--s-start-0), transparent var(--s-end-0)), radial-gradient(circle at var(--x-1) var(--y-1), var(--c-1) var(--s-start-1), transparent var(--s-end-1)), radial-gradient(circle at var(--x-2) var(--y-2), var(--c-2) var(--s-start-2), transparent var(--s-end-2));
    animation: hero-gradient-animation 5s linear infinite alternate;
    background-blend-mode: normal, normal, normal;
}
</style>