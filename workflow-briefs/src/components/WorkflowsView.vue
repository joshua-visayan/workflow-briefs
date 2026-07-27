<script setup lang="ts">
import FilterButton from './FilterButton.vue';
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
        <!-- TODO: Make filters section responsive -->
        <div class="flex items-center justify-start gap-2 mb-10">
          <p>Filters</p>
          <FilterButton title="n8n" />
          <FilterButton title="Zapier" />
          <FilterButton title="Make" />
          <FilterButton title="Lovable" />
          <FilterButton title="GoHighLevel" />
          <FilterButton title="Airtable" />
          <FilterButton title="Slack" />
          <FilterButton title="Notion" />
          <FilterButton title="Other" />
        </div>
        <WorkflowList />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
