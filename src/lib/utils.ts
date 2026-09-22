export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function timeAgo(iso: string) {
  const delta = Date.now() - new Date(iso).getTime();
  const min = Math.floor(delta / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 14) return `${day}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function discordProfileUrl(discordId?: string | null, username?: string | null) {
  if (discordId) return `https://discord.com/users/${discordId}`;
  if (username) return `https://discord.com/users/${encodeURIComponent(username)}`;
  return "https://discord.com/app";
}

export function safeExternalUrl(raw: string) {
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function debounce<T extends (...args: never[]) => void>(fn: T, wait = 250) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

export function completionFromProfile(input: {
  display_name?: string;
  about_me?: string;
  avatar_url?: string | null;
  skillsCount?: number;
  looking_for?: string[];
  availability?: string;
  experience_level?: string;
  github_url?: string | null;
  youtube_url?: string | null;
  portfolio_urls?: string[];
  discord_id?: string | null;
}) {
  const checks = [
    { ok: Boolean(input.display_name), label: "Display name" },
    { ok: Boolean(input.about_me && input.about_me.length >= 20), label: "About me" },
    { ok: Boolean(input.avatar_url), label: "Profile picture" },
    { ok: (input.skillsCount ?? 0) >= 2, label: "Skills" },
    { ok: (input.looking_for?.length ?? 0) > 0, label: "What you are looking for" },
    { ok: Boolean(input.availability), label: "Availability" },
    { ok: Boolean(input.experience_level), label: "Experience level" },
    {
      ok: Boolean(input.github_url || input.youtube_url || (input.portfolio_urls?.length ?? 0) > 0),
      label: "Portfolio / GitHub / YouTube link",
    },
    { ok: Boolean(input.discord_id), label: "Discord connection" },
  ];
  const done = checks.filter((c) => c.ok).length;
  return {
    percent: Math.round((done / checks.length) * 100),
    missing: checks.filter((c) => !c.ok).map((c) => c.label),
  };
}

export function labelize(value: string) {
  return value
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}
