import type { ReactNode } from "react";
import { BookOpen, Volume2, BookmarkCheck } from "lucide-react";

interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: FeatureItem[] = [
  {
    icon: <BookOpen size={20} aria-hidden="true" />,
    title: "沉浸式排版",
    description:
      "为长文阅读量身定制的字号、行距与栏宽，让中文段落在屏幕上像纸一样呼吸。",
  },
  {
    icon: <Volume2 size={20} aria-hidden="true" />,
    title: "朗读陪伴",
    description:
      "原生 TTS 朗读支持，闭上眼睛，让故事像广播剧一样在耳边铺展开来。",
  },
  {
    icon: <BookmarkCheck size={20} aria-hidden="true" />,
    title: "进度自动记忆",
    description:
      "无需注册账号，浏览器自动保存阅读位置，随时离开、随时回来。",
  },
];

export function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      className="relative py-16 sm:py-20"
    >
      {/* Section heading */}
      <div className="mb-12 flex items-center gap-4">
        <span
          className="text-xs tracking-[0.32em] text-ink-500 uppercase"
          style={{ fontFamily: "var(--font-accent)" }}
        >
          Features · 三件小事
        </span>
        <div className="h-px flex-1 bg-paper-200" aria-hidden="true" />
      </div>

      <h2
        id="features-heading"
        className="mb-12 max-w-xl text-3xl leading-tight text-ink-900 sm:text-4xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        我们只做和阅读直接相关的事。
      </h2>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-paper-200 bg-paper-200 sm:grid-cols-3">
        {features.map((f, i) => (
          <article
            key={f.title}
            className="relative flex flex-col gap-4 bg-paper-50 p-7"
          >
            {/* Numeral */}
            <div
              className="text-sm tracking-widest text-ink-500"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              0{i + 1}
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-paper-200 text-amber-glow">
              {f.icon}
            </div>

            <h3
              className="text-xl leading-snug text-ink-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {f.title}
            </h3>

            <p className="text-sm leading-relaxed text-ink-700">
              {f.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
