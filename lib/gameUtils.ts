export type Difficulty = "easy" | "medium" | "hard";

export const DIFF_CONFIG = {
  easy:   { time: 30, maxNum: 10,  qCount: 10, ops: ["+", "-"] as const },
  medium: { time: 25, maxNum: 20,  qCount: 12, ops: ["+", "-", "×"] as const },
  hard:   { time: 20, maxNum: 30,  qCount: 15, ops: ["+", "-", "×", "÷"] as const },
};

export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export interface Question {
  text: string;
  answer: number;
}

export function genArithQuestion(diff: Difficulty): Question {
  const d = DIFF_CONFIG[diff];
  const op = d.ops[rand(0, d.ops.length - 1)];
  let a: number, b: number, ans: number;

  if (op === "÷") {
    ans = rand(2, 10); b = rand(2, 6); a = ans * b;
  } else if (op === "×") {
    a = rand(2, Math.min(d.maxNum, 12)); b = rand(2, Math.min(d.maxNum, 12)); ans = a * b;
  } else if (op === "-") {
    a = rand(5, d.maxNum); b = rand(1, a); ans = a - b;
  } else {
    a = rand(1, d.maxNum); b = rand(1, d.maxNum); ans = a + b;
  }
  return { text: `${a} ${op} ${b}`, answer: ans };
}

export function genMultiStepQuestion(diff: Difficulty): Question {
  const d = DIFF_CONFIG[diff];
  const op1 = d.ops[rand(0, d.ops.length - 1)];
  const op2 = d.ops[rand(0, d.ops.length - 1)];
  let a = rand(2, d.maxNum), b = rand(2, Math.min(d.maxNum, 12)), c = rand(2, 6);
  let step1: number, ans: number;

  if (op1 === "+") step1 = a + b;
  else if (op1 === "-") { if (a < b) [a, b] = [b, a]; step1 = a - b; }
  else if (op1 === "×") step1 = a * b;
  else { const q = rand(2, 8); b = rand(2, 6); a = q * b; step1 = q; }

  if (op2 === "+") ans = step1 + c;
  else if (op2 === "-") ans = Math.max(0, step1 - c);
  else if (op2 === "×") ans = step1 * c;
  else { const q = rand(2, 6); c = rand(2, 4); step1 = q * c; ans = q; }

  return { text: `(${a} ${op1} ${b}) ${op2} ${c}`, answer: Math.round(ans) };
}

export function genWrongAnswers(correct: number, count = 3): number[] {
  const wrongs = new Set<number>();
  let attempts = 0;
  while (wrongs.size < count && attempts < 50) {
    attempts++;
    const w = correct + rand(-15, 15);
    if (w !== correct && w >= 0) wrongs.add(w);
  }
  return [...wrongs];
}

// Pattern generators
type PatternResult = { seq: number[]; answer: number };

export function genPattern(diff: Difficulty): PatternResult {
  const kind = rand(0, 3);
  if (kind === 0) {
    // arithmetic
    const start = rand(1, 10), step = rand(1, diff === "hard" ? 10 : 5);
    const seq = [0,1,2,3].map((i) => start + step * i);
    return { seq, answer: start + step * 4 };
  } else if (kind === 1) {
    // geometric
    const start = rand(1, 4), ratio = rand(2, diff === "hard" ? 4 : 3);
    const seq = [0,1,2,3].map((i) => Math.round(start * Math.pow(ratio, i)));
    return { seq, answer: Math.round(start * Math.pow(ratio, 4)) };
  } else if (kind === 2) {
    // fibonacci-like
    const a = rand(1, 5), b = rand(1, 5);
    const seq = [a, b, a + b, b + (a + b)];
    return { seq, answer: seq[2] + seq[3] };
  } else {
    // squares
    const start = rand(1, 5);
    const seq = [0,1,2,3].map((i) => (start + i) ** 2);
    return { seq, answer: (start + 4) ** 2 };
  }
}

export const MEMORY_EMOJIS = [
  "🦊","🐬","🌟","🍕","🎸","🦋","🌈","🎯",
  "🍦","🚀","🎪","🦄","🎭","🌺","🏆","🎨",
];

export function getMemoryPairs(diff: Difficulty): number {
  return diff === "easy" ? 6 : diff === "medium" ? 8 : 10;
}
