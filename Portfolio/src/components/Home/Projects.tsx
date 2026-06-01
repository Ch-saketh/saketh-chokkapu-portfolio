import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown } from "lucide-react";
import { projectItem } from "../../utils/constants";
import { staggerContainer, fadeUp, EASE_PREMIUM } from "../../utils/animations";

/* ===================== MEDIA QUERY HOOK ===================== */

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

/* ===================== ANIMATIONS ===================== */

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

/* ===================== COMPONENT ===================== */

const Projects: React.FC<{ projects: projectItem[] }> = ({ projects }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <section id="projects" className="scroll-mt-14 py-8 lg:py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-4 sm:px-6"
      >
        {/* ===== HEADER ===== */}
        <motion.div variants={fadeUp} className="mb-10 lg:mb-15">
          <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-black leading-[1]">
            Selected
            <br />
            <span className="font-light text-muted-foreground">Projects</span>
          </h2>

          <p className="mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            A curated selection of products, tools, and platforms I’ve built —
            focused on real-world usability and engineering depth.
          </p>
        </motion.div>

        {/* ===== PROJECT LIST ===== */}
        <motion.div
          className="divide-y divide-border border-b border-border"
          variants={{ hidden: {}, show: {} }}
        >
          {projects.map((project, idx) => {
            const isHovered = hovered === idx;
            const isExpanded = expanded === idx;

            return (
              <motion.div
                key={project.title}
                variants={fadeUp}
                className="relative"
                onMouseEnter={() => isDesktop && setHovered(idx)}
                onMouseLeave={() => isDesktop && setHovered(null)}
              >
                {/* Hover Background */}
                <motion.div
                  variants={bgFill}
                  initial="hidden"
                  animate={isHovered ? "show" : "hidden"}
                  className="lg:absolute inset-0 origin-left bg-foreground"
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
      ${isHovered ? "text-background" : "text-foreground"}
    `}
                >
                  {/* Index */}
                  <span
                    className={`font-funnel text-sm ${
                      isHovered ? "text-background/60" : "text-muted-foreground"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div className="flex gap-4 items-end justify-between">
                    {/* Title + Meta Pills */}
                    <div>
                      <h3 className="font-funnel text-[clamp(2rem,3vw,3rem)] font-bold leading-tight">
                        {project.title}
                      </h3>

                      <div className="mt-3 flex gap-2">
                        {/* Project Type */}
                        <span
                          className={`
            rounded-full px-3 py-[5px]
            text-[11px] font-medium tracking-wide
            border
            ${
              isHovered
                ? "border-background/40 text-background"
                : "border-border text-muted-foreground"
            }
          `}
                        >
                          {project.projectType === "personal"
                            ? "Personal"
                            : "Client"}
                        </span>

                        {/* Status */}
                        <span
                          className={`
            rounded-full px-3 py-[5px]
            text-[11px] font-medium tracking-wide
            border
            ${
              isHovered
                ? "border-background/40 text-background"
                : "border-border text-muted-foreground"
            }
          `}
                        >
                          {project.status === "completed"
                            ? "Completed"
                            : project.status === "in-progress"
                            ? "In Progress"
                            : "Hackathon Winner"}
                        </span>
                      </div>
                    </div>

                    {/* Chevron for smaller screens */}
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                      className="sm:hidden flex items-center justify-center"
                    >
                      <ChevronDown
                        size={18}
                        className={
                          isHovered
                            ? "text-background/60"
                            : "text-muted-foreground"
                        }
                      />
                    </motion.span>
                  </div>

                  {/* Tech Pills (MAIN ROW – hidden when expanded) */}
                  <motion.div
                    animate={{
                      opacity: isExpanded ? 0 : 1,
                      height: isExpanded ? 0 : "auto",
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="hidden lg:flex flex-wrap gap-2 overflow-hidden"
                  >
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className={`
            rounded-full px-3 py-[5px]
            text-[11px] font-medium tracking-wide
            border
            ${
              isHovered
                ? "border-background/40 text-background"
                : "border-border text-muted-foreground"
            }
          `}
                      >
                        {t}
                      </span>
                    ))}
                  </motion.div>

                  {/* View Project */}
                  <a
                    href={project.link}
                    target="_blank"
                    onClick={(e) => e.stopPropagation()}
                    className={`
        rounded-full px-4 py-[7px]
        text-[11px] font-medium tracking-wide
        border transition-colors
        flex items-center gap-2 max-w-max sm:ml-auto
        ${
          isHovered
            ? "border-background text-background"
            : "border-border text-muted-foreground"
        }
      `}
                  >
                    View Project <ExternalLink size={14} />
                  </a>

                  {/* Chevron for larger screens */}
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_PREMIUM }}
                    className="hidden sm:flex items-center justify-center"
                  >
                    <ChevronDown
                      size={18}
                      className={
                        isHovered
                          ? "text-background/60"
                          : "text-muted-foreground"
                      }
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
                      <div
                        className="
        max-w-6xl
        px-4 py-6
        grid grid-cols-1 lg:grid-cols-12
        gap-6 lg:gap-10
      "
                      >
                        {/* Images */}
                        <div
                          className="
          lg:col-span-5
          grid grid-cols-2
          gap-3
        "
                        >
                          {project.image.map((img, i) => (
                            <div
                              key={i}
                              className="
              relative
              aspect-video
              overflow-hidden
              rounded-xl
              border border-border
            "
                            >
                              <img
                                src={img}
                                alt={`${project.title} preview ${i + 1}`}
                                className="
                absolute inset-0
                w-full h-full
                object-cover
                transition-transform duration-300
                hover:scale-[1.04]
              "
                              />
                            </div>
                          ))}
                        </div>

                        {/* Description + Tech */}
                        <div className="lg:col-span-7 flex flex-col justify-between">
                          <p
                            className={`
            text-sm md:text-base
            leading-relaxed
            mb-6
            transition-colors
            ${isHovered ? "text-background/80" : "text-muted-foreground"}
          `}
                          >
                            {project.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className={`
                rounded-full
                px-3 py-[5px]
                text-[11px]
                font-medium
                tracking-wide
                border
                transition-colors
                ${
                  isHovered
                    ? "border-background/40 text-background"
                    : "border-border text-muted-foreground"
                }
              `}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
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

export default Projects;
