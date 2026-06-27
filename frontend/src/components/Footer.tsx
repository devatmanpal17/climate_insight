import { Github, Mail, Satellite } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-teal to-monsoon text-white shadow-glow">
                <Satellite className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-bold">Bharat Climate Twin</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              A working model of India's sky, soil and water — refreshed every few minutes, free to explore,
              built so anyone planning around the weather has a steadier place to stand.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Data partners</p>
            <ul className="mt-3 space-y-1.5 text-sm text-foreground/80">
              <li>India Meteorological Dept.</li>
              <li>ISRO · INSAT &amp; MOSDAC</li>
              <li>NRSC · Bhuvan</li>
              <li>ECMWF ERA5 reanalysis</li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Reach us</p>
            <div className="mt-3 flex items-center gap-2 text-muted-foreground">
              <a href="#" aria-label="GitHub" className="grid h-9 w-9 place-items-center rounded-full glass-btn hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Email" className="grid h-9 w-9 place-items-center rounded-full glass-btn hover:text-foreground">
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© 2026 Bharat Climate Twin · A research initiative. Demo data shown for illustration.</p>
          <p>Built in India · For India</p>
        </div>
      </div>
    </footer>
  );
}
