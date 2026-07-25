import { supabase } from "../utils/supabase";

export interface Workflow {
  id: number;
  upwork_id: string;
  title: string;
  workflow_summary: string;
  tools_mentioned: string[];
}

export async function getWorkflows(): Promise<Workflow[]> {
  const { data, error } = await supabase
    .from("jobs")
    .select("id, upwork_id, title, workflow_summary, tools_mentioned")
    .eq('qualifies', true);

  if (error) throw new Error(error.message);

  return data ?? [];
}
