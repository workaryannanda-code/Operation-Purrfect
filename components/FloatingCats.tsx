"use client";

import { useEffect, useRef, useState } from "react";

const CAT_COLORS = [
  { body: "#C4A882", accent: "#FF8FAB" },
  { body: "#A0A0A0", accent: "#FFB6C1" },
  { body: "#8B6914", accent: "#FFD700" },
  { body: "#2C2C2C", accent: "#FF8FAB" },
  { body: "#E8D5B7", accent: "#FFB6C1" },
];

const CAT_EXPRESSIONS = [
  "happy",
  "sleepy",
  "curious",
  "playful",
  "love",
];

interface Cat {
  id: number;
  x: number;
  color: typeof CAT_COLORS[0];
  expression: string;
  size: number;
  duration: number;
  delay: number;
}

function MiniCatSVG({
  color,
  expression,
  size,
}: {
  color: typeof CAT_COLORS[0];
  expression: string;
  size: number;
}) {
  const eyePath =
    expression === "happy"
      ? "M0 3 Q3 0 6 3"
      : expression === "sleepy"
        ? "M0 4 Q3 2 6 4"
        : expression === "love"
          ? ""
          : "M0 2 Q3 5 6 2";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body */}
      <ellipse cx="20" cy="28" rx="12" ry="8" fill={color.body} />
      {/* Head */}
      <circle cx="20" cy="16" r="10" fill={color.body} />
      {/* Left ear */}
      <polygon points="12,10 9,2 17,8" fill={color.body} />
      <polygon points="13,9 10,3 16,8" fill={color.accent} />
      {/* Right ear */}
      <polygon points="28,10 31,2 23,8" fill={color.body} />
      <polygon points="27,9 30,3 24,8" fill={color.accent} />
      {/* Eyes */}
      {expression === "love" ? (
        <>
          <path
            d="M14 16 L16 14 L18 16 L16 18 Z"
            fill={color.accent}
          />
          <path
            d="M22 16 L24 14 L26 16 L24 18 Z"
            fill={color.accent}
          />
        </>
      ) : (
        <>
          <path
            d={eyePath}
            stroke="#3D2C2C"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            transform="translate(14, 14)"
          />
          <path
            d={eyePath}
            stroke="#3D2C2C"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            transform="translate(22, 14) scale(-1,1)"
          />
        </>
      )}
      {/* Nose */}
      <ellipse cx="20" cy="20" rx="1.5" ry="1" fill={color.accent} />
      {/* Mouth */}
      {expression === "happy" ? (
        <path
          d="M17 22 Q20 25 23 22"
          stroke="#3D2C2C"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      ) : expression === "playful" ? (
        <>
          <circle cx="20" cy="23" rx="2" ry="1.5" fill="#FF8FAB" opacity="0.6" />
        </>
      ) : (
        <path
          d="M18 22 Q20 21 22 22"
          stroke="#3D2C2C"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      )}
      {/* Whiskers */}
      <line x1="6" y1="19" x2="14" y2="20" stroke="#9B7373" strokeWidth="0.5" />
      <line x1="6" y1="22" x2="14" y2="22" stroke="#9B7373" strokeWidth="0.5" />
      <line x1="26" y1="20" x2="34" y2="19" stroke="#9B7373" strokeWidth="0.5" />
      <line x1="26" y1="22" x2="34" y2="22" stroke="#9B7373" strokeWidth="0.5" />
      {/* Tail */}
      <path
        d="M30 28 Q38 20 34 14"
        stroke={color.body}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {/* Paws */}
      <ellipse cx="14" cy="34" rx="3" ry="2" fill={color.body} />
      <ellipse cx="26" cy="34" rx="3" ry="2" fill={color.body} />
    </svg>
  );
}

let catIdCounter = 0;

export default function FloatingCats() {
  const [cats, setCats] = useState<Cat[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spawnCat = () => {
      const color = CAT_COLORS[Math.floor(Math.random() * CAT_COLORS.length)];
      const expression =
        CAT_EXPRESSIONS[Math.floor(Math.random() * CAT_EXPRESSIONS.length)];
      const size = 24 + Math.floor(Math.random() * 20);
      const duration = 12 + Math.floor(Math.random() * 10);
      const x = 5 + Math.floor(Math.random() * 85);

      const newCat: Cat = {
        id: catIdCounter++,
        x,
        color,
        expression,
        size,
        duration,
        delay: 0,
      };

      setCats((prev) => [...prev, newCat]);

      setTimeout(() => {
        setCats((prev) => prev.filter((c) => c.id !== newCat.id));
      }, duration * 1000);
    };

    const initialTimeout = setTimeout(() => {
      spawnCat();
    }, 2000);

    const interval = setInterval(() => {
      spawnCat();
    }, 4000 + Math.random() * 3000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="floating-cats-container"
      aria-hidden="true"
    >
      {cats.map((cat) => (
        <div
          key={cat.id}
          className="floating-cat"
          style={{
            left: `${cat.x}%`,
            animationDuration: `${cat.duration}s`,
            animationDelay: `${cat.delay}s`,
          }}
        >
          <MiniCatSVG
            color={cat.color}
            expression={cat.expression}
            size={cat.size}
          />
        </div>
      ))}
    </div>
  );
}
