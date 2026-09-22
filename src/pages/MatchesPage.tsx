import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ProjectCard } from "@/components/project/ProjectCard";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { listProjects } from "@/services/projects";
import { listPeople } from "@/services/profiles";
import { scoreProject, scorePerson } from "@/lib/matching";
import type { Project, Profile } from "@/types";

export function MatchesPage() {
  const { profile, signInWithDiscord } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [people, setPeople] = useState<Profile[]>([]);
  useEffect(() => {
    if (!profile) return;
    Promise.all([listProjects({}), listPeople({})]).then(([a, b]) => {
      setProjects(
        [...a.projects].sort(
          (x, y) => scoreProject(profile, y).score - scoreProject(profile, x).score
        )
      );
      setPeople(
        b.people
          .filter((p) => p.id !== profile.id)
          .sort((x, y) => scorePerson(profile, y).score - scorePerson(profile, x).score)
      );
    });
  }, [profile]);
  if (!profile) {
    return <button className="text-violet-300" onClick={() => void signInWithDiscord()}>Sign in to see matches</button>;
  }
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold">Matches</h1>
      <section className="grid gap-4 sm:grid-cols-2">{projects.slice(0, 6).map((p) => <ProjectCard key={p.id} project={p} />)}</section>
      <section className="grid gap-4 sm:grid-cols-2">{people.slice(0, 6).map((p) => <ProfileCard key={p.id} profile={p} />)}</section>
    </div>
  );
}
