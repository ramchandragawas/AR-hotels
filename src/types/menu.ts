export type Locale = "en" | "hi" | "mr";
export type MenuCategory = "Starters" | "Mains" | "Rice & biryani" | "Breads" | "Desserts" | "Beverages";
export type DietaryPreference = "vegetarian" | "vegan" | "jain" | "glutenFree" | "dairyFree" | "nutFree";
export type SpiceLevel = "mild" | "medium" | "hot";

export type AllergenInformation = {
  verified: boolean;
  contains: string[];
  mayContain: string[];
};

export type Dish = {
  id: string;
  name: string;
  translatedName?: Partial<Record<Exclude<Locale, "en">, string>>;
  description: string | null;
  translatedDescription?: Partial<Record<Exclude<Locale, "en">, string>>;
  price: number;
  category: MenuCategory;
  image: string;
  imageAlt: string;
  ingredients: string[] | null;
  allergens: AllergenInformation;
  dietary: Record<DietaryPreference, "yes" | "no" | "unknown">;
  spice: { level: SpiceLevel; verified: boolean } | null;
  portionDescription: string | null;
  preparationTimeMinutes: number | null;
  availability: "available" | "unavailable" | "unknown";
  media360: { type: "image-sequence"; frames: string[]; alt: string } | null;
  arAsset: { modelUrl: string; usdzUrl?: string } | null;
};

export type Hotel = {
  name: string;
  slug: string;
  cuisine: string;
  location: string;
  hours: string;
  currency: string;
  description: string;
  contactPhone: string | null;
};

export type RestaurantTable = {
  token: string;
  label: string;
};
