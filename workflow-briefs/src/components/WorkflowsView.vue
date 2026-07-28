<script setup lang="ts">
import WorkflowList from './WorkflowList.vue';
import FilterButton from './FilterButton.vue';
import { useWorkflowsStore } from '../stores/workflowsStore.ts';

const store = useWorkflowsStore();

const FILTER_TOOLS = ['n8n', 'Zapier', 'Make', 'Lovable', 'GoHighLevel', 'Airtable', 'Slack', 'Notion'];

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
        <div class="flex items-center justify-start gap-2 mb-10">
          <p>Filters</p>
          <FilterButton
            v-for="tool in FILTER_TOOLS"
            :key="tool"
            :title="tool"
            :active="store.activeFilters.includes(tool)"
            @toggle="toggleFilter"
          />
        </div>
        <WorkflowList />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
