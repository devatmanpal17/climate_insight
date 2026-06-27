import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "../components/FeatureShell";
import { TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard/forecast")({
  head: () => ({ meta: [{ title: "Forecast — Bharat Climate Twin" }] }),
  component: Forecast,
});

const data = [12, 18, 24, 35, 48, 62, 71, 65, 52, 38, 28, 20];
const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];

function Forecast() {
  const max = Math.max(...data);
  return (
    <FeatureShell
      eyebrow="Forecast"
      title="Where the rain's going next"
      description="A 12-month outlook for the country — IMD station data fused with a multi-model ensemble. Numbers shown are illustrative."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl glass-strong p-6 lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold">Expected rainfall (mm)</h3>
              <p className="text-xs text-muted-foreground">All-India average · next 12 months</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-monsoon/15 px-3 py-1 text-xs font-semibold text-monsoon">
              <TrendingUp className="h-3 w-3" /> +4.2% vs LPA
            </span>
          </div>
          <svg viewBox="0 0 600 220" className="mt-6 w-full">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="line" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="var(--cyan-glow)" />
                <stop offset="100%" stopColor="var(--monsoon)" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="0" x2="600" y1={50 * i + 10} y2={50 * i + 10} stroke="var(--border)" strokeWidth="1" strokeDasharray="2 4" />
            ))}
            {(() => {
              const pts = data.map((v, i) => `${(i * 600) / 11},${200 - (v / max) * 180}`);
              const line = "M " + pts.join(" L ");
              const area = line + ` L 600,200 L 0,200 Z`;
              return (
                <>
                  <path d={area} fill="url(#g)" />
                  <path d={line} fill="none" stroke="url(#line)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
                  {data.map((v, i) => (
                    <circle key={i} cx={(i * 600) / 11} cy={200 - (v / max) * 180} r="4.5" fill="var(--background)" stroke="var(--teal)" strokeWidth="2.5" />
                  ))}
                </>
              );
            })()}
          </svg>
          <div className="mt-2 grid grid-cols-12 text-center font-mono text-[11px] font-medium text-muted-foreground">
            {months.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: "Monsoon onset · Kerala", value: "Jun 1 ± 4d" },
            { label: "Peak rainfall window", value: "Jul – Aug" },
            { label: "Temperature anomaly", value: "+0.6°C" },
            { label: "Model confidence", value: "92%" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl glass p-4">
              <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-display text-2xl font-bold tabular">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}
