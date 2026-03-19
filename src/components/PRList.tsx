import { PullRequest } from "@/lib/types";

export default function PRList({ pullRequests }: { pullRequests: PullRequest[] }) {
  if (pullRequests.length === 0) return null;
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-violet)]" />
        Pull Requests <span className="font-[family-name:var(--font-mono)] text-xs font-normal text-[var(--color-text-muted)]">({pullRequests.length})</span>
      </h2>
      <ul className="divide-y divide-[var(--color-border-subtle)]">
        {pullRequests.map((pr) => (
          <li key={pr.number} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <a href={pr.url} target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-violet)] hover:underline">#{pr.number}</a>{" "}
                <span className="text-sm text-[var(--color-text)]">{pr.title}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-faint)]">@{pr.author}</span>
                <span className="rounded border border-[var(--color-violet-dim)] bg-[var(--color-violet-dim)]/20 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-violet)]">{pr.status}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
