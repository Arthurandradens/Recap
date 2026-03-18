import { Octokit } from "octokit";
import { PullRequest, Commit } from "./types";
import { githubAuthError, rateLimited } from "./errors";

export function createGitHubClient(token: string): Octokit {
  return new Octokit({ auth: token });
}

function checkRateLimit(headers: Record<string, string | undefined>): void {
  const remaining = headers["x-ratelimit-remaining"];
  if (remaining === "0") {
    const resetTime = parseInt(headers["x-ratelimit-reset"] || "0", 10);
    throw rateLimited(resetTime);
  }
}

export async function fetchMergedPRs(
  client: Octokit,
  owner: string,
  repo: string,
  date: string
): Promise<PullRequest[]> {
  const startOfDay = `${date}T00:00:00Z`;
  const endOfDay = `${date}T23:59:59Z`;

  try {
    const response = await client.rest.pulls.list({
      owner,
      repo,
      state: "closed",
      sort: "updated",
      direction: "desc",
      per_page: 100,
    });

    checkRateLimit(response.headers as Record<string, string | undefined>);

    return response.data
      .filter((pr) => {
        if (pr.draft) return false;
        if (!pr.merged_at) return false;
        return pr.merged_at >= startOfDay && pr.merged_at <= endOfDay;
      })
      .map((pr) => ({
        number: pr.number,
        title: pr.title,
        author: pr.user?.login || "unknown",
        status: "merged" as const,
        url: pr.html_url,
        description: pr.body || "",
      }));
  } catch (error) {
    if (error instanceof Error && "status" in error && (error as { status: number }).status === 401) {
      throw githubAuthError();
    }
    throw error;
  }
}

export async function fetchCommits(
  client: Octokit,
  owner: string,
  repo: string,
  date: string
): Promise<Commit[]> {
  const since = `${date}T00:00:00Z`;
  const until = `${date}T23:59:59Z`;

  try {
    const response = await client.rest.repos.listCommits({
      owner,
      repo,
      since,
      until,
      per_page: 100,
    });

    checkRateLimit(response.headers as Record<string, string | undefined>);

    return response.data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.author?.login || commit.commit.author?.name || "unknown",
      date: commit.commit.committer?.date || commit.commit.author?.date || "",
    }));
  } catch (error) {
    if (error instanceof Error && "status" in error && (error as { status: number }).status === 401) {
      throw githubAuthError();
    }
    throw error;
  }
}

export async function deduplicateCommits(
  commits: Commit[],
  prs: PullRequest[],
  client: Octokit,
  owner: string,
  repo: string
): Promise<Commit[]> {
  if (prs.length === 0) return commits;

  const prCommitShas = new Set<string>();

  for (const pr of prs) {
    try {
      const response = await client.rest.pulls.listCommits({
        owner,
        repo,
        pull_number: pr.number,
        per_page: 100,
      });

      checkRateLimit(response.headers as Record<string, string | undefined>);

      for (const commit of response.data) {
        prCommitShas.add(commit.sha);
      }
    } catch {
      // If we can't fetch PR commits, keep them in the standalone list
    }
  }

  return commits.filter((commit) => !prCommitShas.has(commit.sha));
}

export async function fetchDailySummaryData(
  token: string,
  owner: string,
  repo: string,
  date: string
): Promise<{ pullRequests: PullRequest[]; commits: Commit[] }> {
  const client = createGitHubClient(token);

  const [pullRequests, allCommits] = await Promise.all([
    fetchMergedPRs(client, owner, repo, date),
    fetchCommits(client, owner, repo, date),
  ]);

  const commits = await deduplicateCommits(allCommits, pullRequests, client, owner, repo);

  return { pullRequests, commits };
}
