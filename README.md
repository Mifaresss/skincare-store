# LUMEA — Home Page fragment

Test task for Dashly Studio: the hero section and the “How it works” section of the LUMEA skincare Home Page, with products, categories and the announcement bar managed in Strapi.

| | |
| --- | --- |
| Website | _added after deployment_ |
| Strapi Admin | _added after deployment_ |
| Admin login | _sent separately_ |

## Stack

- **web** — Next.js 16 (App Router, Cache Components), React 19, TypeScript, SCSS Modules, Zod
- **cms** — Strapi 5, PostgreSQL 18
- **Tooling** — pnpm workspaces, Biome (TS/JS/JSON), Prettier (SCSS), Lefthook git hooks

```
.
├── web/                 Next.js frontend
│   ├── public/          icons and static images
│   └── src/
│       ├── app/         page, layout, metadata, revalidation route
│       ├── components/  shared UI (button, icon, cart state)
│       ├── lib/         Strapi client, Zod schemas, pricing
│       ├── sections/    hero and how-it-works, each with its own components
│       └── styles/      tokens, reset, breakpoints, fluid sizing helpers
├── cms/                 Strapi
│   ├── data/uploads/    images used by the initial seed
│   └── src/
│       ├── api/         announcement-bar, product, category, badge
│       ├── components/  announcement, variant group and option
│       ├── lib/         pricing validation, revalidation webhook, admin account
│       └── seed/        initial content from the design
└── docker-compose.yml   local PostgreSQL
```

## Local setup

Requirements: Node.js 22+, pnpm 11 (`corepack enable`), Docker.

```bash
pnpm install
docker compose up -d --wait

cp cms/.env.example cms/.env
cp web/.env.example web/.env.local

pnpm dev
```

- Website: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin — log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `cms/.env`

On the first start Strapi runs migrations, creates the admin account, seeds the content from the design (products, categories, badges, announcements) and opens public read access to the API. Strapi takes a few seconds to start, so if the website is opened before that, reload the page.

`pnpm dev:web` and `pnpm dev:cms` start the apps separately.

To start from a clean database:

```bash
docker compose down -v
docker compose up -d --wait
```

### Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start web and cms |
| `pnpm check` | Biome and Prettier checks |
| `pnpm fix` | Apply formatting and safe lint fixes |
| `pnpm typecheck` | TypeScript in both packages |
| `pnpm --filter web build` | Production build of the website (Strapi must be running) |
| `pnpm --filter cms build` | Production build of the Strapi admin panel |

## Content in Strapi

| Content | Where |
| --- | --- |
| Announcement bar messages — add, edit, delete, drag to reorder | Single type **Announcement Bar** |
| Products — name, image, size, price, discount, badges, variant groups and values, categories | Collection **Product** |
| Categories — create, rename, delete, order | Collection **Category** (`sortOrder`, then name) |
| Badges | Collection **Badge** |

Product and Announcement Bar use Draft & Publish: changes appear on the website after **Publish**. Categories and badges are published immediately.

### Discounts

A product has a **Discount type**:

- **None** — only the price is shown.
- **Percentage** — enter the price and the discount percent; the website calculates the discounted price and shows the old price crossed out.
- **Sale price** — enter the old price and the sale price; the website calculates the percent.

Only the field for the selected type is visible in the admin. Strapi does not save a product with a missing discount value or a sale price that is not lower than the price.

A variant value can have its own discount percent (for example, Size → 100 ml −20%). When that value is selected, its percent replaces the product discount, calculated from the product price.

### How the website updates

The website is statically rendered and cached. Strapi calls `POST /api/revalidate` on the website through a webhook whenever content is created, updated, published, unpublished or deleted, so changes are visible on the next page load. The webhook is created on Strapi start from `WEB_REVALIDATE_URL` and `WEB_REVALIDATE_SECRET`.

## Environment variables

### web

| Variable | Description |
| --- | --- |
| `SITE_URL` | Public URL of the website, used for canonical and Open Graph links |
| `STRAPI_URL` | Strapi URL |
| `REVALIDATE_SECRET` | Must match `WEB_REVALIDATE_SECRET` in cms |

### cms

| Variable | Description |
| --- | --- |
| `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY` | Strapi secrets |
| `DATABASE_*` or `DATABASE_URL` | PostgreSQL connection |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Admin account created on an empty database |
| `WEB_REVALIDATE_URL`, `WEB_REVALIDATE_SECRET` | Website revalidation webhook |

## Implementation notes

- **Step cards stacking** uses `position: sticky`, so it works in both scroll directions and at any viewport height. A small script only tracks scroll progress to shrink card paddings on desktop, keep the bottom of the stacked cards aligned with the products block and detect the active step. Clicking a partially covered card scrolls it back into full view.
- **One responsive products block** is used on desktop and inside the mobile dialog. The mobile dialog is a native `<dialog>`: focus is trapped and returned, Escape closes it, and the page keeps its scroll position.
- **Product card** is a single component for any number of variant groups, badges and discount modes. Variant values are radio buttons. On mobile “View details” expands the variants inside the card.
- **Data** from Strapi is validated with Zod and mapped to UI types in one place (`web/src/lib/strapi`). All home page content is loaded in three parallel requests and cached.
- **Hover colors** of navigation links and header icons are not defined in the design; the teal accent from the hero is used.
