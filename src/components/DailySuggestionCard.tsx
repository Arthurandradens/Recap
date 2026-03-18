"use client";

import ReactMarkdown from "react-markdown";

interface DailySuggestionCardProps {
  suggestion: string;
}

export default function DailySuggestionCard({ suggestion }: DailySuggestionCardProps) {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 p-6 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-indigo-900">
        Sugestão para Daily
      </h2>
      <div className="text-sm leading-relaxed text-indigo-800">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h3 className="mt-4 mb-2 text-base font-bold text-indigo-900">{children}</h3>
            ),
            h2: ({ children }) => (
              <h4 className="mt-3 mb-2 text-sm font-bold text-indigo-900">{children}</h4>
            ),
            h3: ({ children }) => (
              <h5 className="mt-2 mb-1 text-sm font-semibold text-indigo-800">{children}</h5>
            ),
            p: ({ children }) => <p className="mb-2">{children}</p>,
            ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>,
            li: ({ children }) => <li>{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold text-indigo-900">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="rounded bg-indigo-100 px-1 py-0.5 text-xs">{children}</code>
            ),
            hr: () => <hr className="my-3 border-indigo-200" />,
          }}
        >
          {suggestion}
        </ReactMarkdown>
      </div>
    </div>
  );
}
