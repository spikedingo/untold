"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { SceneView } from "./SceneView";
import { NavigationButtons } from "./NavigationButtons";
import { EndingCard } from "./EndingCard";
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

  // Reading progress percentage, fed into the top bar's bottom strip.
  const pct =
    scenes.length > 0 ? ((currentIndex + 1) / scenes.length) * 100 : 0;

  return (
    <>
      {/* Fixed top bar — mirrors the bottom navigation, full-screen width */}
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-30"
        aria-label="阅读工具栏"
      >
        <div className="pointer-events-auto border-b border-paper-200/70 bg-surface/85 backdrop-blur-md supports-[backdrop-filter]:bg-surface/70">
          <div
            className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:py-4"
            style={{
              paddingTop: "calc(env(safe-area-inset-top, 0px) + 0.75rem)",
            }}
          >
            <BackButton fallbackHref={`/novels/${novel.slug}`} label="返回详情" />

            {!showEnding && (
              <ReaderToolbar
                currentSceneText={scenes[currentIndex]?.text}
                sceneKey={currentIndex}
              />
            )}
          </div>

          {/* Progress strip on the bottom edge — mirrors the bottom bar */}
          {!showEnding && (
            <div
              className="h-[2px] w-full bg-paper-200/70"
              role="progressbar"
              aria-valuenow={currentIndex + 1}
              aria-valuemin={1}
              aria-valuemax={scenes.length}
              aria-label={`第 ${currentIndex + 1} 章，共 ${scenes.length} 章`}
            >
              <div
                className="h-full bg-amber-glow transition-[width] duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Reading content — leaves room for both fixed bars */}
      <div
        className="mx-auto max-w-3xl px-4"
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 5rem)",
          paddingBottom: showEnding
            ? "5rem"
            : "calc(env(safe-area-inset-bottom, 0px) + 7rem)",
        }}
      >
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
    </>
  );
}
