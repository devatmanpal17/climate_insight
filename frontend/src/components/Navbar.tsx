import { Link } from "@tanstack/react-router";
import { Satellite } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 glass border-b border-white/10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal to-monsoon text-white shadow-glow">
            <Satellite className="h-4 w-4" strokeWidth={2.2} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-accent animate-pulse-dot" />
          </span>
          <span className="font-display text-base font-bold tracking-tight">
            Bharat Climate Twin
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-full px-3.5 py-1.5 text-sm font-semibold text-foreground glass" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
