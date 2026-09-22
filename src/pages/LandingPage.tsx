import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { APP_NAME, APP_TAGLINE } from "@/lib/config";

export function LandingPage() {
  const { signInWithDiscord, profile } = useAuth();
  return (
    <section className="mx-auto max-w-3xl py-16 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-violet-300">ProjectHub</p>
      <h1 className="mt-4 font-display text-5xl font-bold text-white">{APP_TAGLINE}</h1>
      <p className="mt-4 text-zinc-400">
        Find teammates for Minecraft servers, Discord bots, games, websites, and other projects. Talk on Discord, not in an in-app inbox.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {profile ? (
          <Link to="/dashboard"><Button>Open dashboard</Button></Link>
        ) : (
          <Button onClick={() => void signInWithDiscord()}>Continue with Discord</Button>
        )}
        <Link to="/projects"><Button variant="secondary">Browse projects</Button></Link>
      </div>
      <p className="mt-10 text-xs text-zinc-500">{APP_NAME} never asks for your email or phone number.</p>
    </section>
  );
}
