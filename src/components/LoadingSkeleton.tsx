export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {/* Stats bar */}
      <div className="flex gap-3">
        <div className="h-8 w-28 rounded-full bg-gray-200" />
        <div className="h-8 w-24 rounded-full bg-gray-200" />
        <div className="h-8 w-32 rounded-full bg-gray-200" />
      </div>

      {/* Summary card */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-3 h-5 w-24 rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
          <div className="h-4 w-4/6 rounded bg-gray-200" />
        </div>
      </div>

      {/* PR list */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-3 h-5 w-32 rounded bg-gray-200" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
        </div>
      </div>

      {/* Commits list */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-3 h-5 w-24 rounded bg-gray-200" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
