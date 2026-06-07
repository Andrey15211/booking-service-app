import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ dark = false }: { dark?: boolean }) {
  const t = useTranslations("Navigation");
  return (
    <header className={dark ? "bg-ink text-ivory" : "bg-ivory text-ink"}>
      <div className="shell flex h-20 items-center justify-between">
        <Link href="/" className="font-display text-3xl font-semibold tracking-[-0.04em]">
          NOIR
        </Link>
        <nav aria-label={t("label")} className="hidden items-center gap-8 text-sm md:flex">
          <Link href="/#services" className="transition hover:text-gold">{t("services")}</Link>
          <Link href="/#masters" className="transition hover:text-gold">{t("masters")}</Link>
          <Link href="/admin" className="transition hover:text-gold">{t("admin")}</Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher dark={dark} />
          <Link href="/booking" className={`${dark ? "btn-primary" : "btn-secondary"} px-4 sm:px-6`}>{t("book")}</Link>
        </div>
      </div>
    </header>
  );
}
