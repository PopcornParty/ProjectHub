import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export function AuthCallbackPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data, error: err }) => {
        if (err || !data.session) {
          setError("Sign-in did not finish. Please try again.");
          return;
        }
        navigate("/dashboard", { replace: true });
      })
      .catch(() => setError("Sign-in did not finish. Please try again."));
  }, [navigate]);

  return (
    <div className="py-20 text-center">
      <p className="font-display text-xl">{error ?? "Finishing Discord sign-in…"}</p>
    </div>
  );
}
