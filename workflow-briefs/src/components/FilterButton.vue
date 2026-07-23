<script setup lang="ts">
const props = defineProps({
  title: String,
});

const emit = defineEmits<{
  (e: "click", id: number): void;
}>();
</script>
<template>
  <UButton
    class="font-bold rounded-full hover:text-green-500 hover:ring-green-500 focus:bg-green-500 focus:text-black focus:ring-green-500"
    variant="outline"
    color="neutral"
  >
    {{ props.title }}
  </UButton>
</template>
