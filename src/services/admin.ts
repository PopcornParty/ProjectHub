import { OWNER_DISCORD_ID } from "@/lib/config";
import { db } from "@/lib/db";

function requireStaff(actorId?: string) {
  const actor = db.get().profiles.find((p) => p.id === actorId);
  if (!actor || (actor.role !== "admin" && actor.role !== "owner")) throw new Error("Not authorized");
  return actor;
}

export async function adminSetStatus(target: string, status: string, _note = "", actorId?: string) {
  requireStaff(actorId);
  const data = db.get();
  const p = data.profiles.find((x) => x.id === target);
  if (!p) return;
  if (p.id === OWNER_DISCORD_ID && actorId !== OWNER_DISCORD_ID) throw new Error("Only the owner can change the owner account");
  p.status = status as typeof p.status;
  db.save(data);
}

export async function adminDeleteProject(target: string) {
  const data = db.get();
  data.projects = data.projects.filter((p) => p.id !== target);
  db.save(data);
}

export async function listAllUsers(search = "") {
  const q = search.toLowerCase();
  return db.get().profiles.filter((p) => !q || p.username.includes(q) || p.display_name.toLowerCase().includes(q));
}

export async function listAllProjects(search = "") {
  const q = search.toLowerCase();
  return db.get().projects.filter((p) => !q || p.name.toLowerCase().includes(q));
}
