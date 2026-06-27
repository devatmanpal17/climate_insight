/**
 * Stylised outline of India with optional pulsing data points.
 */
type Point = { x: number; y: number; label: string; level: "info" | "warn" | "danger" };

const DEFAULT_POINTS: Point[] = [
  { x: 240, y: 200, label: "Delhi", level: "warn" },
  { x: 215, y: 290, label: "Mumbai", level: "info" },
  { x: 295, y: 360, label: "Chennai", level: "info" },
  { x: 345, y: 200, label: "Guwahati", level: "danger" },
  { x: 295, y: 295, label: "Hyderabad", level: "info" },
  { x: 195, y: 175, label: "Jaipur", level: "warn" },
  { x: 335, y: 305, label: "Bhubaneswar", level: "danger" },
  { x: 248, y: 365, label: "Bengaluru", level: "info" },
];

const COLORS: Record<Point["level"], string> = {
  info: "var(--teal)",
  warn: "var(--amber-accent)",
  danger: "oklch(0.65 0.22 25)",
};

export function IndiaMap({
  className = "",
  points = DEFAULT_POINTS,
  withPoints = false,
}: {
  className?: string;
  points?: Point[];
  withPoints?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 500 480"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {/* Simplified India outline */}
      <path d="M178 60 L210 50 L250 55 L285 70 L310 90 L335 100 L355 120 L375 145 L380 175 L370 195 L385 215 L395 245 L380 270 L355 285 L340 305 L325 330 L310 360 L290 390 L275 415 L260 435 L240 420 L225 395 L215 365 L205 335 L195 305 L180 280 L165 255 L150 230 L140 200 L145 170 L155 140 L165 105 Z"
        opacity="0.85" />
      {/* Inner detail */}
      <path d="M210 120 Q260 130 320 145" opacity="0.3" />
      <path d="M200 200 Q270 215 340 220" opacity="0.3" />
      <path d="M195 280 Q260 295 330 290" opacity="0.3" />
      {/* Sri Lanka */}
      <path d="M285 430 L295 440 L295 455 L285 460 L275 450 Z" opacity="0.7" />

      {withPoints && points.map((p) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="10" fill={COLORS[p.level]} opacity="0.18">
            <animate attributeName="r" values="6;14;6" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={p.x} cy={p.y} r="3.5" fill={COLORS[p.level]} />
        </g>
      ))}
    </svg>
  );
}
