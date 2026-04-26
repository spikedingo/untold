"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface BackButtonProps {
  /** Fallback path used when there's no history to go back to */
  fallbackHref?: string;
  /** Override label text (default: "返回") */
  label?: string;
  className?: string;
}

const LOG_PREFIX = "[BackButton]";

/**
 * BackButton — navigates to previous history entry when available, otherwise
 * falls back to the provided href. Renders as a real <a> when there's no
 * history so right-click / cmd-click still work.
 */
export function BackButton({
  fallbackHref = "/",
  label = "返回",
  className,
}: BackButtonProps) {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // window.history.length > 1 isn't perfectly reliable, but is the closest
    // browser-provided heuristic without referrer leaks.
    setCanGoBack(window.history.length > 1);
  }, []);

  const baseClasses = cn(
    "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-ink-500 transition-colors hover:bg-paper-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow",
    className
  );

  if (!canGoBack) {
    return (
      <Link href={fallbackHref} aria-label={label} className={baseClasses}>
        <ChevronLeft size={16} aria-hidden="true" />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        try {
          router.back();
        } catch (err) {
          console.warn(`${LOG_PREFIX} router.back failed, fallback`, err);
          router.push(fallbackHref);
        }
      }}
      aria-label={label}
      className={baseClasses}
    >
      <ChevronLeft size={16} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
