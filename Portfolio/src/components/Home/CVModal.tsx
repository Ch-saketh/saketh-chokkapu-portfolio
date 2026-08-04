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
  Share2,
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

  // Apple macOS Genie animation variants
  const genieVariants: Variants = {
    hidden: {
      opacity: 0,
      scaleX: 0.12,
      scaleY: 0.04,
      y: originRect ? originRect.top - window.innerHeight / 2 : 100,
      x: originRect ? originRect.left - window.innerWidth / 2 : 0,
      filter: "blur(16px) contrast(1.3)",
      borderRadius: "40px",
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0,
      filter: "blur(0px) contrast(1)",
      borderRadius: isFullscreen ? "0px" : "24px",
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 26,
        mass: 0.75,
      },
    },
    exit: {
      opacity: 0,
      scaleX: 0.08,
      scaleY: 0.02,
      x: originRect ? originRect.left - window.innerWidth / 2 : 0,
      y: originRect ? originRect.top - window.innerHeight / 2 + 20 : 100,
      filter: "blur(20px) saturate(2)",
      transition: {
        duration: 0.42,
        ease: [0.32, 0.72, 0, 1],
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8">
          {/* Apple Vibrant Ambient Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-xl transition-all duration-300"
          />

          {/* ================= APPLE macOS LIQUID GLASS WINDOW ================= */}
          <motion.div
            ref={modalRef}
            variants={genieVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ transformOrigin }}
            className={`
              relative z-10 flex flex-col w-full 
              bg-gradient-to-b from-neutral-900/60 via-neutral-950/70 to-neutral-900/75 
              border border-white/25 ring-1 ring-white/10
              shadow-[0_40px_100px_rgba(0,0,0,0.65),inset_0_1.5px_1px_rgba(255,255,255,0.35)] 
              backdrop-blur-3xl backdrop-saturate-200 text-white
              overflow-hidden transition-all duration-300 font-sans
              ${
                isFullscreen
                  ? "w-screen h-screen rounded-none border-none p-0"
                  : "max-w-5xl h-[88vh] sm:h-[86vh] rounded-[24px]"
              }
            `}
          >
            {/* Top Gloss Highlight Ribbon */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none" />

            {/* ================= APPLE macOS HEADER BAR ================= */}
            <div className="relative z-10 flex items-center justify-between px-5 py-3.5 bg-white/10 backdrop-blur-2xl border-b border-white/15 select-none shadow-sm">
              {/* Traffic Light Control Buttons */}
              <div className="flex items-center gap-2.5 w-28">
                {/* Red: Close */}
                <button
                  onClick={onClose}
                  title="Close (Esc)"
                  className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/90 active:scale-90 border border-[#E0443E]/50 flex items-center justify-center group transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-pointer"
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
                  className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/90 active:scale-90 border border-[#DEA123]/50 flex items-center justify-center group transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-pointer"
                >
                  <Minus className="w-2.5 h-2.5 text-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                </button>

                {/* Green: Fullscreen */}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  className="w-3.5 h-3.5 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/90 active:scale-90 border border-[#1AAB29]/50 flex items-center justify-center group transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] cursor-pointer"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-2.5 h-2.5 text-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                  ) : (
                    <Maximize2 className="w-2.5 h-2.5 text-neutral-950 opacity-0 group-hover:opacity-100 transition-opacity stroke-[3]" />
                  )}
                </button>
              </div>

              {/* Title & Badge (Apple QuickLook style) */}
              <div className="flex items-center gap-2.5 max-w-[45%] sm:max-w-md truncate">
                <FileText className="w-4 h-4 text-[#007AFF] shrink-0 drop-shadow-sm" />
                <span className="text-xs sm:text-sm font-semibold tracking-tight text-white/95 truncate">
                  Saketh_Chokkapu_CV.pdf
                </span>
                <span className="hidden md:inline-block px-2.5 py-0.5 text-[10px] tracking-wider uppercase font-semibold bg-white/15 text-white/90 rounded-full border border-white/20 backdrop-blur-xl">
                  Quick Look
                </span>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2">
                {/* Apple Primary Download Pill Button */}
                <a
                  href={CVPDF}
                  download="Saketh_Chokkapu_CV.pdf"
                  className="
                    flex items-center gap-1.5 px-4 py-1.5 sm:px-4.5 sm:py-1.5 
                    bg-[#007AFF] hover:bg-[#0062CC] active:bg-[#0051B3]
                    text-white text-xs font-semibold rounded-full 
                    shadow-[0_4px_16px_rgba(0,122,255,0.4),inset_0_1px_0.5px_rgba(255,255,255,0.4)] 
                    border border-white/20 backdrop-blur-lg
                    transition-all active:scale-95 cursor-pointer
                  "
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download CV</span>
                </a>

                {/* Open in Tab Pill */}
                <a
                  href={CVPDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Open in Browser"
                  className="p-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/15 backdrop-blur-xl transition-all active:scale-95 cursor-pointer hidden sm:flex"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Close Button Mobile */}
                <button
                  onClick={onClose}
                  className="p-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full border border-white/15 backdrop-blur-xl transition-all cursor-pointer sm:hidden"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ================= APPLE SEGMENTED TOOLBAR ================= */}
            <div className="relative z-10 flex items-center justify-between px-5 py-2 bg-white/5 backdrop-blur-xl border-b border-white/10 text-xs text-white/80">
              {/* Glass Segmented Zoom Controls */}
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-full border border-white/15 backdrop-blur-2xl shadow-inner">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 50}
                  title="Zoom Out"
                  className="p-1 text-white/90 hover:text-white hover:bg-white/20 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="w-12 text-center text-[11px] font-mono text-white font-semibold">
                  {zoomLevel}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 200}
                  title="Zoom In"
                  className="p-1 text-white/90 hover:text-white hover:bg-white/20 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                {zoomLevel !== 100 && (
                  <button
                    onClick={handleResetZoom}
                    title="Reset Zoom"
                    className="p-1 ml-1 text-[#3897FF] hover:bg-white/20 rounded-full transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Apple Segmented Share / Info Bar */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopyLink}
                  className="
                    hover:text-white transition flex items-center gap-1.5 text-[11px] 
                    bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full 
                    border border-white/15 backdrop-blur-xl shadow-sm cursor-pointer
                  "
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-white/70" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
                <span className="hidden sm:inline text-white/30">|</span>
                <span className="hidden sm:inline text-[11px] font-medium text-white/70">
                  Apple Liquid Glass Material
                </span>
              </div>
            </div>

            {/* ================= PDF VIEWING CANVAS (LIQUID GLASS FRAME) ================= */}
            <div className="relative flex-1 w-full h-full overflow-auto bg-black/35 backdrop-blur-md p-3 sm:p-5 flex items-center justify-center">
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
                  className="w-full h-full rounded-[18px] border border-white/25 shadow-2xl bg-white min-h-[500px]"
                />
              </div>
            </div>

            {/* ================= APPLE STATUS FOOTER ================= */}
            <div className="relative z-10 flex items-center justify-between px-5 py-2.5 bg-white/5 backdrop-blur-2xl border-t border-white/10 text-[11px] text-white/80">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
                <span className="font-medium text-white/90">macOS Preview Engine</span>
              </div>
              <div className="flex items-center gap-4">
                <a
                  href={CVPDF}
                  download="Saketh_Chokkapu_CV.pdf"
                  className="text-[#3897FF] hover:text-[#60A5FA] hover:underline flex items-center gap-1.5 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Original PDF
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
