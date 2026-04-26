# 未说 / Untold

> 故事从你打开这本书才真正开始

**未说**是一个沉浸式互动小说阅读平台，以「东方纸本 × 编辑设计」为视觉基调，专为中文长文阅读体验打造。

线上预览：[untold.vercel.app](https://untold.vercel.app)

---

## 技术栈

| 层级 | 技术选型 |
|---|---|
| 框架 | Next.js 16（App Router，RSC 优先） |
| 语言 | TypeScript 5（strict 模式） |
| 样式 | Tailwind CSS v4，`@theme` 自定义 Design Tokens |
| 动效 | Motion（Framer Motion） — `AnimatePresence` 场景切换 |
| 数据库 | Supabase（PostgreSQL + RLS） |
| 字体 | LXGW 文楷 · 马善政楷书 · Fraunces（Google Fonts） |
| 包管理器 | Yarn |
| 部署 | Vercel |

---

## 亮点功能

### 设计系统

- **Design Token 体系**：所有颜色、字体、间距均以 CSS 变量形式定义于 `tokens.css`，并通过 Tailwind v4 `@theme` 暴露为 utility class（如 `text-ink-900`、`bg-paper-100`、`border-amber-glow`）
- **「纸本 × 墨水」视觉语言**：paper-50 羊皮纸底色、ink-900 深墨字色、amber-glow 烛光琥珀作为主 accent，整体呈现旧时书房气质
- **全局纸纹背景**：SVG fractalNoise 滤镜实现零图片依赖的纸张纹理，dark mode 自动切换为夜色调
- **自定义滚动条**：WebKit + Firefox 双覆盖，颜色跟随 Design Token，dark mode 自动适配；hover 变深墨色，active 变琥珀色
- **印章风格 Favicon**：SVG 矢量版（任意分辨率清晰）+ apple-icon.png（iOS 主屏），琥珀底 × 「未」字羊皮纸色

### Landing Page 首页

- **Hero Section**：编辑式 masthead（卷一·春·二〇二六）、印章圆环装饰、左右竖排诗意小字「一灯一书／万言未说」、双 CTA 按钮
- **Manifesto Section**：12 列编辑排版，左侧大标题 + 右侧首字下沉引文，拉丁签名收尾
- **本期精选（Featured Spotlight）**：自动取第一本小说，大封面 + 装饰光晕 + 引言摘要 + 立即阅读/简介双 CTA
- **三大特色（Features）**：分栏展示「沉浸式排版」「朗读陪伴」「进度自动记忆」，编号卡片式布局
- **精选书架（Novel Grid）**：响应式网格（1 → 2 → 3 列），含书架说明副标题
- **收尾引言（Closing Note）**：全屏居中，淡显巨型「说」字衬底，柔和引导 CTA

### 小说详情页

- 大封面 + 作者 + 书名 横/纵响应式排版
- 内容简介首段首字下沉（amber-glow 色）
- **返回上一页按钮**：优先调用 `router.back()`，无浏览历史时降级为 `<a href>` 链接，cmd-click / 右键可正常使用

### 沉浸式阅读器

- **双固定导航栏**：
  - 顶部栏（`fixed top-0`）：返回详情、字号调节、TTS 朗读、明暗切换，底边有 amber 进度 strip
  - 底部栏（`fixed bottom-0`）：上一页 / 章节计数 / 下一页，磨砂背景，iOS safe-area 兼容
- **进度条**：仅保留顶部栏底边一根，底部不重复，逻辑清晰
- **阅读页隐藏全站 Navbar**：通过 `ConditionalNavbar` 在 `/read/*` 路由下自动隐藏，阅读空间完整
- **场景切换动效**：fade + rise/fall，支持 `prefers-reduced-motion` 无障碍
- **键盘导航**：← / → / ↑ / ↓ 方向键翻页
- **字号 & 行距调节**：四档切换（小 / 中 / 大 / 特大），CSS 变量驱动，localStorage 持久化
- **Web Speech API 朗读（TTS）**：zh-CN 优先语音，场景切换自动停止，无中文语音时禁用按钮
- **阅读进度持久化**：localStorage 按 slug 存储，二次打开显示「续读第 N 章」横幅，6 秒自动关闭
- **结局卡片**：故事读完后展示最后一段引语 + 重读 / 返回详情两个操作

### 封面系统

- **TypographicCover**：纯 CSS 生成书籍封面，`cover_meta` JSON 驱动（背景色、强调色、装饰 motif），支持 frame / spine / circle / none 四种样式
- **图片封面兜底**：有 `cover_url` 时渲染真实图片，带渐变遮罩保证标题可读性
- 三档尺寸（sm / md / lg），响应式自适应

### 暗色模式

- `data-theme="dark"` 驱动，所有 Design Token 自动翻转
- `<script>` 内联在 `<head>` 最前执行，消除闪白（FOUC）
- 系统偏好跟随 + 手动切换双支持，偏好写入 localStorage

### 数据层

- **RSC 优先**：所有数据查询在 Server Component 中完成，无客户端 fetching 瀑布
- **Supabase Server Client**：配合 `@supabase/ssr` + `cookies()` 正确传递 cookie，为 RLS 预留扩展空间
- **类型安全**：`Database` 类型从 schema 手工维护，`NovelWithCoverMeta` 覆盖 `cover_meta` 为强类型

---

## 快速开始

```bash
# 1. 安装依赖
yarn install

# 2. 配置环境变量
cp .env.example .env
# 填入 Supabase 项目的 URL 和 anon key

# 3. 初始化数据库
# 打开 Supabase SQL Editor，依次执行：
# supabase/migrations/0001_init.sql
# supabase/seed.sql

# 4. 启动开发服务器
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 环境变量

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
# 可选，仅 seed 脚本使用
SUPABASE_SERVICE_ROLE_KEY=eyJh...
```

---

## 路由结构

| 路由 | 说明 |
|---|---|
| `/` | 首页 — Landing Page，含 Hero / Manifesto / 精选 / 特色 / 书架 |
| `/novels/[slug]` | 小说详情页 — 封面、简介、开始阅读 CTA |
| `/read/[slug]` | 沉浸式阅读器 — 场景切换、双固定栏、TTS |
| `/dev/fonts` | 字体组合调试工具（仅开发环境使用） |

---

## 项目结构

```
src/
  app/                    Next.js App Router 页面
    icon.svg              矢量 Favicon（印章风格）
    apple-icon.png        iOS 主屏图标
  components/
    home/                 Hero · Manifesto · FeaturedSpotlight
                          Features · NovelGrid · NovelCard · ClosingNote
    novel/                NovelHeader · Synopsis · StartReadingCTA
    reader/               ReaderShell · SceneView · NavigationButtons
                          ReaderToolbar · ProgressBar · ResumeBanner
                          EndingCard · TTSButton
    cover/                TypographicCover（CSS 封面系统）
    common/               ConditionalNavbar · Navbar · BackButton
                          ThemeToggle · FontSizeSlider · PaperBackground
  lib/
    supabase/             server.ts — RSC / Server Action 客户端
    queries/              novels.ts · scenes.ts — 数据查询层
    hooks/                useTheme · useReadingProgress
                          useReaderSettings · useTTS
    utils/                cn.ts
  styles/
    tokens.css            Design Token 定义（纸色 / 墨色 / 琥珀色）
  types/
    db.ts                 Supabase 类型 + CoverMeta / NovelWithCoverMeta
supabase/
  migrations/             0001_init.sql（novels + scenes 表）
  seed.sql                示例小说数据
  add_novels.sql          追加小说脚本
```

---

## 部署到 Vercel

```bash
vercel
```

在 Vercel Dashboard → Settings → Environment Variables 中添加：

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

添加完成后重新部署（Redeploy，不使用缓存）即可。
