import { motion } from "framer-motion";

const line1 = "СОЛОВ'ЇНА";
const line2 = "КОМАНДА";
const letters1 = line1.split("");
const letters2 = line2.split("");

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

const line2Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3 + letters1.length * 0.05,
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

const glowStyle = {
  textShadow: "0 0 40px rgba(139,195,74,0.3), 0 0 80px rgba(139,195,74,0.15), 0 0 120px rgba(139,195,74,0.05)",
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
      <div style={{ marginBottom: "1.5rem", ...glowStyle }}>
        {/* Line 1: СОЛОВ'ЇНА */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 900,
            letterSpacing: "0.06em",
            lineHeight: 1.1,
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          aria-label="СОЛОВ'ЇНА"
        >
          {letters1.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #ffffff 0%, #c8c8d0 50%, #a0a0a8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              aria-hidden="true"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Line 2: КОМАНДА */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            fontWeight: 900,
            letterSpacing: "0.06em",
            lineHeight: 1.1,
          }}
          variants={line2Variants}
          initial="hidden"
          animate="visible"
          aria-label="КОМАНДА"
        >
          {letters2.map((letter, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #ffffff 0%, #c8c8d0 50%, #a0a0a8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              aria-hidden="true"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <motion.p
        style={{ marginBottom: "2.5rem", fontSize: "clamp(1rem, 2.5vw, 1.5rem)", color: "#a0a0a8" }}
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
      >
        Живі, працюємо!
      </motion.p>

      {/* Scroll indicator — clickable link to projects */}
      <motion.a
        href="#projects"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          textDecoration: "none",
          color: "#a0a0a8",
          cursor: "pointer",
          transition: "color 0.2s ease",
        }}
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#f0f0f0"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "#a0a0a8"; }}
      >
        <span style={{
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          opacity: 0.7,
        }}>
          Наші проєкти
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.a>
    </section>
  );
}
