"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { genPattern, genWrongAnswers, shuffle, DIFF_CONFIG } from "@/lib/gameUtils";
import GameHeader from "@/components/GameHeader";
import TimerBar from "@/components/TimerBar";
import Flash from "@/components/Flash";

export default function PatternGame() {
  const router = useRouter();
  const { difficulty, recordResult } = useApp();
  const cfg = DIFF_CONFIG[difficulty];

  const [qNum, setQNum] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [seq, setSeq] = useState<number[]>([]);
  const [answer, setAnswer] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(cfg.time + 5);
  const [flash, setFlash] = useState<{ msg: string; type: "correct" | "wrong" | null }>({ msg: "", type: null });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const refs = useRef({ score: 0, correct: 0, wrong: 0, streak: 0, bestStreak: 0 });
  refs.current = { score, correct, wrong, streak, bestStreak };

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const { score: s, correct: c, wrong: w, bestStreak: bs } = refs.current;
    recordResult("pattern", s, bs);
    router.push(`/result?score=${s}&correct=${c}&wrong=${w}&streak=${bs}&game=pattern`);
  }, [recordResult, router]);

  const loadQuestion = useCallback((num: number) => {
    if (num > cfg.qCount) { endGame(); return; }
    const p = genPattern(difficulty);
    setSeq(p.seq); setAnswer(p.answer);
    setOptions(shuffle([p.answer, ...genWrongAnswers(p.answer, 3).filter((w) => w > 0)]));
    setSelected(null); setLocked(false); setTimeLeft(cfg.time + 5);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setWrong((w) => w + 1); setStreak(0);
          setTimeout(() => loadQuestion(num + 1), 400);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [cfg, difficulty, endGame]);

  useEffect(() => { loadQuestion(1); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  function pick(val: number) {
    if (locked) return;
    setLocked(true); setSelected(val);
    if (timerRef.current) clearInterval(timerRef.current);
    if (val === answer) {
      const ns = refs.current.streak + 1;
      setStreak(ns); setBestStreak(Math.max(refs.current.bestStreak, ns));
      setCorrect((c) => c + 1); setScore((s) => s + 12 + (ns > 2 ? ns * 3 : 0));
      setFlash({ msg: "+12 Pattern!", type: "correct" });
    } else {
      setStreak(0); setWrong((w) => w + 1);
      setFlash({ msg: "✗ Wrong", type: "wrong" });
    }
    setTimeout(() => setQNum((n) => { loadQuestion(n + 1); return n + 1; }), 700);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Flash message={flash.msg} type={flash.type} />
      <GameHeader title="Pattern" score={score} qNum={qNum} qTotal={cfg.qCount} />
      <div className="flex flex-col items-center justify-center flex-1 gap-5 px-4 py-6">
        <TimerBar timeLeft={timeLeft} totalTime={cfg.time + 5} />

        <div className="glass w-full max-w-sm p-6 text-center">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-4">What comes next?</div>
          <div className="flex gap-2 flex-wrap justify-center">
            {seq.map((n, i) => (
              <div key={i} className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg bg-dark border-faint-2">
                {n}
              </div>
            ))}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg bg-dark border-dashed-gray color-gray">
              ?
            </div>
          </div>
        </div>

        <div className="flex gap-3 flex-wrap justify-center w-full max-w-sm">
          {options.map((opt) => (
            <button key={opt} disabled={locked} onClick={() => pick(opt)}
              className={`answer-btn flex-1 min-w-[calc(50%-6px)] ${selected === opt ? (opt === answer ? "correct" : "wrong") : selected !== null && opt === answer ? "correct" : ""}`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="font-mono text-xs text-gray-500">
          Streak: <span className="text-accent-yellow font-bold-700 font-size-1rem">{streak}</span> 🔥
        </div>
      </div>
    </div>
  );
}
