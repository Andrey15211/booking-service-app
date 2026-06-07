import { describe, expect, it } from "vitest";
import { getAvailableSlots, intervalsOverlap } from "./date";
import type { Booking, Master, Service } from "@/types";

const service: Service = {
  id: "cut",
  name: "Стрижка",
  category: "Тест",
  description: "Тест",
  duration: 60,
  price: 1000
};
const master: Master = {
  id: "master",
  name: "Мастер",
  role: "Барбер",
  experience: "5 лет",
  bio: "Тест",
  image: "",
  serviceIds: ["cut"],
  schedule: [{ day: 1, start: "10:00", end: "13:00" }]
};

describe("slot logic", () => {
  it("detects intersecting intervals", () => {
    expect(intervalsOverlap(new Date(0), new Date(60), new Date(30), new Date(90))).toBe(true);
    expect(intervalsOverlap(new Date(0), new Date(30), new Date(30), new Date(60))).toBe(false);
  });

  it("excludes occupied intervals and respects duration", () => {
    const date = new Date("2026-06-08T00:00:00");
    const bookings: Booking[] = [{
      id: "1",
      serviceId: "cut",
      masterId: "master",
      startsAt: "2026-06-08T10:30:00",
      customerName: "Тест",
      customerPhone: "+70000000000",
      status: "confirmed"
    }];
    expect(getAvailableSlots({ date, service, master, bookings, now: new Date("2026-06-07T10:00:00") }))
      .toEqual(["11:30", "12:00"]);
  });

  it("does not block cancelled bookings", () => {
    const date = new Date("2026-06-08T00:00:00");
    const bookings: Booking[] = [{
      id: "1",
      serviceId: "cut",
      masterId: "master",
      startsAt: "2026-06-08T10:00:00",
      customerName: "Тест",
      customerPhone: "+70000000000",
      status: "cancelled"
    }];
    expect(getAvailableSlots({ date, service, master, bookings, now: new Date("2026-06-07T10:00:00") }))
      .toContain("10:00");
  });

  it("returns no slots for a past date", () => {
    expect(getAvailableSlots({
      date: new Date("2026-06-01T00:00:00"),
      service,
      master,
      bookings: [],
      now: new Date("2026-06-07T10:00:00")
    })).toEqual([]);
  });
});
