import { Commit } from "@/lib/types";

export default function CommitList({ commits }: { commits: Commit[] }) {
  if (commits.length === 0) return null;
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-emerald)]" />
        Commits <span className="font-[family-name:var(--font-mono)] text-xs font-normal text-[var(--color-text-muted)]">({commits.length})</span>
      </h2>
      <ul className="space-y-2">
        {commits.map((commit) => (
          <li key={commit.sha} className="flex items-start gap-3">
            <code className="mt-0.5 shrink-0 rounded border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-emerald)]">{commit.sha.substring(0, 7)}</code>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-[var(--color-text-muted)]">{commit.message.length > 80 ? commit.message.substring(0, 80) + "..." : commit.message}</p>
              <p className="mt-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-text-faint)]">@{commit.author}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
