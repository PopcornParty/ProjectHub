import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { deleteProject, listProjects } from "@/services/projects";
import type { Project } from "@/types";

export function DashboardPage() {
  const { profile, signInWithDiscord } = useAuth();
  const [mine, setMine] = useState<Project[]>([]);

  async function load() {
    if (!profile) return;
    const res = await listProjects({ ownerId: profile.id });
    setMine(res.projects);
  }

  useEffect(() => { void load(); }, [profile]);

  if (!profile) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Sign in to continue</h1>
        <Button className="mt-6" onClick={() => void signInWithDiscord()}>Continue with Discord</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Hey, {profile.display_name}</h1>
      <p className="text-zinc-400">You are signed in as @{profile.username}. Role: {profile.role}.</p>
      <div className="flex flex-wrap gap-3">
        <Link to="/projects/new"><Button>Create project</Button></Link>
        <Link to="/settings/profile"><Button variant="secondary">Edit profile</Button></Link>
        <Link to="/matches"><Button variant="secondary">Matches</Button></Link>
        {profile.role !== "user" ? <Link to="/admin"><Button variant="secondary">Admin</Button></Link> : null}
      </div>
      <section className="space-y-3">
        <h2 className="font-display text-xl font-semibold">Your projects</h2>
        {mine.length === 0 ? <p className="text-sm text-zinc-500">You have not posted a project yet.</p> : null}
        {mine.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 p-3">
            <div>
              <Link to={`/project/${p.slug}`} className="font-medium text-white hover:text-violet-300">{p.name}</Link>
              <p className="text-xs text-zinc-500">Team {p.team_size_current}/{p.team_size_max} · {p.status}</p>
            </div>
            <div className="flex gap-2">
              <Link to={`/projects/${p.slug}/edit`}><Button size="sm" variant="secondary">Edit</Button></Link>
              <Button size="sm" variant="danger" onClick={async () => {
                if (!confirm("Delete this project?")) return;
                await deleteProject(p.id);
                await load();
              }}>Delete</Button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
