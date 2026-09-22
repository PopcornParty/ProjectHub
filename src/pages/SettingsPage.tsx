import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Input";
import { updateProfile, deleteOwnAccount } from "@/services/profiles";
import { useNavigate } from "react-router-dom";

export function SettingsPage() {
  const { profile, refreshProfile, signInWithDiscord, signOut, user } = useAuth();
  const navigate = useNavigate();
  const [display_name, setName] = useState(profile?.display_name || "");
  const [about_me, setAbout] = useState(profile?.about_me || "");
  const [error, setError] = useState<string | null>(null);
  if (!profile || !user) return <Button onClick={() => void signInWithDiscord()}>Sign in with Discord</Button>;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await updateProfile(user.id, { display_name, about_me });
      await refreshProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
      <h1 className="font-display text-3xl font-bold">Edit profile</h1>
      <Field label="Display name"><Input value={display_name} onChange={(e) => setName(e.target.value)} /></Field>
      <Field label="About me"><Textarea value={about_me} onChange={(e) => setAbout(e.target.value)} /></Field>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <Button type="submit">Save</Button>
      <Button type="button" variant="danger" onClick={() => {
        if (!confirm("Delete your ProjectHub account?")) return;
        try { deleteOwnAccount(user.id); void signOut(); navigate("/"); }
        catch (err) { setError(err instanceof Error ? err.message : "Could not delete"); }
      }}>Delete account</Button>
    </form>
  );
}
