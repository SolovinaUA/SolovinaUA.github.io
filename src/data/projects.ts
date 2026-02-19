export interface Project {
  id: string;
  name: string;
  status: "in-progress" | "waiting" | "someday" | "official";
  statusLabel: string;
  official: boolean;
  color: string;
  gradient: string;
  image?: string;
}

// TODO: замінити дані на реальні
export const projects: Project[] = [
  {
    id: "persona5",
    name: "Persona 5 Royal",
    status: "in-progress",
    statusLabel: "У роботі",
    official: false,
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #e94560 100%)",
    image: "https://cdn2.steamgriddb.com/hero/f87ab3858eb99f1af77cfc900cd91199.jpg",
  },
  {
    id: "dave-the-diver",
    name: "Dave The Diver",
    status: "waiting",
    statusLabel: "Чекає оновлення",
    official: false,
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #0c1445 0%, #1a3a6b 40%, #2196f3 100%)",
    image: "https://cdn2.steamgriddb.com/grid/1d50a96e0e3d7b721de8aafbb246067d.png",
  },
  {
    id: "the-missing",
    name: "The MISSING",
    status: "someday",
    statusLabel: "Колись вийде",
    official: false,
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 40%, #8b5cf6 100%)",
    image: "https://shared.steamstatic.com/store_item_assets/steam/apps/842910/library_hero.jpg",
  },
  {
    id: "echo-generation",
    name: "Echo Generation: Midnight Edition",
    status: "official",
    statusLabel: "Офіційна локалізація",
    official: true,
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #0a1f0a 0%, #1a3d2a 40%, #22c55e 100%)",
    image: "https://shared.steamstatic.com/store_item_assets/steam/apps/1072300/library_hero_2x.jpg",
  },
  {
    id: "ravenlok",
    name: "Ravenlok: Legendary Edition",
    status: "official",
    statusLabel: "Офіційна локалізація",
    official: true,
    color: "#eab308",
    gradient: "linear-gradient(135deg, #1a1500 0%, #3d2e06 40%, #eab308 100%)",
  },
];
