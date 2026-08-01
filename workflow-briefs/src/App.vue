<script setup lang="ts">
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <UApp>
    <RouterView />
  </UApp>
</template>
