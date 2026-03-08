"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { genArithQuestion, genWrongAnswers, shuffle, DIFF_CONFIG, Question } from "@/lib/gameUtils";
import GameHeader from "@/components/GameHeader";
import TimerBar from "@/components/TimerBar";
import Flash from "@/components/Flash";


export default function SpeedMathGame() {
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
  const [timeLeft, setTimeLeft] = useState(cfg.time);
  const [flash, setFlash] = useState<{ msg: string; type: "correct" | "wrong" | null }>({ msg: "", type: null });
  const [gameEnded, setGameEnded] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scoreRef = useRef(score);
  const correctRef = useRef(correct);
  const wrongRef = useRef(wrong);
  const streakRef = useRef(streak);
  const bestStreakRef = useRef(bestStreak);
  scoreRef.current = score;
  correctRef.current = correct;
  wrongRef.current = wrong;
  streakRef.current = streak;
  bestStreakRef.current = bestStreak;

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    recordResult("speed", scoreRef.current, bestStreakRef.current);
    router.push(`/result?score=${scoreRef.current}&correct=${correctRef.current}&wrong=${wrongRef.current}&streak=${bestStreakRef.current}&game=speed`);
  }, [recordResult, router]);

  const loadQuestion = useCallback((num: number) => {
    if (num > cfg.qCount) { setGameEnded(true); return; }
    const q = genArithQuestion(difficulty);
    const opts = shuffle([q.answer, ...genWrongAnswers(q.answer)]);
    setQuestion(q);
    setOptions(opts);
    setSelected(null);
    setLocked(false);
    setTimeLeft(cfg.time);

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
  }, [cfg, difficulty]);

  useEffect(() => { loadQuestion(1); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  useEffect(() => {
    if (gameEnded) endGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameEnded]);

  function answer(val: number) {
    if (locked) return;
    setLocked(true);
    setSelected(val);
    if (timerRef.current) clearInterval(timerRef.current);
    const isCorrect = val === question?.answer;
    if (isCorrect) {
      const newStreak = streakRef.current + 1;
      const newBest = Math.max(bestStreakRef.current, newStreak);
      const bonus = newStreak > 2 ? Math.floor(newStreak * 1.5) : 1;
      const pts = 10 * bonus;
      setStreak(newStreak);
      setBestStreak(newBest);
      setCorrect((c) => c + 1);
      setScore((s) => s + pts);
      setFlash({ msg: newStreak > 2 ? `+${pts} STREAK 🔥` : "+10", type: "correct" });
    } else {
      setStreak(0);
      setWrong((w) => w + 1);
      setFlash({ msg: "✗ Wrong", type: "wrong" });
    }
    setTimeout(() => { setQNum((n) => { loadQuestion(n + 1); return n + 1; }); }, 700);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Flash message={flash.msg} type={flash.type} />
      <GameHeader title="Speed Math" score={score} qNum={qNum} qTotal={cfg.qCount} />
      <div className="flex flex-col items-center justify-center flex-1 gap-5 px-4 py-6">
        <TimerBar timeLeft={timeLeft} totalTime={cfg.time} />

        <div className="glass w-full max-w-sm p-7 text-center">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Solve</div>
          <div className="font-syne font-extrabold text-5xl tracking-tight speed-question">
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
