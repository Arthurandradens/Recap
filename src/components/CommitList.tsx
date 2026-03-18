import { Commit } from "@/lib/types";

interface CommitListProps {
  commits: Commit[];
}

export default function CommitList({ commits }: CommitListProps) {
  if (commits.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">Commits</h2>
        <p className="text-sm text-gray-500">No standalone commits on this date.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        Commits ({commits.length})
      </h2>
      <ul className="divide-y divide-gray-100">
        {commits.map((commit) => (
          <li key={commit.sha} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start gap-3">
              <code className="mt-0.5 shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                {commit.sha.substring(0, 7)}
              </code>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-gray-900">
                  {commit.message.length > 80
                    ? commit.message.substring(0, 80) + "..."
                    : commit.message}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">@{commit.author}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
