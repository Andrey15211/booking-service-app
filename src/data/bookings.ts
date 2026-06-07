import { addDays, format, setHours, setMinutes, startOfDay } from "date-fns";
import type { Booking } from "@/types";

const at = (daysFromToday: number, hours: number, minutes = 0) =>
  setMinutes(setHours(addDays(startOfDay(new Date()), daysFromToday), hours), minutes).toISOString();

export const initialBookings: Booking[] = [
  {
    id: "bk-1001",
    serviceId: "signature-cut",
    masterId: "alexey-volkov",
    startsAt: at(1, 11),
    customerName: "Михаил Соколов",
    customerPhone: "+7 916 240-18-72",
    status: "confirmed"
  },
  {
    id: "bk-1002",
    serviceId: "beard-ritual",
    masterId: "alexey-volkov",
    startsAt: at(1, 14, 30),
    customerName: "Илья Воронцов",
    customerPhone: "+7 985 132-44-09",
    status: "new"
  },
  {
    id: "bk-1003",
    serviceId: "color-gloss",
    masterId: "anna-morozova",
    startsAt: at(2, 12),
    customerName: "Екатерина Белова",
    customerPhone: "+7 903 708-25-61",
    status: "confirmed"
  },
  {
    id: "bk-1004",
    serviceId: "face-care",
    masterId: "maria-orlova",
    startsAt: at(3, 16),
    customerName: "Ольга Миронова",
    customerPhone: "+7 926 515-03-48",
    status: "cancelled"
  }
];

export const bookingDate = (booking: Booking) => format(new Date(booking.startsAt), "yyyy-MM-dd");
