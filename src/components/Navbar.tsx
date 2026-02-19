import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Проєкти", href: "#projects" },
  { label: "Підтримка", href: "#support" },
  { label: "Статистика", href: "#stats" },
];

const linkVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.3, ease: "easeOut" },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 12,
    transition: { delay: 0.03 * (navLinks.length - i), duration: 0.2 },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          background: scrolled || mobileOpen
            ? "rgba(14, 14, 16, 0.75)"
            : "transparent",
          backdropFilter: scrolled || mobileOpen ? "blur(20px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled || mobileOpen ? "blur(20px) saturate(1.4)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
        role="navigation"
        aria-label="Головна навігація"
      >
        <div style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: scrolled ? "52px" : "60px",
          transition: "height 0.3s ease",
        }}>
          {/* Logo */}
          <a
            href="#hero"
            aria-label="На початок"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "#f0f0f0",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            <img
              src="/logo.svg"
              alt="Солов'їна команда"
              style={{
                height: "28px",
                width: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </a>

          {/* Desktop links — no inline display, let Tailwind handle visibility */}
          <div className="hidden sm:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}

            {/* CTA button */}
            <a
              href="https://lbklauncher.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                marginLeft: "12px",
                padding: "6px 16px",
                borderRadius: "8px",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#1b1b1b",
                background: "#8bc34a",
                textDecoration: "none",
                transition: "all 0.2s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#9ccc65";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#8bc34a";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              LBK Launcher
            </a>
          </div>

          {/* Mobile burger — no inline display */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={mobileOpen}
            className="flex sm:hidden items-center justify-center"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: 0,
              transition: "background 0.2s",
              color: "rgba(255,255,255,0.8)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{ width: "18px", height: "14px", position: "relative" }}>
              <span style={{
                position: "absolute",
                left: 0,
                width: "18px",
                height: "2px",
                borderRadius: "1px",
                background: "currentColor",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                top: mobileOpen ? "6px" : "0px",
                transform: mobileOpen ? "rotate(45deg)" : "rotate(0)",
              }} />
              <span style={{
                position: "absolute",
                left: 0,
                top: "6px",
                width: "18px",
                height: "2px",
                borderRadius: "1px",
                background: "currentColor",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                opacity: mobileOpen ? 0 : 1,
                transform: mobileOpen ? "scaleX(0)" : "scaleX(1)",
              }} />
              <span style={{
                position: "absolute",
                left: 0,
                width: "18px",
                height: "2px",
                borderRadius: "1px",
                background: "currentColor",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                top: mobileOpen ? "6px" : "12px",
                transform: mobileOpen ? "rotate(-45deg)" : "rotate(0)",
              }} />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen mobile menu — no inline display, Tailwind handles visibility on desktop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex-col items-center justify-center sm:hidden"
            style={{
              display: "flex",
              background: "rgba(14, 14, 16, 0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    padding: "12px 32px",
                    borderRadius: "12px",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    transition: "color 0.2s ease, background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.95)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Mobile CTA */}
              <motion.a
                href="https://lbklauncher.com/"
                target="_blank"
                rel="noopener noreferrer"
                custom={navLinks.length}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  marginTop: "16px",
                  padding: "12px 32px",
                  borderRadius: "12px",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#1b1b1b",
                  background: "#8bc34a",
                  textDecoration: "none",
                }}
              >
                LBK Launcher
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
