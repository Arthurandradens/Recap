export interface PullRequest {
  number: number;
  title: string;
  author: string;
  status: "merged" | "open" | "closed";
  url: string;
  description: string;
}

export interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
}

export interface SummaryStats {
  totalPRs: number;
  totalCommits: number;
  contributors: string[];
}

export interface SummaryResponse {
  date: string;
  repository: string;
  summary: string;
  dailySuggestion: string;
  relevanceScore: number;
  relevanceJustification: string;
  pullRequests: PullRequest[];
  commits: Commit[];
  stats: SummaryStats;
}

export interface OpenAIStructuredResponse {
  summary: string;
  dailySuggestion: string;
  relevanceScore: number;
  relevanceJustification: string;
}

export type ErrorCode =
  | "INVALID_DATE"
  | "MISSING_CONFIG"
  | "GITHUB_AUTH_ERROR"
  | "OPENAI_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export interface ApiErrorResponse {
  error: {
    code: ErrorCode;
    message: string;
    retryAfter?: number;
  };
}
