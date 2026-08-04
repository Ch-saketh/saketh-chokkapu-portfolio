import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Code,
  Globe,
  Server,
  Database,
  Layers,
  Leaf,
  Braces,
  Cloud,
  GitBranch,
  Github,
} from "lucide-react";

const DockerIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className,
}) => (
  <span
    style={{
      width: size,
      height: size,
      maskImage: `url('/assets/docker.svg')`,
      WebkitMaskImage: `url('/assets/docker.svg')`,
      maskSize: "contain",
      WebkitMaskSize: "contain",
      maskRepeat: "no-repeat",
      WebkitMaskRepeat: "no-repeat",
      maskPosition: "center",
      WebkitMaskPosition: "center",
    }}
    className={`inline-block shrink-0 bg-current ${className || ""}`}
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
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const LightSkills: React.FC = () => {
  const getIconSize = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) return 24;
      if (width < 1024) return 30;
      return 36;
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
    <section id="skills" className="pb-6 pt-24 lg:pt-26 scroll-mt-14 bg-[#F6F5F2] text-[#222222]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
        >
          <motion.h2
            variants={sectionVariants}
            className="text-[clamp(3.3rem,8vw,6rem)] font-black leading-[1] tracking-tight"
          >
            Skills &<br />
            <span className="mt-2 block font-light text-neutral-500">
              Technologies
            </span>
          </motion.h2>
          <motion.p
            variants={sectionVariants}
            className="mt-10 text-lg sm:text-xl text-neutral-600 leading-relaxed"
          >
            A focused stack I use to design, build and ship scalable,
            maintainable software — from fundamentals to production.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-15 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-16"
          variants={techContainerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {techStack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              className={`group flex items-center gap-2 md:gap-4 cursor-default ${
                idx % 2 === 0 ? "translate-y-0" : "translate-y-2 md:translate-y-0"
              }`}
              variants={techItemVariants}
              whileHover={{ scale: 1.15, rotate: 2 }}
            >
              <span className="text-neutral-500 group-hover:text-[#222222] transition-colors duration-300">
                {React.cloneElement(tech.icon as React.ReactElement, {
                  size: iconSize,
                  strokeWidth: 1.5,
                })}
              </span>
              <span className="text-[clamp(1rem,3vw,1.5rem)] font-medium tracking-tight text-[#222222]">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LightSkills;
