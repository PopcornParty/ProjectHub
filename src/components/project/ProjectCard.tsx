import { Link } from "react-router-dom";
import { StatusBadge, Badge } from "@/components/ui/Badge";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/project/${project.slug}`}
      className="glass group block rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-accent-500/30 hover:shadow-glow"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">{project.category?.name ?? "Project"}</p>
          <h3 className="mt-1 font-display text-lg font-semibold group-hover:text-accent-300">{project.name}</h3>
        </div>
        <StatusBadge status={project.status} />
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-zinc-400">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {(project.skills ?? []).slice(0, 4).map((s) => (
          <Badge key={s.id} tone="purple">
            {s.name}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
        <span>
          Team {project.team_size_current}/{project.team_size_max}
        </span>
        <span>{project.owner?.display_name ?? "Owner"}</span>
      </div>
    </Link>
  );
}
