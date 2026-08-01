<script setup lang="ts">
import WorkflowList from "./WorkflowList.vue";
import FilterButton from "./FilterButton.vue";
import { useWorkflowsStore } from "../stores/workflowsStore.ts";

const store = useWorkflowsStore();

const FILTER_TOOLS = [
  "n8n",
  "Zapier",
  "Make",
  "Lovable",
  "GoHighLevel",
  "Airtable",
  "Slack",
  "Notion",
];
const CONFIDENCE_LEVELS = ["high", "medium"];

function toggleFilter(title: string) {
  const idx = store.activeFilters.indexOf(title);
  if (idx === -1) {
    store.activeFilters.push(title);
  } else {
    store.activeFilters.splice(idx, 1);
  }
  store.currentPage = 1;
  store.fetchWorkflows(1);
}

function toggleConfidence(level: string) {
  const idx = store.activeConfidence.indexOf(level);
  if (idx === -1) {
    store.activeConfidence.push(level);
  } else {
    store.activeConfidence.splice(idx, 1);
  }
  store.currentPage = 1;
  store.fetchWorkflows(1);
}
</script>

<template>
  <UHeader title="Workflow Gallery" />
  <UContainer>
    <UPage>
      <UPageHeader
        title="Real automation job requests, broken down and explained."
        description="Browse real Upwork automation jobs, rewritten in plain English with suggested workflows to help you practice and build your portfolio"
      />

      <UPageBody>
        <p class="mb-2 text-sm">Filters</p>
        <div class="flex items-center justify-start gap-2 mb-4">
          <FilterButton
            v-for="tool in FILTER_TOOLS"
            :key="tool"
            :title="tool"
            :active="store.activeFilters.includes(tool)"
            @toggle="toggleFilter"
          />
        </div>
        <div class="flex items-center gap-1 mb-2">
          <p class="text-sm">AI Confidence</p>
          <UTooltip
            :delay-duration="200"
            text="High confidence jobs describe the workflow in detail, making the brief more complete and actionable. Medium confidence jobs are less specific."
          >
            <UIcon
              name="i-lucide-info"
              class="size-4 text-gray-400 cursor-default"
            />
          </UTooltip>
        </div>
        <div class="flex items-center justify-start gap-2 mb-10">
          <FilterButton
            v-for="level in CONFIDENCE_LEVELS"
            :key="level"
            :title="level.charAt(0).toUpperCase() + level.slice(1)"
            :active="store.activeConfidence.includes(level)"
            @toggle="() => toggleConfidence(level)"
          />
        </div>
        <WorkflowList />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
