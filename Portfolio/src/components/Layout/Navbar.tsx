import React, { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { GMAIL_URL, handleMailClick, SocialLink } from "../../utils/constants";
import { motion, Variants } from "framer-motion";
import { EASE_PREMIUM } from "../../utils/animations";
import StaggeredMenu from "./StaggeredMenu";
import { useTheme } from "../../context/ThemeContext";

/* ===================== ANIMATIONS ===================== */

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
  const { theme, toggleTheme } = useTheme();
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
    { href: "https://github.com/Ch-saketh", icon: <Github className="w-5 h-5" /> },
    { href: "https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9", icon: <Linkedin className="w-5 h-5" /> },
    { href: GMAIL_URL, icon: <Mail className="w-5 h-5" /> },
  ];

  const menuItems = links.map((item) => ({
    label: item,
    ariaLabel: item,
    link: `#${item.toLowerCase()}`,
  }));

  const staggeredSocials = [
    { label: "GitHub", link: "https://github.com/Ch-saketh" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/saketh-chokkapu-3a668a2b9" },
    { label: "Email", link: GMAIL_URL },
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
            backgroundColor: theme === "light"
              ? scrolled
                ? "rgba(255,255,255,0.75)"
                : "transparent"
              : scrolled
              ? "rgba(19, 25, 36, 0.75)"
              : "transparent",
            backdropFilter: scrolled ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
            boxShadow: scrolled
              ? theme === "light"
                ? "0 12px 32px rgba(0,0,0,0.08)"
                : "0 20px 40px rgba(0,0,0,0.4)"
              : "none",
            border: scrolled
              ? theme === "light"
                ? "1px solid rgba(0,0,0,0.1)"
                : "1px solid rgba(255,255,255,0.08)"
              : "none",
            transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="w-full xl:max-w-7xl mx-auto flex items-center justify-between">
            {/* Developer Logo */}
            <motion.a
              href="#"
              custom={0}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2 group cursor-pointer"
            >
              {theme === "light" ? (
                <span className="text-lg font-extrabold tracking-tight font-funnel text-[#222222]">
                  Saketh.dev
                </span>
              ) : (
                <span className="text-lg font-extrabold tracking-tight font-funnel text-white">
                  Saketh<span style={{ color: '#00FF66' }}>.dev</span>
                </span>
              )}
            </motion.a>

            {/* Nav Links */}
            <ul className="flex md:gap-6 xl:gap-8 text-sm font-medium">
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
                    className={
                      theme === "light"
                        ? "text-neutral-600 hover:text-black transition-colors duration-200 tracking-wide font-sans font-medium"
                        : "text-white hover:text-[#00FF66] transition-colors duration-200 tracking-wide font-sans"
                    }
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Social Icons & Theme Switcher */}
            <div className="flex items-center md:gap-3 xl:gap-4">
              {/* Theme Switcher — same bare-icon style as social icons */}
              <motion.button
                custom={links.length + 1}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                onClick={toggleTheme}
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className={
                  theme === "light"
                    ? "flex items-center justify-center text-neutral-600 hover:text-black transition-colors duration-200 cursor-pointer"
                    : "flex items-center justify-center text-white hover:text-[#00FF66] transition-colors duration-200 cursor-pointer"
                }
              >
                {theme === "dark"
                  ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="4"/>
                      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                    </svg>
                  )
                }
              </motion.button>

              {socials.map(({ href, icon }, i) => (
                <motion.a
                  key={i}
                  custom={links.length + i + 2}
                  variants={navItemVariants}
                  initial="hidden"
                  animate="visible"
                  href={href}
                  onClick={(e) => href.startsWith("mailto:") && handleMailClick(e)}
                  target={href.startsWith("mailto:") ? "_self" : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className={
                    theme === "light"
                      ? "flex items-center justify-center text-neutral-600 hover:text-black transition-colors duration-200"
                      : "flex items-center justify-center text-white hover:text-[#00FF66] transition-colors duration-200"
                  }
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
            theme={theme}
            onThemeToggle={toggleTheme}
          />
        </>
      )}
    </>
  );
};

export default Navbar;
