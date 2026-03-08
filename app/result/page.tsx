"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function ResultContent() {
  const params = useSearchParams();
  const router = useRouter();
  const score   = Number(params.get("score") ?? 0);
  const correct = Number(params.get("correct") ?? 0);
  const wrong   = Number(params.get("wrong") ?? 0);
  const streak  = Number(params.get("streak") ?? 0);
  const game    = params.get("game") ?? "speed";
  const total   = correct + wrong;
  const acc     = total > 0 ? Math.round((correct / total) * 100) : 100;
  const emoji   = acc >= 80 ? "🏆" : acc >= 60 ? "👏" : "💪";
  const title   = acc >= 80 ? "Excellent!" : acc >= 60 ? "Well Done!" : "Keep Practicing!";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-5 px-4 py-10">
      <div className="text-6xl animate-bounce">{emoji}</div>
      <h1 className="font-syne font-extrabold text-3xl text-center">{title}</h1>

      <div className="font-syne font-extrabold text-center" style={{ fontSize: "5rem", lineHeight: 1, color: "#00f5a0" }}>
        {score}
      </div>
      <div className="font-mono text-xs text-gray-500 uppercase tracking-widest">points earned</div>

      <div className="glass w-full max-w-sm grid grid-cols-3 divide-x divide-white/5 px-2 py-4">
        <div className="text-center px-2">
          <div className="font-syne font-extrabold text-2xl" style={{ color: "#00f5a0" }}>{correct}</div>
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">Correct</div>
        </div>
        <div className="text-center px-2">
          <div className="font-syne font-extrabold text-2xl" style={{ color: "#ef4444" }}>{wrong}</div>
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">Wrong</div>
        </div>
        <div className="text-center px-2">
          <div className="font-syne font-extrabold text-2xl" style={{ color: "#f59e0b" }}>{streak}</div>
          <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mt-1">Streak</div>
        </div>
      </div>

      <div className="w-full max-w-sm flex gap-3">
        <button className="btn-primary" onClick={() => router.push(`/games/${game}`)}>
          Play Again
        </button>
        <Link href="/" className="btn-secondary text-center">Home</Link>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen font-mono text-gray-500">Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}
