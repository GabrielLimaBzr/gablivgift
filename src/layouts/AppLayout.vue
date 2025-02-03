<template>
    <div class="layout effect">
        <NavBar />
        <div class="lay-cont p-4 pt-14 min-h-full">
            <div style="min-height: 85vh;">
                <router-view />
            </div>
            <Footer/>
            
        </div>
    </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';


</script>

<style scoped>

.layout {
    background-color: hsla(277.5, 20%, 7%, 1);
    width: 100%;
    height: 100%;
    min-height: 100vh;
    align-items: center;
    display: flex;
    flex-direction: column;
}

.lay-cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    height: 100%;
    justify-content: space-around;
}

@keyframes hero-gradient-animation {
    0% {
        --c-0: var(--color-3);
        --s-start-0: 4.332528137503798%;
        --s-end-0: 46.687175781645685%;
        --x-0: 37%;
        --y-0: 74%;
        --s-start-1: 13.2209727561817%;
        --s-end-1: 57.79527252984263%;
        --x-1: 94%;
        --y-1: 5%;
        --c-1: var(--color-2);
        --y-2: 90%;
        --x-2: 89%;
        --s-start-2: 13%;
        --s-end-2: 57%;
        --c-2: hsla(285, 20%, 3%, 1);
    }

    100% {
        --c-0: var(--color-3);
        --s-start-0: 5.483113540822528%;
        --s-end-0: 50.77956970313765%;
        --x-0: 87%;
        --y-0: 78%;
        --s-start-1: 13%;
        --s-end-1: 57.90247331543764%;
        --x-1: 17%;
        --y-1: 92%;
        --c-1: hsla(288, 20%, 4%, 1);
        --y-2: 4%;
        --x-2: 6%;
        --s-start-2: 13%;
        --s-end-2: 57%;
        --c-2: var(--color-1);
    }
}

@property --c-0 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(88.65168539325842, 71%, 47%, 0.12)
}

@property --s-start-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 4.332528137503798%
}

@property --s-end-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 46.687175781645685%
}

@property --x-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 37%
}

@property --y-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 74%
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

@property --x-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 94%
}

@property --y-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 5%
}

@property --c-1 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(344.8387096774194, 76%, 52%, 0.35)
}

@property --y-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 90%
}

@property --x-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 89%
}

@property --s-start-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 13%
}

@property --s-end-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 57%
}

@property --c-2 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(285, 20%, 3%, 1)
}

.effect {
    --c-0: hsla(88.65168539325842, 71%, 47%, 0.12);
    --x-0: 37%;
    --y-0: 74%;
    --x-1: 94%;
    --y-1: 5%;
    --c-1: hsla(344.8387096774194, 76%, 52%, 0.35);
    --y-2: 90%;
    --x-2: 89%;
    --c-2: hsla(285, 20%, 3%, 1);
    ;
    background-color: hsla(282.85714285714283, 20%, 6%, 1);
    background-image: radial-gradient(circle at var(--x-0) var(--y-0), var(--c-0) var(--s-start-0), transparent var(--s-end-0)), radial-gradient(circle at var(--x-1) var(--y-1), var(--c-1) var(--s-start-1), transparent var(--s-end-1)), radial-gradient(circle at var(--x-2) var(--y-2), var(--c-2) var(--s-start-2), transparent var(--s-end-2));
    animation: hero-gradient-animation 5s linear infinite alternate;
    background-blend-mode: normal, normal, normal;
}
</style>