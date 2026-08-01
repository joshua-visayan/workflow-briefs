import { supabase } from "../utils/supabase";

export interface Workflow {
  id: number;
  upwork_id: string;
  title: string;
  workflow_summary: string;
  tools_mentioned: string[];
  posted_date: string;
}

export async function getWorkflows(): Promise<Workflow[]> {
  const { data, error } = await supabase
    .from("public_jobs")
    .select("id, upwork_id, title, workflow_summary, tools_mentioned, posted_date");

  if (error) throw new Error(error.message);

  return data ?? [];
}
