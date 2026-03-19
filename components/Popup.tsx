"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiX } from "react-icons/fi";

// Floating emojis that animate outward from center on mount
const FLOATING = [
  { emoji: "👋", x: -90, y: -60, delay: 0.15 },
  { emoji: "🚀", x: 80, y: -80, delay: 0.2 },
  { emoji: "✨", x: -60, y: 60, delay: 0.25 },
  { emoji: "💻", x: 90, y: 50, delay: 0.3 },
  { emoji: "🎯", x: 0, y: -100, delay: 0.1 },
];

export default function Popup({ onClose }: { onClose?: () => void }) {
    const [visible, setVisible] = useState(true);

    const close = () => {
        setVisible(false);
        onClose?.();
    };

    return (
        <AnimatePresence>
            {visible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={close}
                        className="fixed inset-0 z-9990 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Floating emojis */}
                    {FLOATING.map(({ emoji, x, y, delay }, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{ opacity: 1, x, y, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 14,
                delay,
              }}
              className="fixed left-1/2 top-1/2 z-9998 text-3xl pointer-events-none select-none"
              style={{ marginLeft: -16, marginTop: -16 }}
            >
              {emoji}
            </motion.span>
          ))}

                    {/* Card */}
                    <motion.div
                        key="popup"
                        initial={{ opacity: 0, scale: 0.5, y: 80 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.7, y: 60 }}
                        transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 18,
                            // Elastic entrance — springs past 1.0 then bounces back
                            restDelta: 0.001,
                        }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-9999 w-full max-w-sm px-4"
                    >
                        <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
                            {/* Gradient top bar */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-violet-500 to-pink-500" />

                            <div className="p-7 flex flex-col items-center gap-4 text-center">
                                {/* Close button */}
                                <button
                                    onClick={close}
                                    className="absolute top-5 right-5 w-7 h-7 rounded-full bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-neutral-400 hover:bg-neutral-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                                    aria-label="Close"
                                >
                                    <FiX size={13} />
                                </button>

                                {/* Bouncing main emoji */}
                                <motion.div
                                    initial={{ scale: 0, rotate: -30 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 12,
                                        delay: 0.1,
                                    }}
                                    className="text-6xl select-none"
                                >
                                    👋
                                </motion.div>

                                {/* Text */}
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.4 }}
                                >
                                    <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white mb-1">
                                        Hey, welcome! 🎉
                                    </h2>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        This portfolio has some hidden <span className="font-semibold text-violet-500">Easter eggs</span> tucked away. Keep your eyes peeled — and maybe try the footer 👀
                                    </p>
                                </motion.div>

                                {/* Tags */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex flex-wrap justify-center gap-2"
                                >
                                    {["🕵️ Explore", "🔑 Find secrets", "🎮 Konami code"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="text-[11px] font-medium px-3 py-1 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </motion.div>

                                {/* CTA */}
                                <motion.button
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={close}
                                    className="w-full rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 text-white text-sm font-semibold py-3 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 transition-shadow cursor-pointer"
                                >
                                    Let&apos;s explore ✨
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
