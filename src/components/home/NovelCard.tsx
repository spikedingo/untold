import Link from "next/link";
import { TypographicCover } from "@/components/cover/TypographicCover";
import type { NovelWithCoverMeta } from "@/types/db";

interface NovelCardProps {
  novel: NovelWithCoverMeta;
}

export function NovelCard({ novel }: NovelCardProps) {
  if (!novel.published) {
    return (
      <div className="flex flex-col gap-4 rounded-lg border border-paper-200 bg-paper-100 p-5 opacity-60">
        <TypographicCover meta={novel.cover_meta} title={novel.title} author={novel.author} size="md" coverUrl={novel.cover_url} />
        <div>
          <span className="mb-1 inline-block rounded-full bg-paper-200 px-2 py-0.5 text-xs text-ink-500">
            即将上线
          </span>
          <h3
            className="text-lg leading-snug text-ink-700"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {novel.title}
          </h3>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={`/novels/${novel.slug}`}
      className="group flex flex-col gap-4 rounded-lg border border-paper-200 bg-paper-100 p-5 transition-all hover:border-amber-glow/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
    >
      <div className="transition-transform duration-300 group-hover:scale-[1.02]">
        <TypographicCover meta={novel.cover_meta} title={novel.title} author={novel.author} size="md" coverUrl={novel.cover_url} />
      </div>

      <div>
        <h3
          className="mb-1 text-lg leading-snug text-ink-900"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {novel.title}
        </h3>
        <p className="text-sm text-ink-500">
          {novel.author}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-700">
          {novel.summary}
        </p>
      </div>
    </Link>
  );
}
