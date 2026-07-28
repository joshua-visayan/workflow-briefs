<script setup lang="ts">
import WorkflowList from './WorkflowList.vue';

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
        <WorkflowList />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
