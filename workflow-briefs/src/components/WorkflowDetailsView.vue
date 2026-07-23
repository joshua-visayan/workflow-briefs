<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui';
import { ref } from 'vue';

const items = ref<TimelineItem[]>([
  {
    title: "Normalize payload",
    description:
      "Clean fields, dedupe by email against GHL contacts",
    icon: "i-lucide-rocket",
  },
  {
    title: "AI qualification",
    description:
      "OpenAI classifies intent (demo / pricing / support) and assigns a 1–5 score",
    icon: "i-lucide-palette",
  },
]);
</script>

<template>
  <UHeader title="All postings" />
  <UContainer>
    <UPage>
      <h1
        class="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl mb-5 pt-12"
      >
        Route inbound leads from web form into GoHighLevel with AI qualification
      </h1>
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

      <UPageBody>
        <h4 class="text-xl font-semibold mb-2">Summary</h4>
        <p>
          Client wants website form submissions scored by an AI, tagged by
          intent, and pushed into GoHighLevel pipelines with the right owner and
          follow-up sequence.
        </p>
        <h4 class="text-xl font-semibold mb-2">Suggested Workflow</h4>
        
        <UTimeline :default-value="2" :items="items" class="w-96" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
