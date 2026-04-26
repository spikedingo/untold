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
      <p className="py-12 text-center text-ink-500">暂无故事，敬请期待。</p>
    );
  }

  return (
    <section aria-label="故事列表">
      <h2
        className="mb-6 text-sm tracking-widest text-ink-500 uppercase"
        style={{ fontFamily: "var(--font-accent)" }}
      >
        精选故事
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {all.map((novel) => (
          <NovelCard key={novel.id} novel={novel} />
        ))}
      </div>
    </section>
  );
}
