"use client";

interface TimerBarProps {
  timeLeft: number;
  totalTime: number;
}

export default function TimerBar({ timeLeft, totalTime }: TimerBarProps) {
  const pct = Math.max(0, (timeLeft / totalTime) * 100);
  const color = pct > 50 ? "#00f5a0" : pct > 25 ? "#f59e0b" : "#ef4444";

  return (
    <div className="w-full max-w-sm">
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#1c1c28" }}>
        <div className="h-full rounded-full transition-all duration-1000 linear"
          style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="font-mono text-xs text-gray-500 text-right mt-1">{timeLeft}s</div>
    </div>
  );
}
