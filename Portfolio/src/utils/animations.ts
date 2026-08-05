import { Variants } from "framer-motion";

/* =========================================
   CONSTANTS
   ========================================= */

// Premium, editorial easing
export const EASE_PREMIUM: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Tightened durations — fast but still premium feel
export const DURATION_FAST   = 0.35;
export const DURATION_MEDIUM = 0.55;
export const DURATION_SLOW   = 0.75;
export const DURATION_VERY_SLOW = 1.0;

export const TRANSITION_DEFAULT = {
  duration: DURATION_MEDIUM,
  ease: EASE_PREMIUM,
};

/* =========================================
   VARIANTS
   ========================================= */

/**
 * Standard container stagger
 */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Hero stagger — slightly slower than standard but NOT blocking
 */
export const staggerContainerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

/**
 * Standard fade up — NO blur (blur is GPU-expensive, causes lag)
 * Uses only transform + opacity (compositor-only, 60fps on any device)
 */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_MEDIUM,
      ease: EASE_PREMIUM,
    },
  },
};

/**
 * Slower fade up for headings — NO blur
 */
export const fadeUpSlow: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_PREMIUM,
    },
  },
};

/**
 * Scale reveal for images/cards — NO blur
 */
export const scaleReveal: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_PREMIUM,
    },
  },
};

/**
 * Line separator reveal
 */
export const lineReveal: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
    opacity: 0,
  },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: DURATION_SLOW,
      ease: EASE_PREMIUM,
    },
  },
};

/**
 * Hover Animations
 */
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.25, ease: EASE_PREMIUM },
};

export const hoverFade = {
  opacity: 0.7,
  transition: { duration: 0.2, ease: EASE_PREMIUM },
};
