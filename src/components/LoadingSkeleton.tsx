export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="flex gap-2">
        <div className="h-8 w-28 rounded-md bg-[var(--color-surface-raised)]" />
        <div className="h-8 w-24 rounded-md bg-[var(--color-surface-raised)]" />
        <div className="h-8 w-32 rounded-md bg-[var(--color-surface-raised)]" />
      </div>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="mb-3 h-4 w-24 rounded bg-[var(--color-surface-raised)]" />
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-[var(--color-surface-raised)]" />
          <div className="h-3 w-5/6 rounded bg-[var(--color-surface-raised)]" />
          <div className="h-3 w-4/6 rounded bg-[var(--color-surface-raised)]" />
        </div>
      </div>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <div className="mb-3 h-4 w-32 rounded bg-[var(--color-surface-raised)]" />
        <div className="space-y-3">
          <div className="h-3 w-full rounded bg-[var(--color-surface-raised)]" />
          <div className="h-3 w-3/4 rounded bg-[var(--color-surface-raised)]" />
        </div>
      </div>
    </div>
  );
}
