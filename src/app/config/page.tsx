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
      const data = await res.json();
      setConfig(data);
    } catch {
      setConfig(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <Link
          href="/"
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          Back to Dashboard
        </Link>
      </header>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Repository Configuration
        </h2>

        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-4 w-48 rounded bg-gray-200" />
            <div className="h-4 w-64 rounded bg-gray-200" />
          </div>
        ) : config ? (
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-600">
                Repository:
              </span>{" "}
              <span className="text-sm text-gray-900">
                {config.owner && config.repo
                  ? `${config.owner}/${config.repo}`
                  : "Not configured"}
              </span>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    config.github.connected ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-sm text-gray-700">GitHub</span>
                {config.github.error && (
                  <span className="text-xs text-red-500">
                    ({config.github.error})
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    config.openai.connected ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-sm text-gray-700">OpenAI</span>
                {config.openai.error && (
                  <span className="text-xs text-red-500">
                    ({config.openai.error})
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={fetchConfig}
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Validate Connection
            </button>
          </div>
        ) : (
          <p className="text-sm text-red-500">
            Failed to load configuration.
          </p>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-gray-900">
          How to Configure
        </h2>
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            Edit the{" "}
            <code className="rounded bg-gray-100 px-1.5 py-0.5">
              .env.local
            </code>{" "}
            file in the project root with the following variables:
          </p>
          <pre className="rounded-md bg-gray-100 p-3 text-xs">
            {`GITHUB_TOKEN=ghp_your_token_here
OPENAI_API_KEY=sk-your_key_here
GITHUB_OWNER=your-org-or-user
GITHUB_REPO=your-repo-name`}
          </pre>
          <p>
            After editing, restart the development server for changes to take
            effect.
          </p>
        </div>
      </div>
    </div>
  );
}
