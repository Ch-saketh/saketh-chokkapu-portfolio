import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Terminal,
} from "lucide-react";
import { handleMailClick } from "../../utils/constants";

/* ===================== COMPONENT ===================== */

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-16 border-t border-[#1E293B] bg-[#0B0F17] overflow-hidden text-white">
      <div
        className="
          max-w-7xl mx-auto
          px-4 lg:px-8
          py-12 md:py-16
        "
      >
        {/* System Status Pill */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-mono font-medium tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>

        {/* STATEMENT */}
        <h2
          className="
            font-funnel font-extrabold
            text-[clamp(3.5rem,8vw,6rem)]
            leading-[1.05]
            tracking-tight
            max-w-4xl
            text-white
          "
        >
          Let’s build systems <br className="hidden sm:block" />
          that <span className="text-[#00FF66]">actually scale</span>.
        </h2>

        <p
          className="
            mt-6 sm:mt-8
            max-w-2xl
            text-base md:text-lg
            text-neutral-400
            leading-relaxed
            font-sans
          "
        >
          I’m Saketh Chokkapu — a software developer & full-stack architect. I engineer performant digital systems, clean APIs, and scalable web applications.
        </p>

        {/* LINKS */}
        <div
          className="
            mt-12
            grid grid-cols-1
            gap-8 md:gap-16 lg:gap-20
            md:grid-cols-3
            items-start
          "
        >
          {/* CONTACT */}
          <div className="space-y-4 flex flex-col items-start">
            <h4 className="text-xs md:text-sm font-mono tracking-widest uppercase text-[#00FF66] font-medium leading-none">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5 text-neutral-300 font-sans">
              <a
                href="mailto:chokkapusaketh@gmail.com"
                onClick={(e) => handleMailClick(e)}
                className="
                  flex items-center gap-2.5
                  text-neutral-300
                  hover:text-[#00FF66]
                  transition-colors
                  font-sans
                "
              >
                <Mail className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span>chokkapusaketh@gmail.com</span>
              </a>
              <a
                href="https://wa.me/9392345156?text=Hello%20there"
                className="
                  flex items-center gap-2.5
                  text-neutral-300
                  hover:text-[#00FF66]
                  transition-colors
                  font-sans
                "
              >
                <MessageCircle className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>

          {/* CONNECT */}
          <div className="space-y-4 flex flex-col items-start">
            <h4 className="text-xs md:text-sm font-mono tracking-widest uppercase text-[#00FF66] font-medium leading-none">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5 text-neutral-300 font-sans">
              <a
                href="https://github.com/Ch-saketh"
                target="_blank"
                className="flex items-center gap-2.5 hover:text-[#00FF66] transition-colors"
                rel="noreferrer"
              >
                <Github className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span>GitHub Profile</span>
              </a>

              <a
                href="https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9"
                target="_blank"
                className="flex items-center gap-2.5 hover:text-[#00FF66] transition-colors"
                rel="noreferrer"
              >
                <Linkedin className="w-4 h-4 text-[#00FF66] shrink-0" />
                <span>LinkedIn Network</span>
              </a>
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="space-y-4 flex flex-col items-start">
            <h4 className="text-xs md:text-sm font-mono tracking-widest uppercase text-[#00FF66] font-medium leading-none">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5 text-neutral-300 font-sans">
              <a
                href="#projects"
                className="hover:text-[#00FF66] transition-colors"
              >
                Selected Projects
              </a>
              <a
                href="#services"
                className="hover:text-[#00FF66] transition-colors"
              >
                Capabilities & Services
              </a>
              <a
                href="#skills"
                className="hover:text-[#00FF66] transition-colors"
              >
                Tech Stack
              </a>
              <a href="#about" className="hover:text-[#00FF66] transition-colors">
                About & Milestones
              </a>
              <a href="#contact" className="hover:text-[#00FF66] transition-colors">
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-12
            pt-6 sm:pt-8
            border-t border-[#1E293B]
            flex flex-col sm:flex-row
            items-center justify-between
            gap-4
            text-sm
            text-neutral-400 font-sans
          "
        >
          <p>© {new Date().getFullYear()} Saketh Chokkapu. All rights reserved.</p>
          <p className="flex items-center gap-2 font-mono text-xs text-[#00FF66]">
            <Terminal className="w-3.5 h-3.5" /> Built with precision & clean code.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
