import Database from "better-sqlite3";
import path from "path";
import { SummaryResponse } from "./types";

const DB_PATH = path.join(process.cwd(), "data", "summaries.db");

function getDb(): Database.Database {
  const fs = require("fs");
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS summaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      repository TEXT NOT NULL,
      summary TEXT NOT NULL,
      pull_requests TEXT NOT NULL,
      commits TEXT NOT NULL,
      stats TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      UNIQUE(date, repository)
    )
  `);

  // Migrate: add new columns if they don't exist
  try { db.exec(`ALTER TABLE summaries ADD COLUMN daily_suggestion TEXT NOT NULL DEFAULT ''`); } catch {}
  try { db.exec(`ALTER TABLE summaries ADD COLUMN relevance_score INTEGER NOT NULL DEFAULT 0`); } catch {}
  try { db.exec(`ALTER TABLE summaries ADD COLUMN relevance_justification TEXT NOT NULL DEFAULT ''`); } catch {}

  return db;
}

interface SummaryRow {
  date: string;
  repository: string;
  summary: string;
  pull_requests: string;
  commits: string;
  stats: string;
  daily_suggestion?: string;
  relevance_score?: number;
  relevance_justification?: string;
}

export function getCachedSummary(
  date: string,
  repository: string
): SummaryResponse | null {
  const db = getDb();
  try {
    const row = db.prepare(
      "SELECT * FROM summaries WHERE date = ? AND repository = ?"
    ).get(date, repository) as SummaryRow | undefined;

    if (!row) return null;

    return {
      date: row.date,
      repository: row.repository,
      summary: row.summary,
      dailySuggestion: row.daily_suggestion || "",
      relevanceScore: row.relevance_score || 0,
      relevanceJustification: row.relevance_justification || "",
      pullRequests: JSON.parse(row.pull_requests),
      commits: JSON.parse(row.commits),
      stats: JSON.parse(row.stats),
    };
  } finally {
    db.close();
  }
}

export function saveSummary(data: SummaryResponse): void {
  const db = getDb();
  try {
    db.prepare(`
      INSERT INTO summaries (date, repository, summary, daily_suggestion, relevance_score, relevance_justification, pull_requests, commits, stats)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(date, repository) DO UPDATE SET
        summary = excluded.summary,
        daily_suggestion = excluded.daily_suggestion,
        relevance_score = excluded.relevance_score,
        relevance_justification = excluded.relevance_justification,
        pull_requests = excluded.pull_requests,
        commits = excluded.commits,
        stats = excluded.stats,
        created_at = datetime('now')
    `).run(
      data.date,
      data.repository,
      data.summary,
      data.dailySuggestion,
      data.relevanceScore,
      data.relevanceJustification,
      JSON.stringify(data.pullRequests),
      JSON.stringify(data.commits),
      JSON.stringify(data.stats)
    );
  } finally {
    db.close();
  }
}
