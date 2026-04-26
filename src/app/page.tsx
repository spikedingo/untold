import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { NovelGrid } from "@/components/home/NovelGrid";
import { getPublishedNovels } from "@/lib/queries/novels";

export const metadata: Metadata = {
  title: "未说 / Untold · 互动小说平台",
  description: "故事从你打开这本书才真正开始 — 精选互动小说，沉浸式阅读体验。",
};

export default async function HomePage() {
  const novels = await getPublishedNovels();

  return (
    <div className="mx-auto max-w-5xl px-4 pb-20">
      <Hero />
      <NovelGrid novels={novels} />
    </div>
  );
}
