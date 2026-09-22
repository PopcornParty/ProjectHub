import { Link, Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";

export function AppLayout() {
  return (
    <div className="mesh min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-white/5 py-8 text-center text-xs text-zinc-500">
        <p>ProjectHub · Find people. Build projects.</p>
        <p className="mt-2">
          <Link className="hover:text-zinc-300" to="/privacy">
            Privacy
          </Link>
          {" · "}
          <Link className="hover:text-zinc-300" to="/guidelines">
            Safety guidelines
          </Link>
        </p>
      </footer>
    </div>
  );
}
