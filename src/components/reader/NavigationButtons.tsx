"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface NavigationButtonsProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Bottom-fixed reading navigation. Stays pinned to the viewport so the
 * "previous / next" controls don't shift around with scene length.
 */
export function NavigationButtons({
  currentIndex,
  total,
  onPrev,
  onNext,
}: NavigationButtonsProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  const pct = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-30"
      aria-label="阅读导航"
    >
      <div className="pointer-events-auto border-t border-paper-200/70 bg-surface/85 backdrop-blur-md supports-[backdrop-filter]:bg-surface/70">
        {/* Slim progress strip — gives the bar weight without an extra component */}
        <div className="h-[2px] w-full bg-paper-200/70" aria-hidden="true">
          <div
            className="h-full bg-amber-glow transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div
          className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:py-4"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.75rem)" }}
        >
          <button
            onClick={onPrev}
            disabled={isFirst}
            aria-disabled={isFirst}
            aria-label="上一页"
            className={cn(
              "flex items-center gap-1 rounded-md px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow",
              isFirst
                ? "cursor-not-allowed text-ink-500 opacity-40"
                : "text-ink-700 hover:bg-paper-100 hover:text-ink-900"
            )}
          >
            <ChevronLeft size={16} aria-hidden="true" />
            上一页
          </button>

          <span
            className="hidden text-[11px] tracking-widest text-ink-500 sm:inline"
            style={{ fontFamily: "var(--font-accent)" }}
            aria-label={`第 ${currentIndex + 1} 章，共 ${total} 章`}
          >
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          <button
            onClick={onNext}
            aria-label={isLast ? "完成阅读" : "下一页"}
            className={cn(
              "flex items-center gap-1 rounded-md px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow",
              isLast
                ? "bg-amber-glow text-white hover:opacity-90"
                : "text-ink-700 hover:bg-paper-100 hover:text-ink-900"
            )}
          >
            {isLast ? "完成" : "下一页"}
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
