"use client";

import { useMemo, useState } from "react";
import { addDays, format, parseISO, startOfDay } from "date-fns";
import { enUS, ru } from "date-fns/locale";
import { CalendarDays, Check, Clock3, Scissors } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { initialBookings } from "@/data/bookings";
import { masters } from "@/data/masters";
import { services } from "@/data/services";
import type { BookingDraft } from "@/types";
import { formatPrice, getAvailableSlots } from "@/utils/date";
import { BookingProgress } from "./BookingProgress";
import { CustomerFields, CustomerForm } from "./CustomerForm";

const initialDraft: BookingDraft = {
  serviceId: "",
  masterId: "",
  date: "",
  time: "",
  customerName: "",
  customerPhone: ""
};

export function BookingFlow() {
  const locale = useLocale();
  const dateLocale = locale === "en" ? enUS : ru;
  const t = useTranslations("Booking");
  const common = useTranslations("Common");
  const serviceText = useTranslations("Services");
  const masterText = useTranslations("Masters");
  const headings = t.raw("headings") as string[];
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<BookingDraft>(initialDraft);
  const service = services.find((item) => item.id === draft.serviceId);
  const master = masters.find((item) => item.id === draft.masterId);
  const eligibleMasters = masters.filter((item) => item.serviceIds.includes(draft.serviceId));
  const dates = useMemo(() => Array.from({ length: 14 }, (_, index) => addDays(startOfDay(new Date()), index)), []);
  const slots = service && master && draft.date
    ? getAvailableSlots({ date: parseISO(draft.date), service, master, bookings: initialBookings })
    : [];

  const choose = (patch: Partial<BookingDraft>, nextStep: number) => {
    setDraft((current) => ({ ...current, ...patch }));
    setStep(nextStep);
  };

  if (step === 6 && service && master) {
    return (
      <section className="mx-auto max-w-2xl text-center">
        <BookingProgress step={6} />
        <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink"><Check size={28} /></div>
        <p className="eyebrow mb-4">{t("confirmationKicker")}</p>
        <h1 className="font-display text-5xl leading-none sm:text-6xl">{t("confirmationTitle", { name: draft.customerName.split(" ")[0] })}</h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-smoke">
          {t("confirmationText", { phone: draft.customerPhone })}
        </p>
        <div className="mt-9 grid gap-px bg-ink/10 text-left sm:grid-cols-2">
          {[
            [t("summaryLabels.service"), serviceText(`${service.id}.name`)],
            [t("summaryLabels.master"), masterText(`${master.id}.name`)],
            [t("summaryLabels.date"), format(parseISO(draft.date), "d MMMM yyyy", { locale: dateLocale })],
            [t("summaryLabels.time"), draft.time]
          ].map(([label, value]) => (
            <div key={label} className="bg-ivory p-5"><p className="text-[10px] uppercase tracking-[0.16em] text-smoke">{label}</p><p className="mt-2 font-semibold">{value}</p></div>
          ))}
        </div>
        <button onClick={() => { setDraft(initialDraft); setStep(1); }} className="btn-secondary mt-8">{t("restart")}</button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      <BookingProgress step={step} />
      <div className="mb-8">
        <p className="eyebrow mb-4">{t("kicker")}</p>
        <h1 className="font-display text-4xl leading-none sm:text-5xl">{headings[step - 1]}</h1>
      </div>

      {step === 1 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((item) => (
            <button key={item.id} onClick={() => choose({ serviceId: item.id, masterId: "", date: "", time: "" }, 2)} className="focus-ring group border border-ink/15 p-5 text-left transition hover:border-gold hover:bg-white/40">
              <div className="flex items-start justify-between gap-4">
                <Scissors size={20} className="text-gold" />
                <span className="text-xs text-smoke">{common("minutes", { value: item.duration })}</span>
              </div>
              <p className="mt-8 font-display text-2xl">{serviceText(`${item.id}.name`)}</p>
              <p className="mt-2 text-xs leading-5 text-smoke">{serviceText(`${item.id}.description`)}</p>
              <p className="mt-5 text-sm font-semibold">{formatPrice(item.price, locale)}</p>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {eligibleMasters.map((item) => (
              <button key={item.id} onClick={() => choose({ masterId: item.id, date: "", time: "" }, 3)} className="focus-ring border border-ink/15 p-5 text-left transition hover:border-gold hover:bg-white/40">
                <p className="font-display text-2xl">{masterText(`${item.id}.name`)}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-gold">{masterText(`${item.id}.role`)}</p>
                <p className="mt-5 text-sm leading-6 text-smoke">{masterText(`${item.id}.bio`)}</p>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(1)} className="btn-secondary mt-7">{t("back")}</button>
        </>
      )}

      {step === 3 && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {dates.map((date) => {
              const value = format(date, "yyyy-MM-dd");
              const isClosed = master ? !master.schedule.some((item) => item.day === date.getDay()) : false;
              return (
                <button key={value} disabled={isClosed} onClick={() => choose({ date: value, time: "" }, 4)} className="focus-ring border border-ink/15 px-3 py-5 text-center transition hover:border-gold disabled:cursor-not-allowed disabled:opacity-35">
                  <span className="block text-[10px] uppercase tracking-[0.12em] text-smoke">{format(date, "EEE", { locale: dateLocale })}</span>
                  <span className="mt-2 block font-display text-3xl">{format(date, "d")}</span>
                  <span className="block text-xs text-smoke">{format(date, "MMM", { locale: dateLocale })}</span>
                </button>
              );
            })}
          </div>
          <button onClick={() => setStep(2)} className="btn-secondary mt-7">{t("back")}</button>
        </>
      )}

      {step === 4 && (
        <>
          {slots.length > 0 ? (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
              {slots.map((time) => (
                <button key={time} onClick={() => choose({ time }, 5)} className="focus-ring border border-ink/15 py-4 text-sm font-semibold transition hover:border-gold hover:bg-gold">
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-ink/20 px-6 py-12 text-center">
              <Clock3 className="mx-auto text-gold" />
              <p className="mt-4 font-display text-2xl">{t("emptyTitle")}</p>
              <p className="mt-2 text-sm text-smoke">{t("emptyText")}</p>
            </div>
          )}
          <button onClick={() => setStep(3)} className="btn-secondary mt-7">{t("back")}</button>
        </>
      )}

      {step === 5 && (
        <div className="grid gap-9 md:grid-cols-[1fr_280px]">
          <CustomerForm
            defaults={{ customerName: draft.customerName, customerPhone: draft.customerPhone }}
            onBack={() => setStep(4)}
            onSubmit={(values: CustomerFields) => choose(values, 6)}
          />
          <aside className="h-fit bg-ink p-6 text-ivory">
            <p className="text-[10px] uppercase tracking-[0.17em] text-gold">{t("summary")}</p>
            <p className="mt-5 font-display text-2xl">{service && serviceText(`${service.id}.name`)}</p>
            <div className="mt-6 grid gap-3 border-t border-white/15 pt-5 text-xs text-ivory/65">
              <p>{master && masterText(`${master.id}.name`)}</p>
              <p className="flex items-center gap-2"><CalendarDays size={14} /> {draft.date && format(parseISO(draft.date), "d MMMM", { locale: dateLocale })}</p>
              <p className="flex items-center gap-2"><Clock3 size={14} /> {draft.time} · {service && common("minutes", { value: service.duration })}</p>
              <p className="mt-2 text-base font-semibold text-ivory">{service && formatPrice(service.price, locale)}</p>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
