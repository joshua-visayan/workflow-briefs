import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../utils/supabase";

export interface Workflow {
  id: number;
  upwork_id: string;
  title: string;
  workflow_summary: string;
  tools_mentioned: string[];
  posted_date: string;
}

const PAGE_SIZE = 20;

export const useWorkflowsStore = defineStore("workflows", () => {
  const workflows = ref<Workflow[]>([]);
  const loading = ref(false);
  const connError = ref<string | null>(null);
  const currentPage = ref(1);
  const totalCount = ref(0);

  const totalPages = computed(() => Math.ceil(totalCount.value / PAGE_SIZE));

  async function fetchWorkflows(page = currentPage.value) {
    loading.value = true;
    connError.value = null;
    try {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error, count } = await supabase
        .from("jobs")
        .select(
          "id, upwork_id, title, workflow_summary, tools_mentioned, posted_date",
          { count: "exact" },
        )
        .eq("qualifies", true)
        .range(from, to);

      if (error) {
        connError.value = error.message;
      } else {
        workflows.value = data ?? [];
        totalCount.value = count ?? 0;
        console.log(totalCount.value)
        currentPage.value = page;
      }
    } catch (e) {
      connError.value = e instanceof Error ? e.message : "Failed to fetch workflows";
    } finally {
      loading.value = false;
    }
  }

  return { workflows, loading, connError, currentPage, totalCount, totalPages, fetchWorkflows };
});
