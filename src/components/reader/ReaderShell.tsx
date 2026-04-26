"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { SceneView } from "./SceneView";
import { NavigationButtons } from "./NavigationButtons";
import { EndingCard } from "./EndingCard";
import { ProgressBar } from "./ProgressBar";
import { ReaderToolbar } from "./ReaderToolbar";
import { ResumeBanner } from "./ResumeBanner";
import { BackButton } from "@/components/common/BackButton";
import { useReadingProgress } from "@/lib/hooks/useReadingProgress";
import type { NovelWithCoverMeta, SceneRow } from "@/types/db";

interface ReaderShellProps {
  novel: NovelWithCoverMeta;
  scenes: SceneRow[];
}

export function ReaderShell({ novel, scenes }: ReaderShellProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEnding, setShowEnding] = useState(false);
  const [showResume, setShowResume] = useState(false);

  const { savedIndex, saveProgress, clearProgress } = useReadingProgress(novel.slug);

  useEffect(() => {
    if (savedIndex !== null && savedIndex > 0) {
      setShowResume(true);
    }
  }, [savedIndex]);

  useEffect(() => {
    if (!showEnding && scenes.length > 0) {
      saveProgress(currentIndex);
    }
  }, [currentIndex, showEnding, saveProgress, scenes.length]);

  const handleNext = useCallback(() => {
    if (currentIndex < scenes.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setShowEnding(true);
      clearProgress();
    }
  }, [currentIndex, scenes.length, clearProgress]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setShowEnding(false);
    clearProgress();
  }, [clearProgress]);

  const handleResume = useCallback(() => {
    if (savedIndex !== null) setCurrentIndex(savedIndex);
    setShowResume(false);
  }, [savedIndex]);

  const handleDismissResume = useCallback(() => {
    setShowResume(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showEnding) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") handleNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") handlePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleNext, handlePrev, showEnding]);

  if (scenes.length === 0) {
    return (
      <div className="py-20 text-center text-ink-500">
        暂无内容，故事还在书写中。
      </div>
    );
  }

  // Reserve room for the fixed bottom navigation while reading. Drop the
  // padding when the ending card is shown — the bottom bar is hidden then.
  const bottomPad = showEnding
    ? "pb-20"
    : "pb-[calc(env(safe-area-inset-bottom,0px)+7rem)]";

  return (
    <div className={`mx-auto max-w-3xl px-4 ${bottomPad}`}>
      {/* Top row: back + toolbar */}
      <div className="flex items-center justify-between gap-3 pt-4">
        <BackButton fallbackHref={`/novels/${novel.slug}`} label="返回详情" />
        <ReaderToolbar
          currentSceneText={!showEnding ? scenes[currentIndex]?.text : undefined}
          sceneKey={currentIndex}
        />
      </div>

      {!showEnding && (
        <ProgressBar current={currentIndex} total={scenes.length} />
      )}

      {showResume && savedIndex !== null && (
        <ResumeBanner
          savedIndex={savedIndex}
          onResume={handleResume}
          onDismiss={handleDismissResume}
        />
      )}

      {showEnding ? (
        <EndingCard
          novelSlug={novel.slug}
          novelTitle={novel.title}
          lastSceneText={scenes[scenes.length - 1].text}
          onRestart={handleRestart}
        />
      ) : (
        <>
          <AnimatePresence mode="wait">
            <SceneView key={currentIndex} scene={scenes[currentIndex]} />
          </AnimatePresence>

          <NavigationButtons
            currentIndex={currentIndex}
            total={scenes.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </>
      )}
    </div>
  );
}
