import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProjectBySlug, toggleSave, isSaved } from "@/services/projects";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { discordProfileUrl } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const { profile } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    fetchProjectBySlug(slug).then(setProject);
  }, [slug]);
  useEffect(() => {
    if (profile && project) isSaved(profile.id, project.id).then(setSaved);
  }, [profile, project]);
  if (!project) return <p className="text-zinc-400">Project not found.</p>;
  const contact = project.discord_contact || project.owner?.discord_id;
  return (
    <article className="space-y-4">
      <h1 className="font-display text-3xl font-bold">{project.name}</h1>
      <p className="text-zinc-300 whitespace-pre-wrap">{project.description}</p>
      <p className="text-sm text-zinc-500">Status: {project.status} · Looking for: {project.roles_needed.join(", ") || "teammates"}</p>
      <div className="flex flex-wrap gap-3">
        {contact ? (
          <a href={discordProfileUrl(project.owner?.discord_id, project.discord_contact)} target="_blank" rel="noreferrer">
            <Button variant="discord">Open Discord</Button>
          </a>
        ) : null}
        {profile ? (
          <Button variant="secondary" onClick={() => { void toggleSave(profile.id, project.id, saved); setSaved(!saved); }}>
            {saved ? "Saved" : "Save"}
          </Button>
        ) : null}
        {profile?.id === project.owner_id ? <Link to={`/projects/${project.slug}/edit`}><Button variant="secondary">Edit</Button></Link> : null}
      </div>
    </article>
  );
}
