export type BookingStatus = "new" | "confirmed" | "cancelled";

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: number;
  price: number;
}

export interface WorkDay {
  day: number;
  start: string;
  end: string;
}

export interface Master {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  image: string;
  serviceIds: string[];
  schedule: WorkDay[];
}

export interface Booking {
  id: string;
  serviceId: string;
  masterId: string;
  startsAt: string;
  customerName: string;
  customerPhone: string;
  status: BookingStatus;
}

export interface BookingDraft {
  serviceId: string;
  masterId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
}
