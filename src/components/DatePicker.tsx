"use client";

interface DatePickerProps {
  date: string;
  onDateChange: (date: string) => void;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split("T")[0];
}

function getTodayUTC(): string {
  return new Date().toISOString().split("T")[0];
}

export default function DatePicker({ date, onDateChange }: DatePickerProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onDateChange(addDays(date, -1))}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        &larr;
      </button>
      <input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
      />
      <button
        onClick={() => onDateChange(addDays(date, 1))}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        &rarr;
      </button>
      <button
        onClick={() => onDateChange(getTodayUTC())}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        Today
      </button>
    </div>
  );
}
