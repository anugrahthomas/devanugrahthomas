"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/utils/data";
import { FaTools } from "react-icons/fa";
/**
 * Mathematically perfect Honeycomb Chunking
 * Flexbox `justify-center` vertically un-staggers items if the parity (Even/Odd count)
 * of adjacent rows does not alternate. This function groups items into `pattern` rows
 * and injects a transparent placeholder into the last row if its parity doesn't match the
 * required stagger, permanently fixing the "overlapping triangle point" CSS bug.
 */
const getHoneycombRows = (data: typeof skillsData, pattern: number[]) => {
  const rows: Array<Array<(typeof skillsData[0] | { isPlaceholder: true })>> = [];
  let remaining = [...data];
  let pIndex = 0;

  while (remaining.length > 0) {
    const targetSize = pattern[pIndex % pattern.length];

    if (remaining.length >= targetSize) {
      rows.push(remaining.splice(0, targetSize));
    } else {
      // Last row. Check if we need to inject a placeholder to enforce visual stagger.
      const lastRow: Array<(typeof skillsData[0] | { isPlaceholder: true })> = [...remaining];
      const needsEven = targetSize % 2 === 0;
      const isCurrentlyEven = lastRow.length % 2 === 0;

      if (needsEven !== isCurrentlyEven) {
        lastRow.push({ isPlaceholder: true });
      }
      rows.push(lastRow);
      break;
    }
    pIndex++;
  }
  return rows;
};

// Honeycomb shape clip path
const hexagonClipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const Skills = () => {
  // Hex bounding box sizes per breakpoint (must match Tailwind classes below):
  // mobile:  w=70  h=81   → 25% overlap = 20.25 ≈ 20px
  // sm:      w=88  h=102  → 25% overlap = 25.5  ≈ 26px
  // md/lg:   w=104 h=120  → 25% overlap = 30px
  //
  // Three layouts let the honeycomb widen on larger screens.
  const responsiveLayouts = [
    { id: 'mobile',  className: 'flex sm:hidden',       rows: getHoneycombRows(skillsData, [5, 6]) },
    { id: 'tablet',  className: 'hidden sm:flex lg:hidden', rows: getHoneycombRows(skillsData, [6, 7]) },
    { id: 'desktop', className: 'hidden lg:flex',        rows: getHoneycombRows(skillsData, [7, 6]) },
  ];

  return (
    <section id="skills" className="w-full py-16 sm:py-24 relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 max-w-7xl mx-auto -z-10">
        <div className="absolute right-0 top-0 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-100 dark:bg-zinc-900 px-4 py-1 text-sm text-zinc-800 dark:text-zinc-300 mb-6 border border-zinc-200 dark:border-zinc-800">
            <FaTools className="text-orange-500" />
            <span className="font-medium">Skills</span>
          </div>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto text-lg">
            Technologies I work with to build modern, high-performance applications.
          </p>
        </motion.div>

        <div className="w-full flex flex-col items-center justify-center pt-4">
          {responsiveLayouts.map((layout) => (
            <div key={layout.id} className={`${layout.className} flex-col items-center justify-center w-full`}>
              {layout.rows.map((row, rowIndex) => (
                <div
                  key={`${layout.id}-${rowIndex}`}
                  // Apply negative top margin from the 2nd row onwards to interlock hexagons.
                  // Values match 25 % of the bounding-box height at each breakpoint.
                  style={rowIndex > 0 ? undefined : undefined}
                  className={`flex flex-row justify-center flex-nowrap w-full${rowIndex > 0 ? ' -mt-[20px] sm:-mt-[26px] md:-mt-[30px]' : ''}`}
                >
                  {row.map((skill, colIndex) => {
                    if ('isPlaceholder' in skill) {
                      return (
                        <div
                          key={`placeholder-${layout.id}-${rowIndex}-${colIndex}`}
                          className="relative w-[70px] h-[81px] sm:w-[88px] sm:h-[102px] md:w-[104px] md:h-[120px] invisible shrink-0"
                        />
                      );
                    }

                    const absoluteIndex = layout.rows.slice(0, rowIndex).reduce((acc, r) => acc + r.length, 0) + colIndex;
                    const { name, Icon, color } = skill;
                    const iconColor = name === 'Next.js' ? 'currentColor' : color;

                    return (
                      <div
                        key={`${layout.id}-${name}-${colIndex}`}
                        className="relative w-[70px] h-[81px] sm:w-[88px] sm:h-[102px] md:w-[104px] md:h-[120px] flex items-center justify-center shrink-0"
                      >
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 0.92 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: absoluteIndex * 0.05,
                            type: 'spring',
                            stiffness: 120,
                          }}
                          whileHover={{ scale: 1.05, zIndex: 10 }}
                          style={{ clipPath: hexagonClipPath }}
                          className="group absolute inset-0 cursor-pointer bg-neutral-200 dark:bg-neutral-800 flex flex-col items-center justify-center transition-all duration-300"
                        >
                          <div
                            className="absolute inset-[2px] bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center z-10 transition-colors duration-300"
                            style={{ clipPath: hexagonClipPath }}
                          >
                            <div className="relative z-20 transition-all duration-500 transform group-hover:-translate-y-1 sm:group-hover:-translate-y-2 mt-2 sm:mt-0">
                              <div className="text-neutral-400 dark:text-neutral-500 group-hover:hidden text-[1.4rem] sm:text-[2rem] md:text-[2.6rem]">
                                <Icon />
                              </div>
                              <div
                                className="hidden group-hover:block text-[1.4rem] sm:text-[2rem] md:text-[2.6rem]"
                                style={{ color: iconColor }}
                              >
                                <Icon />
                              </div>
                            </div>
                            <span className="absolute bottom-2 sm:bottom-3 md:bottom-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-[8px] sm:text-[9px] md:text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 pointer-events-none text-center px-1 max-w-full leading-none">
                              {name}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
