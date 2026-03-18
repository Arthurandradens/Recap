"use client";

interface RelevanceScoreProps {
  score: number;
  justification: string;
}

function getScoreColor(score: number): {
  bg: string;
  text: string;
  fill: string;
  label: string;
} {
  if (score >= 8) return { bg: "bg-green-100", text: "text-green-800", fill: "bg-green-500", label: "Alto impacto" };
  if (score >= 4) return { bg: "bg-yellow-100", text: "text-yellow-800", fill: "bg-yellow-500", label: "Impacto moderado" };
  return { bg: "bg-red-100", text: "text-red-800", fill: "bg-red-400", label: "Baixo impacto" };
}

export default function RelevanceScore({ score, justification }: RelevanceScoreProps) {
  const colors = getScoreColor(score);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Relevância</span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-bold ${colors.bg} ${colors.text}`}>
            {score}/10
          </span>
          <span className={`text-xs ${colors.text}`}>{colors.label}</span>
        </div>

        {/* Score bar */}
        <div className="flex flex-1 items-center gap-1">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i < score ? colors.fill : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>

      {justification && (
        <p className="mt-2 text-xs text-gray-500">{justification}</p>
      )}
    </div>
  );
}
