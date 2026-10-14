"use client";

import { getCopy, localizeMenuUrl } from "@/lib/i18n";
import type { Locale } from "@/types/menu";

export function LanguagePicker({ locale, tableToken }: { locale: Locale; tableToken?: string }) {
  const t = getCopy(locale);
  return <label className="language-picker"><span>{t.language}</span><select value={locale} onChange={(event) => window.location.assign(localizeMenuUrl(window.location.pathname, event.target.value as Locale, tableToken))} aria-label={t.language}><option value="en">{t.english}</option><option value="hi">{t.hindi}</option><option value="mr">{t.marathi}</option></select></label>;
}
