"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface ConfigStatus {
  owner: string;
  repo: string;
  github: { connected: boolean; error?: string };
  openai: { connected: boolean; error?: string };
}

export default function ConfigPage() {
  const [config, setConfig] = useState<ConfigStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/config");
      setConfig(await res.json());
    } catch {
      setConfig(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchConfig(); }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[var(--color-text)]">Settings</h1>
        <Link href="/" className="rounded-md border border-[var(--color-border)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]">
          ← Dashboard
        </Link>
      </header>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h2 className="mb-4 text-sm font-semibold text-[var(--color-text)]">Repository Configuration</h2>

        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 w-48 rounded bg-[var(--color-surface-raised)]" />
            <div className="h-4 w-64 rounded bg-[var(--color-surface-raised)]" />
          </div>
        ) : config ? (
          <div className="space-y-4">
            <div>
              <span className="text-sm text-[var(--color-text-muted)]">Repository: </span>
              <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-text)]">
                {config.owner && config.repo ? `${config.owner}/${config.repo}` : "Not configured"}
              </span>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${config.github.connected ? "bg-[var(--color-emerald)]" : "bg-[var(--color-rose)]"}`} />
                <span className="text-sm text-[var(--color-text-muted)]">GitHub</span>
                {config.github.error && <span className="text-xs text-[var(--color-rose)]">({config.github.error})</span>}
              </div>
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${config.openai.connected ? "bg-[var(--color-emerald)]" : "bg-[var(--color-rose)]"}`} />
                <span className="text-sm text-[var(--color-text-muted)]">OpenAI</span>
                {config.openai.error && <span className="text-xs text-[var(--color-rose)]">({config.openai.error})</span>}
              </div>
            </div>

            <button onClick={fetchConfig} className="rounded-md bg-[var(--color-emerald)] px-4 py-2 text-sm font-medium text-[var(--color-bg)] hover:bg-[var(--color-emerald)]/90">
              Validate Connection
            </button>
          </div>
        ) : (
          <p className="text-sm text-[var(--color-rose)]">Failed to load configuration.</p>
        )}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <h2 className="mb-3 text-sm font-semibold text-[var(--color-text)]">How to Configure</h2>
        <div className="space-y-3 text-sm text-[var(--color-text-muted)]">
          <p>
            Edit <code className="rounded border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-xs text-[var(--color-emerald)]">.env.local</code> in the project root:
          </p>
          <pre className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] p-4 font-[family-name:var(--font-mono)] text-xs text-[var(--color-text-muted)]">
{`GITHUB_TOKEN=ghp_your_token_here
OPENAI_API_KEY=sk-your_key_here
GITHUB_OWNER=your-org-or-user
GITHUB_REPO=your-repo-name`}
          </pre>
          <p>After editing, restart the development server.</p>
        </div>
      </div>
    </div>
  );
}
