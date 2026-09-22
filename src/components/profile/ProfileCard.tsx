import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { initials } from "@/lib/utils";
import type { Profile } from "@/types";

export function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <Link
      to={`/profile/${profile.username}`}
      className="glass group block rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-accent-500/30"
    >
      <div className="flex items-center gap-3">
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt="" className="h-12 w-12 rounded-full object-cover" />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-500/20 text-sm font-semibold text-accent-200">
            {initials(profile.display_name)}
          </div>
        )}
        <div>
          <h3 className="font-display font-semibold group-hover:text-accent-300">{profile.display_name}</h3>
          <p className="text-xs text-zinc-500">@{profile.username}</p>
        </div>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-zinc-400">{profile.about_me || "No bio yet."}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {[...(profile.skills ?? []), ...(profile.languages ?? [])].slice(0, 4).map((s) => (
          <Badge key={s.id}>{s.name}</Badge>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-xs text-zinc-500">
        <span className="capitalize">{profile.experience_level}</span>
        <span>{profile.looking_for[0] ?? "Looking to build"}</span>
      </div>
    </Link>
  );
}
