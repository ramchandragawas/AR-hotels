import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguagePicker } from "@/components/language-picker";
import { DishCard } from "@/components/dish-card";
import { demoDishes, demoHotel, findDemoTable, formatPrice } from "@/data/demo-menu";
import { dietaryLabel, getCopy, getLocale, localizeMenuUrl, spiceLabel } from "@/lib/i18n";
import type { DietaryPreference, Locale } from "@/types/menu";

type PageProps = {
  params: Promise<{ hotelSlug: string; dishId: string }>;
  searchParams: Promise<{ lang?: string | string[]; table?: string | string[] }>;
};

const dietaryPreferences: DietaryPreference[] = ["vegetarian", "vegan", "jain", "glutenFree", "dairyFree", "nutFree"];

function dishText(dish: { translatedName?: Partial<Record<"hi" | "mr", string>>; name: string }, locale: Locale) {
  return locale === "en" ? dish.name : dish.translatedName?.[locale] ?? dish.name;
}

export default async function DishDetailPage({ params, searchParams }: PageProps) {
  const [{ hotelSlug, dishId }, query] = await Promise.all([params, searchParams]);
  if (hotelSlug !== demoHotel.slug) notFound();

  const dish = demoDishes.find((item) => item.id === dishId);
  if (!dish) notFound();

  const locale = getLocale(query.lang);
  const t = getCopy(locale);
  const table = findDemoTable(query.table);
  const translatedName = dishText(dish, locale);
  const invalidTable = query.table !== undefined && table === null;
  const related = demoDishes.filter((item) => item.category === dish.category && item.id !== dish.id).slice(0, 2);

  return (
    <main className="menu-page" lang={locale}>
      <section className="detail-top section-shell">
        <Link className="back-link" href={localizeMenuUrl(`/menu/${hotelSlug}`, locale, table?.token)}>← {t.backToMenu}</Link>
        <div className="detail-language"><LanguagePicker locale={locale} tableToken={table?.token} /></div>
        {invalidTable && <p className="context-notice" role="status">{t.invalidTable}</p>}
        <div className="detail-layout">
          <div className="detail-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="detail-image" src={dish.image} alt={dish.imageAlt} fetchPriority="high" />
            <p className="media-fallback"><span aria-hidden="true">◌</span> {t.no360}</p>
          </div>
          <div className="detail-copy">
            <span className="eyebrow">{dish.category.toUpperCase()}</span>
            <h1>{translatedName}</h1>
            {locale !== "en" && !dish.translatedName?.[locale] && <p className="content-language-note">{t.contentFallback}</p>}
            <p className="detail-price-label">{t.samplePrice}</p><p className="detail-price">{formatPrice(dish.price, locale)}</p>
            <section className="detail-fact"><h2>{t.description}</h2><p>{(locale !== "en" && dish.translatedDescription?.[locale]) || dish.description || t.notProvided}</p></section>
            <p className="availability-note"><span aria-hidden="true">◷</span> {dish.availability === "unknown" ? t.availabilityUnknown : dish.availability === "available" ? t.availability : t.unavailable}</p>
            <div className="detail-actions"><button className="button button-dark" type="button" disabled aria-describedby="ordering-note">{t.addToCart}</button><p id="ordering-note">{t.orderingOff}</p></div>
            <p className="ar-unavailable"><span aria-hidden="true">✧</span> {t.noAr}</p>
            {table && <p className="table-context detail-table-context">⌖ {t.table(table.label)}</p>}
          </div>
        </div>
      </section>

      <section className="detail-information section-shell">
        <div className="detail-fact-grid">
          <section className="detail-fact"><h2>{t.ingredients}</h2><p>{dish.ingredients?.length ? dish.ingredients.join(", ") : t.notProvided}</p></section>
          <section className="detail-fact"><h2>{t.allergens}</h2>{dish.allergens.verified ? <div className="allergen-list">{dish.allergens.contains.length > 0 && <p><strong>{t.contains}:</strong> {dish.allergens.contains.join(", ")}</p>}{dish.allergens.mayContain.length > 0 && <p><strong>{t.mayContain}:</strong> {dish.allergens.mayContain.join(", ")}</p>}{dish.allergens.contains.length === 0 && dish.allergens.mayContain.length === 0 && <p>{t.notProvided}</p>}</div> : <p className="safety-note">{t.allergensUnknown}</p>}</section>
          <section className="detail-fact"><h2>{t.dietaryDetails}</h2><ul className="verified-list">{dietaryPreferences.map((preference) => <li key={preference}><span>{dietaryLabel(preference, locale)}</span><span>{dish.dietary[preference] === "unknown" ? t.unverified : dish.dietary[preference] === "yes" ? (locale === "en" ? "Verified" : locale === "hi" ? "सत्यापित" : "पडताळले") : (locale === "en" ? "Not suitable" : locale === "hi" ? "उपयुक्त नहीं" : "योग्य नाही")}</span></li>)}</ul></section>
          <section className="detail-fact"><h2>{t.spiceLevel}</h2><p>{dish.spice?.verified ? spiceLabel(dish.spice.level, locale) : t.unverified}</p></section>
          <section className="detail-fact"><h2>{t.portion}</h2><p>{dish.portionDescription ?? t.notProvided}</p></section>
          <section className="detail-fact"><h2>{t.preparation}</h2><p>{dish.preparationTimeMinutes === null ? t.notProvided : `${dish.preparationTimeMinutes} min`}</p></section>
        </div>
        <div className="detail-staff-help"><span className="note-star" aria-hidden="true">✳</span><p><strong>{t.callStaff}</strong><br />{t.tableHelp}</p></div>
      </section>

      {related.length > 0 && <section className="related-dishes section-shell"><div className="menu-section-heading"><div><span className="eyebrow">{t.related}</span><h2>{locale === "en" ? <>From the <em>{dish.category.toLowerCase()}.</em></> : locale === "hi" ? <>इसी श्रेणी के <em>व्यंजन।</em></> : <>याच प्रकारचे <em>पदार्थ.</em></>}</h2></div></div><div className="dish-grid">{related.map((item) => <DishCard key={item.id} dish={item} locale={locale} href={localizeMenuUrl(`/menu/${hotelSlug}/dish/${item.id}`, locale, table?.token)} />)}</div></section>}
      <footer className="site-footer section-shell"><Link className="wordmark" href="/"><span className="wordmark-mark">T</span><span>tabletop<span className="wordmark-period">.</span></span></Link><span>Sample customer menu experience.</span><span>© 2026 TABLETOP</span></footer>
    </main>
  );
}
