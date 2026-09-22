export const APP_NAME = "ProjectHub";
export const APP_TAGLINE = "Find people. Build projects.";

export const AGE_RANGES = ["13-15", "16-17", "18-20", "21+"] as const;

export const EXPERIENCE_LEVELS = ["beginner", "intermediate", "advanced", "mixed"] as const;

export const PROJECT_EXPERIENCE = ["any", "beginner", "intermediate", "advanced", "mixed"] as const;

export const AVAILABILITY = [
  { value: "few-hours", label: "A few hours a week" },
  { value: "evenings", label: "Evenings" },
  { value: "weekends", label: "Weekends" },
  { value: "flexible", label: "Flexible" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const TIME_COMMITMENT = [
  { value: "casual", label: "Casual" },
  { value: "few-hours", label: "A few hours / week" },
  { value: "regular", label: "Regular" },
  { value: "intensive", label: "Intensive" },
] as const;

export const PROJECT_STATUSES = [
  { value: "recruiting", label: "Recruiting", emoji: "\uD83D\uDFE2" },
  { value: "planning", label: "Planning", emoji: "\uD83D\uDFE1" },
  { value: "in_development", label: "In Development", emoji: "\uD83D\uDD35" },
  { value: "paused", label: "Paused", emoji: "\u26AB" },
  { value: "completed", label: "Completed", emoji: "\u2705" },
] as const;

export const LOOKING_FOR_OPTIONS = [
  "Teammates",
  "A project to join",
  "Builders",
  "Developers",
  "Designers",
  "Editors",
  "Community helpers",
  "Mentors",
  "Learners",
];

export const REPORT_REASONS = [
  { value: "spam", label: "Spam" },
  { value: "scam", label: "Scam" },
  { value: "harassment", label: "Harassment" },
  { value: "inappropriate", label: "Inappropriate content" },
  { value: "fake", label: "Fake account" },
  { value: "privacy", label: "Privacy issue" },
  { value: "other", label: "Other" },
] as const;

export const SENSITIVE_WARNING =
  "Do not share your email, phone number, home address, school name, passwords, or exact date of birth. Talk on Discord only after you feel comfortable.";
