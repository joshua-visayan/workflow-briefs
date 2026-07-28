<script setup lang="ts">
const props = defineProps({
  title: String,
  active: { type: Boolean, default: false },
});

const emit = defineEmits<{
  (e: "toggle", title: string): void;
}>();
</script>
<template>
  <UButton
    :class="[
      'font-bold rounded-full',
      props.active
        ? 'bg-green-500 text-black ring-green-500 hover:bg-green-400'
        : 'hover:text-green-500 hover:ring-green-500',
    ]"
    :variant="props.active ? 'solid' : 'outline'"
    :color="props.active ? 'primary' : 'neutral'"
    @click="emit('toggle', props.title!)"
  >
    {{ props.title }}
  </UButton>
</template>
