import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Code, Globe, Server, Book, TrendingUp, BarChart2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { staggerContainer, fadeUp } from "../../utils/animations";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  icon: string;
  title: string;
}

const services: ServiceItem[] = [
  { icon: "Globe", title: "Custom Web Applications" },
  { icon: "Server", title: "Backend Systems Architecture" },
  { icon: "Code", title: "API Development & Integration" },
  { icon: "TrendingUp", title: "Performance Optimization" },
  { icon: "BarChart2", title: "Database Systems Design" },
  { icon: "Book", title: "Technical Code Evaluations" },
];

const iconMap: Record<string, React.ElementType> = {
  Code,
  Globe,
  Server,
  Book,
  TrendingUp,
  BarChart2,
};

const Services: React.FC = () => {
  const topRow = [...services, ...services, ...services];
  const bottomRow = [
    ...services.slice().reverse(),
    ...services.slice().reverse(),
    ...services.slice().reverse(),
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(topRowRef.current, {
        xPercent: -50,
        ease: "none",
        repeat: -1,
        duration: 35,
      });

      gsap.set(bottomRowRef.current, { xPercent: -50 });
      gsap.to(bottomRowRef.current, {
        xPercent: 0,
        ease: "none",
        repeat: -1,
        duration: 35,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="services"
      ref={containerRef}
      className="scroll-mt-14 py-12 lg:py-20 flex flex-col relative z-0 bg-[#0B0F17]"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 w-full"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Heading */}
        <motion.div variants={fadeUp}>
          <div className="mb-14">
            <h2 className="font-funnel font-extrabold text-[clamp(3.5rem,8vw,6rem)] leading-[1.05] tracking-tight text-white">
              What I <span className="font-extrabold text-[#10B981]">Offer</span>
            </h2>
            <p className="mt-4 text-base sm:text-xl leading-relaxed text-neutral-400 max-w-3xl font-sans">
              Specialized engineering capabilities focused on high-performance backend architecture, scalable full-stack applications, and clean system design.
            </p>
          </div>
        </motion.div>

        {/* Scroll Rows Container */}
        <motion.div
          variants={fadeUp}
          className="space-y-12 relative overflow-hidden w-full py-4"
        >
          {/* Top Row - scroll left */}
          <div ref={topRowRef} className="flex gap-6 sm:gap-8 w-max">
            {topRow.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <motion.div
                  key={`top-${index}`}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[180px] sm:w-[210px] md:w-[230px] flex-shrink-0 flex flex-col items-start py-4 px-3 cursor-pointer group"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-3.5 rounded-xl bg-[#00FF66]/15 border border-[#00FF66]/30 text-[#00FF66] group-hover:bg-[#00FF66] group-hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,102,0.15)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#00FF66] transition-colors leading-snug">
                    {service.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Row - scroll right */}
          <div
            ref={bottomRowRef}
            className="flex gap-6 sm:gap-8 w-max"
          >
            {bottomRow.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <motion.div
                  key={`bottom-${index}`}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[180px] sm:w-[210px] md:w-[230px] flex-shrink-0 flex flex-col items-start py-4 px-3 cursor-pointer group"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-3.5 rounded-xl bg-[#00FF66]/15 border border-[#00FF66]/30 text-[#00FF66] group-hover:bg-[#00FF66] group-hover:text-black transition-all shadow-[0_0_15px_rgba(0,255,102,0.15)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#00FF66] transition-colors leading-snug">
                    {service.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
