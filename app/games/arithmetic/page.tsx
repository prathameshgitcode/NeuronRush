"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { genMultiStepQuestion, genWrongAnswers, shuffle, DIFF_CONFIG, Question } from "@/lib/gameUtils";
import GameHeader from "@/components/GameHeader";
import TimerBar from "@/components/TimerBar";
import Flash from "@/components/Flash";

export default function ArithmeticGame() {
  const router = useRouter();
  const { difficulty, recordResult } = useApp();
  const cfg = DIFF_CONFIG[difficulty];

  const [qNum, setQNum] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
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
    recordResult("arithmetic", s, bs);
    router.push(`/result?score=${s}&correct=${c}&wrong=${w}&streak=${bs}&game=arithmetic`);
  }, [recordResult, router]);

  const loadQuestion = useCallback((num: number) => {
    if (num > cfg.qCount) { endGame(); return; }
    const q = genMultiStepQuestion(difficulty);
    setQuestion(q);
    setOptions(shuffle([q.answer, ...genWrongAnswers(q.answer)]));
    setSelected(null);
    setLocked(false);
    setTimeLeft(cfg.time + 5);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setWrong((w) => w + 1);
          setStreak(0);
          setTimeout(() => loadQuestion(num + 1), 400);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, [cfg, difficulty, endGame]);

  useEffect(() => { loadQuestion(1); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  function answer(val: number) {
    if (locked) return;
    setLocked(true);
    setSelected(val);
    if (timerRef.current) clearInterval(timerRef.current);
    const isCorrect = val === question?.answer;
    if (isCorrect) {
      const ns = refs.current.streak + 1;
      setStreak(ns); setBestStreak(Math.max(refs.current.bestStreak, ns));
      setCorrect((c) => c + 1);
      setScore((s) => s + 15 + (ns > 2 ? ns * 2 : 0));
      setFlash({ msg: "+15 ✓", type: "correct" });
    } else {
      setStreak(0); setWrong((w) => w + 1);
      setFlash({ msg: "✗ Wrong", type: "wrong" });
    }
    setTimeout(() => setQNum((n) => { loadQuestion(n + 1); return n + 1; }), 700);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Flash message={flash.msg} type={flash.type} />
      <GameHeader title="Arithmetic" score={score} qNum={qNum} qTotal={cfg.qCount} />
      <div className="flex flex-col items-center justify-center flex-1 gap-5 px-4 py-6">
        <TimerBar timeLeft={timeLeft} totalTime={cfg.time + 5} />

        <div className="glass w-full max-w-sm p-7 text-center">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Multi-Step</div>
          <div className="font-syne font-extrabold tracking-tight arithmetic-question">
            {question?.text} = ?
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
          {options.map((opt) => (
            <button key={opt} disabled={locked} onClick={() => answer(opt)}
              className={`answer-btn ${selected === opt ? (opt === question?.answer ? "correct" : "wrong") : selected !== null && opt === question?.answer ? "correct" : ""}`}>
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
