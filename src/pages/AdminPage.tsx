import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { listAllProjects, listAllUsers, adminDeleteProject, adminSetStatus } from "@/services/admin";
import { listReports } from "@/services/reports";
import { Button } from "@/components/ui/Button";
import type { Profile, Project, Report } from "@/types";

export function AdminPage() {
  const { profile } = useAuth();
  const [users, setUsers] = useState<Profile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  useEffect(() => {
    if (!profile || (profile.role !== "owner" && profile.role !== "admin")) return;
    listAllUsers().then(setUsers);
    listAllProjects().then(setProjects);
    listReports().then(setReports);
  }, [profile]);
  if (!profile || (profile.role !== "owner" && profile.role !== "admin")) {
    return <p className="text-zinc-400">Admin only.</p>;
  }
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold">Admin</h1>
      <section>
        <h2 className="mb-3 font-semibold">Users</h2>
        {users.map((u) => (
          <div key={u.id} className="mb-2 flex items-center justify-between gap-3 rounded-xl border border-white/10 p-3">
            <span>@{u.username} · {u.role} · {u.status}</span>
            <Button size="sm" variant="danger" onClick={() => void adminSetStatus(u.id, "suspended", "", profile.id)}>Suspend</Button>
          </div>
        ))}
      </section>
      <section>
        <h2 className="mb-3 font-semibold">Projects</h2>
        {projects.map((p) => (
          <div key={p.id} className="mb-2 flex items-center justify-between gap-3 rounded-xl border border-white/10 p-3">
            <span>{p.name}</span>
            <Button size="sm" variant="danger" onClick={() => { void adminDeleteProject(p.id); setProjects((x) => x.filter((i) => i.id !== p.id)); }}>Delete</Button>
          </div>
        ))}
      </section>
      <section>
        <h2 className="mb-3 font-semibold">Reports</h2>
        {reports.length === 0 ? <p className="text-zinc-500">No reports.</p> : reports.map((r) => (
          <p key={r.id} className="text-sm text-zinc-300">{r.reason}: {r.details}</p>
        ))}
      </section>
    </div>
  );
}
