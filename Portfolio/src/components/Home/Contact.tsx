import {
  Mail,
  Linkedin,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import React from "react";
import { GMAIL_URL, handleMailClick } from "../../utils/constants";

/* =======================
   TYPES & DATA
   ======================= */

interface SocialLinkItem {
  platform: string;
  handle: string;
  action: string;
  icon: React.ReactNode;
  href: string;
  isPrimary?: boolean;
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
      href: GMAIL_URL,
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
            <h2 className="font-funnel font-extrabold text-[clamp(2.8rem,7vw,4.5rem)] leading-[1.05] tracking-tight text-white mb-6">
              Let’s build something <br />
              <span className="text-[#00FF66]">exceptional</span>.
            </h2>
            <p className="text-[#00FF66] text-lg sm:text-xl font-medium tracking-tight mb-4 font-sans">
              Currently open for full-stack engineering roles, freelance opportunities, and collaborative technical projects.
            </p>
            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-sans max-w-xl">
              Whether you need scalable web systems, clean API integrations, database optimization, or custom software solutions — let’s connect.
            </p>
          </div>

          {/* ================= RIGHT — DIRECT CHANNELS ================= */}
          <div className="flex flex-col gap-4">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => link.platform === "Email" && handleMailClick(e)}
                className={`group flex items-center justify-between p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                  link.isPrimary
                    ? "bg-[#00FF66]/10 border-[#00FF66]/40 hover:border-[#00FF66] hover:bg-[#00FF66]/20"
                    : "bg-[#0B0F17]/60 border-neutral-800 hover:border-[#00FF66]/50 hover:bg-[#131924]"
                }`}
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <div className="p-3 rounded-xl bg-[#0B0F17] border border-neutral-800 group-hover:border-[#00FF66]/40 transition-colors">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-funnel font-bold text-lg sm:text-xl text-white group-hover:text-[#00FF66] transition-colors">
                      {link.platform}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-sans">
                      {link.handle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#00FF66] font-medium">
                  <span>{link.action}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
