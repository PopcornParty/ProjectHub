import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { cx } from "@/lib/utils";

type Toast = { id: number; kind: "success" | "error" | "info"; message: string };

const ToastContext = createContext<{
  push: (message: string, kind?: Toast["kind"]) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, kind: Toast["kind"] = "info") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, kind, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(92vw,360px)] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={cx(
              "pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-card backdrop-blur",
              t.kind === "success" && "border-emerald-400/30 bg-emerald-950/80 text-emerald-100",
              t.kind === "error" && "border-rose-400/30 bg-rose-950/80 text-rose-100",
              t.kind === "info" && "border-white/10 bg-ink-700/90 text-zinc-100"
            )}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
