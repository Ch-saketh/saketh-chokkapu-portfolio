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

const Hero: React.FC = () => {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const viewCvBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="relative w-full overflow-hidden bg-[#0B0F17]"
      style={{ height: '100dvh', minHeight: '100dvh' }}
    >
      {/* Green radial glows */}
      <div className="absolute top-1/4 left-1/6 w-[30vw] h-[30vw] max-w-96 max-h-96 bg-[#00FF66]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] max-w-80 max-h-80 bg-[#00FF66]/4 rounded-full blur-3xl pointer-events-none" />

      {/* Mobile portrait ghost — behind text, only on mobile */}
      <div className="sm:hidden absolute inset-0 pointer-events-none flex items-end justify-end z-0">
        <img
          src={YourImg}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          className="h-[45%] w-auto object-contain object-bottom opacity-10 grayscale"
        />
      </div>

      {/* Desktop layout: left text + right portrait */}
      <div className="relative h-full w-full flex items-center">

        {/* Left: text content */}
        <div className="relative z-10 w-full sm:w-[55%] md:w-[52%] lg:w-[50%] xl:w-[48%] h-full flex items-center px-5 sm:px-8 md:px-10 lg:px-12 xl:px-16 pt-20 sm:pt-24 pb-8">
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            <motion.p variants={fadeUp}
              className="font-mono text-xs sm:text-sm tracking-widest text-[#00FF66] mb-3 uppercase font-medium text-center sm:text-left"
            >
              HELLO, I AM
            </motion.p>

            <motion.h1 variants={fadeUpSlow}
              className="font-funnel font-extrabold leading-[0.92] tracking-tight text-[#00FF66] mb-4 md:mb-5 text-center sm:text-left"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 7.5rem)' }}
            >
              Saketh
            </motion.h1>

            <motion.p variants={fadeUp}
              className="font-jost text-[0.6rem] sm:text-xs md:text-sm tracking-widest text-[#00FF66]/80 mb-4 md:mb-5 uppercase font-medium text-center sm:text-left"
            >
              BUILDING SYSTEMS | SMOOTH UX | EFFICIENT ARCHITECTURE
            </motion.p>

            <motion.p variants={fadeUp}
              className="text-sm sm:text-base md:text-lg text-neutral-300 leading-relaxed mb-5 md:mb-7 font-sans text-center sm:text-left max-w-xs sm:max-w-none mx-auto sm:mx-0"
            >
              I build high-performance, visually stunning web applications and
              digital experiences focused on modern design and scalable architecture.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp}
              className="flex justify-center sm:justify-start gap-6 sm:gap-8 md:gap-10 mb-6 md:mb-7 text-center"
            >
              {[
                { val: "10+", label: "Projects" },
                { val: "100+", label: "Commits" },
                { val: "2+", label: "Years Exp" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-funnel font-extrabold leading-none text-[#00FF66]">
                    {val}
                  </p>
                  <p className="mt-1 text-[0.55rem] sm:text-[0.6rem] md:text-xs tracking-widest text-[#00FF66]/70 uppercase font-mono">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-7"
            >
              <motion.button
                whileHover={hoverScale}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#00FF66] hover:bg-[#00D655] text-black font-semibold rounded-full shadow-lg shadow-[#00FF66]/20 transition text-sm md:text-base"
              >
                Let's collaborate
              </motion.button>

              <motion.button
                ref={viewCvBtnRef}
                whileHover={hoverScale}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (viewCvBtnRef.current) setOriginRect(viewCvBtnRef.current.getBoundingClientRect());
                  setIsCvOpen(true);
                }}
                className="w-full sm:w-auto px-7 py-3.5 border border-[#00FF66]/40 bg-[#131924]/80 rounded-full text-[#00FF66] hover:bg-[#00FF66] hover:text-black hover:border-[#00FF66] transition-all duration-300 flex items-center justify-center gap-2 group text-sm md:text-base"
              >
                <Eye className="w-4 h-4 text-[#00FF66] group-hover:text-black transition-colors" />
                <span className="font-medium">View CV</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: portrait image — hidden on mobile (shown as ghost above) */}
        <motion.div
          variants={scaleReveal}
          initial="hidden"
          animate="show"
          className="hidden sm:block absolute right-0 bottom-0 h-full z-0 pointer-events-none"
          style={{ width: 'clamp(300px, 48%, 720px)' }}
        >
          <img
            src={YourImg}
            alt="Saketh"
            fetchPriority="high"
            className="absolute bottom-0 right-0 h-[105%] w-auto max-w-none object-contain object-bottom grayscale transition-all duration-700 ease-out hover:grayscale-0 hover:scale-[1.03] pointer-events-auto"
          />
        </motion.div>
      </div>

      <CVModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} originRect={originRect} />
    </section>
  );
};

export default Hero;
