import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Download,
  X,
  Minus,
  Maximize2,
  Minimize2,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import CVPDF from "/assets/sample-cv.pdf";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  originRect: DOMRect | null;
}

export const CVModal: React.FC<CVModalProps> = ({
  isOpen,
  onClose,
  originRect,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener (Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen && !isMinimized) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isMinimized]);

  // Calculate position transform origins based on originRect button
  const getGenieTransformOrigin = () => {
    if (!originRect) return "center center";
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const originX = originRect.left + originRect.width / 2;
    const originY = originRect.top + originRect.height / 2;

    const xPercent = (originX / windowWidth) * 100;
    const yPercent = (originY / windowHeight) * 100;

    return `${xPercent}% ${yPercent}%`;
  };

  const transformOrigin = getGenieTransformOrigin();

  // macOS Genie animation variants
  const genieVariants: Variants = {
    hidden: {
      opacity: 0,
      scaleX: 0.15,
      scaleY: 0.05,
      y: originRect ? originRect.top - window.innerHeight / 2 : 100,
      x: originRect ? originRect.left - window.innerWidth / 2 : 0,
      borderRadius: "26px",
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0,
      borderRadius: isFullscreen ? "0px" : "26px",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 28,
        mass: 0.7,
      },
    },
    exit: {
      opacity: 0,
      scaleX: 0.1,
      scaleY: 0.02,
      x: originRect ? originRect.left - window.innerWidth / 2 : 0,
      y: originRect ? originRect.top - window.innerHeight / 2 + 20 : 100,
      transition: {
        duration: 0.35,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-5 md:p-8">
          {/* Clean Light Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 transition-opacity duration-200"
          />

          {/* ================= PURE WHITE macOS WINDOW ================= */}
          <motion.div
            ref={modalRef}
            variants={genieVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin }}
            className={`
              relative z-10 flex flex-col w-full bg-white text-neutral-900 
              border border-neutral-200/60 shadow-[0_20px_70px_rgba(0,0,0,0.12)] 
              overflow-hidden transition-all duration-300 font-sans
              ${
                isFullscreen
                  ? "w-screen h-screen rounded-none border-none p-0"
                  : "max-w-5xl h-[88vh] sm:h-[86vh] rounded-[26px]"
              }
            `}
          >
            {/* ================= THIN NEAT PURE WHITE HEADER ================= */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-white border-b border-neutral-100 select-none shrink-0">
              {/* Traffic Light Control Buttons */}
              <div className="flex items-center gap-2">
                {/* Red: Close */}
                <button
                  onClick={onClose}
                  title="Close (Esc)"
                  className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/60 flex items-center justify-center group cursor-pointer"
                >
                  <X className="w-2.5 h-2.5 text-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                </button>

                {/* Yellow: Minimize */}
                <button
                  onClick={() => {
                    setIsMinimized(true);
                    setTimeout(() => {
                      onClose();
                      setIsMinimized(false);
                    }, 400);
                  }}
                  title="Minimize"
                  className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/60 flex items-center justify-center group cursor-pointer"
                >
                  <Minus className="w-2.5 h-2.5 text-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                </button>

                {/* Green: Fullscreen */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/60 flex items-center justify-center group cursor-pointer"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-2.5 h-2.5 text-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                  ) : (
                    <Maximize2 className="w-2.5 h-2.5 text-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                  )}
                </button>
              </div>

              {/* Document Title */}
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-[#007AFF] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-neutral-800 truncate">
                  Saketh Chokkapu — Curriculum Vitae.pdf
                </span>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-3">
                <a
                  href={CVPDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new tab"
                  className="text-neutral-500 hover:text-black transition cursor-pointer hidden sm:block"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Pure Black Capsule Block Download CV Button */}
                <a
                  href={CVPDF}
                  download="Saketh_Chokkapu_CV.pdf"
                  className="
                    flex items-center gap-2 px-5 py-2 
                    bg-black hover:bg-neutral-800 active:bg-neutral-900 
                    text-white text-xs font-semibold rounded-full 
                    transition-all shadow-sm active:scale-95 cursor-pointer
                  "
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>

            {/* ================= 100% PURE WHITE DOCUMENT VIEW ================= */}
            <div className="relative flex-1 w-full h-full bg-white overflow-y-auto p-4 sm:p-8 md:p-12 selection:bg-neutral-200">
              <div className="max-w-3xl mx-auto bg-white text-neutral-900 font-serif leading-normal select-text">
                {/* Header */}
                <div className="text-center pb-6 mb-6 border-b border-neutral-200">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black mb-2 font-serif">
                    Saketh Chokkapu
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-600 flex flex-wrap justify-center items-center gap-x-3 gap-y-1 font-sans">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      Hyderabad, India
                    </span>
                    <span>•</span>
                    <a
                      href="mailto:chokkapusaketh@gmail.com"
                      className="flex items-center gap-1 hover:text-black hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5 text-neutral-500" />
                      chokkapusaketh@gmail.com
                    </a>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-neutral-500" />
                      +91-9392345156
                    </span>
                  </p>
                  <div className="flex justify-center items-center gap-4 mt-3 text-xs font-sans font-medium text-neutral-700">
                    <a
                      href="https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-black hover:underline"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-600" /> LinkedIn
                    </a>
                    <span>|</span>
                    <a
                      href="https://github.com/Ch-saketh"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:text-black hover:underline"
                    >
                      <Github className="w-3.5 h-3.5 text-neutral-900" /> GitHub
                    </a>
                    <span>|</span>
                    <a
                      href="#"
                      className="flex items-center gap-1 hover:text-black hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5 text-neutral-700" /> Portfolio
                    </a>
                  </div>
                </div>

                {/* Experience */}
                <section className="mb-6 font-sans">
                  <h2 className="text-sm uppercase tracking-widest font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
                    Experience
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-base font-bold text-black">
                          Handshake AI
                        </h3>
                        <span className="text-xs font-semibold text-neutral-500">
                          Remote | 2025 – Present
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-neutral-700 italic mb-1.5">
                        AI Technical Trainer & Code Evaluator (Contract)
                      </p>
                      <ul className="list-disc list-outside ml-4 text-xs text-neutral-700 space-y-1 leading-relaxed">
                        <li>
                          Evaluated AI-generated code snippets and system designs across Python, Java, and SQL for logical correctness, performance, and security edge cases.
                        </li>
                        <li>
                          Authored complex technical test prompts and benchmark suites to evaluate LLM reasoning capabilities and code output reliability.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-base font-bold text-black">
                          NexLevr
                        </h3>
                        <span className="text-xs font-semibold text-neutral-500">
                          Remote | 2024 – Present
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-neutral-700 italic mb-1.5">
                        Software Engineering Intern
                      </p>
                      <ul className="list-disc list-outside ml-4 text-xs text-neutral-700 space-y-1 leading-relaxed">
                        <li>
                          Maintained backend stability for the NexLevr platform while developing new features to enhance user engagement.
                        </li>
                        <li>
                          Contributed to full-stack web development and REST API integration across core platform services.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Technical Skills */}
                <section className="mb-6 font-sans">
                  <h2 className="text-sm uppercase tracking-widest font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
                    Technical Skills
                  </h2>
                  <div className="space-y-1.5 text-xs text-neutral-800">
                    <p>
                      <strong className="font-semibold text-black">Languages:</strong> Java, Python, SQL, JavaScript, TypeScript
                    </p>
                    <p>
                      <strong className="font-semibold text-black">Frameworks & Libraries:</strong> Spring Boot, Spring Security, Hibernate, JPA, React.js, Node.js, Express.js, Flask, REST APIs, WebSockets
                    </p>
                    <p>
                      <strong className="font-semibold text-black">Tools & Databases:</strong> Docker, MongoDB, MySQL, PostgreSQL, Git, GitHub, Linux (Fedora), Hugging Face, Postman, VS Code
                    </p>
                  </div>
                </section>

                {/* Projects */}
                <section className="mb-6 font-sans">
                  <h2 className="text-sm uppercase tracking-widest font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
                    Projects
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-bold text-black">
                          LUXZERA — Intelligent Fashion Discovery Platform{" "}
                          <a
                            href="https://github.com/Ch-saketh"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline font-normal text-xs ml-1"
                          >
                            [GitHub]
                          </a>
                        </h3>
                        <span className="text-xs font-semibold text-neutral-500">
                          Jan 2025 – Present
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-xs text-neutral-700 space-y-1 leading-relaxed mt-1">
                        <li>
                          Developed a fashion discovery web app within a two-engineer team, curating complete outfits tailored to a user’s specific dimensions.
                        </li>
                        <li>
                          Designed transaction-safe API endpoints in Java and Spring Boot to manage live user preference states, secure account verification, and checkout data blocks.
                        </li>
                        <li>
                          Separated application logic into decoupled layers while tuning relational schemas via Hibernate to fix N+1 query loops, reducing latency from 150ms to 60ms.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-bold text-black">
                          QUANTUM-SECURE E-AUCTION SYSTEM (BB84 Protocol){" "}
                          <a
                            href="https://github.com/Ch-saketh"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline font-normal text-xs ml-1"
                          >
                            [GitHub]
                          </a>
                        </h3>
                        <span className="text-xs font-semibold text-neutral-500">
                          Jan 2025 – Present
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-xs text-neutral-700 space-y-1 leading-relaxed mt-1">
                        <li>
                          Architected a tamper-proof e-auction platform built with React (Vite), Tailwind CSS, Node.js, Express.js, WebSockets, and MongoDB.
                        </li>
                        <li>
                          Implemented BB84 Quantum Key Distribution (QKD) simulation to generate unique quantum keys, encrypting every bid payload for confidential transmission.
                        </li>
                        <li>
                          Integrated Quantum Bit Error Rate (QBER) monitoring logic to detect eavesdropping real-time, preventing bid interception and tampering.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-bold text-black">
                          HYBRID BOOK RECOMMENDATION PLATFORM — Machine Learning Engine{" "}
                          <a
                            href="https://huggingface.co"
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:underline font-normal text-xs ml-1"
                          >
                            [Hugging Face]
                          </a>
                        </h3>
                        <span className="text-xs font-semibold text-neutral-500">
                          May 2024 – June 2024
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-xs text-neutral-700 space-y-1 leading-relaxed mt-1">
                        <li>
                          Built an end-to-end data pipeline as Team Head, processing over 3 million data rows from the Amazon Book Reviews dataset alongside structured content arrays.
                        </li>
                        <li>
                          Engineered a hybrid retrieval flow combining TF-IDF textual features with a collaborative LightFM model using a sparse interaction matrix to resolve cold-start issues.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Technical Achievements */}
                <section className="mb-6 font-sans">
                  <h2 className="text-sm uppercase tracking-widest font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
                    Technical Achievements & Hackathons
                  </h2>
                  <ul className="list-disc list-outside ml-4 text-xs text-neutral-700 space-y-1.5 leading-relaxed">
                    <li>
                      <strong className="font-semibold text-black">
                        Amaravati Quantum Valley Hackathon — 2nd Prize:
                      </strong>{" "}
                      Served as Lead Frontend Developer for Team Ekalavya (Problem Statement AQVH911); built the real-time encryption interface for a Quantum-Secure E-Auction System.
                    </li>
                    <li>
                      <strong className="font-semibold text-black">
                        National AI Hackathon — 2nd Prize:
                      </strong>{" "}
                      Deployed interface layout components and state management routines for an automated evaluator system detecting data anomalies under high request volumes.
                    </li>
                  </ul>
                </section>

                {/* Education */}
                <section className="font-sans">
                  <h2 className="text-sm uppercase tracking-widest font-bold text-neutral-900 border-b border-neutral-300 pb-1 mb-3">
                    Education
                  </h2>
                  <div className="flex justify-between items-baseline text-xs">
                    <div>
                      <h3 className="font-bold text-black text-sm">
                        SRKR Engineering College
                      </h3>
                      <p className="text-neutral-700">
                        Bachelor of Technology in Computer Science (AIDS)
                      </p>
                    </div>
                    <span className="font-semibold text-neutral-500">
                      2023 – 2027
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;
