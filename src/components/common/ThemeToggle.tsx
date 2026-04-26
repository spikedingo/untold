"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="切换夜间模式"
      className={cn(
        "rounded-md p-2 text-ink-500 transition-colors hover:bg-paper-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow",
        "[data-theme='dark']_&:hover:bg-paper-dusk [data-theme='dark']_&:hover:text-ink-light",
        className
      )}
    >
      {theme === "dark" ? (
        <Sun size={18} aria-hidden="true" />
      ) : (
        <Moon size={18} aria-hidden="true" />
      )}
    </button>
  );
}
