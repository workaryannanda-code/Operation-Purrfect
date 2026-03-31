"use client";

import { forwardRef, useImperativeHandle, useCallback } from "react";
import confetti from "canvas-confetti";

export interface ConfettiHandle {
  fire: (isStep5?: boolean) => void;
}

const Confetti = forwardRef<ConfettiHandle>((_props, ref) => {
  const fire = useCallback((isStep5 = false) => {
    const colors = ["#FF8FAB", "#FFCB77", "#ffffff", "#C4A882"];
    const particleCount = isStep5 ? 300 : 100;

    // Fire from multiple angles for step 5
    if (isStep5) {
      confetti({
        particleCount: particleCount / 3,
        spread: 90,
        origin: { x: 0.3, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: particleCount / 3,
        spread: 90,
        origin: { x: 0.7, y: 0.6 },
        colors,
      });
      confetti({
        particleCount: particleCount / 3,
        spread: 120,
        origin: { x: 0.5, y: 0.5 },
        colors,
      });
    } else {
      confetti({
        particleCount,
        spread: 70,
        origin: { x: 0.5, y: 0.6 },
        colors,
      });
    }
  }, []);

  useImperativeHandle(ref, () => ({ fire }), [fire]);

  return null;
});

Confetti.displayName = "Confetti";
export default Confetti;
