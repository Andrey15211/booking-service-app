import type { Master } from "@/types";

const standardSchedule = [
  { day: 1, start: "10:00", end: "20:00" },
  { day: 2, start: "10:00", end: "20:00" },
  { day: 3, start: "10:00", end: "20:00" },
  { day: 4, start: "10:00", end: "20:00" },
  { day: 5, start: "10:00", end: "21:00" },
  { day: 6, start: "10:00", end: "18:00" }
];

export const masters: Master[] = [
  {
    id: "alexey-volkov",
    name: "Алексей Волков",
    role: "Топ-барбер",
    experience: "9 лет опыта",
    bio: "Точные формы, классика и современная текстура без лишней демонстративности.",
    image: "",
    serviceIds: ["signature-cut", "beard-ritual"],
    schedule: standardSchedule
  },
  {
    id: "anna-morozova",
    name: "Анна Морозова",
    role: "Стилист-колорист",
    experience: "11 лет опыта",
    bio: "Естественный цвет, мягкие переходы и укладки, которые живут после салона.",
    image: "",
    serviceIds: ["signature-cut", "color-gloss"],
    schedule: standardSchedule
  },
  {
    id: "maria-orlova",
    name: "Мария Орлова",
    role: "Эстетист",
    experience: "7 лет опыта",
    bio: "Деликатные протоколы ухода с вниманием к состоянию и комфорту кожи.",
    image: "",
    serviceIds: ["face-care", "color-gloss"],
    schedule: standardSchedule
  }
];

export const getMaster = (id: string) => masters.find((master) => master.id === id);
