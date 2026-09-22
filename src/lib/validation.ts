const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE = /(?:\+?\d{1,3}[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?){2}\d{4}/;
const DOB = /\b(?:0?[1-9]|1[0-2])[/-](?:0?[1-9]|[12]\d|3[01])[/-](?:19|20)\d{2}\b/;
const SSNISH = /\b\d{3}-\d{2}-\d{4}\b/;

export function containsSensitive(text: string) {
  return EMAIL.test(text) || PHONE.test(text) || DOB.test(text) || SSNISH.test(text);
}

export function validateTextField(label: string, value: string, opts?: { min?: number; max?: number; required?: boolean }) {
  const v = value.trim();
  if (opts?.required && !v) return `${label} is required.`;
  if (opts?.min && v && v.length < opts.min) return `${label} is too short.`;
  if (opts?.max && v.length > opts.max) return `${label} is too long.`;
  if (v && containsSensitive(v)) {
    return `${label} looks like it contains an email, phone number, or date of birth. Please remove it.`;
  }
  return null;
}

export function validateUsername(username: string) {
  const v = username.trim().toLowerCase();
  if (!/^[a-z0-9_]{3,24}$/.test(v)) {
    return "Username must be 3–24 characters using letters, numbers, or underscores.";
  }
  const reserved = ["admin", "owner", "projecthub", "support", "mod", "moderator", "official"];
  if (reserved.includes(v)) return "That username is reserved.";
  return null;
}

export function validateUrl(value: string, label: string) {
  const v = value.trim();
  if (!v) return null;
  try {
    const url = new URL(v);
    if (url.protocol !== "http:" && url.protocol !== "https:") return `${label} must start with https://`;
    return null;
  } catch {
    return `${label} is not a valid URL.`;
  }
}

export function sanitizeLinks(raw: unknown): { label: string; url: string }[] {
  if (!Array.isArray(raw)) return [];
  const out: { label: string; url: string }[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const label = String((item as { label?: string }).label || "Link").slice(0, 40);
    const url = String((item as { url?: string }).url || "").trim();
    if (!validateUrl(url, "Link")) out.push({ label, url });
  }
  return out.slice(0, 8);
}
