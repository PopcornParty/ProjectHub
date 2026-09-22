import { db } from "@/lib/db";
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
  const data = db.get();
  data.reports.unshift({
    id: crypto.randomUUID(),
    reporter_id: input.reporterId,
    target_type: input.targetType,
    target_profile_id: input.targetProfileId ?? null,
    target_project_id: input.targetProjectId ?? null,
    reason: input.reason,
    details: input.details.trim(),
    status: "open",
    admin_notes: "",
    resolved_by: null,
    created_at: new Date().toISOString(),
    resolved_at: null,
  });
  db.save(data);
}

export async function listReports(status?: string) {
  const rows = db.get().reports;
  return status ? rows.filter((r) => r.status === status) : rows;
}
