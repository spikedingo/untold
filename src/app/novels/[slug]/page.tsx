import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NovelHeader } from "@/components/novel/NovelHeader";
import { Synopsis } from "@/components/novel/Synopsis";
import { StartReadingCTA } from "@/components/novel/StartReadingCTA";
import { BackButton } from "@/components/common/BackButton";
import { getNovelBySlug } from "@/lib/queries/novels";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const novel = await getNovelBySlug(slug);
  if (!novel) return { title: "找不到这本书" };
  return {
    title: novel.title,
    description: novel.summary,
  };
}

export default async function NovelDetailPage({ params }: Props) {
  const { slug } = await params;
  const novel = await getNovelBySlug(slug);
  if (!novel) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20">
      <div className="pt-6">
        <BackButton fallbackHref="/" label="返回书架" />
      </div>

      <NovelHeader novel={novel} />

      <div className="my-8 h-px bg-paper-200" aria-hidden="true" />

      <Synopsis text={novel.summary} />
      <StartReadingCTA slug={novel.slug} />
    </div>
  );
}
