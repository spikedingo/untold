"use client";

import { useEffect } from "react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { FontSizeSlider } from "@/components/common/FontSizeSlider";
import { TTSButton } from "./TTSButton";
import { useReaderSettings } from "@/lib/hooks/useReaderSettings";
import { useTTS } from "@/lib/hooks/useTTS";

interface ReaderToolbarProps {
  currentSceneText?: string;
  /** Triggers TTS stop when scene changes */
  sceneKey?: number;
}

export function ReaderToolbar({ currentSceneText, sceneKey }: ReaderToolbarProps) {
  const { settings, setFontSize } = useReaderSettings();
  const { isSpeaking, isSupported, hasZhVoice, speak, stop } = useTTS();

  // Cancel TTS when scene changes
  useEffect(() => {
    stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneKey]);

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <FontSizeSlider value={settings.fontSize} onChange={setFontSize} />
      {currentSceneText && (
        <TTSButton
          text={currentSceneText}
          isSpeaking={isSpeaking}
          isSupported={isSupported}
          hasZhVoice={hasZhVoice}
          onSpeak={() => speak(currentSceneText)}
          onStop={stop}
        />
      )}
      <ThemeToggle />
    </div>
  );
}
