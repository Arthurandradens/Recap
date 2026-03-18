"use client";

import { ApiErrorResponse } from "@/lib/types";

interface ErrorDisplayProps {
  error: ApiErrorResponse;
  onRetry: () => void;
}

export default function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  const { code, message, retryAfter } = error.error;

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-6">
      <h3 className="text-sm font-semibold text-red-800">Error: {code}</h3>
      <p className="mt-1 text-sm text-red-700">{message}</p>
      {retryAfter && (
        <p className="mt-1 text-xs text-red-600">
          Rate limit resets at:{" "}
          {new Date(retryAfter * 1000).toLocaleTimeString()}
        </p>
      )}
      <button
        onClick={onRetry}
        className="mt-3 rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200"
      >
        Retry
      </button>
    </div>
  );
}
