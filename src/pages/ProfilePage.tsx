import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProfileByUsername } from "@/services/profiles";
import { Button } from "@/components/ui/Button";
import { discordProfileUrl } from "@/lib/utils";
import type { Profile } from "@/types";

export function ProfilePage() {
  const { username = "" } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => { fetchProfileByUsername(username).then(setProfile); }, [username]);
  if (!profile) return <p className="text-zinc-400">Profile not found.</p>;
  return (
    <article className="space-y-4">
      <div className="flex items-center gap-4">
        {profile.avatar_url ? <img src={profile.avatar_url} alt="" className="h-16 w-16 rounded-full" /> : null}
        <div>
          <h1 className="font-display text-3xl font-bold">{profile.display_name}</h1>
          <p className="text-zinc-400">@{profile.username}</p>
        </div>
      </div>
      <p className="text-zinc-300">{profile.about_me || "This person has not written an about section yet."}</p>
      {profile.discord_id ? (
        <a href={discordProfileUrl(profile.discord_id, profile.discord_username)} target="_blank" rel="noreferrer">
          <Button variant="discord">Open Discord</Button>
        </a>
      ) : null}
    </article>
  );
}
