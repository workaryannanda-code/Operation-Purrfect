"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { reveals } from "@/app/lib/reveals";
import RevealCard from "@/components/RevealCard";

interface PoppingCat {
  id: number;
  side: "left" | "right";
  bottom: number;
  emoji: string;
}

function PoppingCats() {
  const [cats, setCats] = useState<PoppingCat[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    const emojis = ["🐱", "🐾"];

    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 20000;
      const timer = setTimeout(() => {
        const newCat: PoppingCat = {
          id: nextId,
          side: Math.random() > 0.5 ? "left" : "right",
          bottom: 10 + Math.random() * 70,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
        };
        setNextId((prev) => prev + 1);
        setCats((prev) => [...prev, newCat]);

        setTimeout(() => {
          setCats((prev) => prev.filter((c) => c.id !== newCat.id));
        }, 1500);

        scheduleNext();
      }, delay);
      return timer;
    };

    const timer = scheduleNext();
    return () => clearTimeout(timer);
  }, [nextId]);

  return (
    <AnimatePresence>
      {cats.map((cat) => (
        <motion.div
          key={cat.id}
          initial={{
            x: cat.side === "left" ? -80 : 80,
            y: 0,
            opacity: 0,
          }}
          animate={{
            x: 0,
            y: [-10, 0],
            opacity: 1,
          }}
          exit={{
            x: cat.side === "left" ? -80 : 80,
            opacity: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className={`fixed ${cat.side === "left" ? "left-0" : "right-0"} z-50 pointer-events-none text-5xl`}
          style={{ bottom: `${cat.bottom}%` }}
        >
          {cat.emoji}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default function PreviewPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("tanvi_auth", "true");
  }, []);

  const previewReveals = reveals.map((reveal) => ({
    ...reveal,
    unlockIST: "2020-01-01T00:00:00+05:30",
  }));

  return (
    <div className="min-h-screen relative z-10">
      <header className="sticky top-0 z-20 bg-bg-primary/90 backdrop-blur-sm border-b border-bg-secondary px-4 py-3">
        <div className="max-w-[480px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/")}
              className="px-3 py-1 rounded-full bg-bg-secondary text-text-primary font-mono text-xs hover:bg-accent-primary hover:text-white transition-colors"
            >
              ← Home
            </button>
            <h1 className="font-display text-lg md:text-xl text-accent-primary font-bold">
              Preview Mode 🧪
            </h1>
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-secondary text-text-primary font-mono text-xs font-medium">
            All cards unlocked
          </span>
        </div>
      </header>

      <main className="max-w-[480px] mx-auto px-4 py-6">
        <div className="mb-6 p-4 rounded-xl bg-accent-primary/10 border border-accent-primary/20">
          <p className="font-mono text-sm text-text-primary">
            This is a preview page. All cards are unlocked for testing. No time restrictions apply.
          </p>
        </div>

        {previewReveals.map((reveal, index) => (
          <RevealCard key={reveal.step} reveal={reveal} index={index} />
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center font-body text-text-secondary text-sm mt-6 pb-8"
        >
          Preview mode — all {reveals.length} cards unlocked for testing 🐾
        </motion.p>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.5,
          }}
          className="text-center py-4 px-6 rounded-2xl border-4 border-yellow-400 bg-yellow-50 shadow-lg mb-8"
        >
          <span className="font-display text-xl md:text-2xl text-yellow-700 font-bold">
            Happy Anniversary, Tannu! 💕
          </span>
        </motion.div>
      </main>

      <PoppingCats />
    </div>
  );
}
