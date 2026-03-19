"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiAward } from "react-icons/fi";
import { certifications } from "@/utils/data";

const VISIBLE_RANGE = 2; // Number of cards visible on each side of active

const Certifications = () => {
    const [active, setActive] = useState(0);

    const prev = () => setActive((a) => Math.max(0, a - 1));
    const next = () => setActive((a) => Math.min(certifications.length - 1, a + 1));

    const getCardStyle = (index: number) => {
        const offset = index - active;
        const absOffset = Math.abs(offset);

        if (absOffset > VISIBLE_RANGE) return null; // Hide cards too far away

        const rotateY = offset * 40;
        const translateX = offset * 55;
        const translateZ = absOffset === 0 ? 0 : -120 - absOffset * 60;
        const scale = absOffset === 0 ? 1 : Math.max(0.65, 1 - absOffset * 0.18);
        const opacity = absOffset === 0 ? 1 : Math.max(0.3, 1 - absOffset * 0.3);
        const zIndex = VISIBLE_RANGE - absOffset;
        const brightness = absOffset === 0 ? 1 : Math.max(0.4, 1 - absOffset * 0.25);

        return { rotateY, translateX, translateZ, scale, opacity, zIndex, brightness };
    };

    return (
        <section id="certifications" className="w-full py-16 sm:py-24 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background flairs */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[40vw] max-w-[600px] max-h-[400px] bg-violet-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 flex flex-col items-center justify-center">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 sm:mb-20"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 py-1 text-sm text-zinc-800 dark:text-zinc-300 mb-6 border border-zinc-200 dark:border-zinc-800">
                        <FiAward className="text-violet-500" />
                        <span className="font-medium">Certifications</span>
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto text-lg">
                        Industry-recognized credentials validating my expertise across cloud, development, and design.
                    </p>
                </motion.div>

                {/* Coverflow Carousel */}
                <div className="relative w-full max-w-5xl flex flex-col items-center">
                    {/* Card Stage */}
                    <div
                        className="relative w-full flex items-center justify-center"
                        style={{ height: "340px", perspective: "1200px" }}
                    >
                        {certifications.map((cert, index) => {
                            const style = getCardStyle(index);
                            if (!style) return null;
                            const { rotateY, translateX, translateZ, scale, opacity, zIndex, brightness } = style;
                            const isActive = index === active;
                            const Icon = cert.icon;

                            return (
                                <motion.div
                                    key={cert.id}
                                    onClick={() => setActive(index)}
                                    animate={{
                                        rotateY,
                                        x: `${translateX}%`,
                                        translateZ,
                                        scale,
                                        opacity,
                                        filter: `brightness(${brightness})`,
                                    }}
                                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                                    style={{ zIndex, transformStyle: "preserve-3d", position: "absolute", width: "min(320px, 80vw)" }}
                                    className={`cursor-pointer rounded-2xl border ${cert.border} bg-white dark:bg-zinc-900 shadow-xl p-6 flex flex-col gap-4 select-none`}
                                >
                                    {/* Card Top */}
                                    <div className={`rounded-xl bg-gradient-to-br ${cert.gradient} p-4 flex items-center gap-4`}>
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/10 dark:bg-white/5 shrink-0"
                                            style={{ color: cert.iconColor }}
                                        >
                                            <Icon />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                                                {cert.issuer}
                                            </span>
                                            <p className="text-neutral-900 dark:text-white font-bold text-base leading-tight mt-0.5">
                                                {cert.title}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                                        {cert.description}
                                    </p>

                                    {/* Card Footer */}
                                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-100 dark:border-zinc-800">
                                        <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">{cert.date}</span>
                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.a
                                                    href={cert.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.8 }}
                                                    transition={{ duration: 0.2 }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 bg-neutral-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:scale-105 transition-transform"
                                                >
                                                    View <FiExternalLink size={11} />
                                                </motion.a>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Navigation arrows + dot indicators */}
                    <div className="flex items-center gap-6 mt-10">
                        <button
                            onClick={prev}
                            disabled={active === 0}
                            className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
                            aria-label="Previous"
                        >
                            <FiChevronLeft size={18} />
                        </button>

                        {/* Dot indicators */}
                        <div className="flex items-center gap-2">
                            {certifications.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className="transition-all duration-300"
                                >
                                    <span
                                        className={`block rounded-full transition-all duration-300 ${i === active
                                                ? "w-6 h-2 bg-neutral-900 dark:bg-white"
                                                : "w-2 h-2 bg-neutral-300 dark:bg-zinc-600 hover:bg-neutral-400 dark:hover:bg-zinc-400"
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={next}
                            disabled={active === certifications.length - 1}
                            className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm"
                            aria-label="Next"
                        >
                            <FiChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;