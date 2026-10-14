import Link from "next/link";
import { notFound } from "next/navigation";
import { MenuBrowser } from "@/components/menu-browser";
import { demoDishes, demoHotel, findDemoTable } from "@/data/demo-menu";
import { getCopy, getLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ hotelSlug: string }>;
  searchParams: Promise<{ lang?: string | string[]; table?: string | string[] }>;
};

export default async function HotelMenuPage({ params, searchParams }: PageProps) {
  const [{ hotelSlug }, query] = await Promise.all([params, searchParams]);
  if (hotelSlug !== demoHotel.slug) notFound();

  const locale = getLocale(query.lang);
  const t = getCopy(locale);
  const table = findDemoTable(query.table);
  const invalidTable = query.table !== undefined && table === null;

  return (
    <main className="menu-page" lang={locale}>
      <section className="menu-hero section-shell">
        <div className="menu-breadcrumb"><span>TABLETOP</span><span aria-hidden="true">✳</span><span>{demoHotel.cuisine.toUpperCase()}</span></div>
        <div className="restaurant-title-row"><div><span className="eyebrow"><span className="eyebrow-dot" /> {demoHotel.cuisine.toUpperCase()}</span><h1>{demoHotel.name}<span className="title-period">.</span></h1><p className="restaurant-location">{demoHotel.location} <span className="location-divider">·</span> {demoHotel.hours}</p></div><div className="restaurant-mark" aria-hidden="true">S<span>&amp;</span>S</div></div>
        <div className="menu-story"><p>{demoHotel.description}</p><span>{table ? t.table(table.label) : "SAMPLE RESTAURANT MENU"}</span></div>
        <p className="sample-menu-notice">{t.sampleInfo}</p>
        {invalidTable && <p className="context-notice" role="status">{t.invalidTable}</p>}
        {table && <p className="table-context" role="status"><span aria-hidden="true">⌖</span> {t.table(table.label)}</p>}
      </section>
      <section className="menu-section section-shell" aria-labelledby="menu-heading">
        <div className="menu-section-heading"><div><span className="eyebrow">{locale === "en" ? "BROWSE THE SAMPLE MENU" : locale === "hi" ? "नमूना मेन्यू देखें" : "नमुना मेनू पाहा"}</span><h2 id="menu-heading">{locale === "en" ? <>Find your <em>favourite.</em></> : locale === "hi" ? <>अपना पसंदीदा <em>व्यंजन</em> चुनें।</> : <>तुमचा आवडता <em>पदार्थ</em> निवडा.</>}</h2></div><span className="dish-count">{demoDishes.length} {locale === "en" ? "SAMPLE DISHES" : locale === "hi" ? "नमूना व्यंजन" : "नमुना पदार्थ"}</span></div>
        <MenuBrowser locale={locale} tableToken={table?.token} />
      </section>
      <section className="menu-note section-shell"><span className="note-star" aria-hidden="true">✳</span><p><strong>{t.callStaff}</strong><br />{t.tableHelp}</p><span>DETAILS AND AVAILABILITY ARE NOT VERIFIED</span></section>
      <footer className="site-footer section-shell"><Link className="wordmark" href="/"><span className="wordmark-mark">T</span><span>tabletop<span className="wordmark-period">.</span></span></Link><span>Sample customer menu experience.</span><span>© 2026 TABLETOP</span></footer>
    </main>
  );
}
