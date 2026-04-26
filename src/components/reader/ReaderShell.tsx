"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { SceneView } from "./SceneView";
import { NavigationButtons } from "./NavigationButtons";
import { EndingCard } from "./EndingCard";
import { ProgressBar } from "./ProgressBar";
import { ReaderToolbar } from "./ReaderToolbar";
import { ResumeBanner } from "./ResumeBanner";
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

  // Show resume banner on mount if there's saved progress
  useEffect(() => {
    if (savedIndex !== null && savedIndex > 0) {
      setShowResume(true);
    }
  }, [savedIndex]);

  // Save progress whenever scene changes
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

  // Keyboard navigation
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

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20">
      {/* Toolbar */}
      <ReaderToolbar
        currentSceneText={!showEnding ? scenes[currentIndex]?.text : undefined}
        sceneKey={currentIndex}
      />

      {/* Progress */}
      {!showEnding && (
        <ProgressBar current={currentIndex} total={scenes.length} />
      )}

      {/* Resume banner */}
      {showResume && savedIndex !== null && (
        <ResumeBanner
          savedIndex={savedIndex}
          onResume={handleResume}
          onDismiss={handleDismissResume}
        />
      )}

      {/* Scene or Ending */}
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

          <div className="border-t border-paper-200">
            <NavigationButtons
              currentIndex={currentIndex}
              total={scenes.length}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </div>
        </>
      )}
    </div>
  );
}
