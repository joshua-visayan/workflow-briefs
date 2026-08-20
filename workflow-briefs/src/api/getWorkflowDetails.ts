import { supabase } from "../utils/supabase";

export interface WorkflowDetails {
  id: number;
  upwork_id: string;
  title: string;
  workflow_summary: string;
  source_url: string;
  posted_date: string;
  suggested_trigger: string;
  suggested_steps: string[];
  step_desc: string[] | null;
  suggested_output: string;
  notes: string;
  tools_mentioned: string[];
  confidence: string;
}

export async function getWorkflowDetails(id: number): Promise<WorkflowDetails> {
  const { data, error } = await supabase
    .from("public_jobs")
    .select(
      "id, upwork_id, title, workflow_summary,source_url, posted_date, suggested_trigger, suggested_steps, suggested_output, notes, tools_mentioned, confidence, step_desc",
    )
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}
