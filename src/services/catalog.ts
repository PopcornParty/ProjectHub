import { supabase } from "@/lib/supabase";
import type { Category, Skill, Tag } from "@/types";

export async function fetchCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as Category[];
}

export async function fetchSkills() {
  const { data, error } = await supabase.from("skills").select("*").eq("is_active", true).order("name");
  if (error) throw error;
  return (data ?? []) as Skill[];
}

export async function fetchTags() {
  const { data, error } = await supabase.from("tags").select("*").order("name");
  if (error) throw error;
  return (data ?? []) as Tag[];
}

export async function fetchStats() {
  const { data, error } = await supabase.rpc("platform_stats");
  if (error) return { users: 0, projects: 0, recruiting: 0 };
  return data as { users: number; projects: number; recruiting: number };
}
