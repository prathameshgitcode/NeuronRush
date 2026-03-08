"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";
import { MEMORY_EMOJIS, getMemoryPairs, shuffle } from "@/lib/gameUtils";
import GameHeader from "@/components/GameHeader";
import Flash from "@/components/Flash";

interface MemCard { id: number; emoji: string; flipped: boolean; matched: boolean; }

export default function MemoryGame() {
  const router = useRouter();
  const { difficulty, recordResult } = useApp();
  const pairs = getMemoryPairs(difficulty);
  const cols = pairs <= 6 ? 3 : 4;

  const [cards, setCards] = useState<MemCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState(0);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [flash, setFlash] = useState<{ msg: string; type: "correct" | "wrong" | null }>({ msg: "", type: null });
  const [busy, setBusy] = useState(false);
  const startRef = useRef(Date.now());
  const scoreRef = useRef(0);
  scoreRef.current = score;

  useEffect(() => {
    const pool = shuffle([...MEMORY_EMOJIS]).slice(0, pairs);
    setCards(shuffle([...pool, ...pool].map((e, i) => ({ id: i, emoji: e, flipped: false, matched: false }))));
    startRef.current = Date.now();
  }, [pairs]);

  function flip(idx: number) {
    if (busy || cards[idx].matched || cards[idx].flipped || flipped.length === 2) return;
    const newCards = cards.map((c, i) => i === idx ? { ...c, flipped: true } : c);
    const newFlipped = [...flipped, idx];
    setCards(newCards);
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setBusy(true);
      setMoves((m) => m + 1);
      const [a, b] = newFlipped;
      if (newCards[a].emoji === newCards[b].emoji) {
        // match!
        const pts = 20;
        setScore((s) => s + pts);
        setFlash({ msg: "✓ Match! +20", type: "correct" });
        const finalCards = newCards.map((c, i) => (i === a || i === b) ? { ...c, matched: true } : c);
        setCards(finalCards);
        setFlipped([]);
        setBusy(false);
        const newMatched = matched + 1;
        setMatched(newMatched);
        if (newMatched === pairs) {
          const elapsed = Math.round((Date.now() - startRef.current) / 1000);
          const bonus = Math.max(0, 120 - elapsed) * 2;
          const finalScore = scoreRef.current + bonus;
          recordResult("memory", finalScore, 0);
          setTimeout(() => router.push(`/result?score=${finalScore}&correct=${pairs}&wrong=${moves}&streak=0&game=memory`), 600);
        }
      } else {
        setFlash({ msg: "✗ No match", type: "wrong" });
        setTimeout(() => {
          setCards(newCards.map((c, i) => (i === a || i === b) ? { ...c, flipped: false } : c));
          setFlipped([]);
          setBusy(false);
        }, 900);
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Flash message={flash.msg} type={flash.type} />
      <GameHeader title="Memory Match" score={score} />
      <div className="flex flex-col items-center justify-center flex-1 gap-5 px-4 py-6">
        <div className="font-mono text-xs text-gray-500">
          Moves: <span className="text-accent-yellow font-bold-700">{moves}</span>
          &nbsp;|&nbsp; Matched: <span className="text-accent-green font-bold-700">{matched}</span>/{pairs}
        </div>

        <div style={{ maxWidth: cols * 72 + (cols - 1) * 10 }}>
          <div
            className="memory-grid"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
          >
            {cards.map((card, i) => {
              let cardClass = "aspect-square rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 cursor-pointer ";
              if (card.matched) cardClass += " memory-card-matched";
              else if (card.flipped) cardClass += " memory-card-flipped";
              else cardClass += " memory-card-default";
              return (
                <button
                  key={card.id}
                  onClick={() => flip(i)}
                  className={cardClass}
                >
                  {card.flipped || card.matched ? card.emoji : "·"}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
