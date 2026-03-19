"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

// Konami Code sequence
const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

// Floating confetti particle
const EMOJIS = ["🎉", "🚀", "✨", "🔥", "💎", "🎯", "⚡", "🦄", "🍕", "🎸"];

function Particle({ x, y, emoji }: { x: number; y: number; emoji: string }) {
  return (
    <motion.div
      initial={{ x, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: x + (Math.random() - 0.5) * 300,
        y: y - Math.random() * 400 - 100,
        opacity: 0,
        scale: 0,
        rotate: (Math.random() - 0.5) * 720,
      }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="fixed text-2xl pointer-events-none z-[9999] select-none"
      style={{ left: 0, top: 0 }}
    >
      {emoji}
    </motion.div>
  );
}

export default function EasterEggPopup() {
  const [open, setOpen] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const keyBuffer = useRef<string[]>([]);
  const particleId = useRef(0);

  const triggerParticles = useCallback(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: particleId.current++,
      x: cx + (Math.random() - 0.5) * 200,
      y: cy,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    // Cleanup particles after they animate out
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((n) => n.id === p.id)));
    }, 1600);
  }, []);

  const activate = useCallback(() => {
    setOpen(true);
    triggerParticles();
  }, [triggerParticles]);

  // Konami code listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      keyBuffer.current = [...keyBuffer.current, e.key].slice(-KONAMI.length);
      if (keyBuffer.current.join(",") === KONAMI.join(",")) {
        activate();
        keyBuffer.current = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activate]);

  // Long-press on logo (mobile Easter egg — 3 seconds)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const logo = document.getElementById("easter-egg-logo");
    if (!logo) return;
    const start = () => { timer = setTimeout(activate, 3000); };
    const cancel = () => clearTimeout(timer);
    logo.addEventListener("mousedown", start);
    logo.addEventListener("touchstart", start);
    logo.addEventListener("mouseup", cancel);
    logo.addEventListener("touchend", cancel);
    logo.addEventListener("mouseleave", cancel);
    return () => {
      logo.removeEventListener("mousedown", start);
      logo.removeEventListener("touchstart", start);
      logo.removeEventListener("mouseup", cancel);
      logo.removeEventListener("touchend", cancel);
      logo.removeEventListener("mouseleave", cancel);
      clearTimeout(timer);
    };
  }, [activate]);

  return (
    <>
      {/* Confetti burst particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <Particle key={p.id} x={p.x} y={p.y} emoji={p.emoji} />
        ))}
      </AnimatePresence>

      {/* Overlay + Popup */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.6, y: 60 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-full max-w-md px-4"
            >
              <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-700 shadow-2xl overflow-hidden p-8 flex flex-col items-center gap-5 text-center">
                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <FiX size={14} />
                </button>

                {/* Animated emoji */}
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-6xl select-none"
                >
                  🎉
                </motion.div>

                {/* Title */}
                <div>
                  <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-white mb-1">
                    You found the Easter Egg!
                  </h2>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    The Konami code still works in {new Date().getFullYear()}. Respect.
                  </p>
                </div>

                {/* Fun message */}
                <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-sky-500/10 border border-violet-500/20 px-6 py-4 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  👋 Hey there, curious one! I see you&apos;ve got a knack for exploring beyond the surface — that&apos;s exactly the kind of mindset I bring to my work too. Now you know my secret: I hide surprises in my code. 🚀
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2">
                  {["↑↑↓↓←→←→BA", "Easter Egg", "You Rock 🤘", "+100 XP"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() => setOpen(false)}
                  className="mt-1 inline-flex items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 text-sm font-semibold hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  Awesome, close this! 🎊
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
