import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Map, LineChart, ShieldAlert, FlaskConical, FileBarChart, ArrowUpRight, Activity } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ChatbotWidget } from "../components/ChatbotWidget";
import { AuroraBackground } from "../components/AuroraBackground";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Bharat Climate Twin" },
      { name: "description", content: "Live maps, district-level forecasts, risk alerts, and what-if simulations — your control room for India's weather." },
    ],
  }),
  component: DashboardLayout,
});

const actions = [
  { to: "/dashboard/live-map", icon: Map, title: "Live Climate Map", desc: "See rainfall, temperature and cloud cover painted across India in real time.", accent: "from-teal/20 to-cyan-glow/10" },
  { to: "/dashboard/forecast", icon: LineChart, title: "Forecast", desc: "Where the rain's going next, district by district — for the next 12 months.", accent: "from-monsoon/20 to-teal/10" },
  { to: "/dashboard/risk-alerts", icon: ShieldAlert, title: "Risk Alerts", desc: "Floods, droughts, cyclones, heatwaves — flagged before they spread.", accent: "from-amber-accent/25 to-dawn/15" },
  { to: "/dashboard/scenario", icon: FlaskConical, title: "Scenario Simulator", desc: "Pull the levers on temperature and monsoon — see what 2030 could look like.", accent: "from-teal/20 to-monsoon/15" },
  { to: "/dashboard/reports", icon: FileBarChart, title: "Reports & Insights", desc: "Plain-language briefings for any district, ready to download as a PDF.", accent: "from-cyan-glow/15 to-teal/10" },
] as const;

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHub = pathname === "/dashboard";

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        {isHub ? <DashboardHub /> : <Outlet />}
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

function DashboardHub() {
  return (
    <div className="relative">
      <AuroraBackground className="opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-monsoon animate-pulse-dot" /> Live · all systems nominal
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Your <span className="text-gradient">control room</span> for India's climate.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Pick a panel below to dive in — every view pulls live from IMD, INSAT, MOSDAC and Bhuvan,
            and refreshes on its own.
          </p>
        </div>

        <LiveStrip />

        {/* Action cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((a, i) => (
            <Link
              key={a.to}
              to={a.to}
              className="group relative flex flex-col overflow-hidden rounded-3xl glass-strong p-6 transition-all hover:-translate-y-1 hover:shadow-elevated animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${a.accent} opacity-60 blur-2xl transition-all group-hover:opacity-100`} />
              <div className="relative flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal/15 to-monsoon/10 text-teal">
                  <a.icon className="h-5 w-5" />
                </span>
                <span className="grid h-8 w-8 place-items-center rounded-full glass-btn text-muted-foreground transition-all group-hover:text-teal group-hover:rotate-45">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
              <h3 className="relative mt-6 font-display text-lg font-semibold">{a.title}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function LiveStrip() {
  const [stats, setStats] = useState([
    { label: "Districts monitored", value: 743, unit: "" },
    { label: "Forecast accuracy", value: 92, unit: "%" },
    { label: "Active alerts", value: 3, unit: "", accent: true },
    { label: "Data sources", value: 12, unit: "" },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setStats((p) => p.map((s, idx) => {
        if (idx === 1) return { ...s, value: Math.min(95, Math.max(89, s.value + Math.round((Math.random() - 0.5) * 2))) };
        return s;
      }));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="relative overflow-hidden rounded-2xl glass p-5">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <Activity className="h-3 w-3" /> {s.label}
          </div>
          <p className={`mt-2 font-display text-3xl font-bold tabular ${s.accent ? "text-amber-accent" : "text-foreground"}`}>
            {s.value}{s.unit}
          </p>
        </div>
      ))}
    </div>
  );
}
