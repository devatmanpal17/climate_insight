import { Github, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-foreground">Bharat Climate Twin</p>
          <p className="text-xs text-muted-foreground">
            An AI-powered digital twin of India's climate — for research, resilience, and decision-making.
          </p>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <a href="#" aria-label="GitHub" className="rounded-md p-2 hover:bg-accent hover:text-foreground">
            <Github className="h-4 w-4" />
          </a>
          <a href="#" aria-label="Contact" className="rounded-md p-2 hover:bg-accent hover:text-foreground">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
