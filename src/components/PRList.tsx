import { PullRequest } from "@/lib/types";

interface PRListProps {
  pullRequests: PullRequest[];
}

export default function PRList({ pullRequests }: PRListProps) {
  if (pullRequests.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">Pull Requests</h2>
        <p className="text-sm text-gray-500">No pull requests merged on this date.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">
        Pull Requests ({pullRequests.length})
      </h2>
      <ul className="divide-y divide-gray-100">
        {pullRequests.map((pr) => (
          <li key={pr.number} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  #{pr.number}
                </a>{" "}
                <span className="text-sm text-gray-900">{pr.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">@{pr.author}</span>
                <span className="inline-flex rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
                  {pr.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
