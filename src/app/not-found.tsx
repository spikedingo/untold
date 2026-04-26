import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <div
        className="text-8xl leading-none opacity-20"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-ink-900)" }}
        aria-hidden="true"
      >
        404
      </div>
      <h1
        className="text-2xl text-ink-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        找不到这本书
      </h1>
      <p className="max-w-sm text-sm leading-relaxed text-ink-500">
        也许这本书还未出现，也许它在等待某个特定的人。
      </p>
      <Link
        href="/"
        className="mt-2 rounded-md border border-paper-200 px-6 py-2 text-sm text-ink-700 transition-colors hover:border-amber-glow hover:text-amber-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
      >
        返回书架
      </Link>
    </div>
  );
}
