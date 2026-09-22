import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/project/ProjectCard";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { listProjects } from "@/services/projects";
import type { Project } from "@/types";

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    listProjects({ search: q }).then((r) => setProjects(r.projects));
  }, [q]);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Projects</h1>
          <p className="text-sm text-zinc-400">Find something to join or build.</p>
        </div>
        <Link to="/projects/new"><Button>New project</Button></Link>
      </div>
      <Input placeholder="Search projects" value={q} onChange={(e) => setQ(e.target.value)} />
      {projects.length === 0 ? (
        <EmptyState title="No projects yet" body="Be the first to post one." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </div>
  );
}
