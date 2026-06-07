import {
  addMinutes,
  format,
  isBefore,
  parse,
  parseISO,
  startOfDay
} from "date-fns";
import { ru } from "date-fns/locale";
import type { Booking, Master, Service } from "@/types";

export const formatPrice = (price: number, locale = "ru") =>
  locale === "en"
    ? "₽" + new Intl.NumberFormat("en-US").format(price)
    : new Intl.NumberFormat("ru-RU").format(price) + " ₽";

export const formatBookingDate = (date: Date) =>
  format(date, "d MMMM, EEEE", { locale: ru });

export const intervalsOverlap = (
  firstStart: Date,
  firstEnd: Date,
  secondStart: Date,
  secondEnd: Date
) => firstStart < secondEnd && secondStart < firstEnd;

const dateAtTime = (date: Date, time: string) =>
  parse(time, "HH:mm", startOfDay(date));

export function getAvailableSlots({
  date,
  service,
  master,
  bookings,
  now = new Date()
}: {
  date: Date;
  service: Service;
  master: Master;
  bookings: Booking[];
  now?: Date;
}) {
  if (isBefore(startOfDay(date), startOfDay(now))) return [];

  const workDay = master.schedule.find((item) => item.day === date.getDay());
  if (!workDay) return [];

  const dayStart = dateAtTime(date, workDay.start);
  const dayEnd = dateAtTime(date, workDay.end);
  const activeBookings = bookings.filter(
    (booking) => booking.masterId === master.id && booking.status !== "cancelled"
  );
  const slots: string[] = [];

  for (
    let slotStart = dayStart;
    addMinutes(slotStart, service.duration) <= dayEnd;
    slotStart = addMinutes(slotStart, 30)
  ) {
    const slotEnd = addMinutes(slotStart, service.duration);
    const inPast = isBefore(slotStart, now);
    const collides = activeBookings.some((booking) => {
      const bookedServiceDuration =
        booking.serviceId === "color-gloss" ? 90 :
        booking.serviceId === "beard-ritual" ? 45 : 60;
      const bookedStart = parseISO(booking.startsAt);
      return intervalsOverlap(slotStart, slotEnd, bookedStart, addMinutes(bookedStart, bookedServiceDuration));
    });

    if (!inPast && !collides) slots.push(format(slotStart, "HH:mm"));
  }

  return slots;
}
