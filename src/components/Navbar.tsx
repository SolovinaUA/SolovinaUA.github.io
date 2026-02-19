import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Проєкти", href: "#projects" },
  { label: "Підтримка", href: "#support" },
  { label: "Статистика", href: "#stats" },
];

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.3, ease: "easeOut" },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -20,
    transition: { delay: 0.03 * (navLinks.length - i), duration: 0.2 },
  }),
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || mobileOpen
            ? "bg-[--color-bg-primary]/80 shadow-lg backdrop-blur-xl"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Головна навігація"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a
            href="#hero"
            className="text-lg font-bold text-[--color-text-primary] transition-colors hover:text-[--color-accent]"
            aria-label="На початок"
          >
            🐦 Солов'їна
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-2 text-sm font-medium text-[--color-text-secondary] transition-all hover:bg-[--color-surface-hover] hover:text-[--color-text-primary]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[--color-surface-hover] sm:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}
            aria-expanded={mobileOpen}
          >
            <div className="flex h-5 w-5 flex-col items-center justify-center">
              <span
                className="block h-0.5 w-5 rounded-full bg-current transition-all duration-300"
                style={{
                  transform: mobileOpen ? "rotate(45deg) translate(0, 0)" : "rotate(0) translateY(-4px)",
                }}
              />
              <span
                className="block h-0.5 w-5 rounded-full bg-current transition-all duration-300"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                  transform: mobileOpen ? "scaleX(0)" : "scaleX(1)",
                }}
              />
              <span
                className="block h-0.5 w-5 rounded-full bg-current transition-all duration-300"
                style={{
                  transform: mobileOpen ? "rotate(-45deg) translate(0, 0)" : "rotate(0) translateY(4px)",
                }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[--color-bg-primary]/95 backdrop-blur-xl sm:hidden"
          >
            <nav className="flex flex-col items-center gap-2">
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
                  className="rounded-xl px-8 py-4 text-2xl font-semibold text-[--color-text-secondary] transition-colors hover:bg-[--color-surface-hover] hover:text-[--color-text-primary]"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
