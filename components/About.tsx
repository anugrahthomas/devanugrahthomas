"use client";

import { motion, Variants } from "framer-motion";
import { DiTerminal } from "react-icons/di";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const About = () => {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <div className="order-1 lg:order-1">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-900 py-1 px-4 text-sm text-zinc-800 dark:text-zinc-300 mb-6 border border-zinc-200 dark:border-zinc-800"
            >
              <DiTerminal className="text-blue-500" size={20} />
              <span className="font-medium">About</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight"
            >
              Bridging the gap between engineering and design
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-6 text-zinc-600 dark:text-zinc-400 leading-snug text-lg"
            >
              <p>
                I am a developer who writes code to build meaningful digital
                products. My focus is on creating responsive, intuitive, and
                accessible experiences that feel just right to the user.
              </p>
              <p>
                With expertise in modern web technologies, I love building
                scalable applications that solve real-world problems. Whether
                weaving complex back-end logic or sculpting pixel-perfect
                front-ends, I strive for excellence in every line of code.
              </p>
              <p>
                When I&apos;m not behind the screen creating software, you can
                find me exploring new ideas or pushing my creative boundaries.
              </p>
            </motion.div>
          </div>

          {/* Visual/Image Element */}
          <motion.div
            variants={itemVariants}
            className="order-2 lg:order-2 relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-sm group"
          >
            {/* Elegant gradient blobs */}
            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-3xl transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-3xl transition-transform duration-700 group-hover:scale-110" />

            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8">
              <div className="w-full max-w-sm lg:max-w-md bg-zinc-900/95 rounded-xl overflow-hidden shadow-2xl border border-zinc-700/50 backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.02]">
                {/* Terminal Header */}
                <div className="flex items-center px-4 py-3 bg-zinc-800/80 border-b border-zinc-700/50">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-[0_0_5px_rgba(239,68,68,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-[0_0_5px_rgba(234,179,8,0.5)]"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
                  </div>
                  <div className="mx-auto text-xs text-zinc-400 font-mono tracking-wider">
                    about.ts
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-5 sm:p-6 text-sm sm:text-base font-mono leading-relaxed overflow-x-auto text-left">
                  <div className="text-zinc-300">
                    <span className="text-pink-400">const</span>{" "}
                    <span className="text-blue-400">developer</span> = {"{"}
                  </div>
                  <div className="pl-4 sm:pl-6 text-zinc-300">
                    name:{" "}
                    <span className="text-yellow-300">
                      &quot;Anugrah Thomas&quot;
                    </span>
                    ,
                  </div>
                  <div className="pl-4 sm:pl-6 text-zinc-300">
                    role:{" "}
                    <span className="text-emerald-400">
                      &quot;Full Stack Developer&quot;
                    </span>
                    ,
                  </div>
                  <div className="pl-4 sm:pl-6 text-zinc-300">
                    skills: [
                    <span className="text-yellow-300">&quot;React&quot;</span>,{" "}
                    <span className="text-yellow-300">&quot;Next.js&quot;</span>
                    ,{" "}
                    <span className="text-yellow-300">
                      &quot;TypeScript&quot;
                    </span>
                    , <span className="text-red-400">&quot;Node&quot;</span>,{" "}
                    <span className="text-red-400">&quot;MongoDB&quot;</span>],
                  </div>
                  <div className="pl-4 sm:pl-6 text-zinc-300">
                    passion:{" "}
                    <span className="text-emerald-400">
                      &quot;Crafting beautiful UI/UX&quot;
                    </span>
                    ,
                  </div>
                  <div className="text-zinc-300">{"};"}</div>
                  <div className="mt-4 text-zinc-300">
                    <span className="text-pink-400">export default</span>{" "}
                    <span className="text-blue-400">developer</span>;
                  </div>
                  <div className="mt-2 inline-block w-2 bg-emerald-400 animate-[pulse_1s_ease-in-out_infinite]">
                    &nbsp;
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
