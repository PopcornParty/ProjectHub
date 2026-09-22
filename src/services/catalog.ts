import { db } from "@/lib/db";
import type { Category, Skill, Tag } from "@/types";

export async function fetchCategories() {
  return db.get().categories.filter((c) => c.is_active) as Category[];
}

export async function fetchSkills() {
  return db.get().skills.filter((s) => s.is_active) as Skill[];
}

export async function fetchTags() {
  return db.get().tags as Tag[];
}

export async function fetchStats() {
  const data = db.get();
  return {
    users: data.profiles.filter((p) => p.status === "active" && p.is_public).length,
    projects: data.projects.filter((p) => !p.is_hidden).length,
    recruiting: data.projects.filter((p) => !p.is_hidden && p.status === "recruiting").length,
  };
}
