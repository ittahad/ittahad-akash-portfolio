---
name: Ittahad Uz Zaman Portfolio
description: An engineer's logbook on pistachio dot-grid paper, annotated with a marker and a ballpoint.
colors:
  paper: "#e7edd8"
  paper-deep: "#dde5ca"
  card: "#f7f9ee"
  ink: "#15203a"
  pen-blue: "#1f43d6"
  marker-yellow: "#f7e35c"
  margin-pink: "#c42d55"
  field-blue: "#1f43d6"
  field-ink: "#f4f7e8"
  night-paper: "#0f1830"
  night-paper-deep: "#14203d"
  night-card: "#1a2848"
  chalk-ink: "#eaefde"
  night-pen: "#9db6ff"
  night-pink: "#ff8fa8"
  night-field: "#1c35a8"
  field-highlight-ink: "#fff09a"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.9vw, 5.5rem)"
    fontWeight: 740
    lineHeight: 1
    letterSpacing: "-0.038em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 5.2vw, 3.9rem)"
    fontWeight: 730
    lineHeight: 1.02
    letterSpacing: "-0.034em"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "-0.006em"
  hand:
    fontFamily: "Shantell Sans, Segoe Print, Bradley Hand, cursive"
    fontSize: "1rem"
    fontWeight: 500
    letterSpacing: "0"
  label-mono:
    fontFamily: "Geist Mono, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "0.8rem"
    fontWeight: 500
    letterSpacing: "normal"
rounded:
  card: "3px"
  chip: "99px"
  focus: "6px"
  hand-button: "255px 18px 225px 18px / 18px 225px 18px 255px"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  section: "clamp(3.5rem, 7vw, 6rem)"
  nav-height: "64px"
  grid-pitch: "26px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.hand-button}"
    padding: ".85rem 1.4rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.hand-button}"
    padding: ".85rem 1.4rem"
  button-ghost-hover:
    backgroundColor: "{colors.card}"
  notecard:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "2.2rem 2rem 1.7rem"
  tag-chip:
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: ".2rem .65rem"
  sticker:
    backgroundColor: "{colors.margin-pink}"
    textColor: "{colors.paper}"
    padding: ".05rem .75rem .15rem"
---

# Design System: Ittahad Uz Zaman Portfolio

## Overview

**Creative North Star: "The Engineer's Logbook"**

The page is a person's working notes, not an agency stage. Dot-grid notebook paper in pale pistachio carries blue-black ink; a ballpoint blue annotates and links; a yellow marker highlights; a margin pink ticks things off. Trust comes from first-person voice, handwriting, and marks that look made by a hand, then from dated entries, an index, clippings and repos. Evidence stays plain; the personality lives in the marginalia.

Density is calm and editorial: large tight display type, generous section padding, small tilted paper objects (a taped field-notes card, a build note, project spreads) that break the grid by a degree or two. The night theme is the same notebook after dark: ink-navy paper, chalk-cream ink, the same marks recolored. The Open Source section is the one saturated moment, a full-bleed pen-blue field with its own lighter dot grid.

Rejected by the build: dark monochrome spectacle, the generic hero plus card-grid template, split heroes, stock or photographic imagery.

**Key Characteristics:**
- Dot-grid paper ground on every light and night surface (26px pitch)
- Four drawing tools only: ink, ballpoint, marker, margin pen
- Handwritten marginalia as a distinct third voice, never body copy
- Hand-wobbled shapes and 1 to 6 degree tilts on paper objects
- Marks draw themselves on scroll (highlights grow, strokes trace)

## Colors

Pistachio paper, navy ink, one ballpoint blue, one marker, one pink. Each tool has a single job.

### Primary
- **Ballpoint Blue** (#1f43d6, night #9db6ff): links, underlines on text links, hand-script labels, dates' org line, hand strokes and circles, focus outline, progress bar, copied state. In the night theme it lightens to stay legible on navy.

### Secondary
- **Marker Yellow** (#f7e35c, night 30% alpha wash): highlight behind key words, nav-link hover/active, index row hover fill, selection, the "now" timeline dot, tape.
- **Margin Pink** (#c42d55, night #ff8fa8): checkmark ticks and the "now" sticker only.

### Neutral
- **Pistachio Paper** (#e7edd8, night #0f1830): page ground with dot grid.
- **Deep Paper** (#dde5ca, night #14203d): the build-note panel.
- **Card Stock** (#f7f9ee, night #1a2848): taped note card, project spreads, ghost-button hover.
- **Navy Ink** (#15203a, night chalk #eaefde): text, primary button, rules. Secondary text, rules, and dots are the same ink at reduced alpha (85%, 70%, 36%; rules 14% and 27%).
- **Pen-Blue Field** (#1f43d6, night #1c35a8) with Field Cream (#f4f7e8) text and Field Highlight (#fff09a) for hand text, link underlines, and focus: the Open Source section.

### Named Rules
**The Four Tools Rule.** Ink writes, ballpoint annotates, marker highlights, pink checks. A color used outside its tool's job is off-system.

**The One Field Rule.** Exactly one section is drenched in pen blue. Do not add a second.

## Typography

**Display Font:** Bricolage Grotesque (with system sans fallbacks)
**Body Font:** Bricolage Grotesque
**Hand Font:** Shantell Sans (with Segoe Print, Bradley Hand, cursive)
**Mono Font:** Geist Mono (with ui-monospace fallbacks)

**Character:** A quirky grotesque with real optical-size contrast sets confident headlines and quiet body; Shantell Sans is the pen in the margin; Geist Mono is the stamp on dates and addresses.

### Hierarchy
- **Display** (740, clamp 2.6rem to 5.5rem, 1.0, -0.038em): the hero headline, max 19ch, balanced.
- **Headline** (730, clamp 2.1rem to 3.9rem, 1.02, -0.034em): section titles; contact title runs 750 at up to 4.8rem.
- **Title** (700, 1.25 to 1.6rem, 1.15, -0.025em): role entries, clip titles; project spread titles scale to 2.6rem at 740.
- **Body** (400, 1.0625rem, 1.62): paragraphs, ledes 1.1 to 1.3rem; prose capped at 62ch.
- **Hand** (500, about 1rem, no tracking, Ballpoint Blue, tilted): margin notes, fact labels, clip tags, channel labels, sticker text.
- **Label** (Geist Mono 500, 0.74 to 0.92rem, tabular numbers): entry dates, typed role line, email address in buttons.

### Named Rules
**The Dates Only Rule.** Mono is for dates, the typed role line, and addresses. It never sets headings or body.

**The Margin Voice Rule.** Handwriting is short (a phrase), always tilted, always Ballpoint Blue (or Field Highlight on the field). Never a paragraph.

## Layout

Single column page on a 1240px container with fluid gutter (20px to 72px) and fluid section padding (56px to 96px). Layouts are asymmetric two-column grids (1.15fr/.85fr hero row, 1.2fr/1fr about and spreads) that collapse to one column at 1020px; the nav becomes a burger sheet there. The 26px dot grid is the background rhythm. The first viewport is a full-width headline over a lede and actions on the left, with the note card pulled up beside the headline on the right (desktop only). Experience is a dated log: a date column, a dashed spine, circle nodes. Projects are two tilted spreads plus a ruled index with 4-column rows. Writing is a 2-column clipping layout with every second clip dropped. Below 700px everything stacks and the log spine moves to the left edge; below 420px actions go full width. Spacing is rem-based and fluid, not on a fixed step scale.

## Elevation & Depth

Paper objects lift off the page with one layered soft shadow; everything else is flat and separated by rules. Depth comes from stacking physical things: a card with tape, a panel tilted a degree, a spread that straightens and rises 6px on hover.

### Shadow Vocabulary
- **Paper Lift** (`0 1px 0 #15203a14, 0 18px 34px -16px #15203a59, 0 3px 8px -3px #15203a33`; night uses black at 25/65/40%): note card, build note, spreads, hovered primary button.
- **Tape** (`0 1px 3px #15203a26`): the yellow tape strip only.

### Named Rules
**The Real Paper Rule.** Only objects that could be a sheet of paper cast a shadow; text, rows, and chips never do.

## Shapes

Edges are hand-made. Paper objects have a tight 3px radius and a small rotation. Buttons use asymmetric elliptical corners (255px 18px 225px 18px) so they look cut by hand; the logo monogram and sticker are lumpy blobs; icon buttons and burger are circles; tags are pills (99px). Dividers are 1.5px dashed rules (stitching) for structure and 2px solid ink rules on clippings and channels. Focus is a 2.5px dashed Ballpoint Blue outline offset 4px. Icons are inline SVG line icons at 1.75 stroke, round caps.

## Components

### Buttons
- **Shape:** hand-cut asymmetric corners, 1.5px border.
- **Primary:** navy ink fill, paper text, 640 weight, padding .85rem 1.4rem. The email action.
- **Ghost:** transparent with 27%-ink border; fills to Card Stock on hover. Copy-email button shows the address in Geist Mono.
- **Hover / Focus:** lifts 2px and rotates -1deg with Paper Lift; active settles flat. Copied state turns border and text Ballpoint Blue.

### Marker Highlight and Pen Strokes
Signature mark. A marker-yellow band sits behind the lower 56% of the text height and grows left to right on scroll (or on load for the hero). Hand-drawn SVG strokes (circle, arrow, squiggle, 3px Ballpoint Blue, round caps) trace themselves. Nav links and index rows reuse the same band on hover/active.

### Note Card (taped)
Card Stock, 3px radius, rotated 1.6deg, Paper Lift, a rotated yellow tape strip at top. Content is a definition list with hand-script labels and dashed row separators.

### Project Spreads and Index
Spreads are tilted Card Stock sheets (-.7deg and .9deg, second dropped) that straighten on hover with an arrow nudge. The index below is ruled dashed rows (name, description, tags, arrow) that fill with marker yellow on hover.

### Timeline Entries
Mono tabular date left, hollow ink circle node on a dashed spine, bold title, Ballpoint Blue org line, dash-bulleted list. The current role has a marker-yellow node and a pink sticker.

### Chips
Pill outline (1.5px 27%-ink), .82rem, ink-2 text. No fill.

### Navigation
Sticky, transparent until scrolled, then paper with a dashed bottom rule. Monogram blob, name, text links with marker band on hover/active, theme toggle (circle icon button rotates -12deg on hover), primary small button. A 3px Ballpoint Blue progress bar tracks scroll.

## Do's and Don'ts

### Do:
- **Do** keep the dot grid under all paper surfaces and make the field section carry its own lighter grid.
- **Do** use Ballpoint Blue for every link and annotation, with a 2px underline on text links.
- **Do** tilt paper objects by 0.6 to 1.6 degrees and hand-script labels by 1.5 to 6 degrees; straighten on hover.
- **Do** drive highlights and strokes with scroll (view timeline), fall back to IntersectionObserver, and render them fully drawn under reduced motion.
- **Do** provide the night theme as a recolor of the same marks (chalk ink, lightened pen and pink, translucent marker).

### Don't:
- **Don't** return to dark monochrome with a single white accent, or to the hero plus card-grid agency template.
- **Don't** add photos, stock imagery, or invented testimonials; proof is real roles, projects, writing, repos.
- **Don't** use hard offset shadows, gradients as decoration, or glass; depth is paper-on-paper.
- **Don't** set body, headings, or labels in the hand or mono faces outside their named jobs.
- **Don't** use pink for anything but ticks and the "now" sticker, or add a second pen-blue field section.
