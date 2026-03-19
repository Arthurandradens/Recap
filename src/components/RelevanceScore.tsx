"use client";

interface RelevanceScoreProps { score: number; justification: string }

export default function RelevanceScore({ score, justification }: RelevanceScoreProps) {
  const config = score >= 8
    ? { color: "var(--color-emerald)", dim: "var(--color-emerald-dim)", label: "Alto impacto", emoji: "⚡" }
    : score >= 4
      ? { color: "var(--color-amber)", dim: "var(--color-amber-dim)", label: "Impacto moderado", emoji: "📊" }
      : { color: "var(--color-text-muted)", dim: "var(--color-border)", label: "Baixo impacto", emoji: "📝" };

  return (
    <div className="flex items-center gap-4">
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2" style={{ borderColor: config.color }}>
        <div className="absolute inset-1 rounded-full" style={{ background: `${config.dim}33` }} />
        <span className="relative font-[family-name:var(--font-mono)] text-xl font-bold" style={{ color: config.color }}>{score}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span>{config.emoji}</span>
          <span className="font-[family-name:var(--font-mono)] text-[10px] font-medium uppercase tracking-wider" style={{ color: config.color }}>{config.label}</span>
        </div>
        {justification && <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{justification}</p>}
        <div className="mt-2 flex gap-0.5">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full" style={{ backgroundColor: i < score ? config.color : "var(--color-border)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
