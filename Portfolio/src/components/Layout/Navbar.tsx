import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { SocialLink } from "../../utils/constants";
import { motion, Variants } from "framer-motion";
import { EASE_PREMIUM } from "../../utils/animations";
import StaggeredMenu from "./StaggeredMenu";

/* ===================== ANIMATIONS ===================== */

/** Desktop navbar reveal */
const navbarVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: EASE_PREMIUM,
    },
  },
};

/** Navbar inner items (logo, links, socials) */
const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.05,
      duration: 0.8,
      ease: EASE_PREMIUM,
    },
  }),
};

/* ===================== COMPONENT ===================== */

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const onResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  useEffect(() => {
    if (windowWidth >= 768) setMenuOpen(false);
  }, [windowWidth]);

  const links = ["Projects", "Services", "Skills", "About", "Contact"];

  const socials: SocialLink[] = [
    { href: "https://github.com/Ch-saketh", icon: <Github /> },
    { href: "https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9", icon: <Linkedin /> },
    { href: "mailto:chokkapusaketh@gmail.com", icon: <Mail /> },
  ];

  const menuItems = links.map((item) => ({
    label: item,
    ariaLabel: item,
    link: `#${item.toLowerCase()}`,
  }));

  const staggeredSocials = [
    { label: "GitHub", link: "https://github.com/username" },
    { label: "LinkedIn", link: "https://linkedin.com/in/username" },
    { label: "YouTube", link: "https://www.youtube.com/@username" },
    { label: "Instagram", link: "https://www.instagram.com/username" },
  ];

  /* Desktop navbar width logic */
  let maxWidth = windowWidth;
  let marginLeft = 0;

  if (scrolled && windowWidth >= 768) {
    if (windowWidth >= 1440) maxWidth = windowWidth * 0.6;
    else if (windowWidth >= 1024) maxWidth = windowWidth * 0.8;
    else maxWidth = windowWidth * 0.95;

    marginLeft = (windowWidth - maxWidth) / 2;
  }

  return (
    <>
      {/* ================= DESKTOP / TABLET ================= */}
      {windowWidth >= 768 && (
        <motion.header
          variants={navbarVariants}
          initial="hidden"
          animate="visible"
          className={`fixed ${scrolled ? "top-5" : "top-0"} left-0 z-50`}
          style={{
            width: "100%",
            maxWidth,
            marginLeft,
            padding: scrolled ? "1rem 2rem" : "1.5rem 2rem",
            borderRadius: scrolled ? "2.5rem" : "0rem",
            backgroundColor: scrolled
              ? "rgba(255,255,255,0.3)"
              : "var(--color-background)",
            backdropFilter: scrolled ? "blur(18px)" : "none",
            boxShadow: scrolled ? "0 12px 32px rgba(0,0,0,0.12)" : "none",
            border: scrolled ? "1px solid rgba(255,255,255,0.5)" : "none",
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)", // Apply same ease to CSS transition
          }}
        >
          <div className="w-full xl:max-w-7xl mx-auto flex items-center justify-between">
            <motion.span
              custom={0}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              className="text-lg font-extrabold tracking-tight"
            >
              Developer
            </motion.span>

            <ul className="flex md:gap-5 xl:gap-6 text-base font-medium">
              {links.map((item, i) => (
                <motion.li
                  key={item}
                  custom={i + 1}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex md:gap-4 xl:gap-5">
              {socials.map(({ href, icon }, i) => (
                <motion.a
                  key={i}
                  custom={links.length + i + 1}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted-foreground)] hover:text-black transition"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.header>
      )}

      {/* ================= MOBILE ================= */}
      {windowWidth < 768 && (
        <>
          <StaggeredMenu
            items={menuItems}
            socialItems={staggeredSocials}
            onMenuOpen={() => setMenuOpen(true)}
            onMenuClose={() => setMenuOpen(false)}
          />
        </>
      )}
    </>
  );
};

export default Navbar;
