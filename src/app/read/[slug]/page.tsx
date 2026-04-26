import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReaderShell } from "@/components/reader/ReaderShell";
import { getNovelBySlug } from "@/lib/queries/novels";
import { getScenesByNovelSlug } from "@/lib/queries/scenes";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const novel = await getNovelBySlug(slug);
  if (!novel) return { title: "找不到这本书" };
  return {
    title: `阅读《${novel.title}》`,
    description: novel.summary,
  };
}

export default async function ReaderPage({ params }: Props) {
  const { slug } = await params;
  const [novel, scenes] = await Promise.all([
    getNovelBySlug(slug),
    getScenesByNovelSlug(slug),
  ]);

  if (!novel) notFound();

  return <ReaderShell novel={novel} scenes={scenes} />;
}
