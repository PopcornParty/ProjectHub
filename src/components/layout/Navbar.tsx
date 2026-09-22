import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { cx } from "@/lib/utils";

const links = [
  { to: "/", label: "Explore" },
  { to: "/projects", label: "Projects" },
  { to: "/people", label: "People" },
  { to: "/matches", label: "Matches" },
];

export function Navbar() {
  const { profile, signInWithDiscord, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => cx("text-sm", isActive ? "text-white" : "text-zinc-400 hover:text-white")}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {profile ? (
            <>
              <Link to="/dashboard" className="text-sm text-zinc-300">@{profile.username}</Link>
              <Button size="sm" variant="secondary" onClick={() => void signOut()}>Sign out</Button>
            </>
          ) : (
            <Button size="sm" variant="discord" onClick={() => void signInWithDiscord()}>Discord</Button>
          )}
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="space-y-2 px-4 pb-4 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="block text-sm text-zinc-300" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
