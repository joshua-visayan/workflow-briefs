<script setup lang="ts">
import { useRouter } from "vue-router";
import WorkflowCard from "./WorkflowCard.vue";

const router = useRouter()

const goToDetails = () => {
  router.push("details")
}
</script>
<template>
  <p class="mb-3">6 postings</p>
  <UPageGrid class="lg:grid-cols-2">
    <WorkflowCard
      @click="goToDetails"
      title="Tailwind CSS"
      description="Nuxt UI integrates with latest Tailwind CSS, bringing significant improvements."
    />
  </UPageGrid>
</template>
