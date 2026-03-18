import { NextRequest, NextResponse } from "next/server";
import { getConfig } from "@/lib/config";
import { fetchDailySummaryData } from "@/lib/github";
import {
  createOpenAIClient,
  buildPromptPayload,
  generateStructuredSummary,
} from "@/lib/openai";
import { invalidDate, toErrorResponse } from "@/lib/errors";
import { getCachedSummary, saveSummary } from "@/lib/db";
import { SummaryResponse } from "@/lib/types";

function getTodayUTC(): string {
  return new Date().toISOString().split("T")[0];
}

function isValidDate(dateStr: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const parsed = new Date(dateStr + "T00:00:00Z");
  return !isNaN(parsed.getTime());
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") || getTodayUTC();
    const refresh = searchParams.get("refresh") === "true";

    if (!isValidDate(date)) {
      throw invalidDate();
    }

    const config = getConfig();
    const repository = `${config.owner}/${config.repo}`;

    // Check cache first (unless refresh is requested)
    if (!refresh) {
      const cached = getCachedSummary(date, repository);
      if (cached) {
        return NextResponse.json(cached);
      }
    }

    // Fetch fresh data from GitHub + OpenAI
    const { pullRequests, commits } = await fetchDailySummaryData(
      config.githubToken,
      config.owner,
      config.repo,
      date
    );

    const openai = createOpenAIClient(config.openaiApiKey);
    const payload = buildPromptPayload(date, repository, pullRequests, commits);
    const { summary, dailySuggestion, relevanceScore, relevanceJustification } =
      await generateStructuredSummary(openai, payload);

    const contributors = new Set<string>();
    for (const pr of pullRequests) contributors.add(pr.author);
    for (const commit of commits) contributors.add(commit.author);

    const response: SummaryResponse = {
      date,
      repository,
      summary,
      dailySuggestion,
      relevanceScore,
      relevanceJustification,
      pullRequests,
      commits,
      stats: {
        totalPRs: pullRequests.length,
        totalCommits: commits.length,
        contributors: Array.from(contributors),
      },
    };

    // Save to cache
    saveSummary(response);

    return NextResponse.json(response);
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
