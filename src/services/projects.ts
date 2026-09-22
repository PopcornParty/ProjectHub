import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { sanitizeLinks, validateTextField } from "@/lib/validation";
import type { Project } from "@/types";

function attach(project: Project): Project {
  const data = db.get();
  return {
    ...project,
    owner: data.profiles.find((p) => p.id === project.owner_id),
    category: data.categories.find((c) => c.id === project.category_id) || null,
  };
}

export async function fetchProjectBySlug(slug: string) {
  const project = db.get().projects.find((p) => p.slug === slug);
  return project ? attach(project) : null;
}

export async function listProjects(opts: { search?: string; ownerId?: string; page?: number; pageSize?: number }) {
  const page = opts.page ?? 0;
  const pageSize = opts.pageSize ?? 12;
  let projects = db.get().projects.filter((p) => !p.is_hidden || opts.ownerId === p.owner_id);
  if (opts.ownerId) projects = projects.filter((p) => p.owner_id === opts.ownerId);
  if (opts.search) {
    const q = opts.search.toLowerCase();
    projects = projects.filter((p) => (p.name + p.description).toLowerCase().includes(q));
  }
  return {
    projects: projects.slice(page * pageSize, page * pageSize + pageSize).map(attach),
    count: projects.length,
  };
}

export async function createProject(input: {
  ownerId: string;
  name: string;
  description: string;
  category_id: string | null;
  status: string;
  experience_level: string;
  age_range: string;
  time_commitment: string;
  platform: string;
  roles_needed: string[];
  team_size_current: number;
  team_size_max: number;
  discord_contact: string;
  links: { label: string; url: string }[];
  skillIds: string[];
  tagNames: string[];
}) {
  const nameErr = validateTextField("Project name", input.name, { required: true, min: 3, max: 60 });
  if (nameErr) throw new Error(nameErr);
  const descErr = validateTextField("Description", input.description, { required: true, min: 20, max: 2000 });
  if (descErr) throw new Error(descErr);
  const data = db.get();
  let slug = slugify(input.name) || "project";
  if (data.projects.some((p) => p.slug === slug)) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
  const now = new Date().toISOString();
  const project: Project = {
    id: crypto.randomUUID(),
    owner_id: input.ownerId,
    name: input.name.trim(),
    slug,
    description: input.description.trim(),
    category_id: input.category_id,
    status: input.status as Project["status"],
    experience_level: input.experience_level as Project["experience_level"],
    age_range: (input.age_range || "any") as Project["age_range"],
    time_commitment: input.time_commitment as Project["time_commitment"],
    platform: input.platform,
    roles_needed: input.roles_needed,
    team_size_current: input.team_size_current,
    team_size_max: input.team_size_max,
    discord_contact: input.discord_contact || null,
    links: sanitizeLinks(input.links),
    is_featured: false,
    is_hidden: false,
    created_at: now,
    updated_at: now,
    skills: data.skills.filter((s) => input.skillIds.includes(s.id)),
    tags: [],
  };
  data.projects.unshift(project);
  db.save(data);
  return { id: project.id, slug: project.slug };
}

export async function updateProject(projectId: string, input: Parameters<typeof createProject>[0]) {
  const data = db.get();
  const project = data.projects.find((p) => p.id === projectId);
  if (!project) throw new Error("Could not update this project.");
  Object.assign(project, {
    name: input.name.trim(),
    description: input.description.trim(),
    category_id: input.category_id,
    status: input.status,
    discord_contact: input.discord_contact || null,
    updated_at: new Date().toISOString(),
  });
  db.save(data);
}

export async function toggleSave(userId: string, projectId: string, saved: boolean) {
  const data = db.get();
  data.saved = data.saved.filter((s) => !(s.userId === userId && s.projectId === projectId));
  if (!saved) data.saved.push({ userId, projectId });
  db.save(data);
}

export async function listSaved(userId: string) {
  const data = db.get();
  return data.saved.filter((s) => s.userId === userId).map((s) => data.projects.find((p) => p.id === s.projectId)).filter(Boolean).map((p) => attach(p as Project));
}

export async function isSaved(userId: string, projectId: string) {
  return db.get().saved.some((s) => s.userId === userId && s.projectId === projectId);
}
