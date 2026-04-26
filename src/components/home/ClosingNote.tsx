import Link from "next/link";

export function ClosingNote() {
  return (
    <section
      aria-labelledby="closing-heading"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      {/* Centered ornament */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-start justify-center pt-6 opacity-[0.04]"
      >
        <span
          className="text-[14rem] leading-none"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-ink-900)",
          }}
        >
          说
        </span>
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-8 flex w-32 items-center gap-3">
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

        <p
          className="mb-3 text-xs tracking-[0.32em] text-ink-500 uppercase"
          style={{ fontFamily: "var(--font-accent)" }}
        >
          A Quiet Invitation
        </p>

        <h2
          id="closing-heading"
          className="mb-8 text-3xl leading-snug text-ink-900 sm:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          挑一个安静的夜晚，
          <br className="hidden sm:block" />
          为自己留一段不被打扰的时间。
        </h2>

        <p
          className="mx-auto mb-10 max-w-lg text-base leading-loose text-ink-700"
          style={{ fontFamily: "var(--font-body)" }}
        >
          不需要登录，不需要订阅。打开任意一篇，从你想停下的地方开始读。
        </p>

        <Link
          href="#novels"
          className="inline-flex items-center gap-2 rounded-md border border-ink-900/20 px-6 py-3 text-sm text-ink-900 transition-colors hover:border-amber-glow hover:text-amber-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
        >
          浏览全部故事
          <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  );
}
