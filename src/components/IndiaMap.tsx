/**
 * Subtle decorative outline of India — simplified path, used as background motif.
 */
export function IndiaMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 612 612"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M243 60c12-4 30-8 48-6s30 12 44 18 26 4 38 10 18 16 32 22 30 8 36 22-4 30-8 44-6 28 0 40 18 22 18 38-12 28-22 38-22 18-24 32 6 28 2 42-18 22-32 26-30 0-44 6-26 18-40 22-30-2-44-6-28-12-40-22-22-22-28-36-8-28-16-40-22-20-24-34 6-28 4-42-12-26-12-40 8-26 18-36 20-20 28-32 18-22 32-28 30-6 42-10 24-10 36-14 22-10 34-12 18-2 30-6z" />
      <path d="M392 188c8 2 16 8 18 18M205 220c-6 8-10 18-8 28M310 480c4 8 12 14 22 16" opacity="0.4" />
    </svg>
  );
}
