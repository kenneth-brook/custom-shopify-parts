# custom-shopify-parts

A personal library of reusable Shopify theme components, primarily Online Store 2.0 sections and snippets, built for fast deployment across multiple themes and client builds.

This repository keeps battle-tested parts portable: countdowns, product grids, utility strips, headers, footers, campaign tools, and other modular building blocks that can be dropped into modern Shopify themes with minimal friction.

---

## Repository structure

**`/sections`**  
Theme sections (`.liquid`) intended for Online Store 2.0 themes.

**`/snippets`**  
Shared UI primitives and helper fragments used by multiple sections.

**`/assets`**  
Lightweight JavaScript and CSS assets used by components.

**`/docs`**  
Installation notes, configuration references, metafield requirements, known boundaries, and usage examples.

---

## Design goals

- **Portable:** Copy into a theme and configure.
- **Self-contained by default:** Scoped CSS, defensive JavaScript, and minimal dependencies.
- **Theme-friendly:** Integrate with the host theme instead of replacing unrelated systems.
- **Stable naming:** Generic component names with no client branding baked into filenames.
- **Configurable:** Use section settings, blocks, metafields, and safe defaults.
- **Editor-friendly:** Predictable controls that are difficult to misuse.
- **Performance-aware:** Minimal JavaScript and no heavy libraries unless required.
- **Brand-skinnable:** Components expose CSS variables so one chassis can support multiple visual identities.

---

## Requirements

- Shopify Online Store 2.0 theme support
- A theme that supports custom sections
- Some components may expect common theme utilities; component documentation notes these assumptions

---

## Quick start

1. Copy the component files into their matching theme folders.
2. Open **Shopify Admin → Online Store → Themes → Customize**.
3. Navigate to the target template.
4. Add the new section and configure its settings.
5. Create any optional metafields listed in the component documentation.
6. Test in the target theme before publishing.

---

## Conventions

### Naming

- Sections and snippets use generic names, such as `product-card-row.liquid` and `product-card.liquid`.
- Avoid client or organization identifiers in reusable filenames.
- Shared classes and variables use the `csp-` namespace to reduce theme collisions.

### Scoping

- Query JavaScript within the component root.
- Avoid global side effects.
- Support multiple component instances on one page.
- Bind Shopify theme-editor lifecycle events when JavaScript is required.

### Settings

- Prefer explicit settings and safe fallbacks.
- Do not rely on theme globals unless necessary.
- Document data dependencies, metafields, tag conventions, and platform boundaries.

### Brand contexts

Reusable components should consume CSS variables rather than hardcoded brand rules.

```css
[data-brand="pancakecat"] { /* overrides */ }
[data-brand="dirtydog"] { /* overrides */ }
```

---

## Component status

| Component | Primary file | Status | Documentation |
| --- | --- | --- | --- |
| Product card row | `sections/product-card-row.liquid` | 🧪 Staged | `docs/product-card-row.md` |

---

## Roadmap

- [x] Product card with corner status tabs and color swatches
- [x] Product row with collection/manual sourcing, tag filtering, sorting, grid, and carousel modes
- [ ] Countdown sections, standard and flip variants
- [ ] Campaign banner and scheduled promotion system
- [ ] Multi-brand header patterns
- [ ] Reusable footer patterns
- [ ] Preorder helper components
- [ ] QA harness theme for isolated testing
- [ ] Screenshots and configuration examples for each component

---

## Notes

This repository is intentionally separated from day-job codebases. Components may be inspired by real operational needs, but implementations here remain generic and reusable.

---

## License

TBD. Treat as personal/private-use code until a license is selected.
