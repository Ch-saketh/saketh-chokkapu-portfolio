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

const Experience: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="experience" className="scroll-mt-14 py-8 lg:py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* ===== HEADER ===== */}
        <motion.div variants={fadeUp} className="mb-10 lg:mb-15">
          <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-extrabold leading-[1] text-white font-funnel">
            Work &<br />
            <span className="font-light text-[#00FF66]">Experience</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-neutral-400 leading-relaxed font-sans">
            Commercial engineering experience, AI technical training, and production software contributions.
          </p>
        </motion.div>

        {/* ===== EXPERIENCE LIST ===== */}
        <motion.div
          className="divide-y divide-[#1E293B] border-b border-t border-[#1E293B]"
          variants={{ hidden: {}, show: {} }}
        >
          {experiences.map((exp, idx) => {
            const isHovered = hovered === idx;
            const isExpanded = expanded === idx;

            return (
              <motion.div
                key={exp.company}
                variants={fadeUp}
                className="relative"
                onMouseEnter={() => isDesktop && setHovered(idx)}
                onMouseLeave={() => isDesktop && setHovered(null)}
              >
                {/* Hover Background - Terminal Green Fill */}
                <motion.div
                  variants={bgFill}
                  initial="hidden"
                  animate={isHovered ? "show" : "hidden"}
                  className="lg:absolute inset-0 origin-left bg-[#00FF66]"
                />

                {/* ================= ROW ================= */}
                <div
                  onClick={() => setExpanded(isExpanded ? null : idx)}
                  className={`
                    relative z-10
                    flex flex-col sm:flex-row sm:items-center lg:grid lg:grid-cols-[70px_1.4fr_1.6fr_auto_24px]
                    gap-2 sm:gap-6
                    px-2 py-4 md:px-4 md:py-6
                    lg:px-6 lg:py-8
                    cursor-pointer
                    transition-colors duration-300
                    ${isHovered ? "text-black" : "text-white"}
                  `}
                >
                  {/* Index */}
                  <span
                    className={`font-mono text-sm ${
                      isHovered ? "text-black/80 font-bold" : "text-neutral-400"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="flex gap-4 items-end justify-between">
                    {/* Company Name ONLY */}
                    <div>
                      <h3 className={`font-funnel text-[clamp(2rem,3vw,3rem)] font-bold leading-tight ${isHovered ? "text-black" : "text-white"}`}>
                        {exp.company}
                      </h3>
                    </div>

                    {/* Chevron for smaller screens */}
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                      className="sm:hidden flex items-center justify-center"
                    >
                      <ChevronDown
                        size={18}
                        className={isHovered ? "text-black" : "text-neutral-400"}
                      />
                    </motion.span>
                  </div>

                  {/* Role & Period Pills (Main Row) */}
                  <div className="hidden lg:flex flex-wrap items-center gap-2">
                    <span
                      className={`
                        rounded-full px-3 py-[5px]
                        text-[11px] font-medium tracking-wide
                        border
                        ${
                          isHovered
                            ? "border-black/30 text-black font-semibold bg-black/10"
                            : "border-[#1E293B] text-neutral-300 bg-[#131924]"
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
                            ? "border-black/30 text-black font-semibold bg-black/10"
                            : "border-[#1E293B] text-neutral-400 bg-[#131924]"
                        }
                      `}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* View Details Label */}
                  <span
                    className={`
                      rounded-full px-4 py-[7px]
                      text-[11px] font-medium tracking-wide
                      border transition-colors
                      flex items-center gap-2 max-w-max sm:ml-auto
                      ${
                        isHovered
                          ? "border-black bg-black text-[#00FF66] font-bold"
                          : "border-[#1E293B] text-neutral-300 hover:text-[#00FF66]"
                      }
                    `}
                  >
                    {isExpanded ? "Hide Details" : "View Details"}
                  </span>

                  {/* Chevron for larger screens */}
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                    className="hidden sm:flex items-center justify-center"
                  >
                    <ChevronDown
                      size={18}
                      className={isHovered ? "text-black" : "text-neutral-400"}
                    />
                  </motion.span>
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
                      <div className="max-w-6xl px-4 lg:px-6 py-6 border-t border-[#1E293B]/40">
                        {/* Expanded Role Header */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <h4 className={`font-funnel text-xl font-bold ${isHovered ? "text-black" : "text-white"}`}>
                            {exp.role}
                          </h4>
                          <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${isHovered ? "border-black/30 text-black bg-black/10" : "border-[#00FF66]/30 text-[#00FF66] bg-[#00FF66]/10"}`}>
                            {exp.type}
                          </span>
                          <div className={`flex items-center gap-1.5 text-xs font-mono ${isHovered ? "text-black/80 font-medium" : "text-neutral-400"}`}>
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{exp.period}</span>
                          </div>
                          <div className={`flex items-center gap-1.5 text-xs font-mono ${isHovered ? "text-black/80 font-medium" : "text-neutral-400"}`}>
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{exp.location}</span>
                          </div>
                        </div>

                        {/* Bullet Highlights */}
                        <ul className="flex flex-col gap-3 text-sm sm:text-base leading-relaxed font-sans">
                          {exp.highlights.map((point, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-3">
                              <span className={`mt-2 w-2 h-2 rounded-full shrink-0 ${isHovered ? "bg-black" : "bg-[#00FF66]"}`} />
                              <span className={isHovered ? "text-black/90 font-medium" : "text-neutral-300"}>
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

export default Experience;
