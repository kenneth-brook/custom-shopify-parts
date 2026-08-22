# Pancake Cat Space Hero

Animated Shopify hero for the Pancake Cat landing page.

## Files

```text
components/pancake-cat-space-hero/
  assets/
    pancake-space-hero.css
    pancake-space-hero.js
  sections/
    pancake-space-hero.liquid
```

## Install

Copy the files into the matching Shopify theme folders:

```text
sections/pancake-space-hero.liquid
assets/pancake-space-hero.css
assets/pancake-space-hero.js
```

Then add **Pancake space hero** in the Shopify theme editor.

## Required images

The section has image pickers for:

- a space background
- the centered Pancake Cat mascot artwork
- one transparent plate-of-pancakes image used for all floating objects

## Animation behavior

The JavaScript creates pancake plates at random edges of the hero, gives each one a randomized size, crossing duration, rotation direction, and exit edge, then removes it after it leaves the hero. The active pancake count is capped through section settings.

Animation pauses when the hero is off screen and is disabled when the visitor has `prefers-reduced-motion` enabled.
