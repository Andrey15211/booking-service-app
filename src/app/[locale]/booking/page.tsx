import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Booking" });
  return { title: t("metadataTitle") };
}

export default async function BookingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const common = await getTranslations("Common");

  return (
    <main className="min-h-screen bg-ivory">
      <header className="border-b border-ink/10">
        <div className="shell grid h-20 grid-cols-[1fr_auto_1fr] items-center">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold"><ArrowLeft size={16} /><span className="hidden sm:inline">{common("backHome")}</span></Link>
          <Link href="/" className="font-display text-3xl font-semibold">NOIR</Link>
          <div className="flex items-center justify-end gap-5">
            <LanguageSwitcher />
            <a href="tel:+74951234567" className="hidden text-sm text-smoke lg:block">{common("phone")}</a>
          </div>
        </div>
      </header>
      <div className="shell py-10 sm:py-16"><BookingFlow /></div>
    </main>
  );
}
