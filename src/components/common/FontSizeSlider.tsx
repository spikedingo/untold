"use client";

import { cn } from "@/lib/utils/cn";
import type { FontSizeKey } from "@/lib/hooks/useReaderSettings";

const OPTIONS: { key: FontSizeKey; label: string }[] = [
  { key: "sm", label: "小" },
  { key: "md", label: "中" },
  { key: "lg", label: "大" },
  { key: "xl", label: "特大" },
];

interface FontSizeSliderProps {
  value: FontSizeKey;
  onChange: (v: FontSizeKey) => void;
}

export function FontSizeSlider({ value, onChange }: FontSizeSliderProps) {
  return (
    <div className="flex items-center gap-0.5 rounded-md border border-paper-200" role="group" aria-label="字号选择">
      {OPTIONS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          aria-pressed={value === key}
          className={cn(
            "px-2 py-1 text-xs transition-colors first:rounded-l-md last:rounded-r-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-glow sm:px-3",
            value === key
              ? "bg-amber-glow text-white"
              : "text-ink-500 hover:text-ink-900"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
