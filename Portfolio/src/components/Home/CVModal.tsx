import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Download,
  X,
  Minus,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  FileText,
  CheckCircle2,
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
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isCopied, setIsCopied] = useState(false);
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
      filter: "blur(12px) contrast(1.2)",
      borderRadius: "40px",
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0,
      filter: "blur(0px) contrast(1)",
      borderRadius: isFullscreen ? "0px" : "16px",
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 24,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scaleX: 0.1,
      scaleY: 0.02,
      x: originRect ? originRect.left - window.innerWidth / 2 : 0,
      y: originRect ? originRect.top - window.innerHeight / 2 + 20 : 100,
      filter: "blur(16px) saturate(1.8)",
      transition: {
        duration: 0.45,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));
  const handleResetZoom = () => setZoomLevel(100);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + CVPDF);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-300"
          />

          {/* macOS Window Container */}
          <motion.div
            ref={modalRef}
            variants={genieVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin }}
            className={`
              relative z-10 flex flex-col w-full bg-neutral-900/95 border border-white/20 
              shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl text-neutral-100 
              overflow-hidden transition-all duration-300
              ${
                isFullscreen
                  ? "w-screen h-screen rounded-none border-none p-0"
                  : "max-w-5xl h-[88vh] sm:h-[85vh] rounded-2xl"
              }
            `}
          >
            {/* ================= macOS WINDOW HEADER ================= */}
            <div className="flex items-center justify-between px-4 py-3 bg-neutral-800/80 border-b border-white/10 select-none">
              {/* Traffic Light Window Buttons */}
              <div className="flex items-center gap-2 w-28">
                {/* Red: Close */}
                <button
                  onClick={onClose}
                  title="Close Window (Esc)"
                  className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 active:bg-[#E0443E] border border-[#E0443E]/40 flex items-center justify-center group transition-colors shadow-sm cursor-pointer"
                >
                  <X className="w-2.5 h-2.5 text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                </button>

                {/* Yellow: Minimize (Genie effect trigger) */}
                <button
                  onClick={() => {
                    setIsMinimized(true);
                    setTimeout(() => {
                      onClose();
                      setIsMinimized(false);
                    }, 400);
                  }}
                  title="Minimize Window"
                  className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 active:bg-[#DEA123] border border-[#DEA123]/40 flex items-center justify-center group transition-colors shadow-sm cursor-pointer"
                >
                  <Minus className="w-2.5 h-2.5 text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                </button>

                {/* Green: Fullscreen Toggle */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  className="w-3.5 h-3.5 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 active:bg-[#1AAB29] border border-[#1AAB29]/40 flex items-center justify-center group transition-colors shadow-sm cursor-pointer"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-2.5 h-2.5 text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                  ) : (
                    <Maximize2 className="w-2.5 h-2.5 text-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                  )}
                </button>
              </div>

              {/* Title & Document Badge */}
              <div className="flex items-center gap-2 max-w-[40%] sm:max-w-md truncate">
                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="text-xs sm:text-sm font-medium tracking-wide text-neutral-200 truncate">
                  Saketh_Chokkapu_CV.pdf
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-neutral-700/60 text-neutral-300 rounded border border-neutral-600/50">
                  PDF Preview
                </span>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Download CV Action Button */}
                <a
                  href={CVPDF}
                  download="Saketh_Chokkapu_CV.pdf"
                  className="
                    flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-1.5 
                    bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 
                    text-white text-xs font-medium rounded-lg shadow-md shadow-blue-500/20 
                    hover:shadow-blue-500/30 transition-all active:scale-95 cursor-pointer
                  "
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="font-semibold">Download CV</span>
                </a>

                {/* Open in New Tab Button */}
                <a
                  href={CVPDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in new browser tab"
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700/60 rounded-lg transition-colors cursor-pointer hidden sm:flex"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-700/60 rounded-lg transition-colors cursor-pointer sm:hidden"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ================= SECONDARY CONTROL TOOLBAR ================= */}
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-950/70 border-b border-white/5 text-xs text-neutral-400">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                  title="Zoom Out"
                  className="p-1 hover:text-white hover:bg-neutral-800 rounded disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-[11px] font-mono text-neutral-300">
                  {zoomLevel}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  title="Zoom In"
                  className="p-1 hover:text-white hover:bg-neutral-800 rounded disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                {zoomLevel !== 100 && (
                  <button
                    onClick={handleResetZoom}
                    title="Reset Zoom"
                    className="p-1 ml-1 text-blue-400 hover:bg-neutral-800 rounded transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyLink}
                  className="hover:text-neutral-200 transition flex items-center gap-1 text-[11px] cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Link Copied!</span>
                    </>
                  ) : (
                    <span>Copy PDF Link</span>
                  )}
                </button>
                <span className="hidden sm:inline text-neutral-600">|</span>
                <span className="hidden sm:inline text-[11px]">macOS Window Mode</span>
              </div>
            </div>

            {/* ================= PDF VIEWING BODY ================= */}
            <div className="relative flex-1 w-full h-full overflow-auto bg-neutral-950 p-2 sm:p-4 flex items-center justify-center">
              <div
                className="w-full h-full flex justify-center transition-transform duration-200 ease-out origin-top"
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  width: zoomLevel > 100 ? `${zoomLevel}%` : "100%",
                }}
              >
                <iframe
                  src={`${CVPDF}#toolbar=0&navpanes=0&scrollbar=1`}
                  title="Curriculum Vitae Preview"
                  className="w-full h-full rounded-lg border border-neutral-800 shadow-2xl bg-white min-h-[500px]"
                />
              </div>
            </div>

            {/* ================= BOTTOM STATUS FOOTER ================= */}
            <div className="flex items-center justify-between px-4 py-2 bg-neutral-900 border-t border-white/10 text-[11px] text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Document Ready</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={CVPDF}
                  download="Saketh_Chokkapu_CV.pdf"
                  className="text-blue-400 hover:underline flex items-center gap-1 font-medium"
                >
                  <Download className="w-3 h-3" />
                  Direct Download
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CVModal;
