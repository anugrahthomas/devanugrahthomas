"use client";

import { links, logo, navLinks } from "@/utils/data";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

// Konami sequence keys with display labels
const KONAMI_KEYS = [
  { label: "↑", title: "Up" },
  { label: "↑", title: "Up" },
  { label: "↓", title: "Down" },
  { label: "↓", title: "Down" },
  { label: "←", title: "Left" },
  { label: "→", title: "Right" },
  { label: "←", title: "Left" },
  { label: "→", title: "Right" },
  { label: "B", title: "B" },
  { label: "A", title: "A" },
];

const socialLinks = [
  { icon: FaGithub, href: links.github, label: "GitHub", color: "hover:text-white" },
  { icon: FaLinkedin, href: links.linkedin, label: "LinkedIn", color: "hover:text-blue-400" },
  { icon: FaXTwitter, href: links.twitter, label: "Twitter / X", color: "hover:text-sky-400" },
  { icon: FaInstagram, href: links.instagram, label: "Instagram", color: "hover:text-pink-400" },
  { icon: MdEmail, href: `mailto:${links.email}`, label: "Email", color: "hover:text-emerald-400" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
};

const keyVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};

function KonamiKey({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      variants={keyVariants}
      whileHover={{ y: -3, scale: 1.1 }}
      whileTap={{ y: 2, scale: 0.95 }}
      className="relative group"
    >
      <span
        className="
          inline-flex items-center justify-center
          w-9 h-9 sm:w-10 sm:h-10
          rounded-lg text-xs sm:text-sm font-bold
          bg-zinc-800 text-zinc-100
          border border-zinc-600
          shadow-[0_4px_0_#27272a,0_6px_8px_rgba(0,0,0,0.4)]
          active:shadow-[0_1px_0_#27272a]
          active:translate-y-1
          transition-all duration-100 cursor-default select-none
        "
      >
        {label}
      </span>
      {/* Separator + between B and A */}
      {index === 7 && (
        <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-zinc-500 text-xs font-mono leading-none">
          +
        </span>
      )}
    </motion.div>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-white/10 bg-zinc-950 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-48 bg-violet-500/10 blur-[80px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">
        {/* Top row: logo + nav */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-3 max-w-xs">
            <span className="text-xl font-bold text-white">{logo}</span>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Crafting digital experiences that are fast, accessible, and built to last. Open to opportunities & collaborations.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-4 mt-2">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-zinc-500 transition-colors duration-150 ${color}`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Navigation</h3>
            {navLinks.map((el, i) => (
              <motion.a
                key={i}
                href={el.link}
                whileHover={{ x: 4 }}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-150 w-fit"
              >
                {el.title}
              </motion.a>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">Get in Touch</h3>
            <a
              href={`mailto:${links.email}`}
              className="text-sm text-zinc-400 hover:text-emerald-400 transition-colors duration-150 w-fit"
            >
              {links.email}
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-150 w-fit"
            >
              github.com/anugrahthomas
            </a>
          </div>
        </div>

        {/* Konami Code Easter Egg Section */}
        <div className="rounded-2xl bg-zinc-900/60 border border-white/5 px-6 py-6 mb-10">
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-semibold">
              🎮 Easter Egg — Try the Konami Code
            </p>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="flex flex-wrap justify-center items-center gap-2"
            >
              {KONAMI_KEYS.map((key, i) => (
                <KonamiKey key={i} label={key.label} index={i} />
              ))}
            </motion.div>
            <p className="text-xs text-zinc-600 text-center max-w-xs">
              Type this sequence on your keyboard to unlock a hidden surprise ✨
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
          <p className="text-xs text-zinc-600">
            © {year} {logo}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700">
            Built with Next.js · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;