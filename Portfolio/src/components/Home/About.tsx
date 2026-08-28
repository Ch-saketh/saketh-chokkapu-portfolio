import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import {
  staggerContainer,
  staggerContainerSlow,
  fadeUp,
  EASE_PREMIUM,
} from "../../utils/animations";

/* ===================== DATA ===================== */

const journeyItems = [
  {
    year: "2023",
    title: "Started Programming Journey",
    details:
      "Explored the world of code for the first time, learning the basic logic, memory structures, and overall architecture of software. Spent significant time building core problem-solving habits through data structures, algorithms, and fundamental computer science principles.",
  },
  {
    year: "2024",
    title: "Building Fundamentals & Machine Learning",
    details:
      "Focused on full-stack fundamentals and machine learning. As Team Head for a Hybrid Book Recommendation Platform, I processed 3M+ Amazon review rows, engineered a TF-IDF & LightFM matrix factorization engine with WARP loss, and optimized precision@5 from 0.0087 to 0.1688, deploying the trained inference model to Hugging Face.",
  },
  {
    year: "2025",
    title: "Full-Stack Web & Cryptographic Desktop Projects",
    details:
      "Engineered real-world full-stack and desktop systems. Developed Weavly (Spring Boot/React/PostgreSQL) with dimension-mapping, resolving Hibernate N+1 queries to cut read latency from 150ms to 60ms. Built QMail, a privacy-focused Electron.js desktop client with IMAP/SMTP handlers and AES-256/RSA file encryption.",
  },
  {
    year: "2025",
    title: "National Hackathon Victories",
    details:
      "Participated in national-level hackathons where I secured top placements under high-pressure competitive sprints. Won 3rd Prize at the Amaravati Quantum Valley Hackathon for Team Ekalavya as Lead Frontend Developer by building the full real-time auction portal UI and linking backend security layers. Secured 2nd Prize at the National AI Hackathon by deploying state management routines and debugging live data anomalies for an automated evaluation system under sudden traffic spikes.",
  },
  {
    year: "2026",
    title: "Current Focus",
    details:
      "Building real-world full-stack and data-driven applications with a strong focus on backend logic, database optimizations, machine learning pipeline integration, system behavior, and smooth user experiences.",
  },
];

/* ===================== COMPONENT ===================== */

const About = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const isDesktop = () => window.innerWidth >= 1024;

  const toggleItem = (idx: number) => {
    setActiveIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="about" className="py-8 lg:py-16 scroll-mt-14">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        {/* TITLE */}
        <motion.h2
          variants={fadeUp}
          className="font-funnel font-semibold text-[clamp(3.5rem,9vw,7rem)] leading-[1.02] tracking-tight max-w-4xl text-white"
        >
          About <span className="text-[#00FF66] font-normal">Me</span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          variants={fadeUp}
          className="mt-6 md:mt-8 max-w-3xl text-base sm:text-xl leading-[1.9] text-neutral-300 font-sans"
        >
          I build practical, high-performance systems focused on backend behavior, scalable architecture, and intelligent machine learning pipelines.
          <br />
          <br />
          I work across full-stack and data-driven systems, connecting performant backend services and ML engines with crisp, responsive user interfaces.
        </motion.p>

        {/* JOURNEY */}
        <motion.div variants={staggerContainerSlow} className="mt-12 lg:mt-24">
          <motion.p
            variants={fadeUp}
            className="mb-10 text-xs sm:text-sm tracking-[0.35em] uppercase text-[#00FF66] font-mono font-normal"
          >
            Journey
          </motion.p>

          <div className="space-y-10 md:space-y-14 lg:space-y-20">
            {journeyItems.map((item, idx) => {
              const isActive = activeIndex === idx;

              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  onHoverStart={() => isDesktop() && setActiveIndex(idx)}
                  onHoverEnd={() => isDesktop() && setActiveIndex(null)}
                  className="relative"
                >
                  {/* HEADER */}
                  <motion.div
                    onClick={() => !isDesktop() && toggleItem(idx)}
                    whileHover={isDesktop() ? { scale: 1.015 } : undefined}
                    transition={{ type: "spring", stiffness: 260, damping: 24 }}
                    className="cursor-pointer py-2 sm:py-3 lg:py-4"
                  >
                    {/* MOBILE */}
                    <div className="lg:hidden space-y-2">
                      <span className="font-mono text-sm text-[#00FF66] font-normal mb-2 inline-block">
                        {item.year}
                      </span>

                      <div className="flex items-center justify-between gap-6 mt-2">
                        <h4 className={`font-medium text-xl sm:text-3xl leading-tight tracking-tight ${isActive ? "text-[#00FF66]" : "text-white"}`}>
                          {item.title}
                        </h4>

                        <motion.span
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 360,
                            damping: 22,
                          }}
                          className={isActive ? "text-[#00FF66]" : "text-neutral-400"}
                        >
                          <Plus size={24} />
                        </motion.span>
                      </div>
                    </div>

                    {/* DESKTOP */}
                    <div className="hidden lg:flex items-center justify-between gap-10">
                      <div className="flex items-center gap-10">
                        <span className="font-mono text-sm text-[#00FF66] font-normal w-14">
                          {item.year}
                        </span>

                        <h4 className={`font-medium text-[clamp(1.9rem,3vw,2.5rem)] leading-tight tracking-tight transition-colors ${isActive ? "text-[#00FF66]" : "text-white"}`}>
                          {item.title}
                        </h4>
                      </div>

                      <motion.span
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 360,
                          damping: 22,
                        }}
                        className={isActive ? "text-[#00FF66]" : "text-neutral-400"}
                      >
                        <Plus size={26} />
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* DETAILS */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: {
                            height: { duration: 0.5, ease: EASE_PREMIUM },
                            opacity: { duration: 0.3, delay: 0.1 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: { duration: 0.3 },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="mt-3 max-w-3xl text-neutral-300 text-base sm:text-lg leading-[1.85] font-sans">
                          {item.details}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* LINE */}
                  <div className="mt-4 lg:mt-8 h-px bg-[#1E293B]" />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;