import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  persona5OverallPercent,
  uaLines,
  enLines,
} from "../data/persona5";

ChartJS.register(
  Legend,
  ArcElement
);

/* ============ Persona 5 Royal Block ============ */

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          function animate(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.round(eased * value);
            setCurrent(start);
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {current.toLocaleString("uk-UA")}
      {suffix}
    </span>
  );
}

function Persona5Block() {
  const tailSize = Math.round(enLines * 0.04);
  const remaining = enLines - uaLines - tailSize;

  // Pulsating tail opacity
  const [tailOpacity, setTailOpacity] = useState(0.18);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    function pulse(now: number) {
      const t = ((now - start) % 2000) / 2000; // 2s cycle
      const ease = Math.sin(t * Math.PI); // 0 → 1 → 0
      setTailOpacity(0.08 + ease * 0.25); // 0.08 → 0.33
      frame = requestAnimationFrame(pulse);
    }
    frame = requestAnimationFrame(pulse);
    return () => cancelAnimationFrame(frame);
  }, []);

  const doughnutData = {
    labels: ["Українські рядки", "В процесі", "Залишок"],
    datasets: [
      {
        data: [uaLines, tailSize, remaining],
        backgroundColor: [
          "#ef4444",
          `rgba(239,68,68,${tailOpacity})`,
          "rgba(255,255,255,0.08)",
        ],
        borderColor: [
          "#ef4444",
          `rgba(239,68,68,${tailOpacity * 0.4})`,
          "rgba(255,255,255,0.05)",
        ],
        borderWidth: 1,
        cutout: "75%",
      },
    ],
  };

  return (
    <div className="glass-card">
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Left: big percent + doughnut */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative h-48 w-48">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 0 },
                plugins: {
                  legend: { display: false },
                  tooltip: { enabled: false },
                },
              }}
            />
            {/* Center number */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-extrabold text-[#ef4444]">
                <AnimatedNumber value={persona5OverallPercent} suffix="%" />
              </span>
            </div>
          </div>
        </div>

        {/* Right: counters + progress bar */}
        <div className="flex flex-col justify-center gap-4">
          <div>
            <p className="text-sm text-[--color-text-secondary]">
              Українські рядки
            </p>
            <p className="text-2xl font-bold text-[#ef4444]">
              <AnimatedNumber value={uaLines} />
            </p>
          </div>
          <div>
            <p className="text-sm text-[--color-text-secondary]">
              Загальна кількість рядків
            </p>
            <p className="text-2xl font-bold text-[--color-text-primary]">
              <AnimatedNumber value={enLines} />
            </p>
          </div>

          {/* Progress bar */}
          <div>
            <div className="mb-1 flex justify-between text-xs text-[--color-text-secondary]">
              <span>Прогрес</span>
              <span>{persona5OverallPercent}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#ef4444] to-[#f97316]"
                initial={{ width: 0 }}
                whileInView={{ width: `${persona5OverallPercent}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Main Stats Section ============ */

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="stats"
      style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 16px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="mb-8 text-center text-3xl font-extrabold sm:text-4xl">
          Статистика перекладу Persona 5 Royal
        </h2>

        <div className="flex flex-col gap-6">
          <Persona5Block />
        </div>
      </motion.div>
    </section>
  );
}
