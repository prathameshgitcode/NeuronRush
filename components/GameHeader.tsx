"use client";

import Link from "next/link";

interface GameHeaderProps {
  title: string;
  score: number;
  qNum?: number;
  qTotal?: number;
}

export default function GameHeader({ title, score, qNum, qTotal }: GameHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b"
      style={{ background: "#12121a", borderColor: "rgba(255,255,255,0.08)" }}>
      <Link href="/" className="w-9 h-9 rounded-xl border flex items-center justify-center text-sm transition-colors hover:bg-surface2"
        style={{ border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#f0f0f8" }}>
        ←
      </Link>
      <div className="flex-1">
        <div className="font-syne font-bold text-base">{title}</div>
        {qNum !== undefined && qTotal !== undefined && (
          <div className="font-mono text-[10px] text-gray-500">{qNum} / {qTotal}</div>
        )}
      </div>
      <div className="font-mono text-sm px-3 py-1.5 rounded-full"
        style={{ background: "#1c1c28", border: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ color: "#00f5a0", fontWeight: 700 }}>{score}</span> pts
      </div>
    </div>
  );
}
