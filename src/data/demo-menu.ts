import type { DietaryPreference, Dish, Hotel, RestaurantTable } from "@/types/menu";

export const demoHotel: Hotel = {
  name: "Saffron & Stone",
  slug: "saffron-and-stone",
  cuisine: "Contemporary Indian",
  location: "Sample location · replace with restaurant details",
  hours: "Hours not provided",
  currency: "INR",
  description: "A sample restaurant menu created to demonstrate the Tabletop customer experience.",
  contactPhone: null,
};

export const demoTables: RestaurantTable[] = [
  { token: "table-12", label: "Table 12" },
  { token: "terrace-2", label: "Terrace 2" },
];

const unknownDietary: Record<DietaryPreference, "unknown"> = {
  vegetarian: "unknown",
  vegan: "unknown",
  jain: "unknown",
  glutenFree: "unknown",
  dairyFree: "unknown",
  nutFree: "unknown",
};

type DemoDishInput = Pick<Dish, "id" | "name" | "price" | "category" | "image">;

function demoDish(input: DemoDishInput): Dish {
  return {
    ...input,
    description: null,
    imageAlt: "Sample food photograph; confirm the actual dish with the restaurant.",
    ingredients: null,
    allergens: { verified: false, contains: [], mayContain: [] },
    dietary: { ...unknownDietary },
    spice: null,
    portionDescription: null,
    preparationTimeMinutes: null,
    availability: "unknown",
    media360: null,
    arAsset: null,
  };
}

export const demoDishes: Dish[] = [
  demoDish({ id: "tandoori-paneer-tikka", name: "Tandoori paneer tikka", price: 385, category: "Starters", image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=85" }),
  demoDish({ id: "malai-broccoli", name: "Malai broccoli", price: 340, category: "Starters", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85" }),
  demoDish({ id: "butter-chicken", name: "Old Delhi butter chicken", price: 545, category: "Mains", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=900&q=85" }),
  demoDish({ id: "paneer-makhani", name: "Paneer makhani", price: 445, category: "Mains", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=900&q=85" }),
  demoDish({ id: "saffron-biryani", name: "Saffron dum biryani", price: 465, category: "Rice & biryani", image: "https://images.unsplash.com/photo-1563379091339-03246963d4a9?auto=format&fit=crop&w=900&q=85" }),
  demoDish({ id: "butter-naan", name: "Butter naan", price: 75, category: "Breads", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85" }),
  demoDish({ id: "gulab-jamun-cheesecake", name: "Gulab jamun cheesecake", price: 295, category: "Desserts", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85" }),
  demoDish({ id: "mango-lassi", name: "Mango lassi", price: 180, category: "Beverages", image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=85" }),
];

export const menuCategories = ["All dishes", ...new Set(demoDishes.map((dish) => dish.category))] as const;

export function findDemoTable(token: string | string[] | undefined): RestaurantTable | null {
  if (typeof token !== "string") return null;
  return demoTables.find((table) => table.token === token) ?? null;
}

export function formatPrice(price: number, locale: "en" | "hi" | "mr" = "en") {
  return new Intl.NumberFormat(locale === "en" ? "en-IN" : `${locale}-IN`, {
    style: "currency",
    currency: demoHotel.currency,
    maximumFractionDigits: 0,
  }).format(price);
}
