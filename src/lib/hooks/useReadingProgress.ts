"use client";

import { useCallback, useEffect, useState } from "react";

interface ProgressData {
  scene: number;
  updatedAt: string;
}

export function useReadingProgress(slug: string) {
  const key = `untold:progress:${slug}`;
  const [savedIndex, setSavedIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const data = JSON.parse(raw) as ProgressData;
        if (typeof data.scene === "number" && data.scene > 0) {
          setSavedIndex(data.scene);
        }
      }
    } catch {}
  }, [key]);

  const saveProgress = useCallback(
    (sceneIndex: number) => {
      try {
        const data: ProgressData = {
          scene: sceneIndex,
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(key, JSON.stringify(data));
      } catch {}
    },
    [key]
  );

  const clearProgress = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setSavedIndex(null);
    } catch {}
  }, [key]);

  return { savedIndex, saveProgress, clearProgress };
}
