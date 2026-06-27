import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AuroraBackground } from "../components/AuroraBackground";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bharat Climate Twin" },
      { name: "description", content: "Why we built a working model of India's climate, and how it actually works under the hood." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="relative flex-1">
        <AuroraBackground className="opacity-40" />
        <div className="relative mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">About</p>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            A working model of India's <span className="text-gradient">climate</span>.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Bharat Climate Twin is a living simulation of the country's atmosphere, rivers and land surface.
            We pull together IMD's weather stations, INSAT's satellites, MOSDAC's ocean products, and Bhuvan's
            land maps — and let AI agents work across them to surface what matters, when it matters.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {[
              { h: "Why we built it", p: "Because the data exists — it just lives in a dozen different places, in formats nobody outside the agencies can read. We bring it together so a district officer, a farmer's co-op, or a researcher can all start from the same picture." },
              { h: "How it works", p: "Specialised AI agents for atmosphere, hydrology and impact talk to each other, every forecast comes with the data it used, and you can ask the system 'why?' in plain language." },
              { h: "What feeds it", p: "IMD, INSAT-3DR/3DS, MOSDAC, Bhuvan, IRS, ERA5 reanalysis, and CMIP6 climate model ensembles." },
              { h: "Who it's for", p: "Disaster managers planning the next 48 hours, agriculture departments planning the next season, water boards planning the next decade — and anyone curious about what's happening over India today." },
            ].map((b, i) => (
              <div key={b.h} className="rounded-3xl glass-strong p-6 animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
                <h3 className="font-display text-lg font-semibold">{b.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.p}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
