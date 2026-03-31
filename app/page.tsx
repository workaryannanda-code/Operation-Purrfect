"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const PASSWORD = "tanvimeow";

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [waking, setWaking] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("tanvi_auth");
    if (auth === "true") {
      router.replace("/mystery");
    } else {
      setReady(true);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === PASSWORD) {
      setWaking(true);
      setTimeout(() => {
        localStorage.setItem("tanvi_auth", "true");
        router.push("/mystery");
      }, 1200);
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
    }
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-sm w-full"
      >
        {/* Sleeping/Waking Cat SVG */}
        <div className="mb-6 flex justify-center">
          <svg
            width="120"
            height="100"
            viewBox="0 0 120 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm"
          >
            <ellipse cx="60" cy="70" rx="40" ry="22" fill="#C4A882" />
            <circle cx="60" cy="40" r="25" fill="#C4A882" />
            <polygon points="40,22 35,5 50,18" fill="#C4A882" />
            <polygon points="42,21 38,9 48,19" fill="#FF8FAB" />
            <polygon points="80,22 85,5 70,18" fill="#C4A882" />
            <polygon points="78,21 82,9 72,19" fill="#FF8FAB" />
            <g
              style={{
                transformOrigin: "60px 38px",
                animation: waking ? "none" : "blink 4s ease-in-out infinite",
              }}
            >
              <path d="M48 38 Q54 34 60 38" stroke="#3D2C2C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M60 38 Q66 34 72 38" stroke="#3D2C2C" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
            {waking && (
              <motion.g
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                style={{ transformOrigin: "60px 38px" }}
              >
                <circle cx="52" cy="38" r="4" fill="#3D2C2C" />
                <circle cx="68" cy="38" r="4" fill="#3D2C2C" />
                <circle cx="53" cy="37" r="1.5" fill="white" />
                <circle cx="69" cy="37" r="1.5" fill="white" />
              </motion.g>
            )}
            <ellipse cx="60" cy="46" rx="3" ry="2" fill="#FF8FAB" />
            <path d="M57 49 Q60 53 63 49" stroke="#3D2C2C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <line x1="30" y1="42" x2="47" y2="44" stroke="#9B7373" strokeWidth="1" />
            <line x1="30" y1="48" x2="47" y2="48" stroke="#9B7373" strokeWidth="1" />
            <line x1="73" y1="44" x2="90" y2="42" stroke="#9B7373" strokeWidth="1" />
            <line x1="73" y1="48" x2="90" y2="48" stroke="#9B7373" strokeWidth="1" />
            <path d="M95 65 Q110 50 105 35" stroke="#C4A882" strokeWidth="6" fill="none" strokeLinecap="round" />
            {!waking && (
              <>
                <text x="92" y="25" fontFamily="var(--font-body), serif" fontSize="12" fill="#9B7373" opacity="0.7">z</text>
                <text x="100" y="18" fontFamily="var(--font-body), serif" fontSize="10" fill="#9B7373" opacity="0.5">z</text>
                <text x="106" y="12" fontFamily="var(--font-body), serif" fontSize="8" fill="#9B7373" opacity="0.3">z</text>
              </>
            )}
          </svg>
        </div>

        <h1 className="font-display text-3xl md:text-4xl text-text-primary mb-2">
          psst. something&apos;s waiting for you 🐾
        </h1>

        <p className="font-body text-sm text-text-secondary mb-8">
          enter the secret password to begin
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className={shaking ? "animate-shake" : ""}>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                if (error) setError(false);
              }}
              placeholder="meow?"
              className="w-full px-6 py-3 rounded-full border-2 border-accent-primary bg-white font-mono text-center text-text-primary placeholder:text-text-secondary outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-full bg-accent-primary text-white font-body font-medium hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
          >
            Open Sesame 🐱
          </button>
        </form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <img
              src="https://media.giphy.com/media/hPPx8yk3Bmqys/giphy.gif"
              alt="Access denied cat"
              className="mx-auto rounded-xl max-w-[200px] mb-2"
            />
            <p className="font-mono text-sm text-text-secondary">
              access denied, hooman
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
