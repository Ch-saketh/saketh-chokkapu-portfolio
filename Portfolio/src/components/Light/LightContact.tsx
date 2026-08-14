import {
  Mail,
  Linkedin,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeUp, hoverScale } from "../../utils/animations";
import { handleMailClick } from "../../utils/constants";

const LightContact: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const socialLinks = [
    {
      platform: "WhatsApp",
      handle: "Chat directly",
      action: "Fastest reply",
      icon: <MessageCircle strokeWidth={1.5} className="w-5 h-5" />,
      href: "https://wa.me/9392345156?text=Hello%20there",
      isPrimary: true,
    },
    {
      platform: "LinkedIn",
      handle: "Professional profile",
      action: "Connect",
      icon: <Linkedin strokeWidth={1.5} className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9",
      isPrimary: false,
    },
    {
      platform: "Email",
      handle: "Detailed inquiries",
      action: "Send email",
      icon: <Mail strokeWidth={1.5} className="w-5 h-5" />,
      href: "mailto:chokkapusaketh@gmail.com",
      isPrimary: false,
    },
  ];

  return (
    <section
      id="contact"
      className="scroll-mt-14 py-8 lg:py-16 sm:px-2 relative z-20 bg-[#F6F5F2]"
    >
      <div className="bg-[#1A1A1A] rounded-3xl px-6 py-8 sm:py-10 sm:px-10 md:py-14 shadow-2xl">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.h2
              variants={fadeUp}
              className="font-funnel max-w-xl text-[clamp(3.5rem,8vw,6rem)] font-extrabold leading-[1] tracking-tight"
              style={{ color: "#FFFFFF" }}
            >
              Let’s create
              <br />
              something
              <span className="mt-2 block font-light" style={{ color: "#A3A3A3" }}>
                meaningful
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="mt-10 max-w-lg text-lg sm:text-xl leading-relaxed font-sans"
              style={{ color: "#D4D4D4" }}
            >
              Whether it’s a product, startup idea, or a complex engineering
              challenge — I’m always open to thoughtful conversations.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-6 text-base tracking-wide font-mono"
              style={{ color: "#A3A3A3" }}
            >
              Expect a reply within 24 hours.
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div
              className="absolute inset-0 -translate-x-4 -translate-y-4
                          rounded-3xl border border-white/10 hidden sm:block pointer-events-none"
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="relative rounded-3xl sm:border border-white/10
                       sm:p-8 lg:p-10 space-y-4 bg-[#111111] flex flex-col justify-center h-full shadow-xl"
            >
              {socialLinks.map((link, index) => {
                const isHovered = hoveredIndex === index;

                return (
                  <motion.a
                    key={link.platform}
                    href={link.href}
                    onClick={(e) => link.platform === "Email" && handleMailClick(e)}
                    target={link.platform === "Email" ? "_self" : "_blank"}
                    rel={link.platform === "Email" ? undefined : "noopener noreferrer"}
                    variants={fadeUp}
                    whileHover={hoverScale}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="relative flex items-center justify-between
                             w-full rounded-2xl border px-6 py-5 cursor-pointer transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.05)",
                      borderColor: isHovered ? "#FFFFFF" : "rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="flex items-center gap-4 sm:gap-5">
                      <span
                        className="p-2.5 rounded-full border transition-colors flex items-center justify-center"
                        style={{
                          borderColor: isHovered ? "rgba(26, 26, 26, 0.2)" : "rgba(255, 255, 255, 0.2)",
                          color: isHovered ? "#1A1A1A" : "#FFFFFF",
                        }}
                      >
                        {link.icon}
                      </span>
                      <div>
                        <h3
                          className="text-lg font-bold leading-tight font-funnel transition-colors"
                          style={{ color: isHovered ? "#1A1A1A" : "#FFFFFF" }}
                        >
                          {link.platform}
                        </h3>
                        <p
                          className="text-xs sm:text-sm font-sans transition-colors font-light"
                          style={{ color: isHovered ? "#555555" : "#A3A3A3" }}
                        >
                          {link.handle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {link.isPrimary && (
                        <span
                          className="hidden sm:inline-flex px-3 py-1 text-[10px] uppercase tracking-wider
                                       font-bold rounded-full border transition-colors"
                          style={{
                            backgroundColor: isHovered ? "#1A1A1A" : "rgba(255, 255, 255, 0.15)",
                            color: isHovered ? "#FFFFFF" : "#FFFFFF",
                            borderColor: isHovered ? "#1A1A1A" : "rgba(255, 255, 255, 0.25)",
                          }}
                        >
                          {link.action}
                        </span>
                      )}
                      <ArrowUpRight
                        className="w-5 h-5 transition-all"
                        style={{
                          color: isHovered ? "#1A1A1A" : "#A3A3A3",
                          transform: isHovered ? "translate(2px, -2px)" : "none",
                        }}
                      />
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LightContact;
