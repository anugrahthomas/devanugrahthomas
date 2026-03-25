"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ScrollUp from "@/components/ScrollUp";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Education from "@/components/Education";
import EasterEggPopup from "@/components/EasterEggPopup";
import Popup from "@/components/Popup";
import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import Journey from "@/components/Journey";
import { useEffect, useState } from "react";

const Home = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      <EasterEggPopup />
      <ScrollUp />
      <Header />

      <main className="flex-grow flex flex-col gap-12 sm:gap-16 lg:gap-16 lg:mt-24 mt-16 relative z-0">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Certifications />
        <Journey />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
