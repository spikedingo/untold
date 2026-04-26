"use client";

interface ProgressBarProps {
  current: number;  // 0-indexed
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <div className="relative" role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}>
      {/* Track */}
      <div className="h-0.5 w-full bg-paper-200">
        {/* Fill */}
        <div
          className="h-full bg-amber-glow transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Counter */}
      <p
        className="mt-1 text-right text-[11px] text-ink-500"
        style={{ fontFamily: "var(--font-accent)" }}
        aria-label={`第 ${current + 1} 章，共 ${total} 章`}
      >
        第 {current + 1} / {total} 章
      </p>
    </div>
  );
}
