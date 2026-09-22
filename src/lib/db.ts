import { OWNER_DISCORD_ID } from "@/lib/config";
import type { Category, Profile, Project, Report, Skill, Tag } from "@/types";

const KEY = "projecthub_db_v1";

export type AppDB = {
  profiles: Profile[];
  projects: Project[];
  reports: Report[];
  saved: { userId: string; projectId: string }[];
  views: { userId: string; projectId: string; viewedAt: string }[];
  blocks: { blockerId: string; blockedId: string }[];
  notifications: { id: string; userId: string; title: string; body: string; href: string | null; is_read: boolean; created_at: string }[];
  categories: Category[];
  skills: Skill[];
  tags: Tag[];
};

const starterSkills: Skill[] = [
  "HTML", "CSS", "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Lua", "GitHub",
  "Minecraft", "Minecraft Bedrock", "Minecraft Java", "Redstone", "Commands", "Add-ons",
  "Discord Bots", "Discord Server Management", "Graphic Design", "Video Editing", "3D Modelling",
  "Blender", "Unity", "Unreal Engine", "Roblox Studio", "Roblox", "Fortnite", "YouTube",
  "Building", "Pixel Art", "UI Design", "Music", "Writing", "Community Management",
].map((name, i) => ({
  id: `skill-${i}`,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  kind: ["HTML","CSS","JavaScript","TypeScript","Python","Java","C#","C++","Lua"].includes(name)
    ? "language"
    : ["Minecraft","Minecraft Bedrock","Minecraft Java","Roblox","Fortnite"].includes(name)
      ? "game"
      : name === "YouTube"
        ? "interest"
        : ["GitHub","Blender","Unity","Unreal Engine","Roblox Studio"].includes(name)
          ? "tool"
          : "skill",
  is_active: true,
}));

const starterCategories: Category[] = [
  "Minecraft","Discord","Coding","Web Development","Game Development","YouTube","Video Editing","Graphic Design","Roblox","Fortnite","Other",
].map((name, i) => ({
  id: `cat-${i}`,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  sort_order: (i + 1) * 10,
  is_active: true,
}));

function empty(): AppDB {
  return {
    profiles: [],
    projects: [],
    reports: [],
    saved: [],
    views: [],
    blocks: [],
    notifications: [],
    categories: starterCategories,
    skills: starterSkills,
    tags: [],
  };
}

function read(): AppDB {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    return { ...empty(), ...JSON.parse(raw) };
  } catch {
    return empty();
  }
}

function write(db: AppDB) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

export const db = {
  get: read,
  save: write,
  reset() {
    write(empty());
  },
};

export function upsertProfileFromDiscord(user: {
  id: string;
  username: string;
  global_name?: string | null;
  avatar?: string | null;
  avatarUrl?: string;
}) {
  const data = read();
  const existing = data.profiles.find((p) => p.id === user.id);
  const role = user.id === OWNER_DISCORD_ID ? "owner" : existing?.role ?? "user";
  const now = new Date().toISOString();
  if (existing) {
    existing.discord_id = user.id;
    existing.discord_username = user.username;
    existing.avatar_url = user.avatarUrl || existing.avatar_url;
    existing.last_active_at = now;
    existing.role = role;
    if (role === "owner") existing.status = "active";
  } else {
    const username = uniqueUsername(data, user.username || "user");
    data.profiles.push({
      id: user.id,
      username,
      display_name: user.global_name || user.username || "Builder",
      avatar_url: user.avatarUrl || null,
      about_me: "",
      discord_id: user.id,
      discord_username: user.username,
      github_url: null,
      youtube_url: null,
      portfolio_urls: [],
      availability: "",
      age_range: "",
      show_age: false,
      looking_for: [],
      experience_level: "beginner",
      is_public: true,
      is_looking: true,
      status: "active",
      role,
      last_active_at: now,
      created_at: now,
      updated_at: now,
      skills: [],
      languages: [],
      games: [],
      interests: [],
    });
  }
  write(data);
  return data.profiles.find((p) => p.id === user.id)!;
}

function uniqueUsername(data: AppDB, base: string) {
  const slug = base.toLowerCase().replace(/[^a-z0-9_]+/g, "").slice(0, 20) || "user";
  let name = slug;
  let n = 0;
  while (data.profiles.some((p) => p.username === name)) {
    n += 1;
    name = `${slug}${n}`;
  }
  return name;
}
