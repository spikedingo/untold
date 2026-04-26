"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface NavigationButtonsProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

export function NavigationButtons({
  currentIndex,
  total,
  onPrev,
  onNext,
}: NavigationButtonsProps) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  return (
    <div className="flex items-center justify-between py-6">
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

      <button
        onClick={onNext}
        aria-label={isLast ? "完成阅读" : "下一页"}
        className="flex items-center gap-1 rounded-md px-4 py-2 text-sm text-ink-700 transition-colors hover:bg-paper-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
      >
        {isLast ? "完成" : "下一页"}
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
