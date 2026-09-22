import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { captureDiscordTokenFromHash } from "@/lib/discord";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  useEffect(() => {
    captureDiscordTokenFromHash();
    navigate("/dashboard", { replace: true });
  }, [navigate]);
  return (
    <div className="py-20 text-center">
      <p className="font-display text-xl">Finishing Discord sign-in…</p>
    </div>
  );
}
