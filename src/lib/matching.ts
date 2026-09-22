import type { Profile, Project, ProjectMatch } from "@/types";

export function scoreProjectMatch(profile: Profile, project: Project): ProjectMatch {
  const userSkills = [...(profile.skills ?? []), ...(profile.languages ?? []), ...(profile.games ?? [])].map((s) => s.name.toLowerCase());
  const projectSkills = (project.skills ?? []).map((s) => s.name.toLowerCase());
  const hits = projectSkills.filter((s) => userSkills.includes(s));
  const score = Math.min(20 + hits.length * 15 + (project.status === "recruiting" ? 10 : 0), 99);
  return { project, score, reasons: hits.length ? [`Skills: ${hits.slice(0, 4).join(", ")}`] : ["Open project"] };
}

export function scoreProject(profile: Profile, project: Project) {
  return scoreProjectMatch(profile, project);
}

export function scorePerson(me: Profile, other: Profile) {
  const mine = new Set([...(me.skills ?? []), ...(me.games ?? [])].map((s) => s.name.toLowerCase()));
  const theirs = [...(other.skills ?? []), ...(other.games ?? [])].map((s) => s.name.toLowerCase());
  const hits = theirs.filter((n) => mine.has(n));
  return { score: Math.min(10 + hits.length * 12, 99), reasons: hits.length ? [`Shared: ${hits.slice(0, 4).join(", ")}`] : [] };
}
