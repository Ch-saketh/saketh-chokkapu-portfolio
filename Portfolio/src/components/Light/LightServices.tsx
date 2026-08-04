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
  { icon: "Server", title: "Full-Stack App Development" },
  { icon: "Code", title: "Websites for Startups" },
  { icon: "TrendingUp", title: "SEO Optimization" },
  { icon: "BarChart2", title: "Google Analytics Setup" },
  { icon: "Book", title: "Courses & Training" },
];

const iconMap: Record<string, React.ElementType> = {
  Code,
  Globe,
  Server,
  Book,
  TrendingUp,
  BarChart2,
};

const LightServices: React.FC = () => {
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
      className="scroll-mt-14 py-8 lg:py-16 flex flex-col relative z-0 sticky top-16 bg-[#F6F5F2] text-[#222222]"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 w-full"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeUp}>
          <div className="mb-16">
            <h2 className="font-funnel font-extrabold text-[clamp(3.5rem,8vw,6rem)] leading-[1.05] tracking-tight text-[#222222]">
              What I <span className="font-extrabold">Offer</span>
            </h2>
            <p className="mt-6 text-base sm:text-xl leading-[1.9] text-neutral-600 max-w-3xl">
              Services to help bring your ideas to life — from development to
              optimization and learning.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="space-y-16 relative overflow-hidden w-full"
        >
          <div ref={topRowRef} className="flex gap-4 sm:gap-6 md:gap-8 w-max">
            {topRow.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <div
                  key={`top-${index}`}
                  className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] flex-shrink-0 flex flex-col items-start cursor-pointer hover:opacity-70 transition-opacity duration-300"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 rounded-full border border-neutral-300">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#222222]" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#222222]">
                    {service.title}
                  </h3>
                </div>
              );
            })}
          </div>

          <div
            ref={bottomRowRef}
            className="flex gap-4 sm:gap-6 md:gap-8 w-max"
          >
            {bottomRow.map((service, index) => {
              const Icon = iconMap[service.icon] || Code;
              return (
                <div
                  key={`bottom-${index}`}
                  className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] flex-shrink-0 flex flex-col items-start cursor-pointer hover:opacity-70 transition-opacity duration-300"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 rounded-full border border-neutral-300">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#222222]" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#222222]">
                    {service.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LightServices;
