# TKB Collection Hub

Top-level collection landing page for broad departments such as **Hometown Honors**.

## Shopify files

Copy the package files into the matching theme folders:

- `assets/tkb-collection-hub.css` → `/assets/`
- `sections/tkb-collection-hub-header.liquid` → `/sections/`
- `templates/collection.tkb-hub.json` → `/templates/`

Assign the `tkb-hub` collection template to the desired top-level collection.

## Page structure

The template starts with a full hero header using the collection title, collection image, and collection description. A custom hero image and custom description can override the collection fields from the theme editor.

Because this is a JSON collection template, additional sections can be added below the hero in the Shopify theme editor. Install the existing `product-card-row` and/or `tkb-product-row-group` components to build the rest of the landing page with the same product rows and cards used elsewhere on the site.

This template intentionally does not render the collection's full product grid. It is designed as a merchandising hub that routes shoppers into child collections and featured product groups.
