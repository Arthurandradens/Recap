"use client";

import ReactMarkdown from "react-markdown";

interface SummaryCardProps {
  summary: string;
}

export default function SummaryCard({ summary }: SummaryCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-900">Resumo</h2>
      <div className="summary-markdown text-sm leading-relaxed text-gray-700">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h3 className="mt-4 mb-2 text-base font-bold text-gray-900">{children}</h3>
            ),
            h2: ({ children }) => (
              <h4 className="mt-3 mb-2 text-sm font-bold text-gray-900">{children}</h4>
            ),
            h3: ({ children }) => (
              <h5 className="mt-2 mb-1 text-sm font-semibold text-gray-800">{children}</h5>
            ),
            p: ({ children }) => <p className="mb-2">{children}</p>,
            ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>,
            li: ({ children }) => <li>{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">{children}</code>
            ),
            hr: () => <hr className="my-3 border-gray-200" />,
          }}
        >
          {summary}
        </ReactMarkdown>
      </div>
    </div>
  );
}
