"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { findDemoTable } from "@/data/demo-menu";
import { getCopy, getLocale, localizeMenuUrl } from "@/lib/i18n";

export function SiteHeader() {
  const searchParams = useSearchParams();
  const locale = getLocale(searchParams.get("lang") ?? undefined);
  const tableToken = findDemoTable(searchParams.get("table") ?? undefined)?.token;
  const t = getCopy(locale);
  const homeUrl = localizeMenuUrl("/", locale, tableToken);
  const menuUrl = localizeMenuUrl("/menu/saffron-and-stone", locale, tableToken);

  return (
    <header className="site-header" lang={locale}>
      <Link className="wordmark" href={homeUrl} aria-label="Tabletop home"><span className="wordmark-mark" aria-hidden="true">T</span><span>tabletop<span className="wordmark-period">.</span></span></Link>
      <nav className="header-nav" aria-label={t.howItWorks}><Link href={menuUrl}>{t.exploreMenu}</Link><Link href={`${homeUrl}#how-it-works`}>{t.howItWorks}</Link></nav>
      <Link className="header-cta" href={menuUrl}>{t.tryDemo} <span aria-hidden="true">↗</span></Link>
    </header>
  );
}
