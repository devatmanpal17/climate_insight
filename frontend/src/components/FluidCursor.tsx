import { useEffect, useRef } from "react";

/**
 * Fluid cursor — a glowing core dot plus a chain of trailing blobs that
 * lag behind with easing, giving a liquid-mercury feel. Hidden on touch.
 */
const TRAIL = 6;

export function FluidCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dots = useRef<{ x: number; y: number }[]>(
    Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 })),
  );
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    let raf = 0;
    const tick = () => {
      const nodes = containerRef.current?.children;
      if (nodes) {
        let prev = target.current;
        for (let i = 0; i < TRAIL; i++) {
          const d = dots.current[i];
          // Each subsequent dot eases more slowly toward the one ahead of it
          const ease = 0.35 - i * 0.04;
          d.x += (prev.x - d.x) * ease;
          d.y += (prev.y - d.y) * ease;
          const n = nodes[i] as HTMLElement;
          const size = 28 - i * 3;
          n.style.transform = `translate3d(${d.x - size / 2}px, ${d.y - size / 2}px, 0)`;
          prev = d;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden="true"
    >
      {Array.from({ length: TRAIL }).map((_, i) => {
        const size = 28 - i * 3;
        const opacity = 1 - i * 0.13;
        return (
          <div
            key={i}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "9999px",
              background: i === 0
                ? "radial-gradient(circle, oklch(0.78 0.18 195) 0%, oklch(0.55 0.18 200 / 0.6) 60%, transparent 80%)"
                : "radial-gradient(circle, oklch(0.65 0.18 195 / 0.7), transparent 70%)",
              opacity,
              filter: i === 0 ? "blur(0.5px)" : `blur(${i * 1.2}px)`,
              mixBlendMode: "screen",
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}
