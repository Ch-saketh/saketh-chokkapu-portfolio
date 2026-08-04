import {
  Mail,
  Linkedin,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import { handleMailClick } from "../../utils/constants";

/* =======================
   TYPES & DATA
   ======================= */

interface SocialLinkItem {
  platform: string;
  handle: string;
  action: string;
  icon: React.ReactNode;
  href: string;
  isPrimary: boolean;
}

const Contact: React.FC = () => {
  const socialLinks: SocialLinkItem[] = [
    {
      platform: "WhatsApp",
      handle: "Chat directly",
      action: "Fastest Reply",
      icon: <MessageCircle className="w-5 h-5 text-[#00FF66]" />,
      href: "https://wa.me/9392345156?text=Hello%20there",
      isPrimary: true,
    },
    {
      platform: "LinkedIn",
      handle: "Professional profile",
      action: "Connect",
      icon: <Linkedin className="w-5 h-5 text-[#00FF66]" />,
      href: "https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9",
      isPrimary: false,
    },
    {
      platform: "Email",
      handle: "Detailed inquiries",
      action: "Send Mail",
      icon: <Mail className="w-5 h-5 text-[#00FF66]" />,
      href: "mailto:chokkapusaketh@gmail.com",
      isPrimary: false,
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-14 py-12 lg:py-20 sm:px-2 relative z-20 bg-[#0B0F17]"
    >
      <div className="bg-[#131924]/90 border border-[#1E293B] text-white rounded-3xl px-6 py-10 sm:py-14 sm:px-12 md:py-16 shadow-2xl">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ================= LEFT — EDITORIAL ================= */}
          <div className="flex flex-col justify-center">
            <h2 className="font-funnel max-w-xl text-[clamp(3.5rem,8vw,6rem)] font-extrabold leading-[1] tracking-tight text-white">
              Let’s create
              <br />
              something
              <span className="mt-2 block font-light text-[#00FF66]">
                meaningful
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-lg sm:text-xl text-neutral-300 leading-relaxed font-sans">
              Whether it’s a product, startup idea, or a complex engineering challenge — I’m always open to thoughtful conversations.
            </p>

            <p className="mt-6 text-sm font-mono tracking-wide text-[#00FF66]">
              Expect a reply within 24 hours.
            </p>
          </div>

          {/* ================= RIGHT — SOCIAL CARDS ================= */}
          <div className="relative">
            <div className="relative rounded-3xl border border-[#1E293B] p-6 sm:p-8 space-y-4 bg-[#0B0F17]/80 backdrop-blur-md flex flex-col justify-center h-full">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.platform}
                  href={link.href}
                  onClick={(e) => link.platform === "Email" && handleMailClick(e)}
                  target={link.platform === "Email" ? "_self" : "_blank"}
                  rel={link.platform === "Email" ? undefined : "noopener noreferrer"}
                  whileHover={{
                    scale: 1.03,
                    rotate: [0, -1, 1, -0.5, 0],
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative flex items-center justify-between
                           w-full rounded-2xl border border-[#1E293B] px-6 py-5
                           bg-[#131924]/60 text-white transition-all duration-300
                           hover:bg-[#00FF66] hover:text-black hover:border-[#00FF66] hover:shadow-[0_0_25px_rgba(0,255,102,0.25)] cursor-pointer"
                >
                  <div className="flex items-center gap-5">
                    <span className="p-2.5 rounded-xl bg-[#0B0F17] border border-[#1E293B] group-hover:border-black/20 text-[#00FF66] group-hover:text-black transition-colors">
                      {link.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold leading-tight group-hover:text-black transition-colors">
                        {link.platform}
                      </h3>
                      <p className="text-sm text-neutral-400 group-hover:text-black/80 font-sans">
                        {link.handle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {link.isPrimary && (
                      <span
                        className="hidden sm:flex px-3 py-1 text-[10px] uppercase tracking-wider
                                     font-bold rounded-full bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40
                                     group-hover:bg-black group-hover:text-[#00FF66] group-hover:border-transparent transition-colors"
                      >
                        {link.action}
                      </span>
                    )}
                    <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>

                  {/* Mobile Pulse for Primary */}
                  {link.isPrimary && (
                    <span className="absolute top-3 right-3 flex h-2 w-2 sm:hidden">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF66] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF66]"></span>
                    </span>
                  )}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
