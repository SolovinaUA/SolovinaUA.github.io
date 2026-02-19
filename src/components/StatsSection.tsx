import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { projects } from "../data/projects";
import { progressData, dates } from "../data/progress";
import {
  persona5OverallPercent,
  uaLines,
  enLines,
} from "../data/persona5";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement
);

/* ============ Chart config helpers ============ */

const gridColor = "rgba(255,255,255,0.06)";
const tickColor = "rgba(255,255,255,0.4)";

const commonScales = {
  x: {
    grid: { color: gridColor },
    ticks: { color: tickColor, font: { size: 11 } },
    border: { color: "transparent" },
  },
  y: {
    min: 0,
    max: 100,
    grid: { color: gridColor },
    ticks: {
      color: tickColor,
      font: { size: 11 },
      callback: (v: string | number) => `${v}%`,
    },
    border: { color: "transparent" },
  },
};

const dateLabels = dates.map((d) => {
  const [y, m] = d.split("-");
  const months = [
    "", "Січ", "Лют", "Бер", "Кві", "Тра", "Чер",
    "Лип", "Сер", "Вер", "Жов", "Лис", "Гру",
  ];
  return `${months[parseInt(m)]} '${y.slice(2)}`;
});

function getProjectLineData(projectId: string) {
  return dates.map((d) => {
    const p = progressData.find(
      (pt) => pt.date === d && pt.projectId === projectId
    );
    return p ? p.percent : null;
  });
}

/* ============ Progress Over Time (Line) ============ */

function ProgressChart() {
  const data = {
    labels: dateLabels,
    datasets: projects.map((proj) => ({
      label: proj.name,
      data: getProjectLineData(proj.id),
      borderColor: proj.color,
      backgroundColor: proj.color + "20",
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      borderWidth: 2,
    })),
  };

  return (
    <div className="glass-card">
      <h3 className="mb-4 text-lg font-bold">Прогрес у часі</h3>
      <div className="relative h-72 w-full sm:h-80">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: {
                labels: {
                  color: "rgba(255,255,255,0.7)",
                  padding: 16,
                  usePointStyle: true,
                  pointStyleWidth: 8,
                  font: { size: 12 },
                },
              },
              tooltip: {
                backgroundColor: "rgba(27,27,27,0.95)",
                borderColor: "rgba(255,255,255,0.1)",
                borderWidth: 1,
                titleColor: "#f0f0f0",
                bodyColor: "#a0a0a8",
                padding: 12,
                callbacks: {
                  label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%`,
                },
              },
            },
            scales: commonScales,
          }}
        />
      </div>
    </div>
  );
}

/* ============ Top-5 Dynamics (Area) ============ */

function DynamicsChart() {
  const data = {
    labels: dateLabels,
    datasets: projects.map((proj) => ({
      label: proj.name,
      data: getProjectLineData(proj.id),
      borderColor: proj.color,
      backgroundColor: proj.color + "15",
      fill: true,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      borderWidth: 2,
    })),
  };

  return (
    <div className="glass-card">
      <h3 className="mb-4 text-lg font-bold">
        Динаміка розвитку топ-5 активних проєктів
      </h3>
      <div className="relative h-72 w-full sm:h-80">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: {
                labels: {
                  color: "rgba(255,255,255,0.7)",
                  padding: 16,
                  usePointStyle: true,
                  pointStyleWidth: 8,
                  font: { size: 12 },
                },
              },
              tooltip: {
                backgroundColor: "rgba(27,27,27,0.95)",
                borderColor: "rgba(255,255,255,0.1)",
                borderWidth: 1,
                titleColor: "#f0f0f0",
                bodyColor: "#a0a0a8",
                padding: 12,
                callbacks: {
                  label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}%`,
                },
              },
            },
            scales: commonScales,
          }}
        />
      </div>
    </div>
  );
}

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
  const doughnutData = {
    labels: ["Українські рядки", "Англійські рядки (залишок)"],
    datasets: [
      {
        data: [uaLines, enLines - uaLines],
        backgroundColor: ["#ef4444", "rgba(255,255,255,0.08)"],
        borderColor: ["#ef4444", "rgba(255,255,255,0.05)"],
        borderWidth: 1,
        cutout: "75%",
      },
    ],
  };

  return (
    <div className="glass-card">
      <h3 className="mb-6 text-lg font-bold">
        Persona 5 Royal — прогрес локалізації
      </h3>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Left: big percent + doughnut */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative h-48 w-48">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: "rgba(27,27,27,0.95)",
                    titleColor: "#f0f0f0",
                    bodyColor: "#a0a0a8",
                    callbacks: {
                      label: (ctx) =>
                        `${ctx.label}: ${ctx.parsed.toLocaleString("uk-UA")}`,
                    },
                  },
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
        <h2 className="mb-2 text-center text-3xl font-extrabold sm:text-4xl">
          Статистика
        </h2>
        <p className="mb-10 text-center text-[--color-text-secondary]">
          Наш прогрес у цифрах та графіках
        </p>

        <div className="flex flex-col gap-6">
          <ProgressChart />
          <DynamicsChart />
          <Persona5Block />
        </div>
      </motion.div>
    </section>
  );
}
