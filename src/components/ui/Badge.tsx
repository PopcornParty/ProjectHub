import { cx } from "@/lib/utils";
import { PROJECT_STATUSES } from "@/lib/constants";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "purple" | "green" | "yellow" | "blue" | "zinc";
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone === "neutral" && "border-white/10 bg-white/5 text-zinc-200",
        tone === "purple" && "border-accent-500/30 bg-accent-500/15 text-accent-300",
        tone === "green" && "border-emerald-400/20 bg-emerald-400/10 text-emerald-200",
        tone === "yellow" && "border-amber-400/20 bg-amber-400/10 text-amber-200",
        tone === "blue" && "border-sky-400/20 bg-sky-400/10 text-sky-200",
        tone === "zinc" && "border-zinc-500/20 bg-zinc-500/10 text-zinc-300"
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const item = PROJECT_STATUSES.find((s) => s.value === status);
  const tone =
    status === "recruiting"
      ? "green"
      : status === "planning"
        ? "yellow"
        : status === "in_development"
          ? "blue"
          : status === "completed"
            ? "purple"
            : "zinc";
  return (
    <Badge tone={tone}>
      {item ? `${item.emoji} ${item.label}` : status}
    </Badge>
  );
}
