"use client";
import { useEffect, useState } from "react";

interface FlashProps {
  message: string;
  type: "correct" | "wrong" | null;
}

export default function Flash({ message, type }: FlashProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (type) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 900);
      return () => clearTimeout(t);
    }
  }, [message, type]);

  if (!type) return null;

  return (
    <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 font-mono text-sm font-bold px-5 py-2 rounded-full border transition-all duration-200 pointer-events-none
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
      style={type === "correct"
        ? { background: "rgba(0,245,160,0.15)", color: "#00f5a0", borderColor: "#00f5a0" }
        : { background: "rgba(239,68,68,0.15)",  color: "#ef4444", borderColor: "#ef4444" }}>
      {message}
    </div>
  );
}
