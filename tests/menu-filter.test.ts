import assert from "node:assert/strict";
import test from "node:test";
import { demoDishes, findDemoTable } from "../src/data/demo-menu.ts";
import { filterDishes } from "../src/lib/filter-menu.ts";

test("search and category filters compose", () => {
  const filtered = filterDishes(demoDishes, { category: "Mains", query: "paneer", dietary: [], spice: [] });
  assert.deepEqual(filtered.map((dish) => dish.id), ["paneer-makhani"]);
});

test("unverified dietary or spice data never matches a restrictive filter", () => {
  const filtered = filterDishes(demoDishes, { category: "All dishes", query: "", dietary: ["vegetarian"], spice: ["mild"] });
  assert.deepEqual(filtered, []);
});

test("verified dietary and spice filters compose with search and category", () => {
  const paneer = demoDishes[3];
  const verifiedDish = {
    ...paneer,
    dietary: { ...paneer.dietary, vegetarian: "yes" as const },
    spice: { level: "mild" as const, verified: true },
  };
  const filtered = filterDishes([verifiedDish, ...demoDishes], { category: "Mains", query: "paneer", dietary: ["vegetarian"], spice: ["mild"] });
  assert.deepEqual(filtered.map((dish) => dish.id), ["paneer-makhani"]);
});

test("a clear filter set returns the full sample menu", () => {
  const filtered = filterDishes(demoDishes, { category: "All dishes", query: "", dietary: [], spice: [] });
  assert.equal(filtered.length, demoDishes.length);
});

test("table context accepts known public tokens and rejects unknown or repeated values", () => {
  assert.equal(findDemoTable("table-12")?.label, "Table 12");
  assert.equal(findDemoTable("internal-id-1"), null);
  assert.equal(findDemoTable(["table-12", "terrace-2"]), null);
});
