"use client";

import ReactMarkdown from "react-markdown";

interface SummaryCardProps { summary: string }

export default function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
        Resumo do dia
      </h2>
      <div className="text-sm leading-relaxed text-[var(--color-text-muted)]">
        <ReactMarkdown components={{
          h1: ({ children }) => <h3 className="mt-4 mb-2 text-base font-bold text-[var(--color-text)]">{children}</h3>,
          h2: ({ children }) => <h4 className="mt-3 mb-2 text-sm font-bold text-[var(--color-text)]">{children}</h4>,
          h3: ({ children }) => <h5 className="mt-2 mb-1 text-sm font-semibold text-[var(--color-text)]">{children}</h5>,
          p: ({ children }) => <p className="mb-2 text-[var(--color-text-muted)]">{children}</p>,
          ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>,
          li: ({ children }) => <li className="text-[var(--color-text-muted)]">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-[var(--color-text)]">{children}</strong>,
          em: ({ children }) => <em className="italic text-[var(--color-cyan)]">{children}</em>,
          code: ({ children }) => <code className="rounded border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-xs text-[var(--color-emerald)]">{children}</code>,
          hr: () => <hr className="my-4 border-[var(--color-border)]" />,
        }}>{summary}</ReactMarkdown>
      </div>
    </div>
  );
}
