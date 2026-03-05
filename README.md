# custom-shopify-parts

A personal library of reusable Shopify theme components (primarily OS 2.0 sections + snippets) built for fast deployment across multiple themes and client builds.

This repo exists to keep my best “battle-tested” parts portable: countdowns, product grids, utility strips, headers, footers, and other modular building blocks that can be dropped into any modern Shopify theme with minimal friction.

---

## What’s in here

**/sections**  
Theme sections (`.liquid`) intended for Online Store 2.0 themes.

Planned additions include:
- countdowns (standard + flip)
- utility strips (back links / view cart)
- product display grids (tag-driven)
- campaign/seasonal promo blocks
- headers (org-aware / multi-brand routing)
- footers (brand-safe global variants)
- preorder helper components

**/snippets** (planned)  
Shared UI primitives and helper fragments used by multiple sections.

**/assets** (planned)  
Optional lightweight JS/CSS assets if a component needs them. (Most components should remain self-contained unless there’s a strong reason not to.)

---

## Design goals

- **Portable**: copy/paste into a theme and go.
- **Self-contained by default**: scoped CSS and minimal dependencies.
- **Theme-friendly**: avoid fighting the host theme; integrate where possible.
- **Stable naming**: generic names (no client branding baked in).
- **Configurable**: use section settings, blocks, and safe defaults.
- **Intern-proof**: predictable settings that are hard to misuse.
- **Performance-aware**: minimal JS; no heavy libraries unless required.

---

## Requirements

- Shopify Online Store 2.0 theme support
- A theme that supports custom sections (`/sections/*.liquid`)
- Some components may assume a standard `page-width` wrapper class exists. If your theme uses a different wrapper, adjust accordingly.

---

## Quick start: using a section in a theme

1. Copy a section file into your theme:
   - `sections/<name>.liquid`

2. In Shopify Admin:
   - Online Store → Themes → Customize
   - Navigate to the template you want (Page/Product/etc.)
   - Add section → select the new section → configure settings

3. Commit the change to your theme repo as usual.

---

## Conventions

### Naming
- Sections use **generic names** (e.g. `countdown.liquid`, `utility-strip.liquid`, `product-grid.liquid`)
- Avoid client/org identifiers in filenames.

### Scoping
- CSS should be scoped with a section-specific ID:
  - `assign sid = 'component-' | append: section.id`
  - `#{{ sid }} { ... }`
- JS should be defensive:
  - query within the section root only
  - avoid global side effects
  - tolerate multiple instances on a page

### Settings
- Prefer explicit settings and safe fallbacks.
- Don’t rely on theme globals unless necessary.
- When a component needs cross-page continuity (example: “Back to Convention” link),
  use a small shared snippet + a single global script hook.

---

## Component status

| Component | File | Status | Notes |
|----------|------|--------|------|
| Countdown (flip) | `sections/counter.liquid` | ✅ Active | Built for preorder/event use, designed to be reusable |

---

## Roadmap

- [ ] Add snippet library for shared utilities (buttons, link helpers, org routing)
- [ ] Product grid section (tag-driven filtering + swatches support)
- [ ] Campaign banner system (date-window controlled)
- [ ] Header patterns (multi-org safe, intern-editable)
- [ ] QA harness theme (minimal OS2 theme for testing components in isolation)
- [ ] Docs: screenshots + configuration examples per component

---

## Notes

This repository is intentionally separated from any day-job codebase. Components may have been inspired by real project needs, but implementation here is kept generic and reusable.

---

## License

TBD (private/personal use until otherwise specified).