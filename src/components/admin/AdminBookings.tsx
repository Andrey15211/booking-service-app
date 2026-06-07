"use client";

import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { enUS, ru } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { initialBookings } from "@/data/bookings";
import { getMaster, masters } from "@/data/masters";
import { getService } from "@/data/services";
import type { Booking, BookingStatus } from "@/types";
import { formatPrice } from "@/utils/date";

const statusStyles: Record<BookingStatus, string> = {
  new: "bg-amber-100 text-amber-900",
  confirmed: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-stone-200 text-stone-600"
};

export function AdminBookings() {
  const t = useTranslations("Admin");
  const masterText = useTranslations("Masters");
  const [bookings, setBookings] = useState(initialBookings);
  const [dateFilter, setDateFilter] = useState("");
  const [masterFilter, setMasterFilter] = useState("");

  const filtered = useMemo(() => bookings.filter((booking) => {
    const matchesDate = !dateFilter || format(parseISO(booking.startsAt), "yyyy-MM-dd") === dateFilter;
    const matchesMaster = !masterFilter || booking.masterId === masterFilter;
    return matchesDate && matchesMaster;
  }), [bookings, dateFilter, masterFilter]);

  const changeStatus = (id: string, status: BookingStatus) => {
    setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status } : booking));
  };

  return (
    <>
      <div className="grid gap-3 border-y border-ink/10 py-5 sm:grid-cols-[minmax(180px,240px)_minmax(200px,280px)_auto] sm:items-end">
        <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-smoke">
          {t("date")}
          <input
            type="text"
            inputMode="numeric"
            pattern="\d{4}-\d{2}-\d{2}"
            placeholder={t("datePlaceholder")}
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="focus-ring h-12 border border-ink/15 bg-white px-3 text-sm font-normal normal-case tracking-normal text-ink"
          />
        </label>
        <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-smoke">
          {t("master")}
          <select value={masterFilter} onChange={(event) => setMasterFilter(event.target.value)} className="focus-ring h-12 border border-ink/15 bg-white px-3 text-sm font-normal normal-case tracking-normal text-ink">
            <option value="">{t("allMasters")}</option>
            {masters.map((master) => <option key={master.id} value={master.id}>{masterText(`${master.id}.name`)}</option>)}
          </select>
        </label>
        <button onClick={() => { setDateFilter(""); setMasterFilter(""); }} className="h-12 justify-self-start text-sm font-semibold underline decoration-gold underline-offset-4 sm:justify-self-end">
          {t("reset")}
        </button>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-smoke">{t("found", { count: filtered.length })}</p>
        <p className="rounded-full bg-ink px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-ivory">{t("demoMode")}</p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 border border-dashed border-ink/20 p-12 text-center">
          <p className="font-display text-3xl">{t("emptyTitle")}</p>
          <p className="mt-2 text-sm text-smoke">{t("emptyText")}</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          {filtered.map((booking) => (
            <BookingRow key={booking.id} booking={booking} onStatusChange={changeStatus} />
          ))}
        </div>
      )}
    </>
  );
}

function BookingRow({
  booking,
  onStatusChange
}: {
  booking: Booking;
  onStatusChange: (id: string, status: BookingStatus) => void;
}) {
  const locale = useLocale();
  const dateLocale = locale === "en" ? enUS : ru;
  const t = useTranslations("Admin");
  const common = useTranslations("Common");
  const serviceText = useTranslations("Services");
  const masterText = useTranslations("Masters");
  const service = getService(booking.serviceId);
  const master = getMaster(booking.masterId);
  const customerName = t(`customers.${booking.id}`);

  return (
    <article className="grid gap-5 bg-white p-5 shadow-[0_1px_0_rgba(17,16,14,0.08)] lg:grid-cols-[130px_1.1fr_1fr_1fr_190px] lg:items-center">
      <div>
        <p className="font-display text-3xl">{format(parseISO(booking.startsAt), "HH:mm")}</p>
        <p className="text-xs text-smoke">{format(parseISO(booking.startsAt), "d MMMM", { locale: dateLocale })}</p>
      </div>
      <div>
        <p className="font-semibold">{customerName}</p>
        <a href={`tel:${booking.customerPhone}`} className="mt-1 block text-xs text-smoke hover:text-ink">{booking.customerPhone}</a>
      </div>
      <div>
        <p className="text-sm font-semibold">{service && serviceText(`${service.id}.name`)}</p>
        <p className="mt-1 text-xs text-smoke">{service && common("minutes", { value: service.duration })} · {service && formatPrice(service.price, locale)}</p>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.12em] text-smoke">{t("master")}</p>
        <p className="mt-1 text-sm font-semibold">{master && masterText(`${master.id}.name`)}</p>
      </div>
      <label className="grid gap-1">
        <span className={`w-fit px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${statusStyles[booking.status]}`}>
          {t(`statuses.${booking.status}`)}
        </span>
        <select
          value={booking.status}
          onChange={(event) => onStatusChange(booking.id, event.target.value as BookingStatus)}
          aria-label={t("statusLabel", { name: customerName })}
          className="focus-ring mt-2 h-10 border border-ink/15 bg-white px-2 text-xs"
        >
          <option value="new">{t("statuses.new")}</option>
          <option value="confirmed">{t("statuses.confirmed")}</option>
          <option value="cancelled">{t("statuses.cancelled")}</option>
        </select>
      </label>
    </article>
  );
}
