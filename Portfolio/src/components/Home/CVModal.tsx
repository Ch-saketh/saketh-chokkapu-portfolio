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
  ZoomIn,
  ZoomOut,
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
  const [zoomScale, setZoomScale] = useState(1);
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const annotationRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut listener (Esc to close, + / - to zoom)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "=" || e.key === "+") {
        setZoomScale((prev) => Math.min(prev + 0.15, 2.5));
      } else if (e.key === "-") {
        setZoomScale((prev) => Math.max(prev - 0.15, 0.5));
      } else if (e.key === "0" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setZoomScale(1);
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

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.08, 2.0));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.08, 0.7));
  const handleResetZoom = () => setZoomScale(1);

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

  // 60fps Fluid macOS Window Spring Animation
  const genieVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.05,
      x: originRect ? originRect.left + originRect.width / 2 - window.innerWidth / 2 : 0,
      y: originRect ? originRect.top + originRect.height / 2 - window.innerHeight / 2 : 100,
      borderRadius: "40px",
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      borderRadius: isFullscreen ? "0px" : "26px",
      transition: {
        type: "spring",
        stiffness: 360,
        damping: 26,
        mass: 0.6,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.05,
      x: originRect ? originRect.left + originRect.width / 2 - window.innerWidth / 2 : 0,
      y: originRect ? originRect.top + originRect.height / 2 - window.innerHeight / 2 : 100,
      borderRadius: "40px",
      transition: {
        duration: 0.25,
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
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-white border-b border-neutral-100 select-none shrink-0 gap-2">
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
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Zoom In & Zoom Out Control Pills */}
                <div className="flex items-center gap-1 bg-neutral-100 rounded-full px-2 py-1 text-xs font-medium text-neutral-700">
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomScale <= 0.5}
                    title="Zoom Out (-)"
                    className="p-1 hover:bg-white rounded-full transition disabled:opacity-30 cursor-pointer"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    title="Reset Zoom (100%)"
                    className="px-1.5 py-0.5 hover:bg-white rounded-full transition text-[11px] font-bold tracking-tight cursor-pointer"
                  >
                    {Math.round(zoomScale * 100)}%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomScale >= 2.5}
                    title="Zoom In (+)"
                    className="p-1 hover:bg-white rounded-full transition disabled:opacity-30 cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <a
                  href={CVPDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new tab"
                  className="text-neutral-500 hover:text-black transition cursor-pointer hidden md:block"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Pure Black Capsule Block Download CV Button */}
                <a
                  href={CVPDF}
                  download="Saketh_Chokkapu_CV.pdf"
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
              onWheel={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  e.preventDefault();
                  // Fine-grained micro zoom proportional to exact finger movement
                  const zoomSensitivity = 0.0015;
                  const delta = -e.deltaY * zoomSensitivity;
                  setZoomScale((prev) => Math.min(Math.max(prev + delta, 0.7), 2.0));
                }
              }}
            >
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-neutral-500 gap-3">
                  <Loader2 className="w-6 h-6 animate-spin text-black" />
                  <span className="text-xs font-medium">Loading Document...</span>
                </div>
              )}

              {/* Edge-to-Edge Canvas + Clickable Links Layer */}
              <div
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: "top center",
                }}
                className="relative w-full transition-transform duration-200 ease-out flex justify-center items-start p-0 m-0"
              >
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
