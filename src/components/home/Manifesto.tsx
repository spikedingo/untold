export function Manifesto() {
  return (
    <section
      aria-labelledby="manifesto-heading"
      className="relative py-16 sm:py-24"
    >
      {/* Section label */}
      <div className="mb-10 flex items-center gap-4">
        <span
          className="text-xs tracking-[0.32em] text-ink-500 uppercase"
          style={{ fontFamily: "var(--font-accent)" }}
        >
          Manifesto · 关于未说
        </span>
        <div className="h-px flex-1 bg-paper-200" aria-hidden="true" />
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Display heading */}
        <div className="lg:col-span-5">
          <h2
            id="manifesto-heading"
            className="text-4xl leading-[1.15] text-ink-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            为还没说出口的
            <br />
            那些故事，
            <br />
            留一处空白。
          </h2>
        </div>

        {/* Body copy */}
        <div className="space-y-6 lg:col-span-6 lg:col-start-7">
          {/* Drop quote opener */}
          <p
            className="relative text-lg leading-relaxed text-ink-900 first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:leading-[0.85] first-letter:text-amber-glow"
            style={{ fontFamily: "var(--font-body)" }}
          >
            阅读是一件私密的事。一段文字、一个停顿、一次合上书的呼吸——
            我们相信，这些瞬间值得被认真对待。
          </p>

          <p
            className="text-base leading-loose text-ink-700"
            style={{ fontFamily: "var(--font-body)" }}
          >
            未说不是一个填满推荐流的内容平台。它更像一间小小的纸质书房：
            一次只点一盏灯，一次只翻一页书。我们挑选那些更适合慢慢读、
            慢慢回味的故事，把它们重新排版、配色、上灯，再交到你手里。
          </p>

          {/* Pull quote / signature */}
          <div className="mt-10 flex items-baseline gap-4 border-t border-paper-200 pt-6">
            <span
              className="text-amber-glow"
              aria-hidden="true"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              ✦
            </span>
            <p
              className="text-sm tracking-wide text-ink-500 italic"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Untold — stories that begin when you do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
