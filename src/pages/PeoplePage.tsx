import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { listPeople } from "@/services/profiles";
import type { Profile } from "@/types";

export function PeoplePage() {
  const [people, setPeople] = useState<Profile[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    listPeople({ search: q }).then((r) => setPeople(r.people));
  }, [q]);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">People</h1>
      <Input placeholder="Search people" value={q} onChange={(e) => setQ(e.target.value)} />
      {people.length === 0 ? (
        <EmptyState title="No public profiles yet" body="Sign in and finish your profile." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {people.map((p) => <ProfileCard key={p.id} profile={p} />)}
        </div>
      )}
    </div>
  );
}
