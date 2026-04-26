# 未说 / Untold

> 故事从你打开这本书才真正开始

An interactive fiction platform with an Organic Paper × Editorial Literary aesthetic. Built with Next.js 15, Supabase, Tailwind CSS v4, and Motion.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, RSC-first) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 with `@theme` custom tokens |
| Animation | Motion (Framer Motion) — fade+rise, `AnimatePresence` |
| Database | Supabase (Postgres + RLS) |
| Fonts | LXGW WenKai · Ma Shan Zheng · Fraunces (Google Fonts) |
| Package Manager | Yarn |
| Deployment | Vercel |

## Features

- **P1** Linear scene reader with fade+rise transition animations
- **P1** CSS/SVG typographic book covers driven by `cover_meta` JSON
- **P1** Dark mode ("夜读") via `data-theme` attribute, persisted to localStorage
- **P1** Font size & line-height adjustment, persisted to localStorage
- **P1** Reading progress saved per novel, resume banner on return visit
- **P1** Amber progress bar with chapter counter
- **P2** Web Speech API TTS narration (zh-CN, Chrome preferred)
- **P3** Keyboard arrow key navigation (left/right)

## Setup

See [specs/001-untold-platform/quickstart.md](../specs/001-untold-platform/quickstart.md) for the full onboarding guide.

### Quick start

```bash
yarn install
cp .env.local.example .env.local
# Fill in Supabase credentials, then:
yarn dev
```

### Database

1. Apply schema: paste `supabase/migrations/0001_init.sql` into Supabase SQL Editor
2. Seed data: paste `supabase/seed.sql` into Supabase SQL Editor
3. (Optional) Regenerate types: `supabase gen types typescript --project-id <ref> > src/types/db.ts`

### Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
```

## Routes

| URL | Description |
|---|---|
| `/` | Homepage — hero + novel grid |
| `/novels/[slug]` | Novel detail — cover, synopsis, CTA |
| `/read/[slug]` | Scene reader — 5 scenes with transitions |
| `/dev/fonts` | Font combination debugger (dev tool) |

## Project Structure

```
src/
  app/           Next.js App Router pages
  components/
    home/        Hero, NovelGrid, NovelCard
    novel/       NovelHeader, Synopsis, StartReadingCTA
    reader/      ReaderShell, SceneView, ProgressBar, ReaderToolbar, EndingCard...
    cover/       TypographicCover (CSS/SVG cover system)
    common/      Navbar, ThemeToggle, FontSizeSlider, PaperBackground
  lib/
    supabase/    Server + browser clients
    queries/     RSC data access (novels, scenes)
    hooks/       useTheme, useReadingProgress, useReaderSettings, useTTS
    utils/       cn helper
  styles/        tokens.css — paper/ink/amber design tokens
  types/         db.ts — Supabase database types
supabase/
  migrations/    0001_init.sql
  seed.sql
```

## Commit Philosophy

This project follows Conventional Commits format (`feat/fix/chore/docs/refactor`) with scopes reflecting each feature module. Commit messages document the intent and AI collaboration context for each increment.

## Deploy

```bash
vercel
# Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel dashboard
```
