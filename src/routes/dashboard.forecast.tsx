import { createFileRoute } from "@tanstack/react-router";
import { FeatureShell } from "../components/FeatureShell";

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
      title="Rainfall & Temperature Forecast"
      description="12-month outlook blending IMD station data with multi-model ensemble predictions. Numbers shown are illustrative."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Expected Rainfall (mm)</h3>
              <p className="text-xs text-muted-foreground">All-India average · next 12 months</p>
            </div>
            <span className="rounded-full bg-monsoon/20 px-3 py-1 text-xs font-semibold text-monsoon">+4% vs LPA</span>
          </div>
          <svg viewBox="0 0 600 220" className="mt-6 w-full">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3].map((i) => (
              <line key={i} x1="0" x2="600" y1={50 * i + 10} y2={50 * i + 10} stroke="var(--border)" strokeWidth="1" />
            ))}
            {(() => {
              const pts = data.map((v, i) => `${(i * 600) / 11},${200 - (v / max) * 180}`);
              const line = "M " + pts.join(" L ");
              const area = line + ` L 600,200 L 0,200 Z`;
              return (
                <>
                  <path d={area} fill="url(#g)" />
                  <path d={line} fill="none" stroke="var(--teal)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
                  {data.map((v, i) => (
                    <circle key={i} cx={(i * 600) / 11} cy={200 - (v / max) * 180} r="4" fill="var(--background)" stroke="var(--teal)" strokeWidth="2" />
                  ))}
                </>
              );
            })()}
          </svg>
          <div className="mt-2 grid grid-cols-12 text-center text-[11px] font-medium text-muted-foreground">
            {months.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "Monsoon onset (Kerala)", value: "Jun 1 ± 4d" },
            { label: "Peak rainfall window", value: "Jul – Aug" },
            { label: "Temperature anomaly", value: "+0.6°C" },
            { label: "Model confidence", value: "92%" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-card">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-1 font-display text-xl font-bold">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </FeatureShell>
  );
}
