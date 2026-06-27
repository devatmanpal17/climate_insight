import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { AuroraBackground } from "./AuroraBackground";

export function FeatureShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <AuroraBackground className="opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 rounded-full glass-btn px-3.5 py-1.5 text-xs font-medium text-foreground hover:scale-[1.02] transition-transform">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to dashboard
        </Link>
        <div className="mt-6 max-w-3xl animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">{eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{description}</p>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
