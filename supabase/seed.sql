-- =============================================================================
-- Untold Interactive Fiction Platform — Seed Data
-- Created: 2026-04-26
-- =============================================================================
-- Run AFTER applying 0001_init migration.
-- Usage: psql $DATABASE_URL -f seed.sql
--   or:  paste into Supabase SQL Editor
-- =============================================================================
-- Novels:
--   1. 午夜图书馆 (slug: midnight-library) — main story with 5 scenes
--   2. 银线之间 (slug: the-silver-thread)  — upcoming placeholder
--   3. 琥珀回响 (slug: echoes-in-amber)    — upcoming placeholder
-- =============================================================================


-- ---------------------------------------------------------------------------
-- Clean existing seed data (idempotent re-run support)
-- ---------------------------------------------------------------------------
DELETE FROM scenes  WHERE novel_id IN (
  SELECT id FROM novels WHERE slug IN (
    'midnight-library', 'the-silver-thread', 'echoes-in-amber'
  )
);
DELETE FROM novels WHERE slug IN (
  'midnight-library', 'the-silver-thread', 'echoes-in-amber'
);


-- ---------------------------------------------------------------------------
-- Novel 1: 午夜图书馆 (main story, published)
-- ---------------------------------------------------------------------------
INSERT INTO novels (slug, title, author, summary, cover_url, cover_meta, published)
VALUES (
  'midnight-library',
  '午夜图书馆',
  '匿名',
  '在一座只在午夜出现的图书馆里，你只能翻开一本书。你选择了那本最不起眼的旧笔记本——里面写满了你遗忘的记忆，而最后一页，是空白的。',
  NULL,
  '{
    "bg": "#1B1812",
    "accent": "#C58B3B",
    "motif": "frame"
  }'::jsonb,
  true
);

-- Capture the inserted ID for scene linking
DO $$
DECLARE
  v_novel_id bigint;
BEGIN
  SELECT id INTO v_novel_id FROM novels WHERE slug = 'midnight-library';

  -- Scene 1: 午夜
  INSERT INTO scenes (novel_id, sequence, title, text) VALUES (
    v_novel_id,
    1,
    '午夜',
    '你推开那扇不应该存在的门。

图书馆的穹顶高得看不到尽头，书架像森林一样向四面八方延伸。空气中飘着旧纸和檀香的味道。

一位白发老人坐在前台，抬头看了你一眼：

「你来了。每个人一生只能来一次。」'
  );

  -- Scene 2: 三本书
  INSERT INTO scenes (novel_id, sequence, title, text) VALUES (
    v_novel_id,
    2,
    '三本书',
    '老人指向三个方向。

左边，一本发着微光的金色封面的书。右边，一本封面全黑、没有书名的书。中间，一本看起来很普通的旧笔记本。

你可以打开三本书中的一本——但只能读一本。

你走向了中间那本旧笔记本。'
  );

  -- Scene 3: 记忆
  INSERT INTO scenes (novel_id, sequence, title, text) VALUES (
    v_novel_id,
    3,
    '记忆',
    '你翻开旧笔记本，第一页写着你的名字。

后面的每一页都是一段你遗忘的记忆——七岁时丢失的那个下午，十五岁没说出口的那句话，去年在雨中错过的那个人。

最后一页是空白的，旁边放着一支笔。'
  );

  -- Scene 4: 落笔
  INSERT INTO scenes (novel_id, sequence, title, text) VALUES (
    v_novel_id,
    4,
    '落笔',
    '你拿起笔，在最后一页写下了一行字。

你写的不是愿望，而是一个约定——和那个雨中错过的人，在同一个路口，再见一面。

合上笔记本的瞬间，图书馆开始消融。书架变成了街道，穹顶变成了天空。'
  );

  -- Scene 5: 重逢
  INSERT INTO scenes (novel_id, sequence, title, text) VALUES (
    v_novel_id,
    5,
    '重逢',
    '你站在一个路口。天开始下雨了。

远处，有一个撑伞的人正在向你走来。

你知道，这一次你不会错过。'
  );
END $$;


-- ---------------------------------------------------------------------------
-- Novel 2: 银线之间 (upcoming placeholder, published = false)
-- ---------------------------------------------------------------------------
INSERT INTO novels (slug, title, author, summary, cover_url, cover_meta, published)
VALUES (
  'the-silver-thread',
  '银线之间',
  '匿名',
  '一封从未寄出的信，一段从未结束的旅程。当你找到那根银线的另一端，你才明白，有些故事是写给未来的你的。',
  NULL,
  '{
    "bg": "#1C2233",
    "accent": "#A8C4E0",
    "motif": "spine"
  }'::jsonb,
  false
);


-- ---------------------------------------------------------------------------
-- Novel 3: 琥珀回响 (upcoming placeholder, published = false)
-- ---------------------------------------------------------------------------
INSERT INTO novels (slug, title, author, summary, cover_url, cover_meta, published)
VALUES (
  'echoes-in-amber',
  '琥珀回响',
  '匿名',
  '那件被封存在琥珀里的事，你以为已经随时间硬化。直到有一天，它开始发出声音。',
  NULL,
  '{
    "bg": "#2A1A0A",
    "accent": "#E8A83C",
    "motif": "circle"
  }'::jsonb,
  false
);


-- ---------------------------------------------------------------------------
-- Verification query (run after seed to confirm data)
-- ---------------------------------------------------------------------------
-- SELECT n.title, count(s.id) AS scene_count
-- FROM novels n
-- LEFT JOIN scenes s ON s.novel_id = n.id
-- GROUP BY n.title
-- ORDER BY n.title;
