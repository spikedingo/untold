import { createClient } from "@/lib/supabase/server";
import { getNovelBySlug } from "./novels";
import type { SceneRow } from "@/types/db";

/** Fetch all scenes for a novel identified by slug, ordered by sequence */
export async function getScenesByNovelSlug(
  slug: string
): Promise<SceneRow[]> {
  const supabase = await createClient();
  const novel = await getNovelBySlug(slug);
  if (!novel) return [];

  const { data, error } = await supabase
    .from("scenes")
    .select("*")
    .eq("novel_id", novel.id)
    .order("sequence", { ascending: true });

  if (error) {
    console.error("[scenes] getScenesByNovelSlug error:", error.message);
    return [];
  }
  return data ?? [];
}
