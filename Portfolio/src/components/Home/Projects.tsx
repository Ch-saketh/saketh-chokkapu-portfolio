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
          <h2 className="text-[clamp(3.5rem,8vw,6rem)] font-extrabold leading-[1] text-white font-funnel">
            Selected
            <br />
            <span className="font-light text-[#10B981]">Projects</span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg sm:text-xl text-neutral-400 leading-relaxed font-sans">
            A curated selection of backend platforms, full-stack web applications, and developer tools built for performance and scalability.
          </p>
        </motion.div>

        {/* ===== PROJECT LIST ===== */}
        <motion.div
          className="divide-y divide-[#1E293B] border-b border-t border-[#1E293B]"
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
                    {/* Title + Meta Pills */}
                    <div>
                      <h3 className={`font-funnel text-[clamp(2rem,3vw,3rem)] font-bold leading-tight ${isHovered ? "text-black" : "text-white"}`}>
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
                ? "border-black/30 text-black font-semibold bg-black/10"
                : "border-[#1E293B] text-neutral-400 bg-[#131924]"
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
                ? "border-black/30 text-black font-semibold bg-black/10"
                : "border-[#1E293B] text-neutral-400 bg-[#131924]"
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
                            ? "text-black"
                            : "text-neutral-400"
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
                ? "border-black/30 text-black font-semibold bg-black/10"
                : "border-[#1E293B] text-neutral-400 bg-[#131924]"
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
            ? "border-black bg-black text-[#00FF66] font-bold"
            : "border-[#1E293B] text-neutral-300 hover:text-[#00FF66]"
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
                          ? "text-black"
                          : "text-neutral-400"
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
