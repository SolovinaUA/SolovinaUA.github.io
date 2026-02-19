import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "../data/projects";

const statusBadgeColor = (proj: Project): string => {
  if (proj.status === "official") return "#eab308";
  if (proj.status === "released") return "#22c55e";
  if (proj.status === "in-progress") return "#ef4444";
  if (proj.status === "waiting") return "#a855f7";
  if (proj.status === "someday") return "#6b7280";
  return proj.color;
};

const STATUS_FILTERS = [
  { key: "all",         label: "Усі" },
  { key: "released",    label: "Вийшли" },
  { key: "in-progress", label: "У процесі" },
  { key: "official",    label: "Офіційні" },
] as const;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "80%" : "-80%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-80%" : "80%",
    opacity: 0,
  }),
};

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const total = projects.length;

  const filteredProjects = useMemo(() => {
    const q = search.toLowerCase().trim();
    return projects
      .map((proj, idx) => ({ proj, idx }))
      .filter(({ proj }) => {
        if (q && !proj.name.toLowerCase().includes(q)) return false;
        if (statusFilter === "all") return true;
        if (statusFilter === "released") return proj.status === "released";
        if (statusFilter === "in-progress") return proj.status === "in-progress";
        if (statusFilter === "official") return proj.status === "official";
        return true;
      });
  }, [search, statusFilter]);

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
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

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

  // Touch swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Auto-advance every 5 seconds
  const [progress, setProgress] = useState(0);
  const autoplayRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    setProgress(0);
    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - lastTimeRef.current;
      const pct = Math.min(elapsed / 5000, 1);
      setProgress(pct);
      if (pct >= 1) {
        goNext();
        return;
      }
      autoplayRef.current = requestAnimationFrame(tick);
    };
    autoplayRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(autoplayRef.current);
  }, [current, goNext]);

  // Reset timer on manual interaction
  const resetTimer = useCallback(() => {
    cancelAnimationFrame(autoplayRef.current);
    setProgress(0);
    lastTimeRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - lastTimeRef.current;
      const pct = Math.min(elapsed / 5000, 1);
      setProgress(pct);
      if (pct >= 1) {
        goNext();
        return;
      }
      autoplayRef.current = requestAnimationFrame(tick);
    };
    autoplayRef.current = requestAnimationFrame(tick);
  }, [goNext]);

  const getIndex = (offset: number) => (current + offset + total) % total;
  const slots = [-1, 0, 1] as const;
  const project = projects[current];

  const renderCard = (proj: typeof projects[0], isActive: boolean, offset: number) => {
    const idx = getIndex(offset);

    return (
      <motion.div
        key={proj.id}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        style={{
          flex: isMobile ? "0 0 100%" : "0 0 57%",
          height: isMobile ? "340px" : "460px",
          borderRadius: "12px",
          overflow: "hidden",
          position: "relative",
          cursor: isActive ? "default" : "pointer",
        }}
        onClick={() => { if (!isActive) setCurrent(idx); }}
      >
        {/* Background image or gradient */}
        {proj.image ? (
          <img
            src={proj.image}
            alt={proj.name}
            loading="eager"
            decoding="async"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div style={{
            position: "absolute",
            inset: 0,
            background: proj.gradient,
          }} />
        )}

        {/* Inactive overlay */}
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
        {!proj.image && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}>
            <span style={{
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 900,
              color: "rgba(255,255,255,0.07)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              lineHeight: 1.1,
              textAlign: "center",
              userSelect: "none",
            }}>
              {proj.name}
            </span>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }} />

        {/* Bottom info bar */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: isMobile ? "16px" : "20px 24px",
        }}>
          {/* Status label */}
          <div style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            color: "#fff",
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            marginBottom: "4px",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}>
            {proj.official ? "Офіційний переклад" : (proj.status === "released" ? "Українська текстова локалізація" : proj.statusLabel)}
          </div>
          {/* Title */}
          <h3 style={{
            fontSize: isMobile ? "1.1rem" : "clamp(1.1rem, 2.5vw, 1.6rem)",
            fontWeight: 700,
            color: "#fff",
            margin: 0,
            lineHeight: 1.2,
            marginBottom: isActive ? "12px" : 0,
          }}>
            {proj.name}
          </h3>

          {/* Actions row — only for active card */}
          {isActive && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}>
              <span style={{
                padding: "4px 10px",
                borderRadius: "4px",
                fontSize: "0.7rem",
                fontWeight: 700,
                background: statusBadgeColor(proj),
                color: "#fff",
              }}>
                {proj.official ? "Офіційний переклад" : (proj.badgeLabel || proj.statusLabel)}
              </span>

              {proj.downloadUrl && (
                <a
                  href={proj.downloadDisabled ? undefined : proj.downloadUrl}
                  target={proj.downloadDisabled ? undefined : "_blank"}
                  rel={proj.downloadDisabled ? undefined : "noopener noreferrer"}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (proj.downloadDisabled) e.preventDefault();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    height: "32px",
                    padding: "0 14px",
                    background: proj.downloadDisabled ? "rgba(255,255,255,0.08)" : "#8bc34a",
                    color: proj.downloadDisabled ? "rgba(255,255,255,0.3)" : "#1b1b1b",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    border: proj.downloadDisabled ? "1px solid rgba(255,255,255,0.1)" : "none",
                    cursor: proj.downloadDisabled ? "not-allowed" : "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    opacity: proj.downloadDisabled ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => { if (!proj.downloadDisabled) e.currentTarget.style.background = "#9ccc65"; }}
                  onMouseLeave={(e) => { if (!proj.downloadDisabled) e.currentTarget.style.background = "#8bc34a"; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {proj.downloadLabel || "Завантажити"}
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ padding: isMobile ? "48px 0" : "80px 0", overflow: "hidden" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{
          textAlign: "center",
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
          fontWeight: 800,
          color: "#f0f0f0",
          marginBottom: "8px",
          padding: "0 16px",
        }}>
          Ігри, над якими ми працюємо
        </h2>
        <p style={{
          textAlign: "center",
          color: "#a0a0a8",
          marginBottom: isMobile ? "28px" : "48px",
          fontSize: "1rem",
          padding: "0 16px",
        }}>
          Українська локалізація для найкращих ігор
        </p>

        {/* === Carousel === */}
        <div
          style={{
            position: "relative",
            maxWidth: "100%",
            margin: "0 auto",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Arrow left */}
          <button
            onClick={goPrev}
            aria-label="Попередня гра"
            style={{
              position: "absolute",
              left: isMobile ? "24px" : "calc(21.5% - 8px)",
              top: "50%",
              transform: isMobile ? "translateY(-50%)" : "translate(-50%, -50%)",
              zIndex: 10,
              width: isMobile ? "36px" : "44px",
              height: isMobile ? "36px" : "44px",
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
              right: isMobile ? "24px" : "calc(21.5% - 8px)",
              top: "50%",
              transform: isMobile ? "translateY(-50%)" : "translate(50%, -50%)",
              zIndex: 10,
              width: isMobile ? "36px" : "44px",
              height: isMobile ? "36px" : "44px",
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
            borderRadius: isMobile ? "0" : "12px",
            padding: isMobile ? "0 16px" : 0,
          }}>
            {isMobile ? (
              /* Mobile: single card */
              <AnimatePresence mode="popLayout" custom={direction}>
                {renderCard(project, true, 0)}
              </AnimatePresence>
            ) : (
              /* Desktop: 3-card track */
              <div style={{
                display: "flex",
                gap: "16px",
                transform: "translateX(calc(-35.5% - 16px))",
              }}>
                {slots.map((offset) => {
                  const idx = getIndex(offset);
                  const proj = projects[idx];
                  const isActive = offset === 0;
                  return (
                    <AnimatePresence mode="popLayout" custom={direction} key={`slot-${offset}`}>
                      {renderCard(proj, isActive, offset)}
                    </AnimatePresence>
                  );
                })}
              </div>
            )}
          </div>

          {/* Progress indicators */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            marginTop: "16px",
            padding: "0 16px",
          }}>
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                aria-label={`Перейти до ${p.name}`}
                style={{
                  width: i === current ? "32px" : "8px",
                  height: "4px",
                  borderRadius: "2px",
                  border: "none",
                  background: "rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  padding: 0,
                  position: "relative",
                  overflow: "hidden",
                  transition: "width 0.3s ease",
                }}
              >
                {i === current && (
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${progress * 100}%`,
                    background: "#ef4444",
                    borderRadius: "2px",
                  }} />
                )}
                {i < current && (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "#ef4444",
                    opacity: 0.4,
                    borderRadius: "2px",
                  }} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* === Project List === */}
        <div style={{
          maxWidth: "960px",
          margin: isMobile ? "36px auto 0" : "56px auto 0",
          padding: "0 16px",
        }}>
          <h3 style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#f0f0f0",
            marginBottom: "16px",
            textAlign: "center",
          }}>
            Усі проєкти
          </h3>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: "12px", maxWidth: "400px", margin: "0 auto 12px" }}>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Пошук гри..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 40px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
                color: "#f0f0f0",
                fontSize: "0.85rem",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
            />
          </div>

          {/* Filter tabs */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "4px",
            marginBottom: "16px",
            overflowX: isMobile ? "auto" : "visible",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            padding: isMobile ? "0 0 4px" : 0,
          }}>
            {STATUS_FILTERS.map((filter) => {
              const isActive = statusFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  onClick={() => setStatusFilter(filter.key)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "8px",
                    border: isActive
                      ? "1px solid rgba(109, 93, 252, 0.4)"
                      : "1px solid rgba(255,255,255,0.06)",
                    background: isActive
                      ? "rgba(109, 93, 252, 0.12)"
                      : "rgba(255,255,255,0.03)",
                    color: isActive ? "#f0f0f0" : "#a0a0a8",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* 3-column compact list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={statusFilter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? "0px" : "12px",
                alignItems: "start",
              }}
            >
              {(() => {
                const columnCount = isMobile ? 1 : 3;
                const columns: { proj: typeof projects[0]; idx: number }[][] = Array.from(
                  { length: columnCount },
                  () => []
                );
                filteredProjects.forEach((item, i) => {
                  columns[i % columnCount].push(item);
                });
                return columns.map((column, colIdx) => (
                  <div key={colIdx} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    {column.map(({ proj, idx }, itemIdx) => {
                      const badgeColor = statusBadgeColor(proj);
                      const badgeLabel = proj.official
                        ? "Офіційний"
                        : (proj.badgeLabel || proj.statusLabel);
                      const isSelected = idx === current;
                      return (
                        <motion.button
                          key={proj.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.2,
                            delay: itemIdx * 0.03,
                          }}
                          onClick={() => goTo(idx)}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.borderColor = "transparent";
                            }
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 12px",
                            borderRadius: "8px",
                            border: isSelected
                              ? `1px solid ${badgeColor}44`
                              : "1px solid transparent",
                            background: isSelected
                              ? `${badgeColor}0d`
                              : "transparent",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            width: "100%",
                            textAlign: "left",
                          }}
                        >
                          {/* Status dot */}
                          <span style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: badgeColor,
                            flexShrink: 0,
                            boxShadow: isSelected
                              ? `0 0 6px ${badgeColor}66`
                              : "none",
                          }} />

                          {/* Project name */}
                          <span style={{
                            flex: 1,
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            color: isSelected ? "#f0f0f0" : "rgba(255,255,255,0.6)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            lineHeight: 1.3,
                            minWidth: 0,
                          }}>
                            {proj.name}
                          </span>

                          {/* Status badge pill */}
                          <span style={{
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontSize: "0.55rem",
                            fontWeight: 700,
                            background: `${badgeColor}22`,
                            color: badgeColor,
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            letterSpacing: "0.02em",
                          }}>
                            {badgeLabel}
                          </span>

                          {/* Download icon */}
                          {proj.downloadUrl && !proj.downloadDisabled && (
                            <a
                              href={proj.downloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "24px",
                                height: "24px",
                                borderRadius: "4px",
                                background: "rgba(139,195,74,0.12)",
                                color: "#8bc34a",
                                flexShrink: 0,
                                transition: "background 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "rgba(139,195,74,0.28)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "rgba(139,195,74,0.12)";
                              }}
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5"
                                strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                              </svg>
                            </a>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ));
              })()}
            </motion.div>
          </AnimatePresence>
          {filteredProjects.length === 0 && (
            <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", padding: "16px 0" }}>
              Нічого не знайдено
            </p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
