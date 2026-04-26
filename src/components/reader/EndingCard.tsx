"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BookOpen, RotateCcw } from "lucide-react";

interface EndingCardProps {
  novelSlug: string;
  novelTitle: string;
  lastSceneText: string;
  onRestart: () => void;
}

export function EndingCard({ novelSlug, novelTitle, lastSceneText, onRestart }: EndingCardProps) {
  // Extract last sentence as the quote
  const sentences = lastSceneText.trim().split(/[。！？\n]/).filter(Boolean);
  const quote = sentences[sentences.length - 1] ?? lastSceneText.slice(-30);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0, 0, 1] }}
      className="mx-auto flex max-w-md flex-col items-center py-12 text-center"
    >
      {/* Decoration */}
      <div
        className="mb-6 text-5xl opacity-30"
        style={{ fontFamily: "var(--font-display)", color: "var(--color-amber-glow)" }}
        aria-hidden="true"
      >
        ✦
      </div>

      <h2
        className="mb-3 text-2xl text-ink-900"
        style={{ fontFamily: "var(--font-display)" }}
      >
        故事结束
      </h2>

      <p className="mb-1 text-sm text-ink-500">
        《{novelTitle}》
      </p>

      {/* Quote from last scene */}
      <blockquote
        className="my-6 border-l-2 border-amber-glow pl-4 text-left text-sm leading-relaxed text-ink-700 italic"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {quote}
      </blockquote>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 rounded-md border border-paper-200 px-5 py-2 text-sm text-ink-700 transition-colors hover:border-amber-glow hover:text-amber-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
          aria-label="重新阅读"
        >
          <RotateCcw size={14} aria-hidden="true" />
          重新阅读
        </button>

        <Link
          href={`/novels/${novelSlug}`}
          className="flex items-center gap-2 rounded-md bg-amber-glow px-5 py-2 text-sm text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow"
        >
          <BookOpen size={14} aria-hidden="true" />
          返回详情
        </Link>
      </div>
    </motion.div>
  );
}
