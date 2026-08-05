import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Code,
  Braces,
  Database,
  Server,
  Globe,
  GitBranch,
  Github,
  Cloud,
  Layers,
  Leaf,
} from "lucide-react";

const DockerIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className,
}) => (
  <img
    src="/social.png"
    alt="Docker"
    style={{
      width: size,
      height: size,
      filter: "brightness(0) saturate(100%) invert(72%) sepia(85%) saturate(950%) hue-rotate(85deg) brightness(105%) contrast(105%)",
    }}
    className={`object-contain shrink-0 ${className || ""}`}
  />
);

export interface TechStackItem {
  name: string;
  icon: React.ReactNode;
}

const techStack: TechStackItem[] = [
  { name: "JavaScript", icon: <Code /> },
  { name: "Java", icon: <Code /> },
  { name: "HTML", icon: <Globe /> },
  { name: "CSS", icon: <Globe /> },

  { name: "React", icon: <Layers /> },
  { name: "Spring Boot", icon: <Leaf /> },
  { name: "Express.js", icon: <Server /> },
  { name: "Tailwind CSS", icon: <Braces /> },

  { name: "Supabase", icon: <Database /> },
  { name: "SQL", icon: <Database /> },
  { name: "Google Cloud", icon: <Cloud /> },

  { name: "Git", icon: <GitBranch /> },
  { name: "GitHub", icon: <Github /> },
  { name: "Docker", icon: <DockerIcon /> },
  { name: "Vercel", icon: <Cloud /> },
  { name: "Render", icon: <Cloud /> },
];

/* ------------------------------ Animations ------------------------------ */
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const techContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const techItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1], // editorial / premium easing
    },
  },
};

/* ------------------------------ Skills Component ------------------------------ */
const Skills: React.FC = () => {
  // Helper: calculate responsive icon size
  const getIconSize = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) return 24; // mobile
      if (width < 1024) return 30; // tablet
      return 36; // desktop
    }
    return 36;
  };

  const [iconSize, setIconSize] = React.useState(getIconSize());

  React.useEffect(() => {
    const handleResize = () => setIconSize(getIconSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="skills" className="pb-6 pt-24 lg:pt-26 scroll-mt-14 bg-[#0B0F17]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading + Description */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
        >
          <motion.h2
            variants={sectionVariants}
            className="text-[clamp(3.3rem,8vw,6rem)] font-extrabold leading-[1] tracking-tight text-[#00FF66] font-funnel"
          >
            Skills &<br />
            <span className="mt-2 block font-light text-white">
              Technologies
            </span>
          </motion.h2>
          <motion.p
            variants={sectionVariants}
            className="mt-6 text-lg sm:text-xl text-neutral-300 leading-relaxed font-sans max-w-2xl"
          >
            A focused backend and full-stack toolkit used to design, architect, and ship high-performance, maintainable software systems.
          </motion.p>
        </motion.div>

        {/* Tech Grid - Clean without Boxes */}
        <motion.div
          className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-16"
          variants={techContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {techStack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              className={`group flex items-center gap-3.5 cursor-pointer ${
                idx % 2 === 0 ? "translate-y-0" : "translate-y-2 md:translate-y-0"
              }`}
              variants={techItemVariants}
              whileHover={{ scale: 1.12, rotate: 2 }}
            >
              <span className="text-[#00FF66]/70 group-hover:text-[#00FF66] transition-colors duration-300 shrink-0 flex items-center justify-center">
                {React.cloneElement(tech.icon as React.ReactElement, {
                  size: iconSize,
                  strokeWidth: 1.5,
                })}
              </span>
              <span className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-medium tracking-tight text-white group-hover:text-[#00FF66] transition-colors">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
