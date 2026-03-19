<script setup lang="ts">
import DeviceRestrictionOverlay from './components/DeviceRestrictionOverlay.vue';
</script>

<template>
  <RouterView />
  <DeviceRestrictionOverlay />
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
}

html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>
