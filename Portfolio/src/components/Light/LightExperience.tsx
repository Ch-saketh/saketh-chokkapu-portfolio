import React from "react";
import { motion, Variants } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

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

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const LightExperience: React.FC = () => {
  return (
    <section id="experience" className="py-20 lg:py-28 scroll-mt-14 bg-[#F6F5F2] text-[#222222]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
        >
          <motion.h2
            variants={sectionVariants}
            className="text-[clamp(3.3rem,8vw,6rem)] font-black leading-[1] tracking-tight text-[#222222] font-funnel"
          >
            Work &<br />
            <span className="mt-2 block font-light text-neutral-500">
              Experience
            </span>
          </motion.h2>
          <motion.p
            variants={sectionVariants}
            className="mt-6 text-lg sm:text-xl text-neutral-600 leading-relaxed font-sans max-w-2xl"
          >
            Commercial engineering roles, AI system evaluation, and backend API contributions.
          </motion.p>
        </motion.div>

        {/* Experience List Grid */}
        <motion.div
          className="mt-14 flex flex-col gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="group relative rounded-3xl border border-neutral-300 bg-white/90 hover:border-neutral-800 p-6 sm:p-8 md:p-10 transition-all duration-300 shadow-md hover:shadow-xl backdrop-blur-xl"
            >
              {/* Header: Company & Role */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-funnel text-[#222222] group-hover:text-black transition-colors">
                      {exp.company}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-neutral-200/80 border border-neutral-300 text-neutral-800">
                      <Briefcase className="w-3.5 h-3.5" />
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-base sm:text-lg text-neutral-700 font-medium font-sans">
                    {exp.role}
                  </p>
                </div>

                {/* Date & Location */}
                <div className="flex items-center gap-4 text-xs sm:text-sm font-mono text-neutral-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-neutral-600" />
                    <span>{exp.period}</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-neutral-400" />
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-neutral-600" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Highlights Bullet List */}
              <ul className="mt-6 flex flex-col gap-3.5 text-neutral-700 text-sm sm:text-base font-sans leading-relaxed">
                {exp.highlights.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-neutral-800 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LightExperience;
