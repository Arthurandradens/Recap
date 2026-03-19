import { SummaryStats } from "@/lib/types";

interface StatsBarProps { stats: SummaryStats }

function StatPill({ icon, value, label, color }: { icon: string; value: number; label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5">
      <span style={{ color }} className="text-xs">{icon}</span>
      <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--color-text)]">{value}</span>
      <span className="text-xs text-[var(--color-text-muted)]">{label}</span>
    </span>
  );
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <StatPill icon="⬡" value={stats.totalPRs} label={`PR${stats.totalPRs !== 1 ? "s" : ""} merged`} color="var(--color-violet)" />
      <StatPill icon="◆" value={stats.totalCommits} label={`commit${stats.totalCommits !== 1 ? "s" : ""}`} color="var(--color-emerald)" />
      <StatPill icon="●" value={stats.contributors.length} label={`contributor${stats.contributors.length !== 1 ? "s" : ""}`} color="var(--color-amber)" />
    </div>
  );
}
