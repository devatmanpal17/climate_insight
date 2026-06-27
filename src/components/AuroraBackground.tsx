/**
 * Ambient aurora background — animated gradient blobs + subtle grain.
 * Place behind content with absolute positioning; pointer-events none.
 */
export function AuroraBackground({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-aurora animate-aurora" />
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.4) 2px 3px), repeating-linear-gradient(90deg, transparent 0 2px, rgba(255,255,255,0.4) 2px 3px)",
          backgroundSize: "3px 3px",
        }} />
    </div>
  );
}
