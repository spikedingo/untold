import Link from "next/link";

/* Vertical character columns — read top-to-bottom, paired across the hero
 * to subtly echo the platform name "未说". Hidden below lg to preserve
 * breathing room on small screens. */
const LEFT_VERTICAL = ["一", "灯", "一", "书"];
const RIGHT_VERTICAL = ["万", "言", "未", "说"];

function VerticalCaption({
  chars,
  side,
}: {
  chars: string[];
  side: "left" | "right";
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 select-none lg:flex ${
        side === "left" ? "left-2" : "right-2"
      } flex-col items-center gap-3 opacity-30`}
      style={{
        fontFamily: "var(--font-display)",
        color: "var(--color-ink-700)",
        writingMode: "vertical-rl",
      }}
    >
      <span className="h-6 w-px bg-paper-200" />
      <div className="flex flex-col items-center gap-2 text-sm tracking-[0.4em]">
        {chars.map((c, i) => (
          <span key={`${side}-${i}`}>{c}</span>
        ))}
      </div>
      <span className="h-6 w-px bg-paper-200" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 text-center sm:py-32">
      {/* Top & bottom hairline edges — subtle "page" framing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-paper-200"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-paper-200"
      />

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

      {/* Hairline seal ring behind the title — vintage stamp echo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[58%]"
      >
        <div
          className="h-44 w-44 rounded-full sm:h-64 sm:w-64"
          style={{
            border: "1px solid var(--color-paper-200)",
            opacity: 0.7,
          }}
        />
      </div>

      {/* Vertical poetic captions on the sides */}
      <VerticalCaption chars={LEFT_VERTICAL} side="left" />
      <VerticalCaption chars={RIGHT_VERTICAL} side="right" />

      <div className="relative mx-auto max-w-2xl px-4">
        {/* Editorial masthead */}
        <div
          className="mb-10 flex items-center justify-center gap-3 text-xs tracking-[0.32em] text-ink-500 opacity-70 sm:text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span>卷一</span>
          <span aria-hidden="true" className="text-amber-glow opacity-70">
            ·
          </span>
          <span>春</span>
          <span aria-hidden="true" className="text-amber-glow opacity-70">
            ·
          </span>
          <span>二〇二六</span>
        </div>

        {/* Eyebrow */}
        <p
          className="mb-6 text-xs tracking-[0.32em] text-ink-500 opacity-80 sm:text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          慢读 · 长想 · 不被打扰
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

        {/* Footnote-style metadata */}
        <p
          className="mt-3 text-xs tracking-[0.24em] text-ink-500 opacity-70"
          style={{ fontFamily: "var(--font-body)" }}
        >
          本期收录 · 持续更新
        </p>

        {/* Decorative rule — dot · hairline · ✦ · hairline · dot */}
        <div className="mx-auto mt-10 flex max-w-xs items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-paper-200"
          />
          <div className="h-px flex-1 bg-paper-200" />
          <span
            className="text-amber-glow opacity-70"
            style={{ fontFamily: "var(--font-accent)" }}
            aria-hidden="true"
          >
            ✦
          </span>
          <div className="h-px flex-1 bg-paper-200" />
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-paper-200"
          />
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
