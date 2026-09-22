import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export function DashboardPage() {
  const { profile, signInWithDiscord } = useAuth();
  if (!profile) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Sign in to continue</h1>
        <Button className="mt-6" onClick={() => void signInWithDiscord()}>Continue with Discord</Button>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Hey, {profile.display_name}</h1>
      <p className="text-zinc-400">You are signed in as @{profile.username}. Role: {profile.role}.</p>
      <div className="flex flex-wrap gap-3">
        <Link to="/projects/new"><Button>Create project</Button></Link>
        <Link to="/settings/profile"><Button variant="secondary">Edit profile</Button></Link>
        <Link to="/matches"><Button variant="secondary">Matches</Button></Link>
        {profile.role !== "user" ? <Link to="/admin"><Button variant="secondary">Admin</Button></Link> : null}
      </div>
    </div>
  );
}
