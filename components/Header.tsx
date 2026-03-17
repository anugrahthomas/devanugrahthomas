"use client";
import { links, logo, navLinks } from "@/utils/data";
import Button from "./Button";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { motion } from "framer-motion";

const Header = () => {
  const [mobile, setMobile] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [active, setActive] = useState<string>();
  // handle mobile view
  useEffect(() => {
    const resizer = () => {
      if (window.innerWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    resizer();
    window.addEventListener("resize", resizer);
    return () => {
      window.removeEventListener("resize", resizer);
    }
  }, []);

  // handle scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // SideBar
  if (mobile) return <SideBar />;

  return (
    <div className="hidden md:block fixed top-10 w-full z-50">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }} className="flex justify-around items-center">
        {/* LOGO  */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0, pointerEvents: scrolled ? "none" : "auto" }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="px-4 py-2 rounded-full shadow-[0_0_10px_#fff0f0] border border-white/30 cursor-pointer duration-150">
            {logo}
          </h1>
        </motion.div>

        {/* Navlinks */}
        <div className="px-2 h-15 w-lg md:w-2xl max-w-6xl bg-transparent backdrop-blur-md lg:border-b border-white/20 rounded-full flex justify-around items-center">
          {navLinks.map((el, index) => (
            <a
              href={el.link}
              key={index}
              onClick={() => setActive(el.link)}
              className={`px-4 font-normal cursor-pointer rounded-full border hover:shadow-[0_2px_2px_#fff0f0] active:shadow-none active:translate-y-1 transition-all duration-150 ${active === el.link ? "border-white/20 shadow-[0_0_4px_#fff0f0]" : "border-transparent"}`}
            >
              {el.title}
            </a>
          ))}
        </div>

        {/* buttons */}
        <motion.div
          className="space-x-2"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0, pointerEvents: scrolled ? "none" : "auto" }}
          transition={{ duration: 0.3 }}
        >
          <Button className="bg-emerald-800" link={links.github}>Github</Button>
          <Button className="bg-blue-800" link={links.linkedin}>Linkedln</Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;
