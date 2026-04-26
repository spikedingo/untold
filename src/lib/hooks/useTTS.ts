"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface TTSState {
  isSpeaking: boolean;
  isSupported: boolean;
  hasZhVoice: boolean;
}

export function useTTS() {
  const [state, setState] = useState<TTSState>({
    isSpeaking: false,
    isSupported: typeof window !== "undefined" && "speechSynthesis" in window,
    hasZhVoice: false,
  });
  const zhVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (!state.isSupported) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const zh = voices.find(
        (v) => v.lang.startsWith("zh") && v.lang !== "zh-TW"
      ) ?? voices.find((v) => v.lang.startsWith("zh")) ?? null;
      zhVoiceRef.current = zh;
      setState((s) => ({ ...s, hasZhVoice: !!zh }));
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    const timeout = setTimeout(loadVoices, 500);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      clearTimeout(timeout);
    };
  }, [state.isSupported]);

  const speak = useCallback((text: string) => {
    if (!state.isSupported) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    if (zhVoiceRef.current) utterance.voice = zhVoiceRef.current;
    utterance.rate = 0.95;

    utterance.onstart = () => setState((s) => ({ ...s, isSpeaking: true }));
    utterance.onend = () => setState((s) => ({ ...s, isSpeaking: false }));
    utterance.onerror = () => setState((s) => ({ ...s, isSpeaking: false }));

    window.speechSynthesis.speak(utterance);
  }, [state.isSupported]);

  const stop = useCallback(() => {
    if (!state.isSupported) return;
    window.speechSynthesis.cancel();
    setState((s) => ({ ...s, isSpeaking: false }));
  }, [state.isSupported]);

  return { ...state, speak, stop };
}
