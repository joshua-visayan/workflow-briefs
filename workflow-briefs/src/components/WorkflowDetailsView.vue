<script setup lang="ts">
import type { TimelineItem } from "@nuxt/ui";
import { ref } from "vue";

const items = ref<TimelineItem[]>([
  {
    title: "Normalize payload",
    description: "Clean fields, dedupe by email against GHL contacts",
  },
  {
    title: "AI qualification",
    description:
      "OpenAI classifies intent (demo / pricing / support) and assigns a 1–5 score",
  },
]);
</script>

<template>
  <UHeader title="All postings" />
  <UContainer class="max-w-5xl">
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
        <h4 class="text-xl font-semibold mb-4">Suggested Workflow</h4>
        <div class="bg-green-500/10 border border-green-500 rounded-lg p-4">
          <UBadge
            icon="i-lucide-info"
            size="md"
            color="primary"
            variant="solid"
            class="mb-5 self-start"
            >AI GENERATED BASED ON THE JOB POSTING</UBadge
          >
          <p class="mb-2 font-semibold">Trigger</p>
          <p class="mb-5">New submission on Webflow contact form (webhook)</p>
          <p class="mb-2 font-semibold">Steps</p>
          <UTimeline
            :default-value="2"
            :items="items"
            class="w-full mb-5"
            :ui="{ indicator: '!rounded-md' }"
          >
            <template #indicator="{ item }">
              <span class="text-xs font-semibold leading-none">
                {{ (items.indexOf(item) + 1).toString().padStart(2, "0") }}
              </span>
            </template>
          </UTimeline>
          <p class="mb-2 font-semibold">Output</p>
          <p class="mb-5">New submission on Webflow contact form (webhook)</p>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
