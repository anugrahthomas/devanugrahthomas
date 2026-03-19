"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi";
import { PiGraduationCap } from "react-icons/pi";
import { educationData } from "@/utils/data";


/** Individual card — each card tracks its own scroll position to animate in */
function EducationCard({ edu, index }: { edu: typeof educationData[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 90%", "start 40%"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [index % 2 === 0 ? -50 : 50, 0]
    );

    return (
        <div
            ref={ref}
            className={`relative flex items-start gap-6 sm:gap-0 ${
                index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            } pl-16 sm:pl-0`}
        >
            {/* Content Card */}
            <div className={`w-full sm:w-[45%] ${index % 2 === 0 ? "sm:pr-10" : "sm:pl-10"}`}>
                <motion.div
                    style={{ opacity, x }}
                    whileHover={{ y: -4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`rounded-2xl border ${edu.borderColor} bg-white dark:bg-zinc-900 shadow-md p-5 flex flex-col gap-3`}
                >
                    {/* Card Header */}
                    <div className={`rounded-xl bg-gradient-to-r ${edu.color} p-[1px]`}>
                        <div className="rounded-[11px] bg-white dark:bg-zinc-900 p-4">
                            <div className="flex items-start justify-between gap-2">
                                <div>
                                    <p className={`text-xs font-bold uppercase tracking-widest ${edu.iconColor} mb-1`}>
                                        {edu.field}
                                    </p>
                                    <h3 className="text-neutral-900 dark:text-white font-bold text-base leading-tight">
                                        {edu.degree}
                                    </h3>
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-gradient-to-r ${edu.color} text-white shrink-0`}>
                                    {edu.grade}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="flex items-center gap-1"><FiBookOpen size={11} /> {edu.institution}</span>
                        <span className="flex items-center gap-1"><FiMapPin size={11} /> {edu.location}</span>
                        <span className="flex items-center gap-1"><FiCalendar size={11} /> {edu.duration}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {edu.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                        {edu.highlights.map((tag) => (
                            <span
                                key={tag}
                                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Centre dot — desktop */}
            <motion.div
                style={{ opacity }}
                className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 z-10 items-center justify-center"
            >
                <span className={`w-4 h-4 rounded-full ${edu.dotColor} ring-4 ring-white dark:ring-zinc-950 block`} />
            </motion.div>

            {/* Mobile dot */}
            <motion.div
                style={{ opacity }}
                className="flex sm:hidden absolute left-6 -translate-x-1/2 top-6 z-10"
            >
                <span className={`w-4 h-4 rounded-full ${edu.dotColor} ring-4 ring-white dark:ring-zinc-950 block`} />
            </motion.div>

            {/* Empty spacer for opposite side on desktop */}
            <div className="hidden sm:block sm:w-[45%]" />
        </div>
    );
}

const Education = () => {
    const sectionRef = useRef<HTMLElement>(null);

    // Scroll progress across the whole section — used to draw the spine
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 80%", "end 60%"],
    });

    const spineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section
            id="education"
            ref={sectionRef}
            className="w-full py-16 sm:py-24 relative overflow-hidden flex flex-col items-center justify-center"
        >
            {/* Background flairs */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.2, 0.12] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-20 right-0 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-emerald-500/20 rounded-full blur-[130px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.18, 0.1] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -top-20 left-0 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-sky-500/20 rounded-full blur-[130px]"
                />
            </div>

            <div className="container mx-auto px-4 max-w-3xl flex flex-col items-center">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 py-1 text-sm text-zinc-800 dark:text-zinc-300 mb-6 border border-zinc-200 dark:border-zinc-800">
                        <PiGraduationCap className="text-emerald-500" size={18} />
                        <span className="font-medium">Education</span>
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto text-lg">
                        My academic journey and the foundations that shaped my technical expertise.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative w-full">
                    {/* Scroll-driven spine line */}
                    <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-neutral-200 dark:bg-zinc-800 -translate-x-1/2" />
                    <motion.div
                        style={{ scaleY: spineScaleY, originY: 0 }}
                        className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-sky-500 via-violet-500 to-emerald-500 -translate-x-1/2"
                    />

                    <div className="flex flex-col gap-12">
                        {educationData.map((edu, index) => (
                            <EducationCard key={edu.id} edu={edu} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;