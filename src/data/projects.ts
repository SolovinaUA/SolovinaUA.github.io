export interface Project {
  id: string;
  name: string;
  status: "in-progress" | "released" | "waiting" | "someday" | "official";
  statusLabel: string;
  official: boolean;
  color: string;
  gradient: string;
  image?: string;
  downloadUrl?: string;
  downloadLabel?: string;
  downloadDisabled?: boolean;
  badgeLabel?: string;
}

// TODO: замінити дані на реальні
export const projects: Project[] = [
  {
    id: "persona5",
    name: "Persona 5 Royal",
    status: "in-progress",
    statusLabel: "Ранній доступ!",
    official: false,
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #e94560 100%)",
    image: "/images/persona5.webp",
    downloadUrl: "https://lbklauncher.com/games/persona_5_royal/solovina-komanda",
    downloadLabel: "Завантажити",
  },
  {
    id: "kingdom-hearts-2",
    name: "KINGDOM HEARTS II",
    status: "released",
    statusLabel: "Вийшов",
    official: false,
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #1e293b 40%, #f59e0b 100%)",
    image: "/images/kh2.webp",
    downloadUrl: "https://lbklauncher.com/games/kingdom_hearts_ii/solovina-komanda",
    downloadLabel: "Завантажити",
  },
  {
    id: "kingdom-hearts-3",
    name: "KINGDOM HEARTS III +\nRe Mind (DLC)",
    status: "in-progress",
    statusLabel: "У процесі",
    official: false,
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #0a1628 0%, #1a2d4e 40%, #3b82f6 100%)",
    image: "/images/kh3.webp",
  },
  {
    id: "cat-quest",
    name: "Cat Quest",
    status: "released",
    statusLabel: "Вийшов",
    official: false,
    color: "#f97316",
    gradient: "linear-gradient(135deg, #1a1208 0%, #3d2a0e 40%, #f97316 100%)",
    image: "/images/catquest.webp",
    downloadUrl: "https://lbklauncher.com/games/cat_quest/solovina-komanda",
    downloadLabel: "Завантажити",
  },
  {
    id: "florence",
    name: "Florence",
    status: "released",
    statusLabel: "Вийшов",
    official: false,
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #1a0a18 0%, #3d1a36 40%, #ec4899 100%)",
    image: "/images/florence.webp",
    downloadUrl: "https://lbklauncher.com/games/florence/solovina-komanda",
    downloadLabel: "Завантажити",
  },
  {
    id: "i-am-fish",
    name: "I Am Fish",
    status: "released",
    statusLabel: "Вийшов",
    official: false,
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #0a1a2e 0%, #0e3044 40%, #06b6d4 100%)",
    image: "/images/iamfish.webp",
    downloadUrl: "https://lbklauncher.com/games/i_am_fish/solovina-komanda-ukrkonservzavod",
    downloadLabel: "Завантажити",
  },
  {
    id: "dave-the-diver",
    name: "Dave The Diver",
    status: "waiting",
    statusLabel: "Оновимо у 2026 році, після виходу завантажуваного вмісту!",
    official: false,
    color: "#3b82f6",
    gradient: "linear-gradient(135deg, #0c1445 0%, #1a3a6b 40%, #2196f3 100%)",
    image: "/images/davethediver.webp",
    downloadUrl: "#",
    downloadLabel: "Завантажити",
    downloadDisabled: true,
    badgeLabel: "Чекає оновлення",
  },
  {
    id: "the-missing",
    name: "The MISSING: J.J. Macfield and the Island of Memories",
    status: "someday",
    statusLabel: "Колись вийде",
    official: false,
    color: "#a855f7",
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 40%, #8b5cf6 100%)",
    image: "/images/themissing.webp",
  },
  {
    id: "echo-generation",
    name: "Echo Generation: Midnight Edition",
    status: "official",
    statusLabel: "Офіційна локалізація",
    official: true,
    color: "#22c55e",
    gradient: "linear-gradient(135deg, #0a1f0a 0%, #1a3d2a 40%, #22c55e 100%)",
    image: "/images/echogen.webp",
    downloadUrl: "https://store.steampowered.com/app/1072300/Echo_Generation_Midnight_Edition/?l=ukrainian",
    downloadLabel: "Придбати",
  },
  {
    id: "ravenlok",
    name: "Ravenlok: Legendary Edition",
    status: "official",
    statusLabel: "Офіційна локалізація",
    official: true,
    color: "#eab308",
    gradient: "linear-gradient(135deg, #1a1500 0%, #3d2e06 40%, #eab308 100%)",
    image: "/images/ravenlok.webp",
    downloadUrl: "https://store.steampowered.com/app/1072290/Ravenlok_Legendary_Edition/",
    downloadLabel: "Придбати",
  },
];
