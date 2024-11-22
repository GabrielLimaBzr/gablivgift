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
</style>