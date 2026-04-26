import { createClient } from "@/lib/supabase/server";
import type { NovelWithCoverMeta } from "@/types/db";

/** Fetch all published novels ordered by creation date */
export async function getPublishedNovels(): Promise<NovelWithCoverMeta[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("novels")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[novels] getPublishedNovels error:", error.message);
    return [];
  }
  return (data ?? []) as NovelWithCoverMeta[];
}

/** Fetch a single published novel by slug. Returns null if not found. */
export async function getNovelBySlug(
  slug: string
): Promise<NovelWithCoverMeta | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("novels")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error) {
    console.error("[novels] getNovelBySlug error:", error.message);
    return null;
  }
  return data as NovelWithCoverMeta | null;
}
