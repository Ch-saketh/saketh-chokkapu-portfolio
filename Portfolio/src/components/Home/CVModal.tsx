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
      borderRadius: "24px",
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
          {/* Simple Clean Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/45 transition-opacity duration-200"
          />

          {/* ================= LIGHT THEME macOS WINDOW ================= */}
          <motion.div
            ref={modalRef}
            variants={genieVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin }}
            className={`
              relative z-10 flex flex-col w-full bg-white text-neutral-900 
              border border-neutral-200/90 shadow-[0_30px_90px_rgba(0,0,0,0.2)] 
              overflow-hidden transition-all duration-300 font-sans
              ${
                isFullscreen
                  ? "w-screen h-screen rounded-none border-none p-0"
                  : "max-w-5xl h-[88vh] sm:h-[86vh] rounded-[26px]"
              }
            `}
          >
            {/* ================= THIN NEAT LIGHT HEADER ================= */}
            <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-white border-b border-neutral-200 select-none">
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
                <span className="text-xs sm:text-sm font-medium tracking-tight text-neutral-800 truncate">
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

                {/* Capsule Block Download CV Button */}
                <a
                  href={CVPDF}
                  download="Saketh_Chokkapu_CV.pdf"
                  className="
                    flex items-center gap-2 px-5 py-2 
                    bg-[#007AFF] hover:bg-[#0062CC] active:bg-[#0051B3] 
                    text-white text-xs font-semibold rounded-full 
                    transition-all shadow-sm active:scale-95 cursor-pointer
                  "
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </a>
              </div>
            </div>

            {/* ================= PDF VIEWING AREA ================= */}
            <div className="relative flex-1 w-full h-full bg-white overflow-hidden">
              <iframe
                src={`${CVPDF}#toolbar=0&navpanes=0&scrollbar=1`}
                title="Curriculum Vitae Preview"
                className="w-full h-full border-none bg-white"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;
