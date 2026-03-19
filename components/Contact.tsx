"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { FiMail, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { links } from "@/utils/data";
import { useRef } from "react";

const socialLinks = [
  { name: "GitHub", href: links.github, icon: <FiGithub size={20} /> },
  { name: "LinkedIn", href: links.linkedin, icon: <FiLinkedin size={20} /> },
  { name: "X", href: links.twitter, icon: <FaXTwitter size={20} /> },
  { name: "Instagram", href: links.instagram, icon: <FiInstagram size={20} /> },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
    },
  },
};

const Contact = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Parallax effect: moves up as you scroll down
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth parallax + tilt + scale
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]); // tilt forward/back
  const rotateY = useTransform(scrollYProgress, [0, 1], [-5, 5]);  // slight side tilt
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.6, 1, 0.8]);

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-24 lg:py-40 relative [perspective:1200px]"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <motion.div
          style={{ y, scale, rotateX, rotateY, opacity }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-[2.5rem] p-10 sm:p-16 lg:p-20 relative overflow-hidden shadow-2xl"
        >
          {/* Subtle gradient background for the card */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.05),transparent_50%)]" />

          <div className="relative z-10 flex flex-col items-center">
            <motion.div variants={itemVariants} className="inline-flex items-center rounded-full bg-white/10 dark:bg-black/5 px-3 py-1 text-sm text-zinc-300 dark:text-zinc-600 mb-8 border border-white/10 dark:border-black/10 backdrop-blur-md">
              <span className="font-medium">Contact</span>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-zinc-900 mb-6 tracking-tight leading-tight">
              Let&apos;s create something better.
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-zinc-400 dark:text-zinc-500 mb-12 max-w-xl mx-auto leading-relaxed">
              I&apos;m always open to discussing product design work, new ideas, or partnership opportunities. Feel free to reach out to me!
            </motion.p>

            <motion.div variants={itemVariants} className="mb-14 w-full sm:w-auto">
              <a
                href={`mailto:${links.email}`}
                className="group flex w-full sm:inline-flex items-center justify-center rounded-full bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white px-8 py-4 text-base font-medium transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                <FiMail className="mr-3 h-5 w-5" />
                Say Hello
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 items-center justify-center flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full bg-white/5 dark:bg-black/5 text-zinc-400 dark:text-zinc-500 hover:text-white dark:hover:text-zinc-900 hover:bg-white/10 dark:hover:bg-black/10 transition-colors border border-white/5 dark:border-black/5 shadow-sm"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
