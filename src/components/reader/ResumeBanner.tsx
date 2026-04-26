"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface ResumeBannerProps {
  savedIndex: number;
  onResume: () => void;
  onDismiss: () => void;
}

export function ResumeBanner({ savedIndex, onResume, onDismiss }: ResumeBannerProps) {
  const [visible, setVisible] = useState(true);

  // Auto-dismiss after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onDismiss();
    }, 6000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex items-center justify-between rounded-md border border-amber-glow/30 bg-amber-glow/10 px-4 py-3 text-sm"
          role="alert"
        >
          <span className="text-ink-700">
            继续阅读 · 第 {savedIndex + 1} 章
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onResume}
              className="rounded px-3 py-1 text-amber-glow transition-colors hover:bg-amber-glow hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-glow"
            >
              继续
            </button>
            <button
              onClick={handleDismiss}
              aria-label="关闭续读提示"
              className="rounded p-1 text-ink-500 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-glow"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
