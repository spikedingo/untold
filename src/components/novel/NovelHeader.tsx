import { TypographicCover } from "@/components/cover/TypographicCover";
import type { NovelWithCoverMeta } from "@/types/db";

interface NovelHeaderProps {
  novel: NovelWithCoverMeta;
}

export function NovelHeader({ novel }: NovelHeaderProps) {
  return (
    <header className="flex flex-col items-center gap-8 py-12 text-center sm:flex-row sm:items-end sm:text-left">
      <div className="shrink-0">
        <TypographicCover
          meta={novel.cover_meta}
          title={novel.title}
          author={novel.author}
          size="lg"
          coverUrl={novel.cover_url}
        />
      </div>

      <div>
        <p
          className="mb-1 text-sm tracking-widest text-ink-500 uppercase"
          style={{ fontFamily: "var(--font-accent)" }}
        >
          {novel.author}
        </p>
        <h1
          className="text-4xl leading-snug text-ink-900 sm:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {novel.title}
        </h1>
      </div>
    </header>
  );
}
