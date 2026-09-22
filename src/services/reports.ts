import { supabase } from "@/lib/supabase";
import { validateTextField } from "@/lib/validation";
import type { ReportReason } from "@/types";

export async function submitReport(input: {
  reporterId: string;
  targetType: "profile" | "project";
  targetProfileId?: string;
  targetProjectId?: string;
  reason: ReportReason;
  details: string;
}) {
  const err = validateTextField("Details", input.details, { max: 500 });
  if (err) throw new Error(err);
  const { error } = await supabase.from("reports").insert({
    reporter_id: input.reporterId,
    target_type: input.targetType,
    target_profile_id: input.targetProfileId ?? null,
    target_project_id: input.targetProjectId ?? null,
    reason: input.reason,
    details: input.details.trim(),
  });
  if (error) throw new Error("Could not send this report. Please try again.");
}

export async function listReports(status?: string) {
  let q = supabase.from("reports").select("*").order("created_at", { ascending: false }).limit(200);
  if (status) q = q.eq("status", status);
  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}
