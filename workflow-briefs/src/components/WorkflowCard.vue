<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: String,
  description: String,
  posted_date: String
});

const isHovered = ref(false);

function formatDate() {
  const timestamp = props.posted_date;
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

</script>
<template>
  <UPageCard
    :highlight="isHovered"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    variant="subtle"
    class="cursor-pointer"
  >
    <template #body>
      <div class="flex items-start justify-between w-full gap-4 mb-2">
        <p
          :class="[
            'flex-1 min-w-0 font-semibold',
            isHovered ? 'text-green-400' : 'text-highlighted',
          ]"
        >
          {{ props.title }}
        </p>
        <p class="text-sm text-muted shrink-0">{{ formatDate() }}</p>
      </div>
      <p class="text-[15px] line-clamp-2">
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
