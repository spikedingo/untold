interface SynopsisProps {
  text: string;
}

export function Synopsis({ text }: SynopsisProps) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <div
      className="prose max-w-none overflow-auto"
      style={{ color: "var(--color-ink-700)", fontFamily: "var(--font-body)" }}
    >
      <h2
        className="mb-6 text-sm tracking-widest text-ink-500 uppercase"
        style={{ fontFamily: "var(--font-accent)" }}
      >
        内容简介
      </h2>

      {paragraphs.map((para, i) => (
        <p
          key={i}
          className={
            i === 0
              ? "mb-4 text-base leading-loose text-ink-700 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-4xl first-letter:font-normal first-letter:leading-none first-letter:text-amber-glow"
              : "mb-4 text-base leading-loose text-ink-700"
          }
          style={{ fontFamily: "var(--font-body)" }}
        >
          {para}
        </p>
      ))}
    </div>
  );
}
