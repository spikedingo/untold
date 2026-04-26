"use client";

// Renders a fixed full-screen paper texture behind all content.
// Uses an inline SVG noise filter encoded as a data URI — no image file required.
export function PaperBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1]"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Noise grain overlay at 4% opacity */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
