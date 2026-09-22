import { db } from "@/lib/db";
import { validateTextField, validateUrl, validateUsername } from "@/lib/validation";
import type { Profile } from "@/types";

export function fetchProfileById(id: string) {
  return db.get().profiles.find((p) => p.id === id) || null;
}

export async function fetchProfileByUsername(username: string) {
  return db.get().profiles.find((x) => x.username === username && x.status === "active") || null;
}

export async function listPeople(opts: { search?: string; page?: number; pageSize?: number }) {
  const page = opts.page ?? 0;
  const pageSize = opts.pageSize ?? 12;
  let people = db.get().profiles.filter((p) => p.is_public && p.status === "active" && p.is_looking);
  if (opts.search) {
    const q = opts.search.toLowerCase();
    people = people.filter((p) => p.display_name.toLowerCase().includes(q) || p.username.toLowerCase().includes(q));
  }
  return { people: people.slice(page * pageSize, page * pageSize + pageSize), count: people.length };
}

export async function updateProfile(userId: string, patch: Partial<Profile>) {
  const data = db.get();
  const profile = data.profiles.find((p) => p.id === userId);
  if (!profile) throw new Error("Profile not found.");
  if (patch.username) {
    const err = validateUsername(patch.username);
    if (err) throw new Error(err);
  }
  const aboutErr = validateTextField("About me", patch.about_me ?? "", { max: 800 });
  if (aboutErr) throw new Error(aboutErr);
  if (patch.github_url) {
    const e = validateUrl(patch.github_url, "GitHub");
    if (e) throw new Error(e);
  }
  Object.assign(profile, patch, { updated_at: new Date().toISOString() });
  db.save(data);
}

export function deleteOwnAccount(userId: string) {
  const data = db.get();
  const me = data.profiles.find((p) => p.id === userId);
  if (me?.role === "owner") throw new Error("The owner account cannot be deleted.");
  data.profiles = data.profiles.filter((p) => p.id !== userId);
  data.projects = data.projects.filter((p) => p.owner_id !== userId);
  db.save(data);
}
