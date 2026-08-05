import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Eye } from "lucide-react";
import YourImg from "/assets/yourimage.png";
import { handleMailClick, SocialLink } from "../../utils/constants";
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpSlow,
  scaleReveal,
  hoverScale,
} from "../../utils/animations";
import CVModal from "../Home/CVModal";

/* ===================== COMPONENT ===================== */

const LightHero: React.FC = () => {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const viewCvBtnRef = useRef<HTMLButtonElement>(null);
  const socials: SocialLink[] = [
    { href: "https://github.com/Ch-saketh", icon: <Github className="w-5 h-5" /> },
    { href: "https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9", icon: <Linkedin className="w-5 h-5" /> },
    { href: "mailto:chokkapusaketh@gmail.com", icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#F6F5F2] text-[#222222] pt-20 sm:pt-24 pb-12 flex items-center">

      {/* Mobile portrait — subtle background image, behind text */}
      <div className="sm:hidden absolute inset-0 z-0 pointer-events-none flex items-end justify-end">
        <img
          src={YourImg}
          alt=""
          aria-hidden="true"
          className="h-[55vh] w-auto object-contain object-bottom opacity-20 grayscale"
        />
      </div>

      <div className="xl:max-w-7xl mx-auto px-5 sm:px-6 w-full relative z-10">
        <div className="flex h-full lg:items-center">

          {/* LEFT — TEXT (full width on mobile, limited on desktop) */}
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            animate="show"
            className="w-full sm:max-w-xl md:max-w-2xl z-10 relative"
          >
            {/* Eyebrow */}
            <motion.p
              variants={fadeUp}
              className="font-jost text-xs sm:text-sm tracking-widest text-neutral-500 mb-3 font-medium uppercase text-center sm:text-left"
            >
              HELLO, I AM
            </motion.p>

            {/* Name */}
            <motion.h1
              variants={fadeUpSlow}
              className="
                text-[clamp(4rem,14vw,7.5rem)]
                font-funnel
                font-extrabold
                leading-[0.92]
                tracking-tight
                mb-4 md:mb-6
                text-center sm:text-left
              "
            >
              Saketh
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="font-jost text-[0.65rem] sm:text-sm tracking-widest text-neutral-500 mb-4 md:mb-5 uppercase text-center sm:text-left"
            >
              BUILDING SYSTEMS | SMOOTH UX | EFFICIENT ARCHITECTURE
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="text-sm sm:text-base md:text-lg text-neutral-600 leading-relaxed mb-6 md:mb-8 text-center sm:text-left max-w-sm sm:max-w-none mx-auto sm:mx-0"
            >
              I build high-performance, visually stunning web applications and
              digital experiences focused on modern design and scalable
              architecture.
            </motion.p>

            {/* Stats */}
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
                  <p className="text-2xl sm:text-4xl md:text-5xl font-funnel font-bold leading-none">
                    {val}
                  </p>
                  <p className="mt-1 text-[0.6rem] sm:text-xs tracking-widest text-neutral-500 uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons — stacked on mobile, row on sm+ */}
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
                className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full hover:bg-neutral-900 transition font-medium text-sm sm:text-base"
                style={{ color: 'white' }}
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
                className="w-full sm:w-auto px-8 py-4 border border-neutral-400 rounded-full hover:bg-black hover:border-black transition-all duration-300 text-center flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                <Eye className="w-4 h-4 text-neutral-600 group-hover:text-white transition-colors" />
                <span className="font-medium group-hover:text-white transition-colors">View CV</span>
              </motion.button>
            </motion.div>

            {/* Social Icons — centered on mobile */}
            <motion.div
              variants={fadeUp}
              className="flex justify-center sm:justify-start items-center gap-6"
            >
              {socials.map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  onClick={(e) => href.startsWith("mailto:") && handleMailClick(e)}
                  target={href.startsWith("mailto:") ? "_self" : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="text-neutral-500 hover:text-black transition-colors p-1"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Desktop portrait — hidden on mobile (shown as bg above) */}
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
              sm:right-[0%]
              md:right-[2%]
              lg:right-[3%]
              xl:right-[4%]
              bottom-0
              z-0
            "
          >
            <img
              src={YourImg}
              alt="Saketh"
              loading="lazy"
              className="
                h-[108vh] sm:h-[116vh] md:h-[124vh]
                max-h-[1240px]
                w-auto
                max-w-none
                object-contain
                object-bottom
                grayscale
                scale-100
                transition-all
                duration-700
                ease-out
                hover:grayscale-0
                hover:scale-[1.06]
                cursor-default
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

export default LightHero;
