"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type CustomerFields = { customerName: string; customerPhone: string };

export function CustomerForm({
  defaults,
  onBack,
  onSubmit
}: {
  defaults: CustomerFields;
  onBack: () => void;
  onSubmit: (values: CustomerFields) => void;
}) {
  const t = useTranslations("Booking");
  const customerSchema = z.object({
    customerName: z.string().trim().min(2, t("form.errors.nameRequired")).max(80, t("form.errors.nameLong")),
    customerPhone: z.string().trim().regex(
      /^(\+7|8)[\s(]?\d{3}[\s)]?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/,
      t("form.errors.phone")
    )
  });
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CustomerFields>({
    resolver: zodResolver(customerSchema),
    defaultValues: defaults
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-6">
        <label className="grid gap-2 text-sm font-semibold">
          {t("form.name")}
          <input
            {...register("customerName")}
            autoComplete="name"
            className="focus-ring h-14 border border-ink/20 bg-transparent px-4 font-normal"
            placeholder={t("form.namePlaceholder")}
            aria-invalid={Boolean(errors.customerName)}
          />
          {errors.customerName && <span className="text-xs font-normal text-red-700">{errors.customerName.message}</span>}
        </label>
        <label className="grid gap-2 text-sm font-semibold">
          {t("form.phone")}
          <input
            {...register("customerPhone")}
            autoComplete="tel"
            inputMode="tel"
            className="focus-ring h-14 border border-ink/20 bg-transparent px-4 font-normal"
            placeholder={t("form.phonePlaceholder")}
            aria-invalid={Boolean(errors.customerPhone)}
          />
          {errors.customerPhone && <span className="text-xs font-normal text-red-700">{errors.customerPhone.message}</span>}
        </label>
        <label className="flex items-start gap-3 text-xs leading-5 text-smoke">
          <input type="checkbox" required className="mt-1 accent-[#b6935c]" />
          {t("form.consent")}
        </label>
      </div>
      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button type="button" onClick={onBack} className="btn-secondary">{t("back")}</button>
        <button type="submit" disabled={isSubmitting} className="btn-primary">{isSubmitting ? t("form.submitting") : t("form.submit")}</button>
      </div>
    </form>
  );
}
