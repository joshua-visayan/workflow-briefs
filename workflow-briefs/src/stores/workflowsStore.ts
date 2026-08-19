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
  confidence: string;
}

const PAGE_SIZE = 20;

export const useWorkflowsStore = defineStore("workflows", () => {
  const workflows = ref<Workflow[]>([]);
  const loading = ref(false);
  const connError = ref<string | null>(null);
  const currentPage = ref(1);
  const totalCount = ref(0);
  const activeFilters = ref<string[]>([]);
  const activeConfidence = ref<string[]>([]);
  const sortOrder = ref<"date-desc" | "date-asc" | "id-desc">("date-desc");

  const totalPages = computed(() => Math.ceil(totalCount.value / PAGE_SIZE));

  async function fetchWorkflows(page = currentPage.value) {
    loading.value = true;
    connError.value = null;
    try {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("jobs")
        .select(
          "id, upwork_id, title, workflow_summary, tools_mentioned, posted_date, confidence",
          { count: "exact" },
        )
        .eq("qualifies", true);

      if (activeFilters.value.length > 0) {
        query = query.overlaps("tools_mentioned", activeFilters.value);
      }

      if (activeConfidence.value.length > 0) {
        query = query.in("confidence", activeConfidence.value);
      }

      if (sortOrder.value === "id-desc") {
        query = query.order("id", { ascending: false });
      } else {
        query = query.order("posted_date", { ascending: sortOrder.value === "date-asc" });
      }

      const { data, error, count } = await query.range(from, to);

      if (error) {
        connError.value = error.message;
      } else {
        workflows.value = data ?? [];
        totalCount.value = count ?? 0;
        currentPage.value = page;
      }
    } catch (e) {
      connError.value = e instanceof Error ? e.message : "Failed to fetch workflows";
    } finally {
      loading.value = false;
    }
  }

  return { workflows, loading, connError, currentPage, totalCount, totalPages, activeFilters, activeConfidence, sortOrder, fetchWorkflows };
});
