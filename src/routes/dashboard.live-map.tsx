import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "../components/FeatureShell";
import { IndiaMap } from "../components/IndiaMap";
import { Layers, Droplets, Thermometer, Cloud } from "lucide-react";

export const Route = createFileRoute("/dashboard/live-map")({
  head: () => ({ meta: [{ title: "Live Climate Map — Bharat Climate Twin" }] }),
  component: LiveMap,
});

const layers = [
  { icon: Droplets, label: "Rainfall (mm)", active: true },
  { icon: Thermometer, label: "Temperature (°C)", active: false },
  { icon: Cloud, label: "Cloud Cover", active: false },
  { icon: Layers, label: "Soil Moisture", active: false },
];

function LiveMap() {
  return (
    <FeatureShell
      eyebrow="Live Layer"
      title="Live Climate Map"
      description="A real-time spatial view of India's climate — rainfall, temperature, cloud cover and more, fused from IMD and INSAT feeds."
    >
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Layers</p>
          <ul className="mt-4 space-y-2">
            {layers.map((l) => (
              <li
                key={l.label}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                  l.active
                    ? "border-teal/40 bg-accent text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-muted"
                }`}
              >
                <l.icon className="h-4 w-4" /> {l.label}
              </li>
            ))}
          </ul>
        </aside>
        <div className="relative grid min-h-[500px] place-items-center overflow-hidden rounded-2xl border border-border bg-gradient-sky shadow-card">
          <IndiaMap className="absolute inset-0 m-auto h-[90%] text-teal/50" />
          <div className="absolute left-6 top-6 rounded-lg border border-border bg-card/80 px-3 py-2 text-xs font-medium text-muted-foreground backdrop-blur">
            Map preview · interactive view coming soon
          </div>
          <div className="absolute bottom-6 right-6 rounded-lg border border-border bg-card/80 px-3 py-2 text-xs backdrop-blur">
            <span className="font-semibold text-foreground">Updated:</span>{" "}
            <span className="text-muted-foreground">Just now</span>
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}
