import Link from "next/link";
import { formatPrice } from "@/data/demo-menu";
import { dietaryLabel, getCopy } from "@/lib/i18n";
import type { Dish, DietaryPreference, Locale } from "@/types/menu";

const dietaryPreferences: DietaryPreference[] = ["vegetarian", "vegan", "jain", "glutenFree", "dairyFree", "nutFree"];

export function DishCard({ dish, locale, href }: { dish: Dish; locale: Locale; href: string }) {
  const t = getCopy(locale);
  const contentLocale = locale === "en" ? undefined : locale;
  const verifiedDietary = dietaryPreferences.filter((preference) => dish.dietary[preference] === "yes");

  return (
    <article className="dish-card">
      <Link className="dish-card-image-link" href={href} aria-label={`${t.viewDetails}: ${dish.name}`}>
        <div className="dish-image-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="dish-image" src={dish.image} alt={dish.imageAlt} loading="lazy" />
        </div>
      </Link>
      <div className="dish-content">
        <div className="dish-title-row"><h3><Link href={href}>{(contentLocale && dish.translatedName?.[contentLocale]) ?? dish.name}</Link></h3><span className="dish-price">{formatPrice(dish.price, locale)}</span></div>
        <p>{(contentLocale && dish.translatedDescription?.[contentLocale]) ?? dish.description ?? t.notProvided}</p>
        <div className="dish-meta"><div className="dish-tags">{verifiedDietary.map((preference) => <span key={preference}>{dietaryLabel(preference, locale)}</span>)}</div><Link className="dish-details-link" href={href}>{t.viewDetails} <span aria-hidden="true">↗</span></Link></div>
      </div>
    </article>
  );
}
