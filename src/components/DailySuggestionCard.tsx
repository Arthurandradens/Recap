"use client";

import ReactMarkdown from "react-markdown";

interface DailySuggestionCardProps { suggestion: string }

export default function DailySuggestionCard({ suggestion }: DailySuggestionCardProps) {
  return (
    <div className="rounded-xl border border-[var(--color-cyan-dim)] bg-[var(--color-cyan-dim)]/10 p-6">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-cyan)]">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Sugestão para Daily
      </h2>
      <div className="text-sm leading-relaxed text-[var(--color-text-muted)]">
        <ReactMarkdown components={{
          p: ({ children }) => <p className="mb-2">{children}</p>,
          ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-[var(--color-cyan)]">{children}</strong>,
          code: ({ children }) => <code className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-xs text-[var(--color-emerald)]">{children}</code>,
        }}>{suggestion}</ReactMarkdown>
      </div>
    </div>
  );
}
