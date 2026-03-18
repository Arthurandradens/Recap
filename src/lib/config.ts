import { missingConfig } from "./errors";

export interface AppConfig {
  githubToken: string;
  openaiApiKey: string;
  owner: string;
  repo: string;
}

export function getConfig(): AppConfig {
  const githubToken = process.env.GITHUB_TOKEN;
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  const missing: string[] = [];
  if (!githubToken) missing.push("GITHUB_TOKEN");
  if (!openaiApiKey) missing.push("OPENAI_API_KEY");
  if (!owner) missing.push("GITHUB_OWNER");
  if (!repo) missing.push("GITHUB_REPO");

  if (missing.length > 0) {
    throw missingConfig(missing.join(", "));
  }

  return {
    githubToken: githubToken!,
    openaiApiKey: openaiApiKey!,
    owner: owner!,
    repo: repo!,
  };
}
