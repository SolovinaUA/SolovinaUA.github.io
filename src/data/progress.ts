export interface ProgressPoint {
  date: string;
  projectId: string;
  percent: number;
}

// TODO: замінити на реальні дані прогресу
export const progressData: ProgressPoint[] = [
  // Persona 5 Royal
  { date: "2024-06", projectId: "persona5", percent: 5 },
  { date: "2024-07", projectId: "persona5", percent: 12 },
  { date: "2024-08", projectId: "persona5", percent: 20 },
  { date: "2024-09", projectId: "persona5", percent: 28 },
  { date: "2024-10", projectId: "persona5", percent: 35 },
  { date: "2024-11", projectId: "persona5", percent: 42 },
  { date: "2024-12", projectId: "persona5", percent: 48 },
  { date: "2025-01", projectId: "persona5", percent: 53 },
  { date: "2025-02", projectId: "persona5", percent: 60 },

  // Dave The Diver
  { date: "2024-06", projectId: "dave-the-diver", percent: 30 },
  { date: "2024-07", projectId: "dave-the-diver", percent: 42 },
  { date: "2024-08", projectId: "dave-the-diver", percent: 55 },
  { date: "2024-09", projectId: "dave-the-diver", percent: 65 },
  { date: "2024-10", projectId: "dave-the-diver", percent: 72 },
  { date: "2024-11", projectId: "dave-the-diver", percent: 78 },
  { date: "2024-12", projectId: "dave-the-diver", percent: 82 },
  { date: "2025-01", projectId: "dave-the-diver", percent: 85 },
  { date: "2025-02", projectId: "dave-the-diver", percent: 85 },

  // The MISSING
  { date: "2024-06", projectId: "the-missing", percent: 0 },
  { date: "2024-07", projectId: "the-missing", percent: 2 },
  { date: "2024-08", projectId: "the-missing", percent: 5 },
  { date: "2024-09", projectId: "the-missing", percent: 8 },
  { date: "2024-10", projectId: "the-missing", percent: 10 },
  { date: "2024-11", projectId: "the-missing", percent: 12 },
  { date: "2024-12", projectId: "the-missing", percent: 14 },
  { date: "2025-01", projectId: "the-missing", percent: 15 },
  { date: "2025-02", projectId: "the-missing", percent: 17 },

  // Echo Generation
  { date: "2024-06", projectId: "echo-generation", percent: 60 },
  { date: "2024-07", projectId: "echo-generation", percent: 68 },
  { date: "2024-08", projectId: "echo-generation", percent: 75 },
  { date: "2024-09", projectId: "echo-generation", percent: 82 },
  { date: "2024-10", projectId: "echo-generation", percent: 88 },
  { date: "2024-11", projectId: "echo-generation", percent: 93 },
  { date: "2024-12", projectId: "echo-generation", percent: 97 },
  { date: "2025-01", projectId: "echo-generation", percent: 100 },
  { date: "2025-02", projectId: "echo-generation", percent: 100 },

  // Ravenlok
  { date: "2024-06", projectId: "ravenlok", percent: 40 },
  { date: "2024-07", projectId: "ravenlok", percent: 50 },
  { date: "2024-08", projectId: "ravenlok", percent: 60 },
  { date: "2024-09", projectId: "ravenlok", percent: 70 },
  { date: "2024-10", projectId: "ravenlok", percent: 80 },
  { date: "2024-11", projectId: "ravenlok", percent: 88 },
  { date: "2024-12", projectId: "ravenlok", percent: 95 },
  { date: "2025-01", projectId: "ravenlok", percent: 100 },
  { date: "2025-02", projectId: "ravenlok", percent: 100 },
];

export const dates = [
  "2024-06",
  "2024-07",
  "2024-08",
  "2024-09",
  "2024-10",
  "2024-11",
  "2024-12",
  "2025-01",
  "2025-02",
];
