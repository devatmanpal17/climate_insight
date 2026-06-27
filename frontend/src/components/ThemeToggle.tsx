import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("bct-theme");
    const prefersDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("bct-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full glass-btn text-foreground hover:scale-105 active:scale-95"
    >
      <Sun className={`h-4 w-4 absolute transition-all ${dark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`} />
      <Moon className={`h-4 w-4 absolute transition-all ${dark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`} />
    </button>
  );
}
