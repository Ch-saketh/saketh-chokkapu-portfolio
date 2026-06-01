import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import YourImg from "/assets/yourimage.png";
import CVPDF from "/assets/sample-cv.pdf";
import { SocialLink } from "../../utils/constants";
import {
  staggerContainerSlow,
  fadeUp,
  fadeUpSlow,
  scaleReveal,
  hoverScale,
} from "../../utils/animations";

/* ===================== COMPONENT ===================== */

const Hero: React.FC = () => {
  const socials: SocialLink[] = [
    { href: "https://github.com/Ch-saketh", icon: <Github /> },
    { href: "https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9", icon: <Linkedin /> },
    { href: "mailto:chokkapusaketh@gmail.com", icon: <Mail /> },
  ];

  return (
    <section className="relative mb-10 sm:mb-0 sm:h-[94vh] overflow-hidden">
      <div className="xl:max-w-7xl mx-auto px-4 sm:px-6 w-full h-full">
        <div className="flex gap-20 h-full lg:items-center">
          {/* LEFT — TEXT */}
          <motion.div
            variants={staggerContainerSlow}
            initial="hidden"
            animate="show"
            className="w-full max-w-2xl z-10 relative"
          >
            <motion.p
              variants={fadeUp}
              className="font-jost text-xs ml:text-sm tracking-widest text-neutral-600 mb-4"
            >
              HELLO, I AM
            </motion.p>

            <motion.h1
              variants={fadeUpSlow}
              className="
                text-[clamp(3rem,9vw,7rem)]
                font-funnel
                font-extrabold
                leading-[0.95]
                tracking-tight
                mb-5 md:mb-8
              "
            >
              Saketh 
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="sm:max-w-sm lg:max-w-xl font-jost text-lg ml:text-xl sm:text-lg md:text-xl tracking-widest text-neutral-600 mb-4 md:mb-6 uppercase"
            >
Building systems  | Smooth UX | Efficient architecture            </motion.p>

            <motion.p
              variants={fadeUp}
              className="sm:max-w-sm md:max-w-md lg:max-w-xl text-base ml:text-lg xsm:text-xl sm:text-lg lg:text-xl text-neutral-600 leading-relaxed mb-4 md:mb-8"
            >
              I build high-performance, visually stunning web applications and
              digital experiences focused on modern design and scalable
              architecture.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="
    mt-6
    mb-5
    sm:mb-6
    gap-10
    flex
    justify-center
    sm:justify-start
    text-neutral-800
    text-center
  "
            >
              <div>
                <p className="text-3xl sm:text-5xl font-funnel font-bold leading-none">
                  10+
                </p>
                <p className="mt-1 text-xs tracking-widest text-neutral-500 uppercase">
                  Projects
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-5xl font-funnel font-bold leading-none">
                  100+
                </p>
                <p className="mt-1 text-xs tracking-widest text-neutral-500 uppercase">
                  Commits
                </p>
              </div>

              <div>
                <p className="text-3xl sm:text-5xl font-funnel font-bold leading-none">
                  2+
                </p>
                <p className="mt-1 text-xs tracking-widest text-neutral-500 uppercase">
                  Years Exp
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6"
            >
              <motion.button
                whileHover={hoverScale}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-10 py-4 bg-black text-white rounded-full hover:bg-neutral-900 transition hover:cursor-pointer"
              >
                Let’s collaborate
              </motion.button>

              <motion.a
                whileHover={hoverScale}
                whileTap={{ scale: 0.98 }}
                href={CVPDF}
                download
                className="px-10 py-4 border border-neutral-400 rounded-full hover:bg-neutral-200 transition text-center"
              >
                Download CV
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex justify-center sm:justify-start items-center gap-6 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-10 mt-8"
            >
              {socials.map(({ href, icon }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-black transition"
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* FLOATING HERO IMAGE */}
          <motion.div
            variants={scaleReveal}
            initial="hidden"
            animate="show"
            className="
              hidden
              sm:block
              absolute
              sm:-right-[14%]
              md:-right-[10%]
              lg:-right-[1%]
              xl:right-8
              top-[29%]
              -translate-y-1/2
              h-full
              z-0
            "
          >
            <div className="h-full flex items-center pr-8">
              <img
                src={YourImg}
                alt="Your Name"
                loading="lazy"
                className="
                  h-auto
                  w-[clamp(380px,46vw,780px)]
                  max-w-none
                  object-contain
                  grayscale
                  transition-all
                  duration-700
                  scale-[1.08]
                  hover:grayscale-0
                  hover:scale-[1.1]
                "
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
