"use client";

import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface TTSButtonProps {
  text: string;
  isSpeaking: boolean;
  isSupported: boolean;
  hasZhVoice: boolean;
  onSpeak: () => void;
  onStop: () => void;
}

export function TTSButton({
  text,
  isSpeaking,
  isSupported,
  hasZhVoice,
  onSpeak,
  onStop,
}: TTSButtonProps) {
  const handleClick = () => {
    if (isSpeaking) onStop();
    else onSpeak();
  };

  const title = !isSupported
    ? "当前浏览器不支持朗读"
    : !hasZhVoice
    ? "建议使用 Chrome 获得最佳效果"
    : isSpeaking
    ? "停止朗读"
    : "朗读本章";

  return (
    <button
      onClick={handleClick}
      disabled={!isSupported}
      title={title}
      aria-label={title}
      className={cn(
        "rounded-md p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow",
        !isSupported
          ? "cursor-not-allowed text-ink-500 opacity-30"
          : isSpeaking
          ? "text-amber-glow"
          : "text-ink-500 hover:text-ink-900"
      )}
    >
      {isSpeaking ? (
        <VolumeX size={16} aria-hidden="true" />
      ) : (
        <Volume2 size={16} aria-hidden="true" />
      )}
    </button>
  );
}
