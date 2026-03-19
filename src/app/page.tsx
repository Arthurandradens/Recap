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
        setError({ error: { code: "INTERNAL_ERROR", message: "Falha ao conectar com o servidor" } });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchSummary(date);
  }, [date, fetchSummary]);

  const isEmpty = data && data.pullRequests.length === 0 && data.commits.length === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-lg font-bold text-[var(--color-text)]">
            <span className="text-[var(--color-emerald)]">&#9679;</span>
            recap
          </h1>
          {repoName && (
            <p className="mt-0.5 font-[family-name:var(--font-mono)] text-sm text-[var(--color-text-muted)]">
              {repoName}
            </p>
          )}
        </div>
        <Link
          href="/config"
          className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
        >
          Settings
        </Link>
      </header>

      {/* Date navigation */}
      <div className="flex items-center justify-between">
        <DatePicker date={date} onDateChange={setDate} />
        {data && !loading && (
          <button
            onClick={() => fetchSummary(date, true)}
            className="flex items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]"
          >
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Regenerar
          </button>
        )}
      </div>

      {loading && <LoadingSkeleton />}
      {error && <ErrorDisplay error={error} onRetry={() => fetchSummary(date)} />}

      {data && !isEmpty && (
        <div className="space-y-4 animate-fade-in">
          {/* Score + Stats */}
          <div className="flex items-center gap-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            {data.relevanceScore > 0 && (
              <>
                <RelevanceScore score={data.relevanceScore} justification={data.relevanceJustification} />
                <div className="h-12 w-px bg-[var(--color-border)]" />
              </>
            )}
            <StatsBar stats={data.stats} />
          </div>

          {/* AI content */}
          <div className="grid gap-4 lg:grid-cols-2">
            <SummaryCard summary={data.summary} />
            {data.dailySuggestion && <DailySuggestionCard suggestion={data.dailySuggestion} />}
          </div>

          {/* Activity details */}
          <div className="grid gap-4 lg:grid-cols-2">
            <PRList pullRequests={data.pullRequests} />
            <CommitList commits={data.commits} />
          </div>
        </div>
      )}

      {isEmpty && (
        <div className="flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] py-16 text-center">
          <span className="text-4xl">🌙</span>
          <p className="mt-3 text-sm text-[var(--color-text-muted)]">
            Nenhuma atividade encontrada em{" "}
            <span className="font-[family-name:var(--font-mono)] text-[var(--color-text)]">{date}</span>
          </p>
        </div>
      )}
    </div>
  );
}
