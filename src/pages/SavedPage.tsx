import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/project/ProjectCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { listSaved, toggleSave } from "@/services/projects";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/types";

export function SavedPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!user) return;
    listSaved(user.id).then(setProjects).catch(() => setProjects([]));
  }, [user]);

  if (!user) return <p className="py-16 text-center">Sign in to see saved projects.</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Saved projects</h1>
      {projects.length === 0 ? (
        <div className="mt-8">
          <EmptyState title="Nothing saved yet." body="Tap Save on a project page to keep it here." actionLabel="Explore Projects" actionTo="/projects" />
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p.id} className="space-y-2">
              <ProjectCard project={p} />
              <Button
                size="sm"
                variant="ghost"
                onClick={async () => {
                  await toggleSave(user.id, p.id, true);
                  setProjects((list) => list.filter((x) => x.id !== p.id));
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
