import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "../components/FeatureShell";
import { AlertTriangle, Droplets, Flame, Wind } from "lucide-react";

export const Route = createFileRoute("/dashboard/risk-alerts")({
  head: () => ({ meta: [{ title: "Risk Alerts — Bharat Climate Twin" }] }),
  component: RiskAlerts,
});

const alerts = [
  { icon: Droplets, level: "High", region: "Assam · Brahmaputra basin", text: "Flood watch — river levels are climbing 8cm an hour. Local authorities have been notified.", color: "amber", time: "12 min ago" },
  { icon: Flame, level: "Severe", region: "Rajasthan · Vidarbha", text: "Heatwave: daytime highs forecast above 44°C for the next 72 hours. Avoid outdoor work between 11am–4pm.", color: "destructive", time: "1 hr ago" },
  { icon: Wind, level: "Moderate", region: "Coastal Odisha", text: "Cyclonic circulation building over the Bay of Bengal. Monitoring closely — too early to call a track.", color: "teal", time: "3 hr ago" },
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
      title="What we're watching right now"
      description="Early signals from the risk pipeline — pulled from satellite, radar and ground stations. The earlier you see it, the more options you have."
    >
      <div className="space-y-3">
        {alerts.map((a) => (
          <div key={a.region} className="group relative flex items-start gap-4 overflow-hidden rounded-3xl glass-strong p-5 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
            <div className={`absolute left-0 top-0 h-full w-1 ${a.color === "destructive" ? "bg-destructive" : a.color === "amber" ? "bg-amber-accent" : "bg-teal"}`} />
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${pill(a.color)}`}>
              <a.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-widest ${pill(a.color)}`}>
                  {a.level}
                </span>
                <h3 className="font-display text-base font-semibold">{a.region}</h3>
                <span className="ml-auto text-[11px] font-mono text-muted-foreground">{a.time}</span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{a.text}</p>
            </div>
            <AlertTriangle className="hidden h-4 w-4 shrink-0 text-muted-foreground sm:block" />
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Demo data shown. Live ingestion from IMD and ISRO MOSDAC is being wired in.
      </p>
    </FeatureShell>
  );
}
