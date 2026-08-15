import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Eye } from "lucide-react";
import YourImg from "/assets/yourimage.png";
import { GMAIL_URL, SocialLink } from "../../utils/constants";
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpSlow,
  scaleReveal,
  hoverScale,
} from "../../utils/animations";
import CVModal from "../Home/CVModal";

const LightHero: React.FC = () => {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const viewCvBtnRef = useRef<HTMLButtonElement>(null);

  const socials: SocialLink[] = [
    { href: "https://github.com/Ch-saketh", icon: <Github className="w-5 h-5" /> },
    { href: "https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9", icon: <Linkedin className="w-5 h-5" /> },
    { href: GMAIL_URL, icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F6F5F2] text-[#222222]"
      style={{ height: '100dvh', minHeight: '100dvh' }}
    >
      {/* Soft radial glow */}
      <div className="absolute top-1/4 left-1/6 w-[30vw] h-[30vw] max-w-96 max-h-96 bg-neutral-300/30 rounded-full blur-3xl pointer-events-none" />

      {/* Hero content container */}
      <div className="relative h-full w-full flex items-center">

        {/* Left: text content (Full width on mobile/tablet, 50% on desktop) */}
        <div className="relative z-10 w-full lg:w-[50%] xl:w-[48%] h-full flex items-center px-6 sm:px-10 md:px-14 lg:px-12 xl:px-16 pt-20 sm:pt-24 pb-8">
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            animate="show"
            className="w-full text-left max-w-2xl lg:max-w-none"
          >
            <motion.p variants={fadeUp}
              className="font-mono text-xs sm:text-sm tracking-widest text-neutral-500 mb-3 uppercase font-medium text-left"
            >
              HELLO, I AM
            </motion.p>

            <motion.h1 variants={fadeUpSlow}
              className="font-funnel font-extrabold leading-[0.92] tracking-tight text-[#222222] mb-4 md:mb-5 text-left"
              style={{ fontSize: 'clamp(3.2rem, 9vw, 7.5rem)' }}
            >
              Saketh
            </motion.h1>

            <motion.p variants={fadeUp}
              className="font-jost text-[0.65rem] sm:text-xs md:text-sm tracking-widest text-neutral-600 mb-4 md:mb-5 uppercase font-medium text-left"
            >
              BUILDING SYSTEMS | SMOOTH UX | EFFICIENT ARCHITECTURE
            </motion.p>

            <motion.p variants={fadeUp}
              className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed mb-5 md:mb-7 font-sans text-left"
            >
              I build high-performance, visually stunning web applications and
              digital experiences focused on modern design and scalable architecture.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp}
              className="flex justify-start gap-6 sm:gap-8 md:gap-10 mb-6 md:mb-7 text-left"
            >
              {[
                { val: "10+", label: "Projects" },
                { val: "100+", label: "Commits" },
                { val: "2+", label: "Years Exp" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-funnel font-extrabold leading-none text-[#222222]">
                    {val}
                  </p>
                  <p className="mt-1 text-[0.55rem] sm:text-[0.6rem] md:text-xs tracking-widest text-neutral-500 uppercase font-mono">
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
                className="w-full sm:w-auto px-7 py-3.5 bg-[#222222] hover:bg-black text-white font-semibold rounded-full shadow-lg transition text-sm md:text-base cursor-pointer"
              >
                <span className="text-white" style={{ color: "#FFFFFF" }}>Let's collaborate</span>
              </motion.button>

              <motion.button
                ref={viewCvBtnRef}
                whileHover={hoverScale}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (viewCvBtnRef.current) setOriginRect(viewCvBtnRef.current.getBoundingClientRect());
                  setIsCvOpen(true);
                }}
                className="w-full sm:w-auto px-7 py-3.5 border border-neutral-300 bg-white/80 rounded-full text-[#222222] hover:bg-[#222222] hover:text-white hover:border-[#222222] transition-all duration-300 flex items-center justify-center gap-2 group text-sm md:text-base cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#222222] group-hover:text-white transition-colors" />
                <span className="font-medium">View CV</span>
              </motion.button>
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp}
              className="flex justify-start items-center gap-5 sm:gap-6"
            >
              {socials.map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-black transition-colors p-1"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Right: portrait image — desktop (lg: 1024px+) only */}
        <motion.div
          variants={scaleReveal}
          initial="hidden"
          animate="show"
          className="hidden lg:block absolute right-0 bottom-0 h-full z-0 pointer-events-none"
          style={{ width: 'clamp(520px, 62%, 1150px)' }}
        >
          <img
            src={YourImg}
            alt="Saketh"
            fetchPriority="high"
            className="absolute bottom-0 right-0 h-[132%] xl:h-[142%] w-auto max-w-none object-contain object-bottom grayscale transition-all duration-700 ease-out hover:grayscale-0 hover:scale-[1.03] pointer-events-auto"
          />
        </motion.div>
      </div>

      <CVModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} originRect={originRect} />
    </section>
  );
};

export default LightHero;
