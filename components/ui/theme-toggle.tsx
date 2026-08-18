"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return <button className="icon-button" type="button" aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"} onClick={() => setTheme(isDark ? "light" : "dark")}>{isDark ? <Sun className="icon" aria-hidden="true" /> : <Moon className="icon" aria-hidden="true" />}</button>;
}
