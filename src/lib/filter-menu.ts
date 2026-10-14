import type { Dish, DietaryPreference, MenuCategory, SpiceLevel } from "@/types/menu";

export type MenuFilters = {
  category: MenuCategory | "All dishes";
  query: string;
  dietary: DietaryPreference[];
  spice: SpiceLevel[];
};

export function filterDishes(dishes: readonly Dish[], filters: MenuFilters): Dish[] {
  const query = filters.query.trim().toLocaleLowerCase();

  return dishes.filter((dish) => {
    const matchesCategory = filters.category === "All dishes" || dish.category === filters.category;
    const searchText = `${dish.name} ${dish.description ?? ""} ${dish.ingredients?.join(" ") ?? ""}`.toLocaleLowerCase();
    const matchesSearch = searchText.includes(query);
    const matchesDietary = filters.dietary.every((preference) => dish.dietary[preference] === "yes");
    const matchesSpice = filters.spice.length === 0 || (dish.spice?.verified === true && filters.spice.includes(dish.spice.level));
    return matchesCategory && matchesSearch && matchesDietary && matchesSpice;
  });
}
