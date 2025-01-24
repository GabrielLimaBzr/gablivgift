<script setup>
</script>

<template>
  <RouterView></RouterView>
</template>

<style>
* {
  box-sizing: border-box;
}

.border {
  border: solid greenyellow 1px;
}

.va-select-dropdown__options-wrapper {
  background-color: #404040 !important;
  backdrop-filter: blur(var(--blur));
  color: var(--va-text-inverted);
}
</style>