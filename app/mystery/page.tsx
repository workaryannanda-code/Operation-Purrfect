"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { reveals } from "@/app/lib/reveals";
import RevealCard from "@/components/RevealCard";

function getDaysUntilAnniversary(): number {
  const now = new Date();
  const april11 = new Date(now.getFullYear(), 3, 11);
  if (now >= april11) {
    return 0;
  }
  return Math.ceil(
    (april11.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
}

function isAnniversaryToday(): boolean {
  const now = new Date();
  return now.getMonth() === 3 && now.getDate() === 11;
}

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

export default function MysteryPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [daysLeft, setDaysLeft] = useState(getDaysUntilAnniversary());

  useEffect(() => {
    const auth = localStorage.getItem("tanvi_auth");
    if (auth !== "true") {
      router.replace("/");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysLeft(getDaysUntilAnniversary());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!authorized) return null;

  const anniversaryDay = isAnniversaryToday();

  return (
    <div className="min-h-screen relative z-10">
      <header className="sticky top-0 z-20 bg-bg-primary/90 backdrop-blur-sm border-b border-bg-secondary px-4 py-3">
        <div className="max-w-[480px] mx-auto flex items-center justify-between">
          <h1 className="font-display text-lg md:text-xl text-accent-primary font-bold">
            One year of us 🐱
          </h1>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-secondary text-text-primary font-mono text-xs font-medium whitespace-nowrap">
            {anniversaryDay
              ? "💕 It's our day!"
              : daysLeft > 0
                ? `${daysLeft}d to go`
                : "🐾"}
          </span>
        </div>
      </header>

      <main className="max-w-[480px] mx-auto px-4 py-6">
        {reveals.map((reveal, index) => (
          <RevealCard key={reveal.step} reveal={reveal} index={index} />
        ))}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center font-body text-text-secondary text-sm mt-6 pb-8"
        >
          Each card unlocks on its special day. Check back daily! 🐾
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
