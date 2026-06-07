import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { AdminBookings } from "@/components/admin/AdminBookings";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { Link } from "@/i18n/navigation";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Admin" });
  return { title: t("metadataTitle") };
}

export default async function AdminPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Admin");
  const common = await getTranslations("Common");

  return (
    <main className="min-h-screen bg-[#ebe6de]">
      <header className="bg-ink text-ivory">
        <div className="shell grid h-20 grid-cols-[1fr_auto_1fr] items-center">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-ivory/75 hover:text-ivory"><ArrowLeft size={16} /><span className="hidden sm:inline">{common("backSite")}</span></Link>
          <p className="font-display text-3xl font-semibold">NOIR</p>
          <div className="flex items-center justify-end gap-5">
            <LanguageSwitcher dark />
            <p className="hidden text-xs uppercase tracking-[0.14em] text-gold lg:block">{t("role")}</p>
          </div>
        </div>
      </header>
      <div className="shell py-10 sm:py-14">
        <div className="mb-10">
          <p className="eyebrow mb-4">{t("kicker")}</p>
          <h1 className="font-display text-5xl leading-none sm:text-6xl">{t("title")}</h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-smoke">{t("description")}</p>
        </div>
        <AdminBookings />
      </div>
    </main>
  );
}
