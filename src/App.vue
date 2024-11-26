<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';

</script>

<template>
  <SpeedInsights />
  <RouterView></RouterView>
</template>

<style>
* {
  box-sizing: border-box;
}

.va-select-dropdown__options-wrapper{
  background-color: #404040 !important;
  backdrop-filter: blur(var(--blur));
  color: var(--va-text-inverted);
}
</style>