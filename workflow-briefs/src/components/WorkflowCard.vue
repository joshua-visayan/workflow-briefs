<script setup lang="ts">
import { ref } from "vue";

const PRIORITY_TOOLS = ["n8n", "Zapier", "Make", "Lovable", "GoHighLevel", "Airtable", "Slack", "Notion"]

const props = defineProps({
  title: String,
  description: String,
  posted_date: String,
  tools_mentioned: Array<String>
});

const isHovered = ref(false);

function getToolBadges(): string[] {
  const tools = (props.tools_mentioned ?? []) as string[];
  const priority = PRIORITY_TOOLS.filter((t) => tools.includes(t));
  const hasOther = tools.some((t) => !PRIORITY_TOOLS.includes(t));
  return hasOther ? [...priority, "Other"] : priority;
}

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
          v-for="tool in getToolBadges()"
          :key="tool"
          :label="tool"
          size="md"
          :color="tool != 'Other' ? 'success' : 'neutral'"
          :variant="tool != 'Other' ? 'solid' : 'outline'"
          class="rounded-full"
        />
      </div>
    </template>
  </UPageCard>
</template>
