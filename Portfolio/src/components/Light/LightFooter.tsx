import React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
} from "lucide-react";
import { handleMailClick } from "../../utils/constants";
import { staggerContainer, fadeUp } from "../../utils/animations";

const LightFooter: React.FC = () => {
  return (
    <footer className="relative mt-10 border-t border-neutral-300 bg-[#F6F5F2] text-[#222222] overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        className="
          max-w-7xl mx-auto
          px-4 lg:px-8
          py-10 md:py-15
        "
      >
        <motion.h2
          variants={fadeUp}
          className="
            font-funnel font-extrabold
            text-[clamp(3.5rem,8vw,6rem)]
            leading-[1.05]
            tracking-tight
            max-w-4xl
            text-[#222222]
          "
        >
          Let’s build systems <br className="hidden sm:block" />
          that actually scale.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="
            mt-6 sm:mt-8
            max-w-2xl
            text-base md:text-lg
            text-neutral-600
            leading-relaxed
          "
        >
          I’m Saketh Chokkapu — a software developer & full-stack architect. I build high-performance digital products and experiences that help brands grow and succeed.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          className="
            mt-8
            grid grid-cols-1
            gap-8 md:gap-16 lg:gap-20
            md:grid-cols-3
          "
        >
          <motion.div variants={fadeUp} className="space-y-5">
            <h4 className="text-xs md:text-sm lg:text-lg tracking-widest uppercase text-neutral-500">
              Contact
            </h4>
            <a
              href="mailto:chokkapusaketh@gmail.com"
              onClick={(e) => handleMailClick(e)}
              className="
                flex items-center gap-2 md:gap-3
                text-neutral-700
                hover:text-black
                transition-colors
              "
            >
              <Mail className="w-4 h-4" />
              chokkapusaketh@gmail.com
            </a>
            <a
              href="https://wa.me/9392345156?text=Hello%20there"
              className="
                flex items-center gap-2 md:gap-3
                text-neutral-700
                hover:text-black
                transition-colors
              "
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-5">
            <h4 className="text-xs md:text-sm lg:text-lg tracking-widest uppercase text-neutral-500">
              Online
            </h4>

            <div className="flex flex-col gap-3 text-neutral-700">
              <a
                href="https://github.com/Ch-saketh"
                target="_blank"
                className="flex items-center gap-3 hover:text-black transition-colors"
                rel="noreferrer"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9"
                target="_blank"
                className="flex items-center gap-3 hover:text-black transition-colors"
                rel="noreferrer"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-5">
            <h4 className="text-xs md:text-sm lg:text-lg tracking-widest uppercase text-neutral-500">
              Explore
            </h4>

            <div className="flex flex-col gap-3 text-neutral-700">
              <a
                href="#projects"
                className="hover:text-black transition-colors"
              >
                Projects
              </a>
              <a
                href="#services"
                className="hover:text-black transition-colors"
              >
                Services
              </a>
              <a
                href="#skills"
                className="hover:text-black transition-colors"
              >
                Toolbox
              </a>
              <a href="#about" className="hover:text-black transition-colors">
                My Journey
              </a>
              <a href="#contact" className="hover:text-black transition-colors">
                Hire Me
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="
            mt-10 
            pt-6 sm:pt-8
            border-t border-neutral-300
            flex flex-col sm:flex-row
            items-center justify-between
            gap-4
            text-sm md:text-base
            text-neutral-600 font-funnel
          "
        >
          <p>© {new Date().getFullYear()} Saketh Chokkapu</p>
          <p>Built with clarity, intent & clean code.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default LightFooter;
