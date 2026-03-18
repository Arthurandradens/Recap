import { NextResponse } from "next/server";
import { Octokit } from "octokit";
import OpenAI from "openai";

export async function GET() {
  const owner = process.env.GITHUB_OWNER || "";
  const repo = process.env.GITHUB_REPO || "";
  const githubToken = process.env.GITHUB_TOKEN || "";
  const openaiKey = process.env.OPENAI_API_KEY || "";

  const result = {
    owner,
    repo,
    github: { connected: false, error: undefined as string | undefined },
    openai: { connected: false, error: undefined as string | undefined },
  };

  // Test GitHub connection
  if (githubToken && owner && repo) {
    try {
      const client = new Octokit({ auth: githubToken });
      await client.rest.repos.get({ owner, repo });
      result.github.connected = true;
    } catch (error) {
      result.github.error =
        error instanceof Error ? error.message : "Connection failed";
    }
  } else {
    result.github.error = "Missing GITHUB_TOKEN, GITHUB_OWNER, or GITHUB_REPO";
  }

  // Test OpenAI connection
  if (openaiKey) {
    try {
      const client = new OpenAI({ apiKey: openaiKey });
      await client.models.list();
      result.openai.connected = true;
    } catch (error) {
      result.openai.error =
        error instanceof Error ? error.message : "Connection failed";
    }
  } else {
    result.openai.error = "Missing OPENAI_API_KEY";
  }

  return NextResponse.json(result);
}
