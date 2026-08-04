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
  Loader2,
} from "lucide-react";
import CVPDF from "/assets/sample-cv.pdf";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  originRect: DOMRect | null;
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export const CVModal: React.FC<CVModalProps> = ({
  isOpen,
  onClose,
  originRect,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Render original PDF onto pure white HTML canvas using PDF.js
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setIsLoading(true);
    setLoadError(false);

    const loadAndRenderPdf = async () => {
      try {
        // Load PDF.js library dynamically if not present
        if (!window.pdfjsLib) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src =
              "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        if (!window.pdfjsLib) throw new Error("PDF.js failed to load");

        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        // Load document
        const loadingTask = window.pdfjsLib.getDocument(CVPDF);
        const pdf = await loadingTask.promise;

        if (!isMounted) return;

        // Render Page 1 to high-DPI canvas
        const page = await pdf.getPage(1);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Render at 2.5x resolution for ultra-sharp crisp text rendering
        const scale = 2.5;
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        if (isMounted) {
          setIsLoading(false);
        }
      } catch (err) {
        console.error("PDF.js render error:", err);
        if (isMounted) {
          setLoadError(true);
          setIsLoading(false);
        }
      }
    };

    loadAndRenderPdf();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

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

  // macOS 3D Genie Lamp Warp animation variants
  const genieVariants: Variants = {
    hidden: {
      opacity: 0,
      scaleX: 0.08,
      scaleY: 0.03,
      rotateX: 42,
      skewX: -12,
      x: originRect ? originRect.left + originRect.width / 2 - window.innerWidth / 2 : 0,
      y: originRect ? originRect.top + originRect.height / 2 - window.innerHeight / 2 : 100,
      clipPath: "polygon(38% 0%, 62% 0%, 54% 100%, 46% 100%)",
      filter: "blur(14px) saturate(1.8)",
    },
    visible: {
      opacity: [0, 0.7, 1, 1],
      scaleX: [0.08, 0.45, 0.85, 1],
      scaleY: [0.03, 0.3, 0.75, 1],
      rotateX: [42, 20, 5, 0],
      skewX: [-12, -6, -1, 0],
      x: [
        originRect ? originRect.left + originRect.width / 2 - window.innerWidth / 2 : 0,
        originRect ? (originRect.left + originRect.width / 2 - window.innerWidth / 2) * 0.6 : 0,
        originRect ? (originRect.left + originRect.width / 2 - window.innerWidth / 2) * 0.2 : 0,
        0,
      ],
      y: [
        originRect ? originRect.top + originRect.height / 2 - window.innerHeight / 2 : 100,
        originRect ? (originRect.top + originRect.height / 2 - window.innerHeight / 2) * 0.5 : 50,
        originRect ? (originRect.top + originRect.height / 2 - window.innerHeight / 2) * 0.15 : 10,
        0,
      ],
      clipPath: [
        "polygon(38% 0%, 62% 0%, 54% 100%, 46% 100%)",
        "polygon(18% 0%, 82% 0%, 65% 100%, 35% 100%)",
        "polygon(5% 0%, 95% 0%, 88% 100%, 12% 100%)",
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      ],
      filter: ["blur(14px)", "blur(6px)", "blur(2px)", "blur(0px)"],
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: [1, 0.8, 0.4, 0],
      scaleX: [1, 0.7, 0.35, 0.08],
      scaleY: [1, 0.6, 0.2, 0.02],
      rotateX: [0, 15, 30, 45],
      skewX: [0, 5, 10, 15],
      x: [
        0,
        originRect ? (originRect.left + originRect.width / 2 - window.innerWidth / 2) * 0.3 : 0,
        originRect ? (originRect.left + originRect.width / 2 - window.innerWidth / 2) * 0.7 : 0,
        originRect ? originRect.left + originRect.width / 2 - window.innerWidth / 2 : 0,
      ],
      y: [
        0,
        originRect ? (originRect.top + originRect.height / 2 - window.innerHeight / 2) * 0.3 : 25,
        originRect ? (originRect.top + originRect.height / 2 - window.innerHeight / 2) * 0.7 : 75,
        originRect ? originRect.top + originRect.height / 2 - window.innerHeight / 2 : 100,
      ],
      clipPath: [
        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        "polygon(8% 0%, 92% 0%, 75% 100%, 25% 100%)",
        "polygon(22% 0%, 78% 0%, 60% 100%, 40% 100%)",
        "polygon(40% 0%, 60% 0%, 52% 100%, 48% 100%)",
      ],
      filter: ["blur(0px)", "blur(4px)", "blur(10px)", "blur(16px)"],
      transition: {
        duration: 0.48,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-5 md:p-8">
          {/* Clean Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/30 transition-opacity duration-200"
          />

          {/* ================= 100% PURE WHITE macOS WINDOW ================= */}
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
            {/* ================= THIN NEAT WHITE HEADER ================= */}
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

            {/* ================= 100% PURE WHITE CANVAS VIEWPORT ================= */}
            <div className="relative flex-1 w-full h-full bg-white overflow-auto flex flex-col items-center justify-start p-4 sm:p-6 md:p-8">
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-black" />
                  <span className="text-xs font-medium">Loading Document...</span>
                </div>
              )}

              {/* High-DPI Crisp Canvas for Original PDF Pages */}
              <canvas
                ref={canvasRef}
                className={`max-w-full h-auto bg-white border border-neutral-200/80 shadow-md rounded-md transition-opacity duration-300 ${
                  isLoading || loadError ? "hidden" : "block"
                }`}
              />

              {/* Fallback Iframe if script block or CDN fallback */}
              {loadError && (
                <iframe
                  src={`${CVPDF}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`}
                  title="Curriculum Vitae Preview"
                  className="w-full h-full bg-white border-none"
                  style={{ border: "none", outline: "none", background: "white" }}
                />
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;
