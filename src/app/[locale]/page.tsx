import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock3 } from "lucide-react";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { masters } from "@/data/masters";
import { services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import { formatPrice } from "@/utils/date";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const serviceText = await getTranslations("Services");
  const masterText = await getTranslations("Masters");
  const common = await getTranslations("Common");
  const reviews = t.raw("reviews") as Array<{ text: string; author: string }>;

  return (
    <main>
      <div className="bg-ink text-ivory">
        <Header dark />
        <section className="shell grid min-h-[calc(100vh-80px)] items-center gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:py-14">
          <div className="relative z-10 max-w-2xl py-8">
            <p className="eyebrow mb-8">{t("heroKicker")}</p>
            <h1 className="display-title">{t("heroTitle")}<br /><span className="italic text-sand">{t("heroAccent")}</span></h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-ivory/65 sm:text-lg">{t("heroText")}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/booking" className="btn-primary">{t("chooseTime")} <ArrowRight size={17} /></Link>
              <a href="#services" className="inline-flex min-h-12 items-center justify-center px-6 text-sm font-semibold text-ivory/80 hover:text-ivory">{t("viewServices")}</a>
            </div>
          </div>
          <div className="relative h-[52vh] min-h-[420px] overflow-hidden bg-[#292621] lg:h-[74vh]" role="img" aria-label={t("heroImageLabel")}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_28%,rgba(182,147,92,0.34),transparent_20%),linear-gradient(115deg,transparent_0_38%,rgba(255,255,255,0.06)_38%_39%,transparent_39%_63%,rgba(255,255,255,0.04)_63%_64%,transparent_64%),linear-gradient(to_top,#11100e,transparent_55%)]" />
            <div className="absolute left-[18%] top-[13%] h-[62%] w-[46%] border border-gold/35 bg-gradient-to-br from-[#3b3730] to-[#181715] shadow-2xl">
              <div className="absolute inset-[9%] border border-white/10" />
              <span className="absolute bottom-6 left-6 font-display text-6xl text-ivory/10">N</span>
            </div>
            <div className="absolute bottom-[18%] right-[8%] h-[34%] w-[30%] rounded-t-full border border-white/10 bg-[#1b1916] shadow-2xl" />
            <div className="absolute bottom-6 left-6 right-6 flex justify-between border-t border-white/30 pt-4 text-xs uppercase tracking-[0.18em] text-white/80">
              <span>{t("hours")}</span><span>{t("district")}</span>
            </div>
          </div>
        </section>
      </div>

      <section id="services" className="shell py-24 sm:py-32">
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <div><p className="eyebrow mb-5">{t("servicesKicker")}</p><h2 className="font-display text-5xl leading-none sm:text-6xl">{t("servicesTitle")}<br />{t("servicesTitleLine")}</h2></div>
          <p className="max-w-md text-sm leading-7 text-smoke md:justify-self-end">{t("servicesText")}</p>
        </div>
        <div className="border-t border-ink/15">
          {services.map((service, index) => (
            <article key={service.id} className="grid gap-4 border-b border-ink/15 py-8 sm:grid-cols-[56px_1fr_1fr_auto] sm:items-center">
              <span className="text-xs text-smoke">0{index + 1}</span>
              <div>
                <p className="font-display text-3xl">{serviceText(`${service.id}.name`)}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gold">{serviceText(`${service.id}.category`)}</p>
              </div>
              <p className="max-w-lg text-sm leading-6 text-smoke">{serviceText(`${service.id}.description`)}</p>
              <div className="flex items-center justify-between gap-7 sm:block sm:text-right">
                <p className="font-semibold">{formatPrice(service.price, locale)}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-smoke sm:justify-end"><Clock3 size={13} /> {common("minutes", { value: service.duration })}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="masters" className="bg-[#ded3c4] py-24 sm:py-32">
        <div className="shell">
          <div className="mb-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="eyebrow mb-5">{t("teamKicker")}</p><h2 className="font-display text-5xl sm:text-6xl">{t("teamTitle")}</h2></div>
            <Link href="/booking" className="text-sm font-semibold underline decoration-gold underline-offset-8">{t("chooseMaster")}</Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {masters.map((master, index) => (
              <article key={master.id} className={index === 1 ? "md:mt-16" : ""}>
                <div className={`relative aspect-[4/5] overflow-hidden border border-ink/10 ${index === 0 ? "bg-[radial-gradient(circle_at_62%_30%,#b9a78f_0_10%,transparent_11%),linear-gradient(135deg,#2f2b26,#817363)]" : index === 1 ? "bg-[radial-gradient(circle_at_42%_28%,#d6c4aa_0_11%,transparent_12%),linear-gradient(145deg,#5c5145,#b2a18b)]" : "bg-[radial-gradient(circle_at_58%_27%,#cbb79a_0_10%,transparent_11%),linear-gradient(130deg,#39342e,#97856f)]"}`}>
                  <div className="absolute bottom-0 left-1/2 h-[62%] w-[68%] -translate-x-1/2 rounded-t-full bg-ink/65 shadow-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-white/10" />
                  <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.2em] text-white/65">{t("portrait", { value: index + 1 })}</span>
                </div>
                <div className="pt-5">
                  <p className="font-display text-3xl">{masterText(`${master.id}.name`)}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-gold">{masterText(`${master.id}.role`)} · {masterText(`${master.id}.experience`)}</p>
                  <p className="mt-4 text-sm leading-6 text-smoke">{masterText(`${master.id}.bio`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-24 sm:py-32">
        <p className="eyebrow mb-10">{t("reviewsKicker")}</p>
        <div className="grid gap-12 md:grid-cols-2">
          {reviews.map((review) => (
            <blockquote key={review.author} className="border-l border-gold pl-7">
              <p className="font-display text-3xl leading-tight sm:text-4xl">“{review.text}”</p>
              <footer className="mt-6 text-xs uppercase tracking-[0.15em] text-smoke">{review.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="bg-gold py-20 text-ink">
        <div className="shell flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="max-w-3xl font-display text-5xl leading-none sm:text-7xl">{t("finalCta")}</h2>
          <Link href="/booking" className="inline-flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-ink text-ivory transition hover:scale-105" aria-label={t("goBooking")}><ArrowRight size={28} /></Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
