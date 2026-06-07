import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");
  const common = useTranslations("Common");
  return (
    <footer className="bg-ink py-10 text-ivory/60">
      <div className="shell flex flex-col gap-5 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-2xl text-ivory">NOIR Studio</p>
        <p>{t("address")}</p>
        <div className="flex gap-6">
          <Link href="/booking" className="text-ivory hover:text-gold">{t("booking")}</Link>
          <a href="tel:+74951234567" className="hover:text-ivory">{common("phone")}</a>
        </div>
      </div>
    </footer>
  );
}
