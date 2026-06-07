"use client";

import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("Common");

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory text-ink" role="status">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-ink/15 border-t-gold" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-smoke">{t("loading")}</p>
      </div>
    </div>
  );
}
