import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteProject, fetchProjectBySlug, toggleSave, isSaved } from "@/services/projects";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { discordProfileUrl } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    void fetchProjectBySlug(slug).then(setProject);
  }, [slug]);
  useEffect(() => {
    if (profile && project) void isSaved(profile.id, project.id).then(setSaved);
  }, [profile, project]);
  if (!project) return <p className="text-zinc-400">Project not found.</p>;
  const contact = project.discord_contact || project.owner?.discord_id;
  const isOwner = profile?.id === project.owner_id;
  const spots = Math.max(0, project.team_size_max - project.team_size_current);

  async function onDelete() {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await deleteProject(project.id);
    navigate("/dashboard");
  }

  return (
    <article className="space-y-4">
      <h1 className="font-display text-3xl font-bold">{project.name}</h1>
      <p className="text-zinc-300 whitespace-pre-wrap">{project.description}</p>
      <p className="text-sm text-zinc-500">
        Status: {project.status} · Team {project.team_size_current}/{project.team_size_max}
        {spots > 0 ? ` · ${spots} spot${spots === 1 ? "" : "s"} open` : " · Team is full"}
      </p>
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
        {isOwner ? <Link to={`/projects/${project.slug}/edit`}><Button variant="secondary">Edit</Button></Link> : null}
        {isOwner ? <Button variant="danger" onClick={() => void onDelete()}>Delete</Button> : null}
      </div>
    </article>
  );
}
