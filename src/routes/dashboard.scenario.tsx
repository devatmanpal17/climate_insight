import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FeatureShell } from "../components/FeatureShell";
import { Play } from "lucide-react";

export const Route = createFileRoute("/dashboard/scenario")({
  head: () => ({ meta: [{ title: "Scenario Simulator — Bharat Climate Twin" }] }),
  component: Scenario,
});

function Scenario() {
  const [temp, setTemp] = useState(1.5);
  const [rain, setRain] = useState(10);
  const [horizon, setHorizon] = useState(2030);

  return (
    <FeatureShell
      eyebrow="What-if"
      title="Scenario Simulator"
      description="Explore plausible futures. Adjust climate drivers and see projected impacts on agriculture, water, and risk profiles."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-semibold">Inputs</h3>
          <div className="mt-6 space-y-6">
            <Slider label="Temperature anomaly" suffix="°C" min={0} max={4} step={0.1} value={temp} onChange={setTemp} />
            <Slider label="Monsoon rainfall change" suffix="%" min={-30} max={30} step={1} value={rain} onChange={setRain} />
            <Slider label="Projection horizon" suffix="" min={2025} max={2050} step={1} value={horizon} onChange={setHorizon} />
          </div>
          <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-opacity hover:opacity-90">
            <Play className="h-4 w-4" /> Run simulation
          </button>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h3 className="font-display text-lg font-semibold">Projected Impacts · {horizon}</h3>
          <dl className="mt-6 space-y-4">
            <Impact label="Kharif yield change" value={`${(rain * 0.4 - temp * 6).toFixed(1)}%`} />
            <Impact label="Reservoir stress index" value={`${Math.max(0, (temp * 12 - rain * 0.3)).toFixed(0)}/100`} />
            <Impact label="Flood-prone districts" value={`${Math.max(0, Math.round(80 + rain * 1.8 + temp * 10))}`} />
            <Impact label="Heat-stress population" value={`${(220 + temp * 70).toFixed(0)}M`} />
          </dl>
          <p className="mt-6 text-xs text-muted-foreground">
            Illustrative model outputs for demo purposes. Production model couples CMIP6 ensembles with IMD baselines.
          </p>
        </div>
      </div>
    </FeatureShell>
  );
}

function Slider({ label, suffix, min, max, step, value, onChange }: {
  label: string; suffix: string; min: number; max: number; step: number; value: number; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="font-display text-lg font-bold text-teal">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 w-full accent-[color:var(--teal)]" />
    </div>
  );
}

function Impact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border pb-3 last:border-0">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-display text-xl font-bold">{value}</dd>
    </div>
  );
}
