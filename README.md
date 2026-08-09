# Custom Shopify Parts

Reusable Shopify components and page packages, organized by component rather than by Shopify file type.

## Repository layout

Each component lives in its own folder under `components/`. Inside that component folder, files are grouped by the Shopify theme directory they belong in.

```text
components/
  countdown/
    sections/
  kc-announcement-bar/
    sections/
    snippets/
  product-card/
    assets/
    snippets/
  product-card-row/
    assets/
    sections/
    snippets/
    docs/
  tkb-main-product/
    assets/
    sections/
    snippets/
    templates/
  tkb-product-row-group/
    assets/
    sections/
    snippets/
```

## Installing a component

Open the component folder and copy each file into the matching Shopify theme directory. For example:

```text
components/tkb-product-row-group/sections/tkb-product-row-group.liquid
→ Shopify /sections/tkb-product-row-group.liquid

components/tkb-product-row-group/assets/tkb-product-row-group.css
→ Shopify /assets/tkb-product-row-group.css
```

Component folders include the files that component needs, even when that means a shared file is duplicated between packages. This is intentional: each component package should be understandable and installable without hunting through the repository.

## Components

- `countdown` — flip-style countdown section.
- `kc-announcement-bar` — announcement bar and its icon snippet.
- `product-card` — reusable product card snippet and styling.
- `product-card-row` — standalone product row, including card dependency, row styles, JS, and docs.
- `tkb-main-product` — TKB product template, section, assets, and production-method care snippets.
- `tkb-product-row-group` — parent merchandising group containing multiple product rows, including its row/card dependencies.

## Naming

TKB-specific work should use the `tkb-` prefix wherever practical to reduce collisions with Shopify theme files and future Horizon updates.
