<script setup lang="ts">
import { useRouter } from "vue-router";
import WorkflowCard from "./WorkflowCard.vue";
import type { Workflow } from "../api/getWorkflows.ts";
import { ref } from "vue";

const props = defineProps<{ workflows: Workflow[] }>();
const router = useRouter();

const totalWorkflows = props.workflows.length

const page = ref(1)

const goToDetails = (id: number) => {
  router.push(`details/${id}`);
};
</script>
<template>
  <p class="mb-3 font-display text-sm">{{ totalWorkflows }} postings</p>
  <UPageGrid class="lg:grid-cols-2">
    <WorkflowCard
      v-for="workflow in props.workflows"
      :key="workflow.id"
      @click="goToDetails(workflow.id)"
      :title="workflow.title"
      :description="workflow.workflow_summary"
      :posted_date="workflow.posted_date"
    />
  </UPageGrid>
  <div class="flex justify-center w-full">
    <UPagination size="xl" :page="page" :total="100" />
  </div>
</template>
