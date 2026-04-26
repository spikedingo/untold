import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-paper-200 bg-surface/80 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3"
        aria-label="主导航"
      >
        <Link
          href="/"
          className="font-display text-xl text-ink-900 transition-opacity hover:opacity-70"
          style={{ fontFamily: "var(--font-display)" }}
          aria-label="未说 · 返回首页"
        >
          未说
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
