import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "60%" : "-60%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-60%" : "60%",
    opacity: 0,
  }),
};

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const total = projects.length;

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goPrev, goNext]);

  const toggleLike = (id: string) =>
    setLiked((p) => ({ ...p, [id]: !p[id] }));

  const getIndex = (offset: number) => (current + offset + total) % total;

  const slots = [-1, 0, 1] as const;

  const renderCard = (project: typeof projects[0], isActive: boolean, offset: number) => {
    const isLiked = liked[project.id] || false;
    const idx = getIndex(offset);

    return (
      <motion.div
        key={project.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        style={{
          flex: "0 0 57%",
          height: "460px",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          cursor: isActive ? "default" : "pointer",
        }}
        onClick={() => { if (!isActive) setCurrent(idx); }}
      >
        {/* Background image or gradient */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: project.image
            ? `url(${project.image}) center/cover no-repeat`
            : project.gradient,
        }} />

        {/* Inactive overlay — semi-transparent #858082 */}
        {!isActive && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(133, 128, 130, 0.55)",
            zIndex: 1,
            transition: "opacity 0.4s ease",
          }} />
        )}

        {/* Watermark title (only for cards without image) */}
        {!project.image && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}>
            <span style={{
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 900,
              color: "rgba(255,255,255,0.07)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              lineHeight: 1.1,
              textAlign: "center",
              userSelect: "none",
            }}>
              {project.name}
            </span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "55%",
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }} />

        {/* Bottom info bar */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 24px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "16px",
        }}>
          {/* Left: status + title */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: project.official ? "#22c55e" : project.color,
              marginBottom: "6px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              {project.official ? "Official" : project.statusLabel}
            </div>
            <h3 style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              fontWeight: 700,
              color: "#fff",
              margin: 0,
              lineHeight: 1.2,
            }}>
              {project.name}
            </h3>
          </div>

          {/* Right: badge + heart + download (only active) */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
            opacity: isActive ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: isActive ? "auto" : "none",
          }}>
            <span style={{
              padding: "5px 12px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              fontWeight: 700,
              background: project.official ? "#22c55e" : project.color,
              color: "#fff",
            }}>
              {project.official ? "OFFICIAL" : project.statusLabel}
            </span>

            <button
              onClick={(e) => { e.stopPropagation(); toggleLike(project.id); }}
              aria-label={`Підтримати ${project.name}`}
              style={{
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                border: `1px solid ${isLiked ? project.color : "rgba(255,255,255,0.25)"}`,
                background: isLiked ? `${project.color}30` : "rgba(0,0,0,0.3)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s ease",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"
                fill={isLiked ? project.color : "none"}
                stroke={isLiked ? project.color : "rgba(255,255,255,0.7)"}
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <a
              href="https://lbklauncher.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                height: "40px",
                padding: "0 18px",
                background: "#8bc34a",
                color: "#1b1b1b",
                borderRadius: "6px",
                fontSize: "0.9rem",
                fontWeight: 700,
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#9ccc65"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#8bc34a"; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Завантажити
            </a>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ padding: "80px 0", overflow: "hidden" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{
          textAlign: "center",
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 800,
          color: "#f0f0f0",
          marginBottom: "8px",
        }}>
          Ігри, над якими ми працюємо
        </h2>
        <p style={{
          textAlign: "center",
          color: "#a0a0a8",
          marginBottom: "48px",
          fontSize: "1rem",
        }}>
          Українська локалізація для найкращих ігор
        </p>

        {/* === Carousel === */}
        <div style={{
          position: "relative",
          maxWidth: "100%",
          margin: "0 auto",
        }}>
          {/* Arrow left */}
          <button
            onClick={goPrev}
            aria-label="Попередня гра"
            style={{
              position: "absolute",
              left: "calc(21.5% - 8px)",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.7)"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Arrow right */}
          <button
            onClick={goNext}
            aria-label="Наступна гра"
            style={{
              position: "absolute",
              right: "calc(21.5% - 8px)",
              top: "50%",
              transform: "translate(50%, -50%)",
              zIndex: 10,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,0,0,0.7)"; }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Overflow clip wrapper */}
          <div style={{
            overflow: "hidden",
            borderRadius: "12px",
          }}>
            {/* 3-card track — shifted left so center card is centered */}
            <div style={{
              display: "flex",
              gap: "16px",
              transform: "translateX(calc(-35.5% - 16px))",
            }}>
              {slots.map((offset) => {
                const idx = getIndex(offset);
                const project = projects[idx];
                const isActive = offset === 0;

                return (
                  <AnimatePresence mode="popLayout" custom={direction} key={`slot-${offset}`}>
                    {renderCard(project, isActive, offset)}
                  </AnimatePresence>
                );
              })}
            </div>
          </div>

          {/* Dot indicators */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
          }}>
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                aria-label={`Перейти до ${p.name}`}
                style={{
                  width: i === current ? "28px" : "8px",
                  height: "4px",
                  borderRadius: "2px",
                  border: "none",
                  background: i === current ? p.color : "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
