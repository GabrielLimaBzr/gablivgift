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
    height: 100dvh;
    align-items: center;
}

.lay-cont{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
}
@keyframes hero-gradient-animation {
    0% {
        --c-0: hsla(0, 63%, 30%, 0);
        --x-0: 33%;
        --s-start-0: 0%;
        --s-end-0: 27.60885426007294%;
        --y-0: 49%;
        --y-1: 51%;
        --s-start-1: 12.221950636596706%;
        --s-end-1: 78.61653873376679%;
        --c-1: hsla(0, 0%, 3%, 1);
        --x-1: 95%;
    }

    100% {
        --c-0: hsla(0, 0%, 3%, 0);
        --x-0: 98%;
        --s-start-0: 0%;
        --s-end-0: 40.838370324549416%;
        --y-0: 88%;
        --y-1: 46%;
        --s-start-1: 44.80197560436854%;
        --s-end-1: 78.61653873376679%;
        --c-1: hsla(0, 0%, 3%, 1);
        --x-1: 7%;
    }
}

@property --c-0 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(0, 63%, 30%, 0)
}

@property --x-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 33%
}

@property --s-start-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%
}

@property --s-end-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 27.60885426007294%
}

@property --y-0 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 49%
}

@property --y-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 51%
}

@property --s-start-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 12.221950636596706%
}

@property --s-end-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 78.61653873376679%
}

@property --c-1 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(0, 0%, 3%, 1)
}

@property --x-1 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 95%
}

@property --y-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 52%
}

@property --s-start-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 12.221950636596706%
}

@property --s-end-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 48.141699800112974%
}

@property --c-2 {
    syntax: '<color>';
    inherits: false;
    initial-value: hsla(0, 0%, 3%, 1)
}

@property --x-2 {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 80%
}

.your_css_selector_here {
    --c-0: hsla(0, 63%, 30%, 0);
    --x-0: 33%;
    --y-0: 49%;
    --y-1: 51%;
    --c-1: hsla(0, 0%, 3%, 1);
    --x-1: 95%;
    --y-2: 52%;
    --c-2: hsla(0, 0%, 3%, 1);
    --x-2: 80%;
    ;
    background-color: hsla(338.82352941176475, 76%, 10%, 1);
    background-image: radial-gradient(circle at var(--x-0) var(--y-0), var(--c-0) var(--s-start-0), transparent var(--s-end-0)), radial-gradient(circle at var(--x-1) var(--y-1), var(--c-1) var(--s-start-1), transparent var(--s-end-1)), radial-gradient(circle at var(--x-2) var(--y-2), var(--c-2) var(--s-start-2), transparent var(--s-end-2));
    animation: hero-gradient-animation 10s linear infinite alternate-reverse;
    background-blend-mode: normal, normal, normal;
}
</style>