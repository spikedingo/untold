import { NovelCard } from "./NovelCard";
import type { NovelWithCoverMeta } from "@/types/db";

interface NovelGridProps {
  novels: NovelWithCoverMeta[];
  /** Include unpublished placeholders passed from parent */
  placeholders?: NovelWithCoverMeta[];
}

export function NovelGrid({ novels, placeholders = [] }: NovelGridProps) {
  const all = [...novels, ...placeholders];

  if (all.length === 0) {
    return (
      <section id="novels" className="py-16 sm:py-20">
        <p className="py-12 text-center text-ink-500">暂无故事，敬请期待。</p>
      </section>
    );
  }

  return (
    <section
      id="novels"
      aria-labelledby="library-heading"
      className="relative py-16 sm:py-20"
    >
      {/* Section head */}
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <span
            className="mb-3 inline-block text-xs tracking-[0.32em] text-ink-500 uppercase"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            Library · 书架
          </span>
          <h2
            id="library-heading"
            className="text-3xl leading-tight text-ink-900 sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            精选故事
          </h2>
        </div>
        <p className="hidden max-w-xs text-sm leading-relaxed text-ink-500 sm:block">
          每一篇都经过手工排版与封面再设计，让故事配得上一次专心的阅读。
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {all.map((novel) => (
          <NovelCard key={novel.id} novel={novel} />
        ))}
      </div>
    </section>
  );
}
