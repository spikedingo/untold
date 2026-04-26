import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import type { CoverMeta } from "@/types/db";

interface TypographicCoverProps {
  meta: CoverMeta;
  title: string;
  author: string;
  size?: "sm" | "md" | "lg";
  coverUrl?: string | null;
}

const sizeStyles = {
  sm:  { wrapper: "w-24 h-36",   title: "text-sm",    author: "text-[10px]" },
  md:  { wrapper: "w-36 h-52",   title: "text-base",  author: "text-xs" },
  lg:  { wrapper: "w-52 h-[18rem]", title: "text-xl", author: "text-sm" },
};

export function TypographicCover({
  meta,
  title,
  author,
  size = "md",
  coverUrl,
}: TypographicCoverProps) {
  const { wrapper, title: titleSize, author: authorSize } = sizeStyles[size];
  const { bg, accent, motif } = meta;

  // Render photo cover when URL is provided
  if (coverUrl) {
    return (
      <div
        className={cn("relative overflow-hidden rounded-sm", wrapper)}
        aria-hidden="true"
      >
        <Image
          src={coverUrl}
          alt={`《${title}》封面`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 144px, 208px"
          priority={size === "lg"}
        />
        {/* Gradient overlay for title legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div
            className={cn("font-display leading-tight text-white", titleSize)}
            style={{ fontFamily: "var(--font-display)", lineHeight: 1.3 }}
          >
            {title}
          </div>
          <div className={cn("mt-0.5 text-white/60", authorSize)}>{author}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative flex flex-col overflow-hidden rounded-sm", wrapper)}
      style={{ background: bg }}
      aria-hidden="true"
    >
      {/* Motif decorations */}
      {motif === "frame" && (
        <div
          className="absolute inset-2 rounded-[1px]"
          style={{ border: `1.5px solid ${accent}`, opacity: 0.7 }}
        />
      )}
      {motif === "spine" && (
        <div
          className="absolute inset-y-3 left-4 w-[2px] rounded-full"
          style={{ background: accent, opacity: 0.8 }}
        />
      )}
      {motif === "circle" && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: "55%",
            height: "55%",
            border: `1.5px solid ${accent}`,
            opacity: 0.5,
          }}
        />
      )}

      {/* Text block */}
      <div className="relative mt-auto flex flex-col gap-1 p-3">
        <div
          className={cn("font-display leading-tight", titleSize)}
          style={{
            color: accent,
            fontFamily: "var(--font-display)",
            lineHeight: 1.3,
          }}
        >
          {title}
        </div>
        <div
          className={cn("opacity-60", authorSize)}
          style={{ color: accent }}
        >
          {author}
        </div>
      </div>

      {/* Subtle bottom accent bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: accent, opacity: 0.4 }}
      />
    </div>
  );
}
