import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { FeaturedSpotlight } from "@/components/home/FeaturedSpotlight";
import { Features } from "@/components/home/Features";
import { NovelGrid } from "@/components/home/NovelGrid";
import { ClosingNote } from "@/components/home/ClosingNote";
import { getPublishedNovels } from "@/lib/queries/novels";

export const metadata: Metadata = {
  title: "未说 / Untold · 互动小说平台",
  description: "故事从你打开这本书才真正开始 — 精选互动小说，沉浸式阅读体验。",
};

export default async function HomePage() {
  const novels = await getPublishedNovels();
  const [featured, ...rest] = novels;

  return (
    <div className="mx-auto max-w-5xl px-4 pb-24">
      <Hero />

      <div id="manifesto">
        <Manifesto />
      </div>

      {featured && (
        <div id="spotlight" className="scroll-mt-24">
          <FeaturedSpotlight novel={featured} />
        </div>
      )}

      <Features />

      <NovelGrid novels={featured ? rest : novels} />

      <ClosingNote />
    </div>
  );
}
