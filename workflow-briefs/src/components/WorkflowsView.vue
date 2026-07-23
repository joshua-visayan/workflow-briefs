<script setup lang="ts">
import FilterButton from './FilterButton.vue';
import WorkflowList from './WorkflowList.vue';

</script>

<template>
  <UHeader title="Nuxt UI" />
  <UContainer>
    <UPage>
      <UPageHeader
        title="Real automation job requests, broken down and explained."
        description="A reference gallery of live Upwork postings for n8n, Zapier, Make, Lovable and GoHighLevel work paraphrased in plain English, with a suggested workflow you can actually build."
      />

      <UPageBody>
        <UInput ref="input" icon="i-lucide-search" placeholder="Search..." size="lg" class="w-full mb-3" />
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
        </div>
        <WorkflowList />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
