import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Activity, Brain, ShieldAlert, Eye, CloudRain } from "lucide-react";
import { IndiaMap } from "../components/IndiaMap";
import { Footer } from "../components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bharat Climate Twin — AI Digital Twin of India's Climate" },
      { name: "description", content: "An AI-powered digital twin of India's climate — predicting rainfall, detecting risks, and guiding decisions in real time." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Activity, title: "Real-time Forecasting", text: "District-level rainfall and temperature predictions, updated continuously from IMD and INSAT feeds." },
  { icon: Brain, title: "Multi-Agent AI", text: "Specialized AI agents collaborate across atmospheric, hydrological, and impact models." },
  { icon: ShieldAlert, title: "Risk Detection", text: "Early-warning signals for floods, droughts, cyclones, and heatwaves across India." },
  { icon: Eye, title: "Explainable Predictions", text: "Every forecast comes with attribution — sources, confidence intervals, and reasoning." },
];

const sources = ["IMD", "INSAT", "MOSDAC", "Bhuvan", "ISRO"];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-[0.12]">
          <IndiaMap className="absolute right-[-6%] top-1/2 h-[140%] -translate-y-1/2 text-white" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(1_0_0_/_0.12),transparent_50%)]" />

        <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
            <CloudRain className="h-4 w-4" />
            National Climate Intelligence Initiative
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
            Bharat Climate Twin
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
            An AI-powered digital twin of India's climate — predicting rainfall, detecting risks,
            and guiding decisions in real time.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-elevated transition-transform hover:scale-[1.02]"
            >
              Explore the Digital Twin
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/about" className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline">
              Learn how it works →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Capabilities</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Built for India's climate, at India's scale.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-teal">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Powered by */}
      <section className="border-y border-border bg-muted/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:justify-between lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Powered by national datasets
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {sources.map((s) => (
              <span key={s} className="font-display text-lg font-bold tracking-tight text-foreground/70">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
