import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Bharat Climate Twin" },
      { name: "description", content: "A national-scale AI digital twin of India's climate, built on IMD, INSAT, MOSDAC and Bhuvan." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">About</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">A digital twin for India's climate.</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Bharat Climate Twin is an AI-driven simulation of India's atmosphere, hydrology and land
          surface. It blends national datasets — IMD station observations, INSAT satellite imagery,
          MOSDAC ocean products, and Bhuvan land-use maps — into a continuously-updated digital model.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {[
            { h: "Mission", p: "Make India's climate intelligence open, real-time, and explainable — for researchers, planners, and citizens." },
            { h: "Approach", p: "Multi-agent AI orchestrates atmospheric, hydrological and impact models, with human-readable reasoning." },
            { h: "Datasets", p: "IMD, INSAT-3DR/3DS, MOSDAC, Bhuvan, IRS, ERA5, and CMIP6 ensembles." },
            { h: "Built for", p: "Disaster management, agriculture planning, water resources, and climate-resilience policy." },
          ].map((b) => (
            <div key={b.h} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-semibold">{b.h}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.p}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
