# TKB Collection Grid

Child collection landing page for focused collections such as **Educators Corner**.

## Shopify files

Copy the package files into the matching theme folders:

- `assets/tkb-collection-grid.css` → `/assets/`
- `sections/tkb-collection-grid.liquid` → `/sections/`
- `templates/collection.tkb-child.json` → `/templates/`

Assign the `tkb-child` collection template to the desired child collection.

## Dependency

This section renders the shared `product-card` snippet and loads `component-product-card.css`, so the existing `product-card` component must also be installed in the theme.

## Behavior

- Displays the collection title and optional collection description.
- Uses the shared TKB product cards and their swatches/badges.
- Shows a maximum of 12 products per page.
- Automatically paginates collections containing more than 12 products.
- Supports adjustable desktop/tablet/mobile columns, card gap, and card display options from the theme editor.
