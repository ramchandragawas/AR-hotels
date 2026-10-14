# Tabletop — restaurant menu experience

Tabletop is a mobile-first Next.js demo for restaurant menus. The current foundation includes a branded landing page, a sample restaurant menu, verified-only search filters, English/Hindi/Marathi interface copy, table-link context validation, and dish detail pages.

## Requirements

- Node.js 22.6 or newer (the focused test script uses Node's built-in TypeScript stripping)
- npm

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The sample menu is at `/menu/saffron-and-stone`. A demo table link can be tried at `/menu/saffron-and-stone?table=table-12`; an unknown table token is ignored and shown as unverified.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Architecture

- `src/app/` contains the landing, menu, and dish detail routes.
- `src/components/` contains the shared menu browser, dish cards, and language picker.
- `src/data/demo-menu.ts` contains explicitly sample-only restaurant/menu/table data.
- `src/lib/filter-menu.ts` holds the tested combined search/filter logic.
- `src/lib/i18n.ts` holds customer menu labels for English, Hindi, and Marathi.
- `src/types/menu.ts` defines the restaurant, table, dish, allergen, diet, 360° media, and 3D asset shapes.
- `tests/menu-filter.test.ts` covers the core filtering rules.

## Demo data and customer safety

Names, photos, and prices are illustrative sample data. Food photography is loaded from Unsplash URLs and should be replaced with licensed restaurant assets. Recipe details, ingredients, allergens, availability, dietary suitability, spice, portion size, and preparation times are unknown for this demo. The filters only include explicitly verified attributes; the demo dataset therefore returns no matches for restrictive dietary or spice filters. Do not use this sample content as a live menu.

Dish names and descriptions fall back to English when the restaurant has not supplied a translation. The interface has English, Hindi, and Marathi strings. Ingredient and allergen statements are not automatically translated.

## Current limitations

- There is no database, authentication, admin dashboard, asset upload, QR image generator, or persistent table registry. The two accepted table tokens are demonstration examples.
- No real 360° image sequence or 3D model has been supplied. Dish pages state this and show a single photograph without simulating rotation or AR.
- Cart, online ordering, and backend staff notifications are not configured. The UI says these actions are unavailable and directs guests to ask restaurant staff.
- Analytics, order flows, deployment configuration, and real device AR tests remain future phases.

## Next work

Phase 3 needs licensed, genuinely captured 360° sequences and compatible 3D model assets. Phase 4 ordering and staff requests require a backend, restaurant configuration, and server-side availability/price validation.
