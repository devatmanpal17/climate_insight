import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Map, LineChart, ShieldAlert, FlaskConical, FileBarChart, ArrowUpRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ChatbotWidget } from "../components/ChatbotWidget";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Bharat Climate Twin" },
      { name: "description", content: "Your climate intelligence dashboard — real-time maps, forecasts, risk alerts, and scenario simulation." },
    ],
  }),
  component: DashboardLayout,
});

const actions = [
  { to: "/dashboard/live-map", icon: Map, title: "Live Climate Map", desc: "GIS view with rainfall, temperature, and cloud layers across India." },
  { to: "/dashboard/forecast", icon: LineChart, title: "Forecast", desc: "Rainfall and temperature predictions at district resolution." },
  { to: "/dashboard/risk-alerts", icon: ShieldAlert, title: "Risk Alerts", desc: "Active flood, drought, and heatwave warnings nationwide." },
  { to: "/dashboard/scenario", icon: FlaskConical, title: "Scenario Simulator", desc: "What-if simulations for policy and resilience planning." },
  { to: "/dashboard/reports", icon: FileBarChart, title: "Reports & Insights", desc: "Downloadable district-level climate reports and briefings." },
] as const;

const stats = [
  { label: "Districts Monitored", value: "700+" },
  { label: "Forecast Accuracy", value: "92%" },
  { label: "Active Risk Alerts", value: "3", accent: true },
  { label: "Data Sources", value: "12" },
];

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHub = pathname === "/dashboard";

  return (
    <div className="flex min-h-screen flex-col bg-background">
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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">Climate Intelligence</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
          Your Climate Intelligence Dashboard
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Real-time monitoring, AI forecasts, and risk analysis across India — drawn from IMD,
          INSAT, MOSDAC and Bhuvan.
        </p>
      </div>

      {/* Action cards */}
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-elevated"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-teal">
                <a.icon className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal" />
            </div>
            <h3 className="mt-6 font-display text-lg font-semibold">{a.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.desc}</p>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-12">
        <h2 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          At a glance
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className={`mt-2 font-display text-3xl font-bold ${s.accent ? "text-amber-accent" : "text-foreground"}`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
