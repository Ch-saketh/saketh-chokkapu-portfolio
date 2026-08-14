import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
import { staggerContainer, fadeUp, EASE_PREMIUM } from "../../utils/animations";

export interface ExperienceItem {
  company: string;
  role: string;
  type: string;
  period: string;
  location: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Handshake AI",
    role: "AI Technical Trainer & Code Evaluator",
    type: "Contract",
    period: "2025 – Present",
    location: "Remote",
    highlights: [
      "Evaluated AI-generated code snippets and complex system designs across Python, Java, and SQL for logical correctness, performance, and security edge cases.",
      "Authored complex technical prompts, evaluation benchmarks, and reasoning test suites to analyze and improve LLM output reliability.",
    ],
  },
  {
    company: "NexLevr",
    role: "Software Engineering Intern",
    type: "Internship",
    period: "2024 – Present",
    location: "Remote",
    highlights: [
      "Maintained backend stability and integrated REST APIs across core platform services to support data workflows and user growth.",
    ],
  },
];

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const bgFill = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: {
      duration: 0.35,
      ease: EASE_PREMIUM,
    },
  },
};

const LightExperience: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="experience" className="scroll-mt-14 py-8 lg:py-16 bg-[#F6F5F2] text-[#222222]">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* ===== HEADER ===== */}
        <motion.div variants={fadeUp} className="mb-10 lg:mb-15">
          <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-extrabold leading-[1] text-[#222222] font-funnel">
            Work &<br />
            <span className="font-light text-neutral-500">Experience</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-neutral-600 leading-relaxed font-sans">
            Commercial engineering experience, AI technical training, and production software contributions.
          </p>
        </motion.div>

        {/* ===== EXPERIENCE LIST ===== */}
        <motion.div
          className="divide-y divide-neutral-300 border-b border-t border-neutral-300"
          variants={{ hidden: {}, show: {} }}
        >
          {experiences.map((exp, idx) => {
            const isHovered = hovered === idx;
            const isExpanded = expanded === idx;

            return (
              <motion.div
                key={exp.company}
                variants={fadeUp}
                onMouseEnter={() => isDesktop && setHovered(idx)}
                onMouseLeave={() => isDesktop && setHovered(null)}
                onClick={() => setExpanded(isExpanded ? null : idx)}
                className="relative cursor-pointer transition-colors"
              >
                {/* Hover Background - Dark Fill */}
                <motion.div
                  variants={bgFill}
                  initial="hidden"
                  animate={isHovered ? "show" : "hidden"}
                  className="absolute inset-0 bg-[#222222] origin-left z-0"
                />

                {/* ================= ROW ================= */}
                <div
                  className={`
                    relative z-10
                    py-6 lg:py-8
                    grid grid-cols-1 lg:grid-cols-12
                    items-center gap-4 lg:gap-8
                    transition-colors duration-200
                    ${isHovered ? "text-[#F6F5F2]" : "text-[#222222]"}
                  `}
                >
                  {/* Index */}
                  <span className="hidden lg:block font-mono text-sm opacity-60">
                    0{idx + 1}
                  </span>

                  <div className="flex gap-4 items-end justify-between lg:col-span-5">
                    <div>
                      <h3 className="font-funnel text-[clamp(2rem,3vw,3rem)] font-bold leading-tight">
                        {exp.company}
                      </h3>
                    </div>

                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                      className="lg:hidden flex items-center justify-center"
                    >
                      <ChevronDown
                        size={18}
                        className={isHovered ? "text-[#F6F5F2]" : "text-neutral-500"}
                      />
                    </motion.span>
                  </div>

                  {/* Role & Period Pills */}
                  <div className="hidden lg:flex lg:col-span-4 items-center gap-2">
                    <span
                      className={`
                        rounded-full px-3 py-[5px]
                        text-[11px] font-medium tracking-wide
                        border
                        ${
                          isHovered
                            ? "border-[#F6F5F2]/40 text-[#F6F5F2]"
                            : "border-neutral-400 text-neutral-600"
                        }
                      `}
                    >
                      {exp.role}
                    </span>

                    <span
                      className={`
                        rounded-full px-3 py-[5px]
                        text-[11px] font-medium tracking-wide
                        border
                        ${
                          isHovered
                            ? "border-[#F6F5F2]/40 text-[#F6F5F2]"
                            : "border-neutral-400 text-neutral-600"
                        }
                      `}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Action Label */}
                  <div className="flex items-center justify-between lg:justify-end lg:col-span-2">
                    <span
                      className={`
                        rounded-full px-4 py-[7px]
                        text-[11px] font-medium tracking-wide
                        border transition-colors
                        flex items-center gap-2
                        ${
                          isHovered
                            ? "border-[#F6F5F2] bg-[#F6F5F2] text-[#222222] font-bold"
                            : "border-neutral-300 text-neutral-700 hover:text-black"
                        }
                      `}
                    >
                      {isExpanded ? "Hide Details" : "View Details"}
                    </span>

                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                      className="hidden lg:flex items-center justify-center ml-3"
                    >
                      <ChevronDown
                        size={18}
                        className={isHovered ? "text-[#F6F5F2]" : "text-neutral-500"}
                      />
                    </motion.span>
                  </div>
                </div>

                {/* ================= EXPANDED CONTENT ================= */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE_PREMIUM }}
                      className="relative z-10 overflow-hidden"
                    >
                      <div className="max-w-6xl px-4 lg:px-6 py-6 border-t border-neutral-300/60">
                        {/* Expanded Role Header */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <h4 className={`font-funnel text-xl font-bold ${isHovered ? "text-[#F6F5F2]" : "text-[#222222]"}`}>
                            {exp.role}
                          </h4>
                          <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${isHovered ? "border-[#F6F5F2]/40 text-[#F6F5F2] bg-[#F6F5F2]/10" : "border-neutral-400 text-neutral-700 bg-neutral-200/80"}`}>
                            {exp.type}
                          </span>
                          <div className={`flex items-center gap-1.5 text-xs font-mono ${isHovered ? "text-[#F6F5F2]/80 font-medium" : "text-neutral-600"}`}>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.period}</span>
                          </div>
                          <div className={`flex items-center gap-1.5 text-xs font-mono ${isHovered ? "text-[#F6F5F2]/80 font-medium" : "text-neutral-600"}`}>
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        {/* Bullet Highlights */}
                        <ul className="flex flex-col gap-3 text-sm sm:text-base leading-relaxed font-sans">
                          {exp.highlights.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-3">
                              <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${isHovered ? "bg-[#F6F5F2]" : "bg-[#222222]"}`} />
                              <span className={isHovered ? "text-[#F6F5F2]/90 font-medium" : "text-neutral-700"}>
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LightExperience;
