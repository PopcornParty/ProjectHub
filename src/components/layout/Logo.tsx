import { Link } from "react-router-dom";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-accent-500 to-indigo-500 text-sm text-white shadow-glow">
        PH
      </span>
      {!compact && (
        <span>
          Project<span className="text-accent-400">Hub</span>
        </span>
      )}
    </Link>
  );
}
