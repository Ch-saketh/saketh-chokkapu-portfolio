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

          {/* macOS Glassmorphism Window Container */}
          <motion.div
            ref={modalRef}
            variants={genieVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin }}
            className={`
              relative z-10 flex flex-col w-full 
              bg-gradient-to-b from-neutral-900/70 via-neutral-950/75 to-neutral-900/80 
              border border-white/20 shadow-[0_32px_80px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.25)] 
              backdrop-blur-3xl backdrop-saturate-200 text-neutral-100 
              overflow-hidden transition-all duration-300
              ${
                isFullscreen
                  ? "w-screen h-screen rounded-none border-none p-0"
                  : "max-w-5xl h-[88vh] sm:h-[85vh] rounded-2xl"
              }
            `}
          >
            {/* ================= macOS WINDOW HEADER (GLASS) ================= */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/10 backdrop-blur-2xl border-b border-white/15 select-none shadow-sm">
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
                <span className="text-xs sm:text-sm font-medium tracking-wide text-white truncate drop-shadow-sm">
                  Saketh_Chokkapu_CV.pdf
                </span>
                <span className="hidden md:inline-block px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-white/10 text-white/90 rounded-full border border-white/20 backdrop-blur-md">
                  PDF Preview
                </span>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Download CV Action Button (Glass Glow) */}
                <a
                  href={CVPDF}
                  download="Saketh_Chokkapu_CV.pdf"
                  className="
                    flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-1.5 
                    bg-gradient-to-r from-blue-500/80 via-indigo-500/80 to-purple-500/80 
                    hover:from-blue-500 hover:to-purple-500 
                    text-white text-xs font-medium rounded-xl shadow-lg shadow-blue-500/25 
                    border border-white/25 backdrop-blur-lg
                    transition-all active:scale-95 cursor-pointer
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
                  className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/15 rounded-xl border border-transparent hover:border-white/20 backdrop-blur-md transition-all cursor-pointer hidden sm:flex"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="p-1.5 text-neutral-300 hover:text-white hover:bg-white/15 rounded-xl border border-transparent hover:border-white/20 backdrop-blur-md transition-all cursor-pointer sm:hidden"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ================= SECONDARY CONTROL TOOLBAR (GLASS) ================= */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 backdrop-blur-xl border-b border-white/10 text-xs text-neutral-300">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-xl border border-white/10 backdrop-blur-md">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                  title="Zoom Out"
                  className="p-1 hover:text-white hover:bg-white/15 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-[11px] font-mono text-white font-medium">
                  {zoomLevel}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  title="Zoom In"
                  className="p-1 hover:text-white hover:bg-white/15 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                {zoomLevel !== 100 && (
                  <button
                    onClick={handleResetZoom}
                    title="Reset Zoom"
                    className="p-1 ml-1 text-blue-400 hover:bg-white/15 rounded-lg transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyLink}
                  className="hover:text-white transition flex items-center gap-1.5 text-[11px] bg-white/10 hover:bg-white/15 px-3 py-1 rounded-xl border border-white/10 backdrop-blur-md cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Link Copied!</span>
                    </>
                  ) : (
                    <span>Copy PDF Link</span>
                  )}
                </button>
                <span className="hidden sm:inline text-neutral-500">|</span>
                <span className="hidden sm:inline text-[11px] font-medium text-neutral-300">
                  macOS Glassmorphism View
                </span>
              </div>
            </div>

            {/* ================= PDF VIEWING BODY (FROSTED GLASS CANVAS) ================= */}
            <div className="relative flex-1 w-full h-full overflow-auto bg-black/40 backdrop-blur-md p-2 sm:p-4 flex items-center justify-center">
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
                  className="w-full h-full rounded-xl border border-white/20 shadow-2xl bg-white min-h-[500px]"
                />
              </div>
            </div>

            {/* ================= BOTTOM STATUS FOOTER (GLASS) ================= */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 backdrop-blur-xl border-t border-white/10 text-[11px] text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="font-medium text-neutral-200">Glass Viewer Ready</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={CVPDF}
                  download="Saketh_Chokkapu_CV.pdf"
                  className="text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 font-semibold"
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
