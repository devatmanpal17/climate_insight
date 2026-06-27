import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "../components/FeatureShell";
import { AlertTriangle, Droplets, Flame, Wind } from "lucide-react";

export const Route = createFileRoute("/dashboard/risk-alerts")({
  head: () => ({ meta: [{ title: "Risk Alerts — Bharat Climate Twin" }] }),
  component: RiskAlerts,
});

const alerts = [
  { icon: Droplets, level: "High", region: "Assam · Brahmaputra basin", text: "Flood watch — river levels rising 8cm/hr.", color: "amber" },
  { icon: Flame, level: "Severe", region: "Rajasthan · Vidarbha", text: "Heatwave: max 44°C+ for the next 72 hours.", color: "destructive" },
  { icon: Wind, level: "Moderate", region: "Coastal Odisha", text: "Cyclonic circulation building over Bay of Bengal.", color: "teal" },
];

function pill(c: string) {
  if (c === "destructive") return "bg-destructive/15 text-destructive";
  if (c === "amber") return "bg-amber-accent/25 text-amber-accent-foreground";
  return "bg-teal/15 text-teal";
}

function RiskAlerts() {
  return (
    <FeatureShell
      eyebrow="Risk Alerts"
      title="Active Climate Risk Alerts"
      description="Early-warning signals from the multi-agent risk pipeline — fused from satellite, radar and station data."
    >
      <div className="space-y-4">
        {alerts.map((a) => (
          <div key={a.region} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${pill(a.color)}`}>
              <a.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${pill(a.color)}`}>
                  {a.level}
                </span>
                <h3 className="font-display text-base font-semibold">{a.region}</h3>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{a.text}</p>
            </div>
            <AlertTriangle className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Demo data shown. Live alert ingestion from IMD and ISRO MOSDAC pipelines is being integrated.
      </p>
    </FeatureShell>
  );
}
