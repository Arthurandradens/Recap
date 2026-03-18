import { SummaryStats } from "@/lib/types";

interface StatsBarProps {
  stats: SummaryStats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
        {stats.totalPRs} PR{stats.totalPRs !== 1 ? "s" : ""} merged
      </span>
      <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
        {stats.totalCommits} commit{stats.totalCommits !== 1 ? "s" : ""}
      </span>
      <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
        {stats.contributors.length} contributor{stats.contributors.length !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
