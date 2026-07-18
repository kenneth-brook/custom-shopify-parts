# Product Card + Product Card Row

A reusable Shopify Online Store 2.0 product card and configurable merchandising row.

## Included files

- `sections/product-card-row.liquid`
- `snippets/product-card.liquid`
- `assets/component-product-card.css`
- `assets/section-product-card-row.css`
- `assets/product-card-row.js`

## Features

### Product card

- 4:5 photo-first media area
- Optional vendor and product-type labels
- Current and compare-at pricing
- Left status tab for custom, personalized, preorder, made-to-order, or limited products
- Right status tab for sale, clearance, or last-chance products
- Shopify-native color swatches with a CSS-color fallback
- Configurable swatch limit with a `+N` overflow indicator
- Optional short product note
- Token-based styling through `--csp-*` CSS variables

### Product card row

- Collection or manual-product source
- Manual product mode supports intentionally selected unlisted products
- Include and exclude filters using comma-separated tags
- Match-any or match-all include rules
- Collection order, newest, oldest, alphabetical, and price sorting
- Grid or horizontal carousel layout
- Configurable desktop, tablet, and mobile columns
- Configurable product limit, spacing, and section padding
- Optional eyebrow, heading, description, and View All link
- Theme-editor-only empty-state message
- Defensive, section-scoped carousel JavaScript

## Installation

Copy each file into the matching Shopify theme directory. Then add **Product card row** through the theme editor.

```text
assets/component-product-card.css
assets/section-product-card-row.css
assets/product-card-row.js
sections/product-card-row.liquid
snippets/product-card.liquid
```

## Optional product metafields

Create these product metafields under the `custom` namespace:

| Key | Type | Purpose |
| --- | --- | --- |
| `custom.card_left_badge` | Single-line text | Custom, Personalized, Preorder, Made to Order, Limited |
| `custom.card_right_badge` | Single-line text | Sale, Clearance, Last Chance |
| `custom.card_note` | Single-line text | Turnaround, availability, or another short product note |

When badge metafields are blank, the card falls back to product tags and compare-at pricing.

## Badge tag fallbacks

Tag matching is case-sensitive.

**Left side:** `Preorder`, `Custom`, `Personalized`, `Made to Order`, `Limited`

**Right side:** `Clearance`, `Last Chance`

A Sale badge is inferred when a product's compare-at price is higher than its current price.

## Color swatches

The card looks for an option named `Color` or `Colour`.

1. Shopify-native swatch values are used when configured.
2. Otherwise, the option text is passed as a CSS color fallback.
3. The displayed count is controlled by the row section setting.
4. Additional values appear as `+N`.

For names that are not valid CSS colors, configure Shopify swatches or extend the fallback mapping in the snippet.

## Best-selling rows

Liquid preserves the selected collection's product order. To create a best-selling row:

1. Set the source collection's sort order to **Best selling** in Shopify Admin.
2. Select that collection in the section.
3. Choose **Collection order / manual** in the section settings.

## Manual and unlisted products

Manual mode uses Shopify's `product_list` setting and preserves selection order. Use it for curated rows, campaigns, and preorder products that should not be discoverable elsewhere.

## Tag-filtering boundary

Filtering happens after Shopify exposes the selected collection's product array to Liquid. Keep source collections reasonably focused. For a very large catalog, use a narrower source collection rather than expecting Liquid to query the entire store.

## Brand skins

Override component tokens inside a brand context rather than editing the component rules.

```css
[data-brand="dirtydog"] {
  --csp-card-bg: #151719;
  --csp-card-ink: #f5f1e8;
  --csp-card-muted: #b9b1a5;
  --csp-card-accent: #ba7a43;
  --csp-card-sage: #8b6a46;
  --csp-card-sale: #a24a36;
}
```

## Known V1 boundaries

- Best-selling order comes from the selected collection's Shopify sort order.
- Swatches link to variant URLs but do not replace the card image in place.
- Quick add is not included.
- The component follows standard Shopify product visibility rules.
