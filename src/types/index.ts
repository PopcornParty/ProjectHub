export type AgeRange = "13-15" | "16-17" | "18-20" | "21+" | "";
export type ExperienceLevel = "beginner" | "intermediate" | "advanced" | "mixed" | "any";
export type Availability = "weekends" | "evenings" | "flexible" | "few-hours" | "not-sure" | "";
export type ProjectStatus = "recruiting" | "planning" | "in_development" | "paused" | "completed";
export type UserStatus = "active" | "suspended" | "banned";
export type UserRole = "user" | "admin" | "owner";
export type ReportReason = "spam" | "scam" | "harassment" | "inappropriate" | "fake" | "privacy" | "other";
export type ReportStatus = "open" | "resolved" | "dismissed";
export type SkillKind = "skill" | "language" | "game" | "interest" | "tool";

export interface Category {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
}

export interface Skill {
  id: string;
  name: string;
  slug: string;
  kind: SkillKind;
  is_active: boolean;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  about_me: string;
  discord_id: string | null;
  discord_username: string | null;
  github_url: string | null;
  youtube_url: string | null;
  portfolio_urls: string[];
  availability: Availability;
  age_range: AgeRange;
  show_age: boolean;
  looking_for: string[];
  experience_level: Exclude<ExperienceLevel, "any">;
  is_public: boolean;
  is_looking: boolean;
  status: UserStatus;
  role: UserRole;
  last_active_at: string;
  created_at: string;
  updated_at: string;
  skills?: Skill[];
  languages?: Skill[];
  games?: Skill[];
  interests?: Skill[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string | null;
  status: ProjectStatus;
  experience_level: ExperienceLevel;
  age_range: AgeRange | "any";
  time_commitment: "casual" | "few-hours" | "regular" | "intensive" | "";
  platform: string;
  roles_needed: string[];
  team_size_current: number;
  team_size_max: number;
  discord_contact: string | null;
  links: ProjectLink[];
  is_featured: boolean;
  is_hidden: boolean;
  created_at: string;
  updated_at: string;
  owner?: Profile;
  category?: Category | null;
  skills?: Skill[];
  tags?: Tag[];
}

export interface Report {
  id: string;
  reporter_id: string;
  target_type: "profile" | "project";
  target_profile_id: string | null;
  target_project_id: string | null;
  reason: ReportReason;
  details: string;
  status: ReportStatus;
  admin_notes: string;
  resolved_by: string | null;
  created_at: string;
  resolved_at: string | null;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  body: string;
  href: string | null;
  is_read: boolean;
  created_at: string;
}

export interface ProjectMatch {
  project: Project;
  score: number;
  reasons: string[];
}

export interface PersonMatch {
  profile: Profile;
  score: number;
  reasons: string[];
}

export interface PlatformStats {
  users: number;
  projects: number;
  recruiting: number;
}
