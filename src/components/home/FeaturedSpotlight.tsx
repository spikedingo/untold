import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TypographicCover } from "@/components/cover/TypographicCover";
import type { NovelWithCoverMeta } from "@/types/db";

interface FeaturedSpotlightProps {
  novel: NovelWithCoverMeta;
}

export function FeaturedSpotlight({ novel }: FeaturedSpotlightProps) {
  // Trim summary to a single tasteful pull quote (~100 chars)
  const teaser = (() => {
    const firstPara = novel.summary.split("\n\n")[0]?.trim() ?? "";
    if (firstPara.length <= 110) return firstPara;
    return `${firstPara.slice(0, 110).replace(/[，。、；：]$/, "")}…`;
  })();

  return (
    <section
      aria-labelledby="spotlight-heading"
      className="relative overflow-hidden rounded-xl border border-paper-200 bg-paper-100/60 px-6 py-12 sm:px-10 sm:py-16"
    >
      {/* Decorative wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.08] blur-3xl"
        style={{ background: "var(--color-amber-glow)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-[0.06] blur-3xl"
        style={{ background: "var(--color-ink-900)" }}
      />

      <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Cover */}
        <div className="flex justify-center lg:col-span-5">
          <div className="relative">
            {/* Subtle floor shadow */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 left-1/2 h-4 w-32 -translate-x-1/2 rounded-full bg-ink-900/15 blur-md"
            />
            <TypographicCover
              meta={novel.cover_meta}
              title={novel.title}
              author={novel.author}
              size="lg"
              coverUrl={novel.cover_url}
            />
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-7">
          <div className="mb-6 flex items-center gap-3">
            <span
              className="inline-block h-px w-8 bg-amber-glow"
              aria-hidden="true"
            />
            <span
              className="text-xs tracking-[0.32em] text-amber-glow uppercase"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Now Reading · 本期精选
            </span>
          </div>

          <p
            className="mb-2 text-sm tracking-widest text-ink-500 uppercase"
            style={{ fontFamily: "var(--font-accent)" }}
          >
            {novel.author}
          </p>

          <h2
            id="spotlight-heading"
            className="mb-6 text-4xl leading-tight text-ink-900 sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {novel.title}
          </h2>

          <blockquote
            className="mb-8 border-l-2 border-amber-glow/60 pl-5 text-base leading-loose text-ink-700"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {teaser}
          </blockquote>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/read/${novel.slug}`}
              className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow focus-visible:ring-offset-2"
              style={{ background: "var(--color-amber-glow)" }}
            >
              <span>立即阅读</span>
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <Link
              href={`/novels/${novel.slug}`}
              className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm text-ink-700 underline-offset-4 transition-colors hover:text-ink-900 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
            >
              查看故事简介
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
