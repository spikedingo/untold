"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[untold] Global error:", error.message);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div
        className="text-6xl opacity-20"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink-900)" }}
        aria-hidden="true"
      >
        出错了
      </div>
      <h1
        className="text-xl text-ink-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        加载失败，请稍后再试
      </h1>
      <p className="max-w-sm text-sm text-ink-500">
        故事暂时无法加载。请检查网络连接后重试。
      </p>
      <button
        onClick={reset}
        className="mt-2 rounded-md bg-amber-glow px-6 py-2 text-sm text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow focus-visible:ring-offset-2"
      >
        重新加载
      </button>
    </div>
  );
}
