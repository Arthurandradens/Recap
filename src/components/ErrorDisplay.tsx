"use client";

import { ApiErrorResponse } from "@/lib/types";

interface ErrorDisplayProps { error: ApiErrorResponse; onRetry: () => void }

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  const { code, message, retryAfter } = error.error;
  return (
    <div className="rounded-xl border border-[var(--color-rose-dim)] bg-[var(--color-rose-dim)]/10 p-6">
      <h3 className="font-[family-name:var(--font-mono)] text-xs font-medium uppercase tracking-wider text-[var(--color-rose)]">{code}</h3>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{message}</p>
      {retryAfter && <p className="mt-1 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-faint)]">Rate limit resets at: {new Date(retryAfter * 1000).toLocaleTimeString()}</p>}
      <button onClick={onRetry} className="mt-4 rounded-md border border-[var(--color-rose-dim)] bg-[var(--color-rose-dim)]/20 px-3 py-1.5 text-sm font-medium text-[var(--color-rose)] hover:bg-[var(--color-rose-dim)]/30">Tentar novamente</button>
    </div>
  );
}
