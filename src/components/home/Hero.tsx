export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 text-center sm:py-28">
      {/* Decorative ink wash — pure CSS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div
          className="h-64 w-64 rounded-full opacity-5 blur-3xl sm:h-96 sm:w-96"
          style={{ background: "var(--color-ink-900)" }}
        />
      </div>

      <div className="relative mx-auto max-w-2xl px-4">
        {/* Platform name */}
        <h1
          className="mb-4 text-6xl leading-none tracking-tight sm:text-8xl"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-ink-900)",
          }}
        >
          未说
        </h1>

        {/* English subtitle */}
        <p
          className="mb-6 text-sm tracking-[0.3em] uppercase opacity-50"
          style={{ fontFamily: "var(--font-accent)", color: "var(--color-ink-700)" }}
        >
          Untold
        </p>

        {/* Slogan */}
        <p
          className="mx-auto max-w-sm text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--color-ink-700)", fontFamily: "var(--font-body)" }}
        >
          故事从你打开这本书才真正开始
        </p>

        {/* Decorative rule */}
        <div className="mx-auto mt-8 flex items-center gap-3">
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
      </div>
    </section>
  );
}
