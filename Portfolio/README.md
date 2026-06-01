# Wolfpixel Design Portfolio – Template

A premium, editorial-grade portfolio template designed for clarity, authority, and high-end visual storytelling.

This repository is a full-scale portfolio project converted into a reusable template. Unlike generic starters, it maintains the complete design system and architectural depth of a production-grade site, while using generic placeholder content to protect personal data. It is engineered for developers and designers who value professional aesthetics and performance.

---

## Why This Portfolio Exists

In an era where most portfolios rely on overused templates and flashy gimmicks, the **Wolfpixel Style** focuses on what truly matters: your work and your professional narrative.

Generic templates often prioritize ease of use over design discipline. This project flips that script, offering a system that enforces a strict editorial hierarchy. It is built for those who want to present themselves as experts rather than enthusiasts — professionals who understand that whitespace, typography, and subtle motion are the true markers of a premium digital experience.

---

## Features

- **Editorial Layout**: A magazine-style structure that prioritizes content readability and visual impact.
- **Dynamic Navbar**: A responsive navigation system with smooth scroll integration and a custom staggered mobile menu.
- **Typography-First Hero**: A bold entrance using oversized, tracking-tight typography that commands attention.
- **Interactive About Section**: A layered journey timeline with stats and skill presentation to showcase professional growth.
- **Project Showcase**: A grid-based system for project cards with expanded detail views and high-quality image support.
- **Developer Toolbox**: A dedicated section for open-source contributions, NPM packages, or specialized tools.
- **Contact Integration**: A polished, card-based contact section with support for primary and secondary communication channels.
- **Refined Motion**: Powered by Framer Motion and GSAP for immersive, non-obstructive animations.
- **Production Build**: Optimized for performance with a clean, scalable React + Vite environment.

---

## Design Philosophy

The Wolfpixel design system is built on a "less, but better" principle:

- **Monochrome & Minimal**: A sophisticated color palette that ensures your projects remain the focal point.
- **Grid Discipline**: Every element is aligned to a strict grid, creating a sense of balance and order.
- **Glassmorphism**: Subtle backdrop blurs and translucent layers add depth without cluttering the UI.
- **Intentional Motion**: Animations are descriptive, not decorative — they guide the user's attention through the narrative.

---

## Template Philosophy

This repository contains **placeholder data**. It is a framework for your professional identity. Users are expected to curate their own content to maintain the integrity of the design system.

**Items to replace:**

- **Identity**: Change the names, bios, and titles in the Hero and Footer components.
- **Images**: Replace placeholder project images and CV thumbnails with your own assets.
- **Projects**: Update the project array with real-world case studies and live links.
- **Stats**: Adjust the professional metrics to reflect your actual experience.

---

## Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Motion**: Framer Motion & GSAP
- **Icons**: Lucide React
- **Typography**: Google Fonts (Funnel, Jost)
- **Utilities**: AOS (Animate on Scroll)

---

## Folder Structure

```text
src/
├── components/
│   ├── Home/       # Core page sections (Hero, About, Projects, Contact)
│   ├── Layout/     # Global UI (Navbar, Footer, Mobile Menu)
│   └── Loaders/    # Immersive page transitions
├── pages/
│   └── Home.tsx    # Central hub for content and project data
├── utils/
│   ├── animations/ # Centralized animation configurations
│   └── constants/  # Interface definitions and shared types
└── assets/         # Placeholders for images and documents
```

---

## How to Use

1. **Clone the Repo**
   ```bash
   git clone https://github.com/nikhilhuh/Wolfpixel-Design-Portfolio.git
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Development Mode**
   ```bash
   npm run dev
   ```
4. **Update Content**
   Navigate to `src/pages/Home.tsx` to modify the project array and `src/components/` to update personal bios.
5. **Build for Production**
   ```bash
   npm run build
   ```

---

## Customization Guide

- **Content**: Primarily managed in `src/pages/Home.tsx` and the individual component files in `src/components/Home/`.
- **Theming**: Tailwind configuration handles the core color palette and typography tokens.
- **Images**: Store your assets in the `/public` or `/src/assets` folder and update imports in the relevant components.
- **Design Consistency**: Avoid introducing saturated colors or complex backgrounds to maintain the monochrome editorial feel.

---

## Who Should Use This

- **Frontend Developers** looking for a design-forward personal site.
- **UI/UX Designers** who want a code-based home for their portfolio.
- **Freelancers** aiming to establish a high-authority digital presence.
- **Students** who want to stand out with a professional, non-standard layout.

---

## License / Usage Note

This template is free to use for personal portfolios. While credit is appreciated, it is not mandatory. You are free to modify and deploy this project as you see fit. **Redistribution as a paid template is strictly prohibited.**

---

## Author Note

This is a template version of a real-world portfolio built with professional design principles and developer efficiency in mind. It is designed to be a foundation for something meaningful. Don't just copy and paste — use this system to tell your unique story.

Built with clarity, intent, and clean code.
