"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData, type ProjectTag } from "@/utils/data";
import {
  FiGithub,
  FiExternalLink,
  FiStar,
  FiCode,
  FiArrowRight,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";

// ─── Filter Tags ─────────────────────────────────────────────────────────────
const ALL_TAGS: ProjectTag[] = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "DevOps",
  "Open Source",
];

// ─── Animation Variants ───────────────────────────────────────────────────────
const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: -16,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const isLive = status === "Live";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
        isLive
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          : "bg-amber-500/10 border-amber-500/30 text-amber-400"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isLive ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
        }`}
      />
      {status}
    </span>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
type Project = (typeof projectsData)[0];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative rounded-2xl border border-white/5 bg-zinc-900/60 backdrop-blur-sm overflow-hidden flex flex-col cursor-default"
      style={{
        boxShadow: hovered ? `0 0 40px ${project.glowColor}` : "none",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* Gradient accent strip */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${project.gradient} opacity-80`}
      />

      {/* Large background glow (visible on hover) */}
      <motion.div
        animate={{ opacity: hovered ? 0.07 : 0 }}
        transition={{ duration: 0.35 }}
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} pointer-events-none`}
      />

      <div className="relative z-10 flex flex-col flex-1 p-6 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusBadge status={project.status} />
            {project.featured && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400">
                <FiStar size={9} /> Featured
              </span>
            )}
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{ scale: 1.15, y: -1 }}
              whileTap={{ scale: 0.9 }}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
            >
              <FiGithub size={14} />
            </motion.a>
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live demo"
                whileHover={{ scale: 1.15, y: -1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition-colors"
              >
                <FiExternalLink size={14} />
              </motion.a>
            )}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            <FiCode size={12} /> View Code
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group/cta ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              Live Demo
              <FiArrowRight
                size={12}
                className="transition-transform group-hover/cta:translate-x-0.5"
              />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Featured Hero Card ───────────────────────────────────────────────────────
function FeaturedCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative rounded-3xl border border-white/10 overflow-hidden group"
    >
      {/* Animated gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
      />
      <div className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" />

      {/* Top accent */}
      <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

      <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
        {/* Left: info */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300">
              <HiSparkles size={11} /> Featured Project
            </span>
            <StatusBadge status={project.status} />
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-zinc-400 leading-relaxed text-sm md:text-base max-w-xl">
              {project.longDescription}
            </p>
          </div>

          {/* Tech */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-200"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: CTAs */}
        <div className="flex flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white bg-gradient-to-r ${project.gradient} shadow-lg hover:shadow-xl transition-shadow`}
            >
              <FiExternalLink size={14} /> Live Demo
            </motion.a>
          )}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white border border-white/15 hover:bg-white/5 transition-colors"
          >
            <FiGithub size={14} /> Source Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Filter Pill ──────────────────────────────────────────────────────────────
function FilterPill({
  tag,
  active,
  count,
  onClick,
}: {
  tag: ProjectTag;
  active: boolean;
  count: number;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
        active
          ? "text-white"
          : "text-zinc-400 hover:text-white border border-white/10 hover:border-white/20"
      }`}
    >
      {active && (
        <motion.span
          layoutId="active-filter-pill"
          className="absolute inset-0 rounded-full bg-zinc-800 border border-white/15"
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
        />
      )}
      <span className="relative z-10">{tag}</span>
      <span
        className={`relative z-10 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
          active ? "bg-white/15 text-white" : "bg-white/5 text-zinc-500"
        }`}
      >
        {count}
      </span>
    </motion.button>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
const Projects = () => {
  const [activeTag, setActiveTag] = useState<ProjectTag>("All");

  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? projectsData
        : projectsData.filter((p) => p.tags.includes(activeTag)),
    [activeTag]
  );

  const featuredProject = useMemo(
    () =>
      activeTag === "All"
        ? projectsData.find((p) => p.featured) ?? null
        : null,
    [activeTag]
  );

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projectsData.length };
    ALL_TAGS.slice(1).forEach((tag) => {
      counts[tag] = projectsData.filter((p) => p.tags.includes(tag)).length;
    });
    return counts;
  }, []);

  return (
    <section
      id="projects"
      className="w-full py-16 sm:py-24 relative overflow-hidden"
    >
      {/* Background ambient glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-1/4 w-[50vw] h-64 bg-violet-500/8 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-[50vw] h-64 bg-sky-500/8 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-1.5 text-sm text-zinc-300 border border-zinc-800">
            <FiCode className="text-violet-500" size={14} />
            <span className="font-medium">Projects</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Things I&apos;ve{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">
              Built
            </span>
          </h2>
          <p className="text-zinc-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            A collection of projects ranging from open-source tools to
            production-grade applications. Each one built with care, curiosity,
            and a lot of caffeine.
          </p>
        </motion.div>

        {/* ── Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {ALL_TAGS.map((tag) => (
            <FilterPill
              key={tag}
              tag={tag}
              active={activeTag === tag}
              count={tagCounts[tag] ?? 0}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </motion.div>

        {/* ── Featured Spotlight (only on "All" view) ── */}
        <AnimatePresence mode="wait">
          {featuredProject && (
            <motion.div
              key="featured"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
            >
              <FeaturedCard project={featuredProject} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Card Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence>
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* ── Empty state ── */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-zinc-500"
            >
              No projects found in this category yet.
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <p className="text-zinc-500 text-sm">Want to see more?</p>
          <motion.a
            href="https://github.com/anugrahthomas"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-white/10 text-sm font-semibold text-white hover:border-white/25 hover:bg-zinc-800 transition-all"
          >
            <FiGithub size={15} /> View all on GitHub
            <FiArrowRight
              size={13}
              className="opacity-60"
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
