"use client";

import { motion } from "framer-motion";
import { CgScrollV } from "react-icons/cg";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background flairs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-sky-500/20 dark:bg-sky-500/10 rounded-full blur-[120px] z-10"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -left-40 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[120px] z-10"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1 text-sm text-zinc-600 dark:text-zinc-400 mb-8 shadow-sm hover:shadow transition-shadow"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6"
          >
            Crafting Digital <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-500 to-zinc-900 dark:from-zinc-400 dark:to-white">
              Experiences That Matter
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Hello, I&apos;m a passionate developer and designer building beautiful, functional, and user-centric applications tailored to solve meaningful problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="group inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-8 py-3.5 text-sm font-medium transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              Let&apos;s Talk
              <FiArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="/CV.pdf"
              download={true}
              className="group inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white px-8 py-3.5 text-sm font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              Download CV
            </a>
          </motion.div>

          <div className="hidden lg:block lg:mt-20">
            <motion.div initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}>
              <CgScrollV size={20} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;