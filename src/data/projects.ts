export interface Project {
  id: string;
  name: string;
  status: "in-progress" | "waiting" | "someday" | "official";
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
    image: "https://cdn2.steamgriddb.com/hero/f87ab3858eb99f1af77cfc900cd91199.jpg",
    downloadUrl: "https://lbklauncher.com/games/persona_5_royal/solovina-komanda",
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
    image: "https://images.alphacoders.com/132/thumb-1920-1321419.png",
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
    image: "https://shared.steamstatic.com/store_item_assets/steam/apps/1072290/042f7f1eed524de381b28473cdf2fc1ea77a77f6/library_hero_2x.jpg",
    downloadUrl: "https://store.steampowered.com/app/1072290/Ravenlok_Legendary_Edition/",
    downloadLabel: "Придбати",
  },
];
