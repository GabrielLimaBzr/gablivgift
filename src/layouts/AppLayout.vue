<template>
    <div class="layout effect">
        <div class="lay-cont p-4 pt-14">
            <NavBar/>
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
    width: 100%;
    min-height: 100dvh;
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
        --x-0: 98%;
        --c-0: hsla(0, 0%, 100%, 0);
        --s-start-0: 2%;
        --s-end-0: 78.72573401919361%;
        --y-0: 98%;
        --s-start-3: 2%;
        --s-end-3: 78.72573401919361%;
        --y-3: 91%;
        --x-3: 98%;
        --c-3: hsla(352.71844660194176, 98%, 41%, 1);
        --y-4: 79%;
        --c-4: hsla(88.65168539325842, 72%, 47%, 1);
        --x-4: 52%;
        --s-start-4: 2%;
        --s-end-4: 61.288600779667334%;
    }

    100% {
        --x-0: 2%;
        --c-0: hsla(0, 0%, 100%, 0);
        --s-start-0: 2%;
        --s-end-0: 78.72573401919361%;
        --y-0: 98%;
        --s-start-3: 2%;
        --s-end-3: 78.72573401919361%;
        --y-3: 91%;
        --x-3: 98%;
        --c-3: hsla(271.9148936170212, 98%, 53%, 0.3);
        --y-4: 79%;
        --c-4: hsla(152.7642463235294, 100%, 27%, 0.58);
        --x-4: 52%;
        --s-start-4: 2%;
        --s-end-4: 61.288600779667334%;
    }
}

@property --x-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 98%
}

@property --c-0 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(0, 0%, 100%, 0)
}

@property --s-start-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 2%
}

@property --s-end-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 78.72573401919361%
}

@property --y-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 98%
}

@property --x-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 16%
}

@property --y-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 87%
}

@property --c-1 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(181.00000000000003, 85%, 73%, 0.46)
}

@property --s-start-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 2%
}

@property --s-end-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 61.288600779667334%
}

@property --y-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 79%
}

@property --c-2 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(32.323069852941174, 85%, 73%, 0.4)
}

@property --x-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 52%
}

@property --s-start-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 2%
}

@property --s-end-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 61.288600779667334%
}

@property --s-start-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 2%
}

@property --s-end-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 78.72573401919361%
}

@property --y-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 91%
}

@property --x-3 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 98%
}

@property --c-3 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(352.71844660194176, 98%, 41%, 1)
}

@property --y-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 79%
}

@property --c-4 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(88.65168539325842, 72%, 47%, 1)
}

@property --x-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 52%
}

@property --s-start-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 2%
}

@property --s-end-4 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 61.288600779667334%
}

.effect {
    --x-0: 98%;
    --c-0: hsla(0, 0%, 100%, 0);
    --y-0: 98%;
    --x-1: 16%;
    --y-1: 87%;
    --c-1: hsla(181.00000000000003, 85%, 73%, 0.46);
    --y-2: 79%;
    --c-2: hsla(32.323069852941174, 85%, 73%, 0.4);
    --x-2: 52%;
    --y-3: 91%;
    --x-3: 98%;
    --c-3: hsla(352.71844660194176, 98%, 41%, 1);
    --y-4: 79%;
    --c-4: hsla(88.65168539325842, 72%, 47%, 1);
    --x-4: 52%;
    ;
    background-color: hsla(198.00000000000063, 14%, 16%, 1);
    background-image: radial-gradient(circle at var(--x-0) var(--y-0), var(--c-0) var(--s-start-0), transparent var(--s-end-0)), radial-gradient(circle at var(--x-1) var(--y-1), var(--c-1) var(--s-start-1), transparent var(--s-end-1)), radial-gradient(circle at var(--x-2) var(--y-2), var(--c-2) var(--s-start-2), transparent var(--s-end-2)), radial-gradient(circle at var(--x-3) var(--y-3), var(--c-3) var(--s-start-3), transparent var(--s-end-3)), radial-gradient(circle at var(--x-4) var(--y-4), var(--c-4) var(--s-start-4), transparent var(--s-end-4));
    animation: hero-gradient-animation 2s linear infinite alternate-reverse;
    background-blend-mode: overlay, normal, normal, normal, normal;
}
</style>