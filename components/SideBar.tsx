"use client";

import { links, logo, navLinks } from "@/utils/data";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineCancel } from "react-icons/md";
import Button from "./Button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const sidebarVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const linkContainerVariants = {
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const linkItemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 250, damping: 22 },
  },
};

const SideBar = () => {
  const [show, setShow] = useState(false);

  return (
    <aside className="p-4 w-full fixed top-0 flex justify-between items-center z-50 backdrop-blur-md border-b border-white/20">
      {/* Logo */}
      <div>
        <h2 className="font-bold">{logo}</h2>
      </div>

      {/* Hamburger */}
      <AnimatePresence mode="wait">
        {!show && (
          <motion.button
            key="hamburger"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShow(true)}
            className="cursor-pointer"
            aria-label="Open menu"
          >
            <GiHamburgerMenu size={22} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {show && (
          <>
            {/* Backdrop */}
            <motion.button
              key="backdrop"
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setShow(false)}
              className="fixed top-0 left-0 w-screen h-screen bg-black/40 backdrop-blur-sm z-40"
              aria-label="Close menu"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-screen w-56 bg-zinc-950/95 border-l border-white/10 shadow-2xl z-50 flex flex-col"
            >
              {/* Close button */}
              <div className="flex justify-end p-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShow(false)}
                  className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white hover:bg-zinc-700 transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <MdOutlineCancel size={18} />
                </motion.button>
              </div>

              {/* Nav Links */}
              <motion.nav
                variants={linkContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col mt-4 px-4 gap-1"
              >
                {navLinks.map((el, index) => (
                  <motion.a
                    key={index}
                    href={el.link}
                    variants={linkItemVariants}
                    onClick={() => setShow(false)}
                    whileHover={{ x: 4 }}
                    className="py-3 px-4 rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5 cursor-pointer transition-colors text-white/80 hover:text-white font-medium"
                  >
                    {el.title}
                  </motion.a>
                ))}
              </motion.nav>

              {/* Social buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.3 }}
                className="mt-auto px-4 pb-8 flex gap-2"
              >
                <Button className="bg-emerald-800" link={links.github}>
                  Github
                </Button>
                <Button className="bg-blue-800" link={links.linkedin}>
                  Linkedln
                </Button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default SideBar;
