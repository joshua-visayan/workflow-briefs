<script setup lang="ts">
import type { TimelineItem } from "@nuxt/ui";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import {
  getWorkflowDetails,
  type WorkflowDetails,
} from "../api/getWorkflowDetails.ts";

const route = useRoute();
const id = Number(route.params.id);

const workflowDetails = ref<WorkflowDetails | null>(null);
const items = ref<TimelineItem[]>([]);

const convertSteps = (steps: string[]): TimelineItem[] =>
  steps.map((step) => ({ title: step }));

const goToOriginalPost = () => {
  window.open(workflowDetails.value?.source_url, "_blank")
}

function formatDate() {
  const timestamp = workflowDetails.value?.posted_date;
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

onMounted(async () => {
  workflowDetails.value = await getWorkflowDetails(id);
  items.value = convertSteps(workflowDetails.value.suggested_steps);
});
</script>

<template>
  <UHeader>
    <template #title>
      <UIcon name="i-lucide-arrow-left" class="size-5" />
      <p class="text-sm text-gray-100 font-light font-display">ALL POSTINGS</p>
    </template>
  </UHeader>
  <UContainer class="max-w-4xl">
    <UPage>
      <p class="text-xs font-light mb-2 mt-8 font-display">
        POSTED {{ formatDate().toUpperCase() }}
      </p>
      <h1
        class="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl mb-5 pt-5"
      >
        {{ workflowDetails?.title }}
      </h1>
      <div class="flex items-center flex-wrap gap-2">
        <UBadge
          v-for="tool in workflowDetails?.tools_mentioned"
          :label="tool"
          color="success"
          variant="solid"
          class="rounded-full"
        />
      </div>

      <UPageBody>
        <h4 class="text-xs font-light mb-2 font-display">SUMMARY</h4>
        <p>
          {{ workflowDetails?.workflow_summary }}
        </p>
        <h4 class="text-xs font-light mb-4 font-display">SUGGESTED WORKFLOW</h4>
        <div
          class="bg-yellow-500/5 border border-yellow-500 rounded-lg p-4 mb-2"
          v-if="workflowDetails?.confidence != 'high'"
        >
          <p class="text-xs text-yellow-200">
            AI confidence is not high so it is recommended to check the <span class="underline cursor-pointer" @click="goToOriginalPost">original
            job post</span> for full context before relying on this workflow breakdown. 
          </p>
        </div>
        <div class="bg-green-500/5 border border-green-500 rounded-lg p-4">
          <UBadge
            icon="i-lucide-info"
            size="md"
            color="primary"
            variant="solid"
            class="mb-5 self-start"
            >AI GENERATED BASED ON THE JOB POSTING</UBadge
          >
          <p class="mb-1 text-xs font-light font-display">TRIGGER</p>
          <p class="mb-10">
            {{
              workflowDetails?.suggested_trigger?.replace(/^\w/, (c) =>
                c.toUpperCase(),
              )
            }}
          </p>
          <p class="mb-3 text-xs font-light font-display">STEPS</p>
          <UTimeline
            :default-value="items.length"
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
          <p class="mb-1 text-xs font-light font-display">OUTPUT</p>
          <p class="mb-5">
            {{
              workflowDetails?.suggested_output?.replace(/^\w/, (c) =>
                c.toUpperCase(),
              )
            }}
          </p>
          <p class="mb-1 text-xs font-light font-display">NOTES</p>
          <p class="mb-5">
            {{ workflowDetails?.notes }}
          </p>
        </div>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
