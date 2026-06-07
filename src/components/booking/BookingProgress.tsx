import { useTranslations } from "next-intl";

export function BookingProgress({ step }: { step: number }) {
  const t = useTranslations("Booking");
  const labels = t.raw("progress") as string[];
  return (
    <div aria-label={t("step", { step })} className="mb-8">
      <div className="mb-3 flex justify-between text-[10px] font-semibold uppercase tracking-[0.13em] text-smoke">
        <span>{t("step", { step })}</span>
        <span>{labels[step - 1]}</span>
      </div>
      <div className="grid grid-cols-6 gap-1">
        {labels.map((label, index) => (
          <div key={label} className={`h-1 ${index < step ? "bg-gold" : "bg-ink/10"}`} />
        ))}
      </div>
    </div>
  );
}
