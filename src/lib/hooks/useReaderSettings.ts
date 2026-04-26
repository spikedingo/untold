"use client";

import { useCallback, useEffect, useState } from "react";

export type FontSizeKey = "sm" | "md" | "lg" | "xl";
export type LineHeightKey = "compact" | "normal" | "relaxed";

const FONT_SIZE_MAP: Record<FontSizeKey, string> = {
  sm:  "0.9375rem",   // 15px
  md:  "1.125rem",    // 18px — default
  lg:  "1.25rem",     // 20px
  xl:  "1.4375rem",   // 23px
};

const LINE_HEIGHT_MAP: Record<LineHeightKey, string> = {
  compact:  "1.6",
  normal:   "1.9",    // default
  relaxed:  "2.2",
};

interface ReaderSettings {
  fontSize: FontSizeKey;
  lineHeight: LineHeightKey;
}

const DEFAULT: ReaderSettings = { fontSize: "md", lineHeight: "normal" };
const STORAGE_KEY = "untold:settings";

export function useReaderSettings() {
  const [settings, setSettings] = useState<ReaderSettings>(DEFAULT);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ReaderSettings>;
        setSettings({ ...DEFAULT, ...parsed });
      }
    } catch {}
  }, []);

  // Apply CSS variables whenever settings change
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--reader-font-size",
      FONT_SIZE_MAP[settings.fontSize]
    );
    document.documentElement.style.setProperty(
      "--reader-line-height",
      LINE_HEIGHT_MAP[settings.lineHeight]
    );
  }, [settings]);

  const setFontSize = useCallback((fs: FontSizeKey) => {
    setSettings((prev) => {
      const next = { ...prev, fontSize: fs };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const setLineHeight = useCallback((lh: LineHeightKey) => {
    setSettings((prev) => {
      const next = { ...prev, lineHeight: lh };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  return { settings, setFontSize, setLineHeight };
}
