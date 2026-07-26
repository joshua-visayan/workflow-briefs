<script setup lang="ts">
import { useRouter } from "vue-router";
import WorkflowCard from "./WorkflowCard.vue";
import { computed, onMounted, watch } from "vue";
import { useWorkflowsStore } from "../stores/workflowsStore.ts";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useWorkflowsStore()

const { currentPage } = storeToRefs(store)

const goToDetails = (id: number) => {
  router.push(`details/${id}`);
};

watch(currentPage, (page) => {
  store.fetchWorkflows(page)
})

const fromPost = computed(() => (store.currentPage - 1) * 20 + 1)
const toPost = computed(() => (fromPost.value + 20) >= store.totalCount ? store.totalCount : (fromPost.value + 20))

onMounted(async () => {
  store.fetchWorkflows()
});
</script>
<template>
  <p class="mb-3 font-display text-sm">Showing {{ fromPost }}-{{toPost }} of {{ store.totalCount }} posts</p>
  <UPageGrid class="lg:grid-cols-2">
    <WorkflowCard
      v-for="workflow in store.workflows"
      :key="workflow.id"
      @click="goToDetails(workflow.id)"
      :title="workflow.title"
      :description="workflow.workflow_summary"
      :posted_date="workflow.posted_date"
      :tools_mentioned="workflow.tools_mentioned"
    />
  </UPageGrid>
  <div class="flex justify-center w-full">
    <UPagination size="xl" v-model:page="currentPage" :items-per-page="20" :total="store.totalCount" />
  </div>
</template>
