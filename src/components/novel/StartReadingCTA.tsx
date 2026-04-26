import Link from "next/link";

interface StartReadingCTAProps {
  slug: string;
}

export function StartReadingCTA({ slug }: StartReadingCTAProps) {
  return (
    <div className="mt-10 flex justify-center sm:justify-start">
      <Link
        href={`/read/${slug}`}
        className="inline-flex items-center gap-2 rounded-md px-8 py-3 text-base font-medium text-white transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-glow focus-visible:ring-offset-2"
        style={{ background: "var(--color-amber-glow)" }}
      >
        <span>开始阅读</span>
        <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
