"use client";

interface DatePickerProps { date: string; onDateChange: (date: string) => void }

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
}

function getTodayUTC(): string { return new Date().toISOString().split("T")[0]; }

function formatDateLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00Z");
  return `${d.toLocaleDateString("pt-BR", { weekday: "short", timeZone: "UTC" })}, ${d.getUTCDate()} ${d.toLocaleDateString("pt-BR", { month: "short", timeZone: "UTC" })}`;
}

export default function DatePicker({ date, onDateChange }: DatePickerProps) {
  const isToday = date === getTodayUTC();
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onDateChange(addDays(date, -1))} className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)]">&#8592;</button>
      <div className="relative">
        <input type="date" value={date} onChange={(e) => onDateChange(e.target.value)} className="absolute inset-0 cursor-pointer opacity-0" />
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5">
          <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-text)]">{formatDateLabel(date)}</span>
        </div>
      </div>
      <button onClick={() => onDateChange(addDays(date, 1))} disabled={isToday} className="flex h-8 w-8 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] disabled:opacity-30">&#8594;</button>
      {!isToday && (
        <button onClick={() => onDateChange(getTodayUTC())} className="rounded-md border border-[var(--color-emerald-dim)] bg-[var(--color-emerald-dim)]/20 px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs text-[var(--color-emerald)] hover:bg-[var(--color-emerald-dim)]/30">Hoje</button>
      )}
    </div>
  );
}
