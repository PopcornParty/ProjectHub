import { cx } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "discord";
  size?: "sm" | "md" | "lg";
  href?: string;
  to?: string;
};

const styles = {
  primary:
    "bg-gradient-to-r from-accent-600 to-accent-500 text-white shadow-glow hover:brightness-110",
  secondary: "bg-white/5 text-white border border-white/10 hover:bg-white/10",
  ghost: "bg-transparent text-zinc-200 hover:bg-white/5",
  danger: "bg-rose-500/15 text-rose-200 border border-rose-500/30 hover:bg-rose-500/25",
  discord: "bg-[#5865F2] text-white hover:bg-[#4752c4]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  href,
  to,
  children,
  ...rest
}: Props) {
  const cls = cx(
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    size === "sm" && "px-3 py-1.5 text-sm",
    size === "md" && "px-4 py-2.5 text-sm",
    size === "lg" && "px-5 py-3 text-base",
    styles[variant],
    className
  );
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer noopener">
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
