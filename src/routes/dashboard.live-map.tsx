import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "../components/FeatureShell";
import { IndiaMap } from "../components/IndiaMap";
import { Layers, Droplets, Thermometer, Cloud, MapPin, ZoomIn, ZoomOut } from "lucide-react";

export const Route = createFileRoute("/dashboard/live-map")({
  head: () => ({ meta: [{ title: "Live Climate Map — Bharat Climate Twin" }] }),
  component: LiveMap,
});

const LAYERS = [
  { id: "rain", icon: Droplets, label: "Rainfall (mm)" },
  { id: "temp", icon: Thermometer, label: "Temperature (°C)" },
  { id: "cloud", icon: Cloud, label: "Cloud cover" },
  { id: "soil", icon: Layers, label: "Soil moisture" },
] as const;

function LiveMap() {
  const [active, setActive] = useState<string>("rain");

  return (
    <FeatureShell
      eyebrow="Live Layer"
      title="Live Climate Map"
      description="What's happening over India right now — rainfall, temperature, cloud cover, soil moisture. Flip layers, zoom in, find your district."
    >
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-3xl glass-strong p-5">
          <p className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">Layers</p>
          <ul className="mt-4 space-y-2">
            {LAYERS.map((l) => {
              const on = active === l.id;
              return (
                <li key={l.id}>
                  <button
                    onClick={() => setActive(l.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${
                      on ? "glass-btn text-foreground shadow-glow" : "text-muted-foreground hover:bg-white/5"
                    }`}
                  >
                    <l.icon className={`h-4 w-4 ${on ? "text-teal" : ""}`} /> {l.label}
                    {on && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-monsoon animate-pulse-dot" />}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-teal/10 to-monsoon/5 p-4">
            <p className="text-xs font-semibold">Tip</p>
            <p className="mt-1 text-xs text-muted-foreground">Click any pulsing marker on the map to drill into that district's live readings.</p>
          </div>
        </aside>
        <div className="relative grid min-h-[520px] place-items-center overflow-hidden rounded-3xl glass-strong">
          <div className="absolute inset-0 bg-gradient-to-br from-teal/8 via-transparent to-monsoon/5" />
          <IndiaMap withPoints className="relative h-[92%] text-foreground/40" />

          <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-foreground">
            <MapPin className="h-3 w-3 text-teal" /> {LAYERS.find((l) => l.id === active)?.label}
          </div>
          <div className="absolute right-5 top-5 flex flex-col gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-full glass-btn"><ZoomIn className="h-4 w-4" /></button>
            <button className="grid h-9 w-9 place-items-center rounded-full glass-btn"><ZoomOut className="h-4 w-4" /></button>
          </div>
          <div className="absolute bottom-5 right-5 rounded-full glass px-3.5 py-1.5 text-[11px] font-mono text-muted-foreground">
            <span className="font-semibold text-foreground">Last refresh:</span> just now
          </div>
        </div>
      </div>
    </FeatureShell>
  );
}
