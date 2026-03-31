"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti, { ConfettiHandle } from "./Confetti";

interface MiniGameProps {
  step: number;
  onWin: () => void;
}

/* ─── Step 1: Catch the Bouquet ─── */
function CatchBouquet({ onWin }: { onWin: () => void }) {
  const [roses, setRoses] = useState<
    { id: number; x: number; caught: boolean }[]
  >([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  const confettiRef = useRef<ConfettiHandle>(null);

  const spawnRoses = useCallback(() => {
    const newRoses = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 70,
      caught: false,
    }));
    setRoses(newRoses);
    setTimeLeft(10);
    setStarted(true);
    setFailed(false);
  }, []);

  useEffect(() => {
    if (!started || failed) return;
    if (timeLeft <= 0) {
      setFailed(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [started, timeLeft, failed]);

  const catchRose = (id: number) => {
    setRoses((prev) => {
      const next = prev.map((r) =>
        r.id === id ? { ...r, caught: true } : r
      );
      if (next.every((r) => r.caught)) {
        confettiRef.current?.fire(false);
        setTimeout(onWin, 1500);
      }
      return next;
    });
  };

  const allCaught = roses.length > 0 && roses.every((r) => r.caught);

  return (
    <div className="text-center space-y-3">
      <Confetti ref={confettiRef} />
      <p className="font-body text-text-primary text-sm">
        Quick! Catch all 5 roses before they float away! 🌹
      </p>
      {!started && (
        <button
          onClick={spawnRoses}
          className="px-6 py-3 rounded-full bg-accent-primary text-white font-body hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          Start! 🌹
        </button>
      )}
      {started && !allCaught && !failed && (
        <>
          <p className="font-mono text-accent-primary text-sm">
            {timeLeft}s left
          </p>
          <div className="relative w-full h-48 bg-bg-secondary/50 rounded-xl overflow-hidden">
            {roses
              .filter((r) => !r.caught)
              .map((rose) => (
                <button
                  key={rose.id}
                  onClick={() => catchRose(rose.id)}
                  className="absolute text-3xl cursor-pointer transition-transform hover:scale-125 active:scale-90"
                  style={{
                    left: `${rose.x}%`,
                    bottom: "10%",
                    animation: `float-up-rose ${6 + Math.random() * 4}s linear infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  🌹
                </button>
              ))}
            <style jsx>{`
              @keyframes float-up-rose {
                0% {
                  transform: translateY(0);
                  opacity: 1;
                }
                100% {
                  transform: translateY(-220px);
                  opacity: 0.3;
                }
              }
            `}</style>
          </div>
        </>
      )}
      {failed && (
        <button
          onClick={spawnRoses}
          className="px-6 py-3 rounded-full bg-accent-primary text-white font-body hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          Try again! 🙀
        </button>
      )}
      {allCaught && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="font-display text-accent-primary text-xl font-bold"
        >
          You did it! 🐾
        </motion.p>
      )}
    </div>
  );
}

/* ─── Step 2: Cat Trivia ─── */
function CatTrivia({ onWin }: { onWin: () => void }) {
  const questions = [
    {
      q: "What does a cat do when it's happy?",
      options: ["Hisses", "Kneads (makes biscuits)", "Runs away", "Bites you (lovingly)"],
      correct: "Kneads (makes biscuits)",
    },
    {
      q: "What sound does a cat make when it's REALLY happy?",
      options: ["Bark", "Chirp", "Purr", "Meow loudly"],
      correct: "Purr",
    },
    {
      q: "What is a group of cats called?",
      options: ["A pack", "A flock", "A clowder", "A herd"],
      correct: "A clowder",
    },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [won, setWon] = useState(false);
  const confettiRef = useRef<ConfettiHandle>(null);

  const answer = (option: string) => {
    if (option === questions[currentQ].correct) {
      if (currentQ + 1 < questions.length) {
        setCurrentQ((p) => p + 1);
      } else {
        setWon(true);
        confettiRef.current?.fire(false);
        setTimeout(onWin, 1500);
      }
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="text-center space-y-4">
      <Confetti ref={confettiRef} />
      <p className="font-mono text-text-secondary text-xs">
        Question {currentQ + 1} of {questions.length}
      </p>
      {!won ? (
        <div className={shaking ? "animate-shake" : ""}>
          <p className="font-body text-text-primary text-sm mb-4 font-medium">
            {questions[currentQ].q}
          </p>
          <div className="grid grid-cols-1 gap-2">
            {questions[currentQ].options.map((opt) => (
              <button
                key={opt}
                onClick={() => answer(opt)}
                className="px-4 py-3 rounded-xl bg-white border-2 border-bg-secondary text-text-primary font-body text-sm hover:border-accent-primary hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                {opt}
              </button>
            ))}
          </div>
          {shaking && (
            <p className="font-body text-accent-primary text-sm mt-2">
              Nope! Try again 🙀
            </p>
          )}
        </div>
      ) : (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="font-display text-accent-primary text-xl font-bold"
        >
          You did it! 🐾
        </motion.p>
      )}
    </div>
  );
}

/* ─── Step 3: Find the Hidden Cat ─── */
function FindCat({ onWin }: { onWin: () => void }) {
  const emojis = ["🛋️", "🪴", "🖼️", "🚪", "🎀", "🐾", "🪟", "🧸", "📚", "🕯️", "☕", "🎵", "🌈", "⭐", "🌙", "🎀", "🌺", "🎨", "🧶", "🐟"];
  const [catPos, setCatPos] = useState(() => Math.floor(Math.random() * 20));
  const [shaking, setShaking] = useState(false);
  const [won, setWon] = useState(false);
  const confettiRef = useRef<ConfettiHandle>(null);

  const handleClick = (i: number) => {
    if (won) return;
    if (i === catPos) {
      setWon(true);
      confettiRef.current?.fire(false);
      setTimeout(onWin, 1500);
    } else {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  };

  return (
    <div className="text-center space-y-3">
      <Confetti ref={confettiRef} />
      <p className="font-body text-text-primary text-sm">
        The cat is hiding somewhere in here. Find it! 🔍
      </p>
      <div className={`grid grid-cols-4 gap-2 ${shaking ? "animate-shake" : ""}`}>
        {emojis.map((emoji, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="text-2xl p-2 rounded-xl bg-white border border-bg-secondary hover:bg-bg-secondary/50 hover:scale-110 active:scale-90 transition-all cursor-pointer min-h-[48px] flex items-center justify-center"
          >
            {i === catPos && won ? "🐱" : emoji}
          </button>
        ))}
      </div>
      {shaking && (
        <p className="font-body text-accent-primary text-sm">
          Not there! Keep looking 🙀
        </p>
      )}
      {won && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="font-display text-accent-primary text-xl font-bold"
        >
          You did it! 🐾
        </motion.p>
      )}
    </div>
  );
}

/* ─── Step 4: Memory Match ─── */
function MemoryMatch({ onWin }: { onWin: () => void }) {
  const [cards, setCards] = useState<
    { id: number; emoji: string; flipped: boolean; matched: boolean }[]
  >([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const confettiRef = useRef<ConfettiHandle>(null);
  const lockRef = useRef(false);

  useEffect(() => {
    const pairEmojis = ["🐱", "🐾", "🌹", "🍦", "🧁", "🎂"];
    const pairs = [...pairEmojis, ...pairEmojis];
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    setCards(
      pairs.map((emoji, i) => ({
        id: i,
        emoji,
        flipped: false,
        matched: false,
      }))
    );
  }, []);

  const flipCard = (id: number) => {
    if (lockRef.current || won) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;

    const next = [...flipped, id];
    setFlipped(next);

    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, flipped: true } : c))
    );

    if (next.length === 2) {
      lockRef.current = true;
      setMoves((m) => m + 1);
      const [a, b] = next;
      const cardA = cards.find((c) => c.id === a)!;
      const cardB = cards.find((c) => c.id === b)!;

      setTimeout(() => {
        if (cardA.emoji === cardB.emoji) {
          setCards((prev) =>
            prev.map((c) =>
              c.id === a || c.id === b ? { ...c, matched: true } : c
            )
          );
          setFlipped([]);
          lockRef.current = false;
          // Check win
          setTimeout(() => {
            setCards((prev) => {
              if (prev.every((c) => c.matched)) {
                setWon(true);
                confettiRef.current?.fire(false);
                setTimeout(onWin, 1500);
              }
              return prev;
            });
          }, 300);
        } else {
          setCards((prev) =>
            prev.map((c) =>
              c.id === a || c.id === b ? { ...c, flipped: false } : c
            )
          );
          setFlipped([]);
          lockRef.current = false;
        }
      }, 800);
    }
  };

  return (
    <div className="text-center space-y-3">
      <Confetti ref={confettiRef} />
      <p className="font-mono text-text-secondary text-xs">
        Match all 6 pairs! ({moves} moves)
      </p>
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => flipCard(card.id)}
            className="min-h-[56px] rounded-xl text-2xl flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
            style={{
              background: card.flipped || card.matched ? "white" : "var(--accent-secondary)",
              border:
                card.matched
                  ? "2px solid var(--accent-primary)"
                  : "2px solid transparent",
              transform:
                card.flipped || card.matched ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: card.flipped || card.matched ? "rotateY(180deg)" : "none",
              }}
            >
              {card.flipped || card.matched ? card.emoji : "❓"}
            </span>
          </button>
        ))}
      </div>
      {won && (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="font-display text-accent-primary text-xl font-bold"
        >
          You did it! 🐾
        </motion.p>
      )}
    </div>
  );
}

/* ─── Step 5: Meow or No Meow ─── */
function MeowOrNoMeow({ onWin }: { onWin: () => void }) {
  const [won, setWon] = useState(false);
  const confettiRef = useRef<ConfettiHandle>(null);

  const handleWin = () => {
    setWon(true);
    confettiRef.current?.fire(true);
    setTimeout(onWin, 1500);
  };

  return (
    <div className="text-center space-y-4">
      <Confetti ref={confettiRef} />
      {!won ? (
        <>
          <p className="font-display text-text-primary text-lg font-bold">
            Is today the best day ever?
          </p>
          <div className="flex flex-col gap-3 items-center">
            <button
              onClick={handleWin}
              className="w-full px-6 py-4 rounded-full bg-accent-primary text-white font-body text-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              Meow (Yes) 🐱
            </button>
            <button
              onClick={handleWin}
              className="w-full px-6 py-4 rounded-full bg-accent-secondary text-text-primary font-body text-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              Also Meow (Also Yes) 🐱
            </button>
          </div>
        </>
      ) : (
        <motion.p
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="font-display text-accent-primary text-xl font-bold"
        >
          You did it! 🐾
        </motion.p>
      )}
    </div>
  );
}

/* ─── Main MiniGame Router ─── */
export default function MiniGame({ step, onWin }: MiniGameProps) {
  switch (step) {
    case 1:
      return <CatchBouquet onWin={onWin} />;
    case 2:
      return <CatTrivia onWin={onWin} />;
    case 3:
      return <FindCat onWin={onWin} />;
    case 4:
      return <MemoryMatch onWin={onWin} />;
    case 5:
      return <MeowOrNoMeow onWin={onWin} />;
    default:
      return null;
  }
}
