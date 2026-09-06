"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "day" | "night";

function themeForHour(hour: number): Theme {
  return hour >= 7 && hour < 19 ? "day" : "night";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("night");

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const override = sessionStorage.getItem("noto-theme") as Theme | null;
      const next = override === "day" || override === "night" ? override : themeForHour(new Date().getHours());
      root.dataset.theme = next;
      setTheme(next);
    };

    sync();
    const timer = window.setInterval(sync, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  function toggle() {
    const next = theme === "day" ? "night" : "day";
    sessionStorage.setItem("noto-theme", next);
    document.documentElement.dataset.theme = next;
    setTheme(next);
  }

  const nextLabel = theme === "day" ? "Attiva modalità notte" : "Attiva modalità giorno";

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line/70 bg-night/70 text-slate-200 transition-colors hover:border-brand-soft hover:text-white"
      aria-label={nextLabel}
      title={nextLabel}
    >
      {theme === "day" ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
    </button>
  );
}
