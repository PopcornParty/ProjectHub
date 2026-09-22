import { Button } from "./Button";

export function EmptyState({
  title,
  body,
  actionLabel,
  actionTo,
}: {
  title: string;
  body: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  return (
    <div className="glass rounded-2xl px-6 py-14 text-center">
      <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-accent-500/15 ring-1 ring-accent-500/30" />
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">{body}</p>
      {actionLabel && actionTo ? (
        <div className="mt-6">
          <Button to={actionTo}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}

export function Skeleton({ className = "h-24" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white/5 ${className}`} />;
}
