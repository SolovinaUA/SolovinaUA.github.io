import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Проєкти", href: "#projects" },
  { label: "Підтримка", href: "#support" },
  { label: "Статистика", href: "#stats" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
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
          className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[--color-surface-hover] sm:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={mobileOpen}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-[--color-border] bg-[--color-bg-primary]/95 backdrop-blur-xl sm:hidden"
        >
          <div className="flex flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium text-[--color-text-secondary] transition-colors hover:bg-[--color-surface-hover] hover:text-[--color-text-primary]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
