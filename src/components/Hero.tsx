import { motion } from "framer-motion";

const title = "Солов'їна команда";
const letters = title.split("");

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(12px)",
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 150,
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.2, duration: 0.6, ease: "easeOut" },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 1.6, duration: 0.5, ease: "easeOut" },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        display: "flex",
        minHeight: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
        textAlign: "center",
      }}
    >
      <motion.h1
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          fontSize: "clamp(2.5rem, 7vw, 5rem)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginBottom: "1.5rem",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-label={title}
      >
        {letters.map((letter, i) => (
          <motion.span
            key={i}
            variants={letterVariants}
            style={{
              display: "inline-block",
              marginRight: letter === " " ? "0.3em" : "0",
              background: "linear-gradient(135deg, #f0f0f0 0%, #a0a0a8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            aria-hidden="true"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>

      <motion.p
        style={{ marginBottom: "2.5rem", fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "#a0a0a8" }}
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        Повернулися, працюємо!
      </motion.p>

      <motion.div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}
        variants={ctaVariants}
        initial="hidden"
        animate="visible"
      >
        <a href="#projects" className="btn-primary">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
          Наші проєкти
        </a>
        <a href="#support" className="btn-ghost">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          Підтримати
        </a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)" }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: "#a0a0a8", opacity: 0.5 }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}
