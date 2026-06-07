"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

export function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();

  return (
    <div className={`flex items-center text-[10px] font-semibold tracking-[0.14em] ${dark ? "text-ivory/55" : "text-smoke"}`} aria-label="Language">
      {(["ru", "en"] as const).map((item, index) => (
        <span key={item} className="flex items-center">
          {index > 0 && <span className="mx-1.5 opacity-35">/</span>}
          <Link
            href={pathname}
            locale={item}
            aria-pressed={locale === item}
            className={`focus-ring uppercase transition hover:text-gold ${locale === item ? (dark ? "text-ivory" : "text-ink") : ""}`}
          >
            {item}
          </Link>
        </span>
      ))}
    </div>
  );
}
