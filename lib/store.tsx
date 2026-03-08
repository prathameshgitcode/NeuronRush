"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type Difficulty = "easy" | "medium" | "hard";
export type GameType = "speed" | "pattern" | "memory" | "arithmetic";

interface AppState {
  difficulty: Difficulty;
  totalScore: number;
  gamesPlayed: number;
  bestStreak: number;
  level: number;
  bests: Record<GameType, number | null>;
}

interface AppCtx extends AppState {
  setDifficulty: (d: Difficulty) => void;
  recordResult: (type: GameType, score: number, streak: number) => void;
}

const defaultState: AppState = {
  difficulty: "easy",
  totalScore: 0,
  gamesPlayed: 0,
  bestStreak: 0,
  level: 1,
  bests: { speed: null, pattern: null, memory: null, arithmetic: null },
};

const Ctx = createContext<AppCtx>({} as AppCtx);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("neuronrush_state");
        setState(saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState);
      } catch {
        setState(defaultState);
      }
      setReady(true);
    }
  }, []);

  useEffect(() => {
    if (ready) {
      localStorage.setItem("neuronrush_state", JSON.stringify(state));
    }
  }, [state, ready]);

  const setDifficulty = (d: Difficulty) =>
    setState((s) => ({ ...s, difficulty: d }));

  const recordResult = (type: GameType, score: number, streak: number) => {
    setState((s) => {
      const newTotal = s.totalScore + score;
      return {
        ...s,
        totalScore: newTotal,
        gamesPlayed: s.gamesPlayed + 1,
        bestStreak: Math.max(s.bestStreak, streak),
        level: Math.floor(newTotal / 200) + 1,
        bests: {
          ...s.bests,
          [type]: s.bests[type] === null ? score : Math.max(s.bests[type]!, score),
        },
      };
    });
  };

  if (!ready) return null;

  return (
    <Ctx.Provider value={{ ...state, setDifficulty, recordResult }}>
      {children}
    </Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
