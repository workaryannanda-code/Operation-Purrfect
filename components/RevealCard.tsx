"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal, isUnlocked } from "@/app/lib/reveals";
import CountdownTimer from "./CountdownTimer";
import Confetti, { ConfettiHandle } from "./Confetti";
import MiniGame from "./MiniGame";

interface RevealCardProps {
  reveal: Reveal;
  index: number;
}

function LockedCardPlaceholder({ reveal }: { reveal: Reveal }) {
  return (
    <div className="p-5">
      <h3 className="font-display text-lg md:text-xl text-text-primary font-bold mb-4">
        Step {reveal.step} — ???
      </h3>
      <div className="bg-accent-secondary/60 rounded-xl h-[120px] mb-4" />
      <div className="space-y-2 mb-4">
        <p className="font-body text-text-primary text-sm">🐾 🐾 🐾 🐾 🐾</p>
        <p className="font-body text-text-primary text-sm">🐾 🐾 🐾 🐾 🐾</p>
        <p className="font-body text-text-primary text-sm">🐾 🐾 🐾 🐾 🐾</p>
      </div>
      <div className="flex justify-center">
        <span className="inline-block px-4 py-2 rounded-full bg-accent-secondary text-text-primary font-mono text-sm">
          🐾 🐾 🐾 🐾
        </span>
      </div>
    </div>
  );
}

function StaticCatMeme() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-3"
    >
      {/* Body */}
      <ellipse cx="50" cy="72" rx="28" ry="18" fill="#C4A882" />
      {/* Head */}
      <circle cx="50" cy="40" r="22" fill="#C4A882" />
      {/* Left ear */}
      <polygon points="33,24 28,6 42,20" fill="#C4A882" />
      <polygon points="35,22 31,10 40,20" fill="#FF8FAB" />
      {/* Right ear */}
      <polygon points="67,24 72,6 58,20" fill="#C4A882" />
      <polygon points="65,22 69,10 60,20" fill="#FF8FAB" />
      {/* Eyes - sleepy/sad */}
      <path d="M40 38 Q45 43 50 38" stroke="#3D2C2C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M50 38 Q55 43 60 38" stroke="#3D2C2C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Tears */}
      <circle cx="42" cy="45" r="2" fill="#87CEEB" opacity="0.6" />
      <circle cx="58" cy="45" r="2" fill="#87CEEB" opacity="0.6" />
      {/* Nose */}
      <ellipse cx="50" cy="46" rx="3" ry="2" fill="#FF8FAB" />
      {/* Sad mouth */}
      <path d="M44 52 Q50 49 56 52" stroke="#3D2C2C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Whiskers */}
      <line x1="22" y1="43" x2="38" y2="45" stroke="#9B7373" strokeWidth="1" />
      <line x1="22" y1="49" x2="38" y2="49" stroke="#9B7373" strokeWidth="1" />
      <line x1="62" y1="45" x2="78" y2="43" stroke="#9B7373" strokeWidth="1" />
      <line x1="62" y1="49" x2="78" y2="49" stroke="#9B7373" strokeWidth="1" />
      {/* Tail - droopy */}
      <path d="M74 68 Q85 75 80 88" stroke="#C4A882" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Paws */}
      <ellipse cx="36" cy="85" rx="6" ry="4" fill="#C4A882" />
      <ellipse cx="64" cy="85" rx="6" ry="4" fill="#C4A882" />
      {/* Speech bubble */}
      <rect x="72" y="8" width="24" height="16" rx="8" fill="white" stroke="#E8E0D8" strokeWidth="1" />
      <polygon points="76,24 72,24 72,20" fill="white" />
      <text x="84" y="20" fontFamily="sans-serif" fontSize="8" fill="#9B7373" textAnchor="middle">😢</text>
    </svg>
  );
}

export default function RevealCard({ reveal, index }: RevealCardProps) {
  const [unlocked, setUnlocked] = useState(isUnlocked(reveal.unlockIST));
  const [gameWon, setGameWon] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const confettiRef = useRef<ConfettiHandle>(null);

  // Live 1-second date lock check
  useEffect(() => {
    const interval = setInterval(() => {
      setUnlocked(isUnlocked(reveal.unlockIST));
    }, 1000);
    return () => clearInterval(interval);
  }, [reveal.unlockIST]);

  // Check if game was already won on prior visit
  useEffect(() => {
    if (typeof window !== "undefined") {
      const won = localStorage.getItem(`tanvi_game_won_step_${reveal.step}`);
      if (won === "true") {
        setGameWon(true);
      }
    }
  }, [reveal.step]);

  // Fire confetti on first live unlock
  useEffect(() => {
    if (unlocked) {
      const key = `tanvi_opened_step_${reveal.step}`;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, "true");
        setJustUnlocked(true);
      }
    }
  }, [unlocked, reveal.step]);

  useEffect(() => {
    if (justUnlocked && unlocked) {
      confettiRef.current?.fire(reveal.step === 5);
    }
  }, [justUnlocked, unlocked, reveal.step]);

  const handleGameWin = () => {
    localStorage.setItem(`tanvi_game_won_step_${reveal.step}`, "true");
    setGameWon(true);
    confettiRef.current?.fire(reveal.step === 5);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      <Confetti ref={confettiRef} />

      {!unlocked ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-locked-bg mb-5">
          <div
            style={{
              filter: "blur(8px) grayscale(40%)",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            <LockedCardPlaceholder reveal={reveal} />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/30 backdrop-blur-sm px-4 py-6">
            <StaticCatMeme />
            <p className="font-body text-text-secondary text-center mb-2">
              not yet, hooman 🔒
            </p>
            <div className="mt-1">
              <CountdownTimer targetDate={reveal.unlockIST} />
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl p-5 mb-5 bg-white shadow-lg border-l-4 border-accent-primary">
          <AnimatePresence mode="wait">
            {!gameWon ? (
              <motion.div
                key="minigame"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <p className="font-body text-accent-primary text-center text-sm mb-4 font-medium">
                  🎉 This one&apos;s ready! But first... play a quick game 🐾
                </p>
                <MiniGame step={reveal.step} onWin={handleGameWin} />
              </motion.div>
            ) : (
              <motion.div
                key="reveal"
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ transformOrigin: "top center" }}
              >
                <h3 className="font-display text-lg md:text-xl text-text-primary font-bold mb-4">
                  {reveal.title}
                </h3>

                <div className="flex justify-center mb-4">
                  <img
                    src={reveal.gifUrl}
                    alt="Cat gif"
                    loading="lazy"
                    className="rounded-xl max-h-[200px] object-cover w-full"
                  />
                </div>

                <p className="font-body text-text-primary leading-relaxed whitespace-pre-wrap mb-4">
                  {reveal.message}
                </p>

                <div className="flex justify-center">
                  <span className="inline-block px-4 py-2 rounded-full bg-accent-secondary text-text-primary font-mono text-sm">
                    {reveal.activityHint}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}
