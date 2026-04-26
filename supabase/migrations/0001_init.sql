-- =============================================================================
-- Untold Interactive Fiction Platform — Supabase Schema
-- Migration: 0001_init
-- Created: 2026-04-26
-- =============================================================================
-- This file is the canonical schema definition.
-- It is duplicated to supabase/migrations/0001_init.sql for Supabase CLI usage.
-- Run via: supabase db reset  (development)
--       or: supabase db push   (production)
-- =============================================================================


-- ---------------------------------------------------------------------------
-- Table: novels
-- Stores metadata for each interactive fiction work.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS novels (
  id          bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  slug        text    UNIQUE NOT NULL,
  title       text    NOT NULL,
  author      text    NOT NULL DEFAULT 'Anonymous',
  summary     text    NOT NULL,

  -- Optional raster cover image URL. When NULL, TypographicCover renders
  -- from cover_meta instead. Expected format: absolute HTTPS URL or null.
  cover_url   text,

  -- CSS cover configuration for the typographic cover component.
  -- Shape: { bg: string, accent: string, motif: "frame" | "spine" | "circle" | "none" }
  cover_meta  jsonb   NOT NULL DEFAULT '{}'::jsonb,

  -- Controls homepage visibility. false = placeholder / upcoming title.
  published   boolean NOT NULL DEFAULT true,

  created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE  novels                IS 'Interactive fiction works displayed on the platform';
COMMENT ON COLUMN novels.slug           IS 'URL-safe identifier used in routing. Format: [a-z0-9-]+. Immutable once published.';
COMMENT ON COLUMN novels.cover_url      IS 'Optional raster cover. NULL triggers CSS typographic cover rendering.';
COMMENT ON COLUMN novels.cover_meta     IS 'JSON config for TypographicCover: { bg, accent, motif }';
COMMENT ON COLUMN novels.published      IS 'false = hidden from homepage; reader route returns 404';


-- ---------------------------------------------------------------------------
-- Table: scenes
-- Stores individual narrative units (pages) within a novel.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scenes (
  id          bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,

  -- Foreign key to the parent novel. Cascades deletion.
  novel_id    bigint  NOT NULL REFERENCES novels(id) ON DELETE CASCADE,

  -- 1-indexed reading order. Unique per novel to prevent duplicate positions.
  sequence    integer NOT NULL,

  -- Chapter/scene title displayed in the reader header.
  title       text    NOT NULL,

  -- Full scene body text. Plain text; paragraph breaks use \n\n.
  -- No HTML allowed — render with white-space: pre-line or split on \n\n.
  text        text    NOT NULL,

  -- Enforce unique ordering per novel
  CONSTRAINT scenes_novel_sequence_unique UNIQUE (novel_id, sequence)
);

COMMENT ON TABLE  scenes               IS 'Narrative scenes belonging to a novel, ordered by sequence';
COMMENT ON COLUMN scenes.sequence      IS '1-indexed reading position. Must be contiguous starting at 1 per novel.';
COMMENT ON COLUMN scenes.text          IS 'Plain text body. Use \\n\\n for paragraph breaks.';


-- ---------------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------------

-- Primary read pattern: fetch all scenes for a novel in sequence order
CREATE INDEX IF NOT EXISTS scenes_by_novel
  ON scenes (novel_id, sequence);

-- Slug lookup on every RSC page render
CREATE INDEX IF NOT EXISTS novels_slug_published_idx
  ON novels (slug)
  WHERE published = true;


-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- All write operations are blocked for the anon role.
-- Content is managed exclusively via Supabase dashboard or service-role scripts.
-- ---------------------------------------------------------------------------

ALTER TABLE novels ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenes ENABLE ROW LEVEL SECURITY;

-- novels: anon can SELECT only published works
CREATE POLICY "public read published novels"
  ON novels
  FOR SELECT
  USING (published = true);

-- scenes: anon can SELECT all scenes (novel publish status checked at app layer)
CREATE POLICY "public read scenes"
  ON scenes
  FOR SELECT
  USING (true);
