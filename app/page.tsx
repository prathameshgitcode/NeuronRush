"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";
import { Difficulty, GameType } from "@/lib/store";

const GAMES: { type: GameType; icon: string; name: string; desc: string; color: string }[] = [
  { type: "speed",      icon: "⚡", name: "Speed Math",  desc: "Solve equations fast before time runs out", color: "#00f5a0" },
  { type: "pattern",    icon: "🔢", name: "Pattern",     desc: "Find the missing number in sequences",      color: "#7c3aed" },
  { type: "memory",     icon: "🧠", name: "Memory",      desc: "Match emoji pairs with your memory",        color: "#f59e0b" },
  { type: "arithmetic", icon: "➕", name: "Arithmetic",  desc: "Multi-step arithmetic challenges",          color: "#3b82f6" },
];

const DIFFS: Difficulty[] = ["easy", "medium", "hard"];

export default function Home() {
  const { difficulty, setDifficulty, totalScore, gamesPlayed, bestStreak, level, bests } = useApp();

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-10 gap-6">
      {/* Logo */}
      <div className="text-center">
        <h1 className="font-syne font-extrabold text-6xl tracking-tighter gradient-text">
          NeuronRush
        </h1>
        <p className="font-mono text-xs text-gray-500 tracking-widest uppercase mt-1">Brain &amp; Math Games</p>
        <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-xs font-mono text-gray-400 bg-dark border-faint">
          <span className="w-2 h-2 rounded-full bg-accent inline-block" />
          Level {level}
        </div>
      </div>

      {/* Stats */}
      <div className="glass w-full max-w-sm grid grid-cols-3 divide-x divide-white/5 px-2 py-4">
        {[
          { val: totalScore,   lbl: "Total Points" },
          { val: gamesPlayed,  lbl: "Games" },
          { val: bestStreak,   lbl: "Best Streak" },
        ].map(({ val, lbl }) => (
          <div key={lbl} className="text-center px-3">
            <div className="font-syne font-extrabold text-2xl color-accent">{val}</div>
            <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">{lbl}</div>
          </div>
        ))}
      </div>

      {/* Difficulty */}
      <div className="flex gap-2">
        {DIFFS.map((d) => (
          <button key={d} onClick={() => setDifficulty(d)}
            className={`font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${difficulty === d ? "border-accent color-accent bg-accent-faint" : "border-faint-2 color-gray"}`}>
            {d}
          </button>
        ))}
      </div>

      {/* Game Cards */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {GAMES.map(({ type, icon, name, desc, color }) => (
          <Link key={type} href={`/games/${type}`}
            className="glass p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 relative overflow-hidden group rounded-20">
            <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity" style={{ background: color }} />
            <div className="text-3xl mb-2">{icon}</div>
            <div className="font-syne font-bold text-sm">{name}</div>
            <div className="text-[11px] text-gray-500 mt-1 leading-snug">{desc}</div>
            <div className="font-mono text-[10px] text-gray-600 mt-3">
              Best: <span style={{ color }}>{bests[type] ?? "—"}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
