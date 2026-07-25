<script setup lang="ts">
import { useRouter } from "vue-router";
import WorkflowCard from "./WorkflowCard.vue";
import type { Workflow } from '../api/getWorkflows.ts';

const props = defineProps<{ workflows: Workflow[] }>();

const router = useRouter();

const goToDetails = (id: number) => {
  router.push(`details/${id}`);
};
</script>
<template>
  <p class="mb-3 font-display text-sm">{{ props.workflows.length }} postings</p>
  <UPageGrid class="lg:grid-cols-2">
    <WorkflowCard
      v-for="workflow in props.workflows"
      :key="workflow.id"
      @click="goToDetails(workflow.id)"
      :title="workflow.title"
      :description="workflow.workflow_summary"
    />
  </UPageGrid>
</template>
