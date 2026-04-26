// Auto-generated Supabase types (run `supabase gen types typescript` to regenerate)
// Extended with manual types for cover_meta JSON shape.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      novels: {
        Row: {
          id: number;
          slug: string;
          title: string;
          author: string;
          summary: string;
          cover_url: string | null;
          cover_meta: Json;
          published: boolean;
          created_at: string;
        };
        Insert: {
          id?: never;
          slug: string;
          title: string;
          author?: string;
          summary: string;
          cover_url?: string | null;
          cover_meta?: Json;
          published?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["novels"]["Insert"]>;
      };
      scenes: {
        Row: {
          id: number;
          novel_id: number;
          sequence: number;
          title: string;
          text: string;
        };
        Insert: {
          id?: never;
          novel_id: number;
          sequence: number;
          title: string;
          text: string;
        };
        Update: Partial<Database["public"]["Tables"]["scenes"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

// ---------------------------------------------------------------------------
// Convenient domain types
// ---------------------------------------------------------------------------

export type NovelRow = Database["public"]["Tables"]["novels"]["Row"];
export type SceneRow = Database["public"]["Tables"]["scenes"]["Row"];

/** Typed shape of cover_meta JSON column */
export interface CoverMeta {
  bg: string;
  accent: string;
  motif: "frame" | "spine" | "circle" | "none";
}

/** Novel row with typed cover_meta */
export interface NovelWithCoverMeta extends Omit<NovelRow, "cover_meta"> {
  cover_meta: CoverMeta;
}
