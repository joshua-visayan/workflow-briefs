<script setup lang="ts">
import { useRouter } from "vue-router";
import WorkflowCard from "./WorkflowCard.vue";
import { computed, onMounted, watch } from "vue";
import { useWorkflowsStore } from "../stores/workflowsStore.ts";
import { storeToRefs } from "pinia";

const router = useRouter();
const store = useWorkflowsStore()

const { currentPage, loading } = storeToRefs(store)

const goToDetails = (id: number) => {
  router.push(`details/${id}`);
};

watch(currentPage, (page) => {
  store.fetchWorkflows(page)
})

const fromPost = computed(() => (store.currentPage - 1) * 20 + 1)
const toPost = computed(() => (fromPost.value + 19) >= store.totalCount ? store.totalCount : (fromPost.value + 19))

onMounted(async () => {
  store.fetchWorkflows()
});
</script>
<template>
  <!-- Loading skeleton -->
  <template v-if="loading">
    <USkeleton class="h-3 w-48 mb-3" />
    <UPageGrid class="lg:grid-cols-2">
      <UPageCard v-for="n in 6" :key="n" variant="subtle">
        <template #body>
          <div class="flex items-start justify-between w-full gap-4 mb-2">
            <USkeleton class="h-4 w-3/5" />
            <USkeleton class="h-3 w-20 shrink-0" />
          </div>
          <USkeleton class="h-3 w-full mb-1" />
          <USkeleton class="h-3 w-4/5" />
        </template>
        <template #footer>
          <div class="flex items-center flex-wrap gap-2">
            <USkeleton v-for="b in 3" :key="b" class="h-5 w-14 rounded-full" />
          </div>
        </template>
      </UPageCard>
    </UPageGrid>
  </template>

  <!-- Loaded content -->
  <template v-else>
    <template v-if="store.workflows.length === 0">
      <p class="text-muted text-sm">No workflows match the selected filters. Try removing a filter or clearing them all.</p>
    </template>
    <template v-else>
      <p class="mb-3 font-display text-sm">Showing {{ fromPost }}-{{ toPost }} of {{ store.totalCount }} posts</p>
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
  </template>
</template>
