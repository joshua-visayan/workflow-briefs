<script setup lang="ts">
const props = defineProps({
  title: String,
  description: String,
});
</script>
<template>
  <UPageCard>
    <template #body>
      <div class="flex items-start justify-between w-full gap-4 mb-2">
        <p class="flex-1 min-w-0 font-semibold text-highlighted">
          {{ props.title }}
        </p>
        <p class="text-sm text-muted shrink-0">Jul 18, 2026</p>
      </div>
      <p class="text-[15px] text-pretty">
        {{ props.description }}
      </p>
    </template>

    <template #footer>
      <div class="flex items-center flex-wrap gap-2">
        <UBadge
          label="GoHighLevel"
          color="success"
          variant="solid"
          class="rounded-full"
        />
        <UBadge
          label="Make"
          color="neutral"
          variant="outline"
          class="rounded-full"
        />
        <UBadge
          label="OpenAI"
          color="neutral"
          variant="outline"
          class="rounded-full"
        />
      </div>
    </template>
  </UPageCard>
</template>
