"use client";

import { useState } from "react";

interface FontPreset {
  id: string;
  name: string;
  body: string;
  display: string;
  googleLink: string;
}

const PRESETS: FontPreset[] = [
  {
    id: "default",
    name: "默认 · LXGW + Ma Shan Zheng",
    body: "'LXGW WenKai', serif",
    display: "'Ma Shan Zheng', cursive",
    googleLink:
      "https://fonts.googleapis.com/css2?family=LXGW+WenKai&family=Ma+Shan+Zheng&display=swap",
  },
  {
    id: "noto",
    name: "典雅 · Noto Serif SC + ZCOOL XiaoWei",
    body: "'Noto Serif SC', serif",
    display: "'ZCOOL XiaoWei', serif",
    googleLink:
      "https://fonts.googleapis.com/css2?family=Noto+Serif+SC&family=ZCOOL+XiaoWei&display=swap",
  },
  {
    id: "source",
    name: "活泼 · Source Han Serif SC + ZCOOL KuaiLe",
    body: "'Source Han Serif SC', serif",
    display: "'ZCOOL KuaiLe', cursive",
    googleLink:
      "https://fonts.googleapis.com/css2?family=ZCOOL+KuaiLe&display=swap",
  },
];

const SAMPLE_HEADING = "午夜图书馆";
const SAMPLE_PARA =
  "你推开那扇不应该存在的门。图书馆的穹顶高得看不到尽头，书架像森林一样向四面八方延伸。空气中飘着旧纸和檀香的味道。";

export default function FontDebugPage() {
  const [activeId, setActiveId] = useState("default");
  const active = PRESETS.find((p) => p.id === activeId) ?? PRESETS[0];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1
        className="mb-2 text-3xl text-ink-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        字体预览 / Font Debug
      </h1>
      <p className="mb-8 text-sm text-ink-500">开发工具 · 生产环境不可见</p>

      {/* Preset switcher */}
      <div className="mb-8 flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              activeId === p.id
                ? "border-amber-glow bg-amber-glow text-white"
                : "border-paper-200 text-ink-700 hover:border-amber-glow"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Dynamic font load */}
      <link rel="stylesheet" href={active.googleLink} />

      {/* Preview grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PRESETS.map((p) => (
          <div
            key={p.id}
            className={`rounded-lg border p-5 ${
              activeId === p.id ? "border-amber-glow/50" : "border-paper-200"
            } bg-paper-100`}
          >
            <p className="mb-2 text-xs text-ink-500">{p.name}</p>
            <h2
              className="mb-3 text-2xl leading-snug text-ink-900"
              style={{ fontFamily: p.display }}
            >
              {SAMPLE_HEADING}
            </h2>
            <p
              className="text-sm leading-relaxed text-ink-700"
              style={{ fontFamily: p.body }}
            >
              {SAMPLE_PARA}
            </p>
            <p
              className="mt-2 text-xs text-ink-500"
              style={{ fontFamily: p.body }}
            >
              正文 / body · 数字 1234567890 English
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-paper-200 pt-6">
        <p className="text-xs text-ink-500">
          当前激活 body: <code className="ml-1 text-amber-glow">{active.body}</code>
          <span className="mx-2 opacity-30">·</span>
          display: <code className="text-amber-glow">{active.display}</code>
        </p>
      </div>
    </div>
  );
}
