"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import DatePicker from "@/components/DatePicker";
import SummaryCard from "@/components/SummaryCard";
import PRList from "@/components/PRList";
import CommitList from "@/components/CommitList";
import StatsBar from "@/components/StatsBar";
import RelevanceScore from "@/components/RelevanceScore";
import DailySuggestionCard from "@/components/DailySuggestionCard";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ErrorDisplay from "@/components/ErrorDisplay";
import { SummaryResponse, ApiErrorResponse } from "@/lib/types";

function getTodayUTC(): string {
  return new Date().toISOString().split("T")[0];
}

export default function Home() {
  const [date, setDate] = useState(getTodayUTC());
  const [data, setData] = useState<SummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorResponse | null>(null);
  const [repoName, setRepoName] = useState("");

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((config) => {
        if (config.owner && config.repo) {
          setRepoName(`${config.owner}/${config.repo}`);
        }
      })
      .catch(() => {});
  }, []);

  const fetchSummary = useCallback(
    async (targetDate: string, refresh = false) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const params = new URLSearchParams({ date: targetDate });
        if (refresh) params.set("refresh", "true");
        const res = await fetch(`/api/summary?${params}`);
        const json = await res.json();

        if (!res.ok) {
          setError(json as ApiErrorResponse);
        } else {
          setData(json as SummaryResponse);
        }
      } catch {
        setError({
          error: {
            code: "INTERNAL_ERROR",
            message: "Failed to connect to the server",
          },
        });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchSummary(date);
  }, [date, fetchSummary]);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
  };

  const isEmpty =
    data && data.pullRequests.length === 0 && data.commits.length === 0;

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PR Resume</h1>
          {repoName && <p className="text-sm text-gray-500">{repoName}</p>}
        </div>
        <Link
          href="/config"
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          Settings
        </Link>
      </header>

      <div className="flex items-center gap-3">
        <DatePicker date={date} onDateChange={handleDateChange} />
        {data && !loading && (
          <button
            onClick={() => fetchSummary(date, true)}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
            title="Regenerar resumo"
          >
            Refresh
          </button>
        )}
      </div>

      {loading && <LoadingSkeleton />}

      {error && (
        <ErrorDisplay error={error} onRetry={() => fetchSummary(date)} />
      )}

      {data && !isEmpty && (
        <div className="space-y-4">
          <StatsBar stats={data.stats} />
          {data.relevanceScore > 0 && (
            <RelevanceScore
              score={data.relevanceScore}
              justification={data.relevanceJustification}
            />
          )}
          <SummaryCard summary={data.summary} />
          {data.dailySuggestion && (
            <DailySuggestionCard suggestion={data.dailySuggestion} />
          )}
          <PRList pullRequests={data.pullRequests} />
          <CommitList commits={data.commits} />
        </div>
      )}

      {isEmpty && (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <p className="text-gray-500">No activity found for {date}</p>
        </div>
      )}
    </div>
  );
}
