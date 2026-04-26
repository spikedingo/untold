import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 text-center sm:py-32">
      {/* Decorative ink wash — pure CSS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-72 w-72 rounded-full opacity-[0.06] blur-3xl sm:h-[28rem] sm:w-[28rem]"
          style={{ background: "var(--color-ink-900)" }}
        />
      </div>

      {/* Faint Chinese seal-style ornament */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-1/2 top-10 hidden translate-x-[14rem] sm:block"
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-sm border opacity-30"
          style={{
            borderColor: "var(--color-amber-glow)",
            color: "var(--color-amber-glow)",
            fontFamily: "var(--font-display)",
          }}
        >
          书
        </div>
      </div>

      <div className="relative mx-auto max-w-2xl px-4">
        {/* Eyebrow */}
        <p
          className="mb-6 text-[11px] tracking-[0.5em] text-ink-500 uppercase opacity-80"
          style={{ fontFamily: "var(--font-accent)" }}
        >
          An Interactive Reading Atelier
        </p>

        {/* Platform name */}
        <h1
          className="mb-4 text-7xl leading-none tracking-tight sm:text-9xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-ink-900)",
          }}
        >
          未说
        </h1>

        {/* English subtitle */}
        <p
          className="mb-8 text-sm tracking-[0.3em] uppercase opacity-50"
          style={{
            fontFamily: "var(--font-accent)",
            color: "var(--color-ink-700)",
          }}
        >
          Untold
        </p>

        {/* Slogan */}
        <p
          className="mx-auto max-w-md text-lg leading-relaxed sm:text-xl"
          style={{
            color: "var(--color-ink-700)",
            fontFamily: "var(--font-body)",
          }}
        >
          故事从你打开这本书才真正开始。
        </p>

        {/* Decorative rule */}
        <div className="mx-auto mt-10 flex max-w-xs items-center gap-3">
          <div className="h-px flex-1 bg-paper-200" />
          <span
            className="text-amber-glow opacity-60"
            style={{ fontFamily: "var(--font-accent)" }}
            aria-hidden="true"
          >
            ✦
          </span>
          <div className="h-px flex-1 bg-paper-200" />
        </div>

        {/* Hero CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="#spotlight"
            className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow focus-visible:ring-offset-2"
            style={{ background: "var(--color-amber-glow)" }}
          >
            <span>开始阅读</span>
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="#manifesto"
            className="text-sm tracking-wide text-ink-700 underline-offset-4 transition-colors hover:text-ink-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
          >
            了解未说 ↓
          </Link>
        </div>
      </div>
    </section>
  );
}
