"use client";

import { useMemo, useState } from "react";
import { demoDishes, menuCategories } from "@/data/demo-menu";
import { categoryLabel, dietaryLabel, getCopy, localizeMenuUrl, spiceLabel } from "@/lib/i18n";
import { filterDishes } from "@/lib/filter-menu";
import { DishCard } from "@/components/dish-card";
import { LanguagePicker } from "@/components/language-picker";
import type { DietaryPreference, Locale, SpiceLevel } from "@/types/menu";

const dietaryPreferences: DietaryPreference[] = ["vegetarian", "vegan", "jain", "glutenFree", "dairyFree", "nutFree"];
const spiceLevels: SpiceLevel[] = ["mild", "medium", "hot"];

export function MenuBrowser({ locale, tableToken }: { locale: Locale; tableToken?: string }) {
  const t = getCopy(locale);
  const [category, setCategory] = useState<(typeof menuCategories)[number]>("All dishes");
  const [query, setQuery] = useState("");
  const [selectedDietary, setSelectedDietary] = useState<DietaryPreference[]>([]);
  const [selectedSpice, setSelectedSpice] = useState<SpiceLevel[]>([]);
  const hasFilters = query.length > 0 || category !== "All dishes" || selectedDietary.length > 0 || selectedSpice.length > 0;

  const dishes = useMemo(() => filterDishes(demoDishes, { category, query, dietary: selectedDietary, spice: selectedSpice }), [category, query, selectedDietary, selectedSpice]);

  function toggleDietary(preference: DietaryPreference) {
    setSelectedDietary((current) => current.includes(preference) ? current.filter((item) => item !== preference) : [...current, preference]);
  }

  function toggleSpice(level: SpiceLevel) {
    setSelectedSpice((current) => current.includes(level) ? current.filter((item) => item !== level) : [...current, level]);
  }

  function clearFilters() {
    setCategory("All dishes");
    setQuery("");
    setSelectedDietary([]);
    setSelectedSpice([]);
  }

  return (
    <>
      <div className="menu-toolbar">
        <div className="category-list" role="group" aria-label={t.categories}>
          {menuCategories.map((item) => <button key={item} type="button" className={`category-button${category === item ? " is-active" : ""}`} onClick={() => setCategory(item)} aria-pressed={category === item}>{item === "All dishes" ? t.allDishes : categoryLabel(item, locale)}</button>)}
        </div>
        <div className="menu-toolbar-actions">
          <label className="menu-search"><span className="search-icon" aria-hidden="true">⌕</span><span className="sr-only">{t.search}</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.searchPlaceholder} /></label>
          <LanguagePicker locale={locale} tableToken={tableToken} />
        </div>
      </div>

      <details className="filter-panel">
        <summary><span>{t.filters}</span><span className="filter-help">{t.verifiedOnly}</span></summary>
        <p className="filter-intro">{t.filtersHelp}</p>
        <div className="filter-groups">
          <fieldset><legend>{t.dietary}</legend><div className="filter-options">
            {dietaryPreferences.map((preference) => <label className="filter-option" key={preference}><input type="checkbox" checked={selectedDietary.includes(preference)} onChange={() => toggleDietary(preference)} /><span>{dietaryLabel(preference, locale)}</span></label>)}
          </div></fieldset>
          <fieldset><legend>{t.spice}</legend><div className="filter-options">
            {spiceLevels.map((level) => <label className="filter-option" key={level}><input type="checkbox" checked={selectedSpice.includes(level)} onChange={() => toggleSpice(level)} /><span>{spiceLabel(level, locale)}</span></label>)}
          </div></fieldset>
        </div>
      </details>

      <div className="results-row"><p aria-live="polite">{t.results(dishes.length)} <span>{locale === "en" ? "in this menu" : locale === "hi" ? "इस मेन्यू में" : "या मेनूमध्ये"}</span></p>{hasFilters && <button className="clear-filters" type="button" onClick={clearFilters}>{t.clearFilters}</button>}</div>
      {locale !== "en" && <p className="translation-note" lang={locale}>{t.contentFallback}</p>}
      {dishes.length > 0 ? <div className="dish-grid">{dishes.map((dish) => <DishCard key={dish.id} dish={dish} locale={locale} href={localizeMenuUrl(`/menu/saffron-and-stone/dish/${dish.id}`, locale, tableToken)} />)}</div> : <div className="empty-state"><span aria-hidden="true">⌕</span><h3>{t.empty}</h3><p>{t.emptyHelp}</p><button className="button button-dark" type="button" onClick={clearFilters}>{t.clearFilters}</button></div>}
    </>
  );
}
