"use client";

import { motion, useReducedMotion } from "motion/react";
import type { SceneRow } from "@/types/db";

interface SceneViewProps {
  scene: SceneRow;
}

export function SceneView({ scene }: SceneViewProps) {
  const prefersReduced = useReducedMotion();
  const yOffset = prefersReduced ? 0 : 16;

  const paragraphs = scene.text.split("\n\n").filter(Boolean);

  return (
    <motion.article
      key={scene.id}
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -yOffset }}
      transition={{ duration: 0.35, ease: [0.25, 0, 0, 1] }}
      className="mx-auto py-8"
      style={{ maxWidth: "var(--reader-max-width)" }}
      aria-live="polite"
    >
      {/* Scene title */}
      <h2
        className="mb-8 text-3xl leading-snug text-ink-900 sm:text-4xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {scene.title}
      </h2>

      {/* Scene body */}
      <div className="space-y-4">
        {paragraphs.map((para, i) => (
          <p
            key={i}
            className="leading-[var(--reader-line-height)] text-ink-900"
            style={{
              fontSize: "var(--reader-font-size)",
              fontFamily: "var(--font-body)",
              lineHeight: "var(--reader-line-height)",
            }}
          >
            {para}
          </p>
        ))}
      </div>
    </motion.article>
  );
}
