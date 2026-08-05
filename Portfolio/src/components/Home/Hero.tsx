import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import YourImg from "/assets/yourimage.png";
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpSlow,
  scaleReveal,
  hoverScale,
} from "../../utils/animations";
import CVModal from "./CVModal";

/* ===================== COMPONENT ===================== */

const Hero: React.FC = () => {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const viewCvBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0B0F17] pt-20 sm:pt-24 pb-12 flex items-center">
      {/* Background Terminal Green Radial Glow */}
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00FF66]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Mobile portrait — ghost behind text */}
      <div className="sm:hidden absolute inset-0 z-0 pointer-events-none flex items-end justify-end">
        <img
          src={YourImg}
          alt=""
          aria-hidden="true"
          className="h-[50vh] w-auto object-contain object-bottom opacity-15 grayscale"
        />
      </div>

      <div className="xl:max-w-7xl mx-auto px-5 sm:px-6 w-full relative z-10">
        <div className="flex h-full lg:items-center">
          {/* LEFT — TEXT */}
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            animate="show"
            className="w-full sm:max-w-xl md:max-w-2xl z-10 relative"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs sm:text-sm tracking-widest text-[#00FF66] mb-3 uppercase font-medium text-center sm:text-left"
            >
              HELLO, I AM
            </motion.p>

            <motion.h1
              variants={fadeUpSlow}
              className="
                text-[clamp(4rem,14vw,7.5rem)]
                font-funnel
                font-extrabold
                leading-[0.92]
                tracking-tight
                text-[#00FF66]
                mb-4 md:mb-6
                text-center sm:text-left
              "
            >
              Saketh
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-jost text-[0.65rem] sm:text-base tracking-wider text-[#00FF66] mb-4 md:mb-5 uppercase font-medium text-center sm:text-left"
            >
              BUILDING SYSTEMS | SMOOTH UX | EFFICIENT ARCHITECTURE
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base md:text-xl text-neutral-300 leading-relaxed mb-6 md:mb-8 font-sans text-center sm:text-left max-w-sm sm:max-w-none mx-auto sm:mx-0"
            >
              I build high-performance, visually stunning web applications and
              digital experiences focused on modern design and scalable
              architecture.
            </motion.p>

            {/* Counter Stats */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center sm:justify-start gap-8 sm:gap-10 mb-7 md:mb-8 text-center"
            >
              {[
                { val: "10+", label: "Projects" },
                { val: "100+", label: "Commits" },
                { val: "2+", label: "Years Exp" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="text-2xl sm:text-4xl md:text-5xl font-funnel font-extrabold leading-none text-[#00FF66]">
                    {val}
                  </p>
                  <p className="mt-1 text-[0.6rem] sm:text-xs tracking-widest text-[#00FF66]/70 uppercase font-mono">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-7 md:mb-8"
            >
              <motion.button
                whileHover={hoverScale}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto px-8 py-4 bg-[#00FF66] hover:bg-[#00D655] text-black font-semibold rounded-full shadow-lg shadow-[#00FF66]/20 transition text-sm sm:text-base"
              >
                Let's collaborate
              </motion.button>

              <motion.button
                ref={viewCvBtnRef}
                whileHover={hoverScale}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (viewCvBtnRef.current) {
                    setOriginRect(viewCvBtnRef.current.getBoundingClientRect());
                  }
                  setIsCvOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-4 border border-[#00FF66]/40 bg-[#131924]/80 rounded-full text-[#00FF66] hover:bg-[#00FF66] hover:text-black hover:border-[#00FF66] transition-all duration-300 text-center flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                <Eye className="w-4 h-4 text-[#00FF66] group-hover:text-black transition-colors" />
                <span className="font-medium">View CV</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* FLOATING HERO IMAGE - Exact Match to Live Reference Placement */}
          <motion.div
            variants={scaleReveal}
            initial="hidden"
            animate="show"
            className="
              hidden
              sm:flex
              items-end
              absolute
              right-0
              sm:-right-[2%]
              md:right-[0%]
              lg:right-[1%]
              xl:right-[2%]
              bottom-0
              z-0
              pointer-events-none
            "
          >
            <img
              src={YourImg}
              alt="Saketh"
              loading="lazy"
              className="
                h-[120vh] sm:h-[128vh] md:h-[135vh]
                max-h-[1450px]
                w-auto
                max-w-none
                object-contain
                object-bottom
                brightness-95
                contrast-105
                transition-all
                duration-700
                hover:scale-[1.015]
                drop-shadow-[0_20px_50px_rgba(0,255,102,0.18)]
              "
            />
          </motion.div>
        </div>
      </div>

      {/* CV Modal */}
      <CVModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        originRect={originRect}
      />
    </section>
  );
};

export default Hero;
