import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Download,
  X,
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
  originRect: _originRect,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const annotationRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener (Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Render original PDF onto pure white HTML canvas edge-to-edge with ZERO GAPS
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

        const context = canvas.getContext("2d", { alpha: false });
        if (!context) return;

        // Calculate EXACT fit scale to fill 100% of container width with ZERO GAPS
        const containerWidth = containerRef.current
          ? containerRef.current.clientWidth
          : window.innerWidth * 0.8;
        const baseViewport = page.getViewport({ scale: 1.0 });
        const fitScale = containerWidth / baseViewport.width;

        // Display viewport for 100% edge-to-edge width matching
        const displayViewport = page.getViewport({ scale: fitScale });

        // Ultra High-DPI Resolution for 100% Razor-Sharp Crisp Text
        const dpr = window.devicePixelRatio || 2;
        const renderScale = fitScale * Math.max(dpr * 2, 2.5);
        const viewport = page.getViewport({ scale: renderScale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        canvas.style.width = `${displayViewport.width}px`;
        canvas.style.height = `${displayViewport.height}px`;

        // Enable image sharpening & text anti-aliasing
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Render Interactive Link Annotations over Canvas
        if (annotationRef.current) {
          const annotations = await page.getAnnotations();
          const annotationDiv = annotationRef.current;
          annotationDiv.innerHTML = "";
          annotationDiv.style.width = `${displayViewport.width}px`;
          annotationDiv.style.height = `${displayViewport.height}px`;

          annotations.forEach((annot: any) => {
            if (annot.subtype === "Link" && (annot.url || annot.dest)) {
              const link = document.createElement("a");
              link.href = annot.url || "#";
              if (annot.url) {
                link.target = "_blank";
                link.rel = "noopener noreferrer";
              }
              link.className =
                "absolute cursor-pointer rounded hover:bg-blue-500/15 transition-colors";

              // Convert PDF bounding box [x1, y1, x2, y2] to CSS coordinates
              const rect = displayViewport.convertToViewportRectangle(annot.rect);
              const left = Math.min(rect[0], rect[2]);
              const top = Math.min(rect[1], rect[3]);
              const width = Math.abs(rect[2] - rect[0]);
              const height = Math.abs(rect[3] - rect[1]);

              link.style.left = `${left}px`;
              link.style.top = `${top}px`;
              link.style.width = `${width}px`;
              link.style.height = `${height}px`;
              link.title = annot.url || "Open Link";

              annotationDiv.appendChild(link);
            }
          });
        }

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

  // Premium Apple Spatial Pop-Up Animation Variants
  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.94,
      y: 16,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 28,
        mass: 0.6,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 12,
      filter: "blur(4px)",
      transition: {
        duration: 0.2,
        ease: [0.32, 0, 0.67, 0],
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
            className="absolute inset-0 bg-black/35 backdrop-blur-xs transition-opacity duration-200"
          />

          {/* ================= 100% PURE WHITE macOS WINDOW ================= */}
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 flex flex-col w-full max-w-5xl h-[88vh] sm:h-[86vh] rounded-[26px] bg-white text-neutral-900 border border-neutral-200/80 shadow-[0_25px_80px_rgba(0,0,0,0.18)] overflow-hidden transition-all duration-300 font-sans"
          >
            {/* ================= THIN NEAT WHITE HEADER ================= */}
            <div className="relative flex items-center justify-between px-4 sm:px-5 py-3 bg-white border-b border-neutral-100 select-none shrink-0 gap-2">
              {/* Single Red Close (X) Button on Far Left */}
              <div className="flex items-center">
                <button
                  onClick={onClose}
                  title="Close (Esc)"
                  className="w-8 h-8 rounded-full bg-[#FF5F56] hover:bg-[#E0443E] active:bg-[#C93832] text-white border border-[#E0443E]/60 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-90 shrink-0"
                >
                  <X className="w-4.5 h-4.5 stroke-[2.5]" />
                </button>
              </div>

              {/* Perfectly Centered Document Title */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 max-w-[45%] sm:max-w-[60%] truncate pointer-events-none">
                <FileText className="w-4 h-4 text-[#007AFF] shrink-0" />
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-neutral-800 truncate">
                  Saketh Chokkapu — Resume.pdf
                </span>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href={CVPDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new tab"
                  className="text-neutral-500 hover:text-black transition cursor-pointer hidden md:block"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Pure Black Capsule Block Download Button */}
                <a
                  href={CVPDF}
                  download="Saketh_Chokkapu_Resume.pdf"
                  className="
                    flex items-center gap-2 px-4 sm:px-5 py-2 
                    bg-black hover:bg-neutral-800 active:bg-neutral-900 
                    text-white text-xs font-semibold rounded-full 
                    transition-all shadow-sm active:scale-95 cursor-pointer shrink-0
                  "
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download CV</span>
                </a>
              </div>
            </div>

            {/* ================= 100% EDGE-TO-EDGE ZERO GAPS CANVAS VIEWPORT ================= */}
            <div
              ref={containerRef}
              className="relative flex-1 w-full h-full bg-white overflow-y-auto overflow-x-hidden p-0 m-0 flex flex-col items-center justify-start"
            >
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-black" />
                  <span className="text-xs font-medium">Loading Document...</span>
                </div>
              )}

              {/* Edge-to-Edge Canvas + Clickable Links Layer */}
              <div className="relative w-full flex justify-center items-start p-0 m-0">
                <canvas
                  ref={canvasRef}
                  style={{
                    imageRendering: "-webkit-optimize-contrast",
                    WebkitFontSmoothing: "antialiased",
                  }}
                  className={`w-full h-auto bg-white border-none rounded-none shadow-none p-0 m-0 block ${
                    isLoading || loadError ? "hidden" : "block"
                  }`}
                />

                {/* Clickable PDF Link Overlay Layer */}
                <div
                  ref={annotationRef}
                  className="absolute inset-0 pointer-events-auto z-10"
                />
              </div>

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
