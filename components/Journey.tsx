"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiBriefcase, FiCalendar, FiMapPin, FiZap } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { journeyData, type JourneyType } from "@/utils/data";

// ─── Type badge colours ───────────────────────────────────────────────────────
const TYPE_STYLES: Record<JourneyType, string> = {
  "Full-time":  "bg-violet-500/10 border-violet-500/30 text-violet-400",
  "Internship": "bg-sky-500/10    border-sky-500/30    text-sky-400",
  "Freelance":  "bg-amber-500/10  border-amber-500/30  text-amber-400",
  "Contract":   "bg-rose-500/10   border-rose-500/30   text-rose-400",
  "Open Source":"bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
};

// ─── Individual card ──────────────────────────────────────────────────────────
type Journey = (typeof journeyData)[0];

function JourneyCard({ item, index }: { item: Journey; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 40%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x       = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -60 : 60, 0]);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 sm:gap-0 ${
        isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
      } pl-16 sm:pl-0`}
    >
      {/* ── Content card ── */}
      <div className={`w-full sm:w-[45%] ${isLeft ? "sm:pr-10" : "sm:pl-10"}`}>
        <motion.div
          style={{ opacity, x }}
          whileHover={{ y: -5, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className={`relative rounded-2xl border ${item.borderColor} bg-zinc-900/80 backdrop-blur-sm shadow-xl overflow-hidden flex flex-col gap-4 p-5`}
        >
          {/* Gradient top strip */}
          <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.color}`} />

          {/* Faint bg glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-[0.04] pointer-events-none`} />

          {/* Card header */}
          <div className="relative z-10 flex items-start justify-between gap-3 flex-wrap">
            <div className="flex flex-col gap-1">
              {/* Role */}
              <h3 className="text-white font-bold text-base leading-tight">
                {item.role}
              </h3>
              {/* Company */}
              <p className={`text-sm font-semibold ${item.iconColor}`}>
                {item.company}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {item.current && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Current
                </span>
              )}
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${TYPE_STYLES[item.type]}`}
              >
                {item.type}
              </span>
            </div>
          </div>

          {/* Meta row */}
          <div className="relative z-10 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <FiCalendar size={11} /> {item.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <FiMapPin size={11} /> {item.location}
            </span>
          </div>

          {/* Description */}
          <p className="relative z-10 text-sm text-zinc-400 leading-relaxed">
            {item.description}
          </p>

          {/* Tech highlights */}
          <div className="relative z-10 flex flex-wrap gap-2 pt-1">
            {item.highlights.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Timeline dot — desktop ── */}
      <motion.div
        style={{ opacity }}
        className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-6 z-10 items-center justify-center"
      >
        <span
          className={`flex items-center justify-center w-5 h-5 rounded-full ${item.dotColor} ring-4 ring-zinc-950`}
        >
          <FiZap size={9} className="text-white" />
        </span>
      </motion.div>

      {/* ── Timeline dot — mobile ── */}
      <motion.div
        style={{ opacity }}
        className="flex sm:hidden absolute left-6 -translate-x-1/2 top-6 z-10"
      >
        <span
          className={`flex items-center justify-center w-5 h-5 rounded-full ${item.dotColor} ring-4 ring-zinc-950`}
        >
          <FiZap size={9} className="text-white" />
        </span>
      </motion.div>

      {/* Spacer for opposite side on desktop */}
      <div className="hidden sm:block sm:w-[45%]" />
    </div>
  );
}

// ─── Main Journey section ─────────────────────────────────────────────────────
const Journey = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });

  const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="w-full py-16 sm:py-24 relative overflow-hidden flex flex-col items-center"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 right-0 w-[55vw] h-[55vw] max-w-[550px] max-h-[550px] bg-violet-500/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-20 left-0 w-[55vw] h-[55vw] max-w-[550px] max-h-[550px] bg-sky-500/20 rounded-full blur-[140px]"
        />
      </div>

      <div className="container mx-auto px-4 max-w-3xl flex flex-col items-center w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-sm text-zinc-300 border border-zinc-800">
            <FiBriefcase className="text-red-500" size={14} />
            <span className="font-medium">Experience</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">
              Journey
            </span>
          </h2>

          <p className="text-zinc-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            The roles, projects, and experiences that have shaped me into the
            engineer I am today.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative w-full">
          {/* Background spine */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />

          {/* Scroll-drawn coloured spine */}
          <motion.div
            style={{ scaleY: spineScaleY, originY: 0 }}
            className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500 via-sky-500 to-emerald-500 -translate-x-1/2"
          />

          {/* Start cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="absolute left-6 sm:left-1/2 -translate-x-1/2 -top-4 flex flex-col items-center gap-1 z-10"
          >
            <span className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center">
              <HiSparkles className="text-violet-400" size={14} />
            </span>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-14 pt-8">
            {journeyData.map((item, index) => (
              <JourneyCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* End cap */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="absolute left-6 sm:left-1/2 -translate-x-1/2 -bottom-4 z-10"
          >
            <span className="w-3 h-3 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 ring-4 ring-zinc-950 block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
