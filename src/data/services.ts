import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "signature-cut",
    name: "Авторская стрижка",
    category: "Барберинг",
    description: "Консультация, форма, мытьё и укладка с рекомендациями по уходу.",
    duration: 60,
    price: 3500
  },
  {
    id: "beard-ritual",
    name: "Ритуал для бороды",
    category: "Барберинг",
    description: "Моделирование формы, горячее полотенце и уход премиальной косметикой.",
    duration: 45,
    price: 2600
  },
  {
    id: "color-gloss",
    name: "Тонирование и блеск",
    category: "Колористика",
    description: "Мягкое обновление оттенка, уход и профессиональная укладка.",
    duration: 90,
    price: 6200
  },
  {
    id: "face-care",
    name: "Уход за лицом",
    category: "Эстетика",
    description: "Очищение, массаж и восстанавливающая маска по типу кожи.",
    duration: 60,
    price: 4300
  }
];

export const getService = (id: string) => services.find((service) => service.id === id);
