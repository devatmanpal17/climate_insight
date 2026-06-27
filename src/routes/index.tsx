import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Activity, Brain, ShieldAlert, Eye, Satellite, Radio, Cloud, Droplets, Thermometer, Wind } from "lucide-react";
import { IndiaMap } from "../components/IndiaMap";
import { AuroraBackground } from "../components/AuroraBackground";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { ChatbotWidget } from "../components/ChatbotWidget";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bharat Climate Twin — A working model of India's weather, all in one place" },
      { name: "description", content: "A live digital twin of India's climate. We pull together IMD stations, INSAT satellites, MOSDAC and Bhuvan into one place — so you can see rain coming, spot risk early, and plan with steadier ground." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Activity, title: "Forecasts that update themselves", text: "District-level rainfall and temperature outlooks that refresh as new IMD and INSAT data lands — no stale numbers." },
  { icon: Brain, title: "AI agents that collaborate", text: "Specialised models for the atmosphere, rivers, and ground impact talk to each other instead of working in silos." },
  { icon: ShieldAlert, title: "Risk you can act on", text: "Flood, drought, cyclone and heatwave signals surfaced before they make the news — with a clear severity and location." },
  { icon: Eye, title: "Explanations, not just numbers", text: "Every forecast comes with the data it leaned on, how confident it is, and what would change its mind." },
];

const sources = [
  { name: "IMD", note: "weather stations" },
  { name: "INSAT", note: "geostationary" },
  { name: "MOSDAC", note: "ocean & atmosphere" },
  { name: "Bhuvan", note: "land use" },
  { name: "ISRO", note: "earth obs." },
  { name: "ERA5", note: "reanalysis" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <FeatureSection />
      <DataSources sources={sources} />
      <CtaBand />
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <AuroraBackground />
      <div className="absolute inset-0 opacity-[0.1]">
        <div className="absolute inset-0"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
      </div>

      <div className="relative mx-auto grid min-h-[88vh] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8 lg:px-8 lg:py-24">
        {/* Left — copy */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-monsoon opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-monsoon" />
            </span>
            Live · National Climate Intelligence
          </div>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">
            India's weather,
            <br />
            <span className="text-gradient">all in one window.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">
            We've stitched together the country's weather stations, satellites, and land maps into one
            working model — so you can watch the rain coming, spot risk before it spreads, and make calls
            with steadier ground beneath you.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-elevated transition-all hover:scale-[1.03] hover:shadow-glow"
            >
              Open the dashboard
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link to="/about" className="inline-flex items-center gap-2 rounded-full glass-btn px-6 py-3.5 text-sm font-semibold text-white hover:scale-[1.02] transition-transform">
              How it works
            </Link>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/60">
            <span className="font-mono uppercase tracking-widest">Powered by</span>
            {["IMD", "ISRO", "MOSDAC", "Bhuvan"].map((s) => (
              <span key={s} className="font-display text-sm font-bold text-white/80">{s}</span>
            ))}
          </div>
        </div>

        {/* Right — live telemetry panel + map */}
        <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="relative aspect-square w-full max-w-[520px] mx-auto">
            {/* Glass map card */}
            <div className="absolute inset-0 rounded-3xl glass-strong overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-teal/10 to-monsoon/5" />
              <IndiaMap withPoints className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] text-white/40" />

              {/* Top header strip */}
              <div className="absolute left-0 right-0 top-0 flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-[10px] font-mono uppercase tracking-widest text-white/70">
                <span className="flex items-center gap-1.5"><Satellite className="h-3 w-3" /> INSAT-3DR · live</span>
                <span className="flex items-center gap-1.5"><Radio className="h-3 w-3 text-monsoon animate-pulse" /> 700 stations</span>
              </div>

              {/* Bottom telemetry */}
              <LiveTelemetry />
            </div>

            {/* Floating glass stat cards */}
            <FloatingStat
              className="absolute -left-6 top-10 sm:-left-10"
              icon={<Droplets className="h-3.5 w-3.5 text-teal" />}
              label="All-India rainfall"
              value="+4.2%"
              sub="vs long-period avg"
            />
            <FloatingStat
              className="absolute -right-4 bottom-12 sm:-right-8"
              icon={<ShieldAlert className="h-3.5 w-3.5 text-amber-accent" />}
              label="Active alerts"
              value="3"
              sub="2 high · 1 severe"
              accent
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingStat({ className = "", icon, label, value, sub, accent }: {
  className?: string; icon: React.ReactNode; label: string; value: string; sub: string; accent?: boolean;
}) {
  return (
    <div className={`glass-strong rounded-2xl px-4 py-3 animate-float ${className}`} style={{ animationDelay: accent ? "1.5s" : "0s" }}>
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {icon} {label}
      </div>
      <p className={`mt-1 font-display text-2xl font-bold tabular ${accent ? "text-amber-accent" : "text-foreground"}`}>{value}</p>
      <p className="text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function LiveTelemetry() {
  // Lightly animated numbers to give an ops-room feel.
  const [t, setT] = useState({ temp: 32.4, rain: 41, wind: 14, cloud: 62 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((p) => ({
        temp: +(p.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
        rain: Math.max(0, Math.round(p.rain + (Math.random() - 0.5) * 4)),
        wind: Math.max(0, Math.round(p.wind + (Math.random() - 0.5) * 2)),
        cloud: Math.min(100, Math.max(0, Math.round(p.cloud + (Math.random() - 0.5) * 4))),
      }));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const items = [
    { icon: Thermometer, label: "Temp", value: `${t.temp}°`, color: "text-dawn" },
    { icon: Droplets, label: "Rain", value: `${t.rain}mm`, color: "text-teal" },
    { icon: Wind, label: "Wind", value: `${t.wind}kmh`, color: "text-monsoon" },
    { icon: Cloud, label: "Cloud", value: `${t.cloud}%`, color: "text-white/80" },
  ];

  return (
    <div className="absolute bottom-3 left-3 right-3 grid grid-cols-4 gap-2 rounded-2xl glass border-white/15 p-2.5">
      {items.map((i) => (
        <div key={i.label} className="text-center">
          <i.icon className={`mx-auto h-3.5 w-3.5 ${i.color}`} />
          <p className={`mt-1 font-mono text-sm font-bold tabular ${i.color}`}>{i.value}</p>
          <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{i.label}</p>
        </div>
      ))}
    </div>
  );
}

function FeatureSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">What it does</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-5xl">
          Built for India's weather, at India's scale.
        </h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          Not another generic AI app — a serious tool that takes the country's own datasets seriously.
        </p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-3xl glass-strong p-6 transition-all hover:-translate-y-1 hover:shadow-elevated animate-fade-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-teal/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal/15 to-monsoon/10 text-teal">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="relative mt-5 font-display text-lg font-semibold">{f.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function DataSources({ sources }: { sources: { name: string; note: string }[] }) {
  return (
    <section className="relative border-y border-white/10 bg-gradient-to-b from-transparent via-muted/30 to-transparent">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">The plumbing</p>
            <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Built on India's own datasets</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            We don't reinvent the wheel — we lean on the institutions that have been doing this for decades,
            and put their data in one place.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {sources.map((s) => (
            <div key={s.name} className="rounded-2xl glass px-4 py-5 text-center">
              <p className="font-display text-xl font-bold tracking-tight">{s.name}</p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 text-white shadow-elevated sm:p-16">
        <AuroraBackground />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl font-bold sm:text-5xl">
            See the country's weather, the way the people running it do.
          </h2>
          <p className="mt-4 text-base text-white/80 sm:text-lg">
            Open the dashboard — it's free, no sign-up, and everything updates in real time.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-glow transition-transform hover:scale-[1.03]"
          >
            Launch dashboard <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
