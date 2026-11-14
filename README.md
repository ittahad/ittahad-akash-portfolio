# Ittahad Uz Zaman — portfolio

Single-page portfolio for a senior software engineer. Monochrome, typographic, and animated almost entirely with **CSS scroll-driven animation** — no animation library, no build step, no package manager.

## Quick start

```bash
npx serve .
```

Then open `http://localhost:3000`. There is nothing to compile; the three source files are the site.

## How it is built

| File | Role |
|---|---|
| `index.html` | The whole page. Semantic sections, anchor-navigated. |
| `style.css` | Design tokens, components, and the motion library. |
| `script.js` | Only what CSS cannot do: theme persistence, the typed status line, menu state, scroll-spy, the counter count-up, and the reveal fallback. |
| `assets/` | Monogram favicon, app icon, and Open Graph preview image. |
| `PRODUCT.md` | Durable product truth — what is real and what must never be invented. Not deployed. |
| `DESIGN.md` | The shipped design system: tokens, type ramp, motion contract, and the do/don't rules. Not deployed. |
| `.impeccable/` | Design direction contract and review screenshots. Not deployed. |

### Dependencies

One: **Google Fonts**. There is no icon font, no animation library, no framework, and no build step. Icons are a single inline `<svg class="sprite">` of seven `<symbol>`s referenced by `<use>` — brand marks filled (CC0, from Simple Icons), UI glyphs stroked at `1.75` on `currentColor`. Replacing Font Awesome with that sprite removed 273 KB across three render-blocking third-party requests, for seven glyphs.

### Design system

Everything is driven by custom properties at the top of `style.css`.

- **Colour** — pure black ground (`#000`), panels `#111`, hairlines `#ffffff17`. **White is the only accent**; there is no second hue anywhere. Text steps down through alpha (`--ink` → `--ink-2` → `--ink-3`) rather than to grey, so it stays tinted to the surface. `--ink-4` is reserved for separator glyphs and never carries read text.
- **Light theme** — an authored negative of the same system (`--bg: #f4f4f5`, black accent), not a tint. Defined under `:root[data-theme="light"]`.
- **Type** — [Rethink Sans](https://fonts.google.com/specimen/Rethink+Sans) for display, body and labels; [Geist Mono](https://fonts.google.com/specimen/Geist+Mono) **only for data**: dates, counts, hostnames, repo names, tech tokens.
- **Motion** — one easing curve, `cubic-bezier(.16, 1, .3, 1)`, everywhere.

All text/background pairs meet WCAG AA in both themes (verified by composite against every surface, not by token inspection).

### The motion library

Reveals are **scroll-linked, not time-based**. A class like `.r-rise` resolves to:

```css
@supports (animation-timeline: view()) {
    .r-rise {
        animation: 1ms var(--ease) both k-rise;
        animation-timeline: view();
        animation-range: entry cover 30%;
    }
}
```

The element's position in the viewport *is* the animation's playhead. The library is `.r-rise`, `.r-rise-sm`, `.r-fall`, `.r-left`, `.r-right`, `.r-scale`, `.r-fade`, `.r-tilt` and `.r-blur`, plus `.r-stagger` / `.r-stagger-tight` on a parent to cascade its children, `.r-par-slow` / `.r-par-med` / `.r-zoom-out` for parallax, and `.r-early` / `.r-late` to shift the range. Not all of them are used in the current markup; they are the system, not a usage list.

One named timeline and one registered property do the distinctive work, with no JavaScript at all:

- **The hero hand-off** — `view-timeline: --hero` fades and lifts the hero on exit while its ambient layer drifts the other way.
- **The hover edge** — a registered `@property --spin-angle` rotating a `conic-gradient` through a border mask.

The counters are the exception: the number is real text in the markup and JavaScript animates it, because the CSS-only `counter()` approach rendered wrong values and generated content is not reliably announced by screen readers.

**Degradation is layered, and content is visible by default at every layer:**

1. Scroll-driven animation supported → everything above.
2. Not supported (`@supports not`) → the same reveals as ordinary time-based transitions, triggered by an `IntersectionObserver` in `script.js`.
3. `prefers-reduced-motion: reduce` → all animation off, counters at final value, typing effect static, marquee static.

## Firebase deployment

### Prerequisites

- A Firebase project
- Node.js (for the Firebase CLI)

### Deploy

```powershell
./deploy.ps1     # Windows
```

```bash
chmod +x deploy.sh && ./deploy.sh    # Linux / macOS
```

Or manually:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```

### Configuration

Set your project ID in `.firebaserc`, or run `firebase use --add`.

`firebase.json` serves the repo root and excludes `PRODUCT.md`, `.impeccable/`, the deploy scripts and this README from the upload. CSS/JS/images get a one-year cache; `index.html` is served `no-cache` so deploys take effect immediately.

## Sections

1. **Hero** — headline, live status line, primary action, credential strip
2. **About** — bio, animated counters, certifications, publications
3. **Experience** — five roles on a self-drawing timeline
4. **Projects** — two featured, then a ruled index of seven
5. **Writing** — six published articles
6. **Open source** — eight public repositories
7. **Contact** — the close; the email address is the largest thing on screen

## Browser support

Scroll-driven animation needs Chrome/Edge 115+. Browsers without it take the `IntersectionObserver` path automatically — same content, same layout, simpler motion. Nothing is gated behind it.

## Contact

- Email: contact@ittahad.site
- LinkedIn: [linkedin.com/in/ittahad](https://linkedin.com/in/ittahad)
- GitHub: [github.com/ittahad](https://github.com/ittahad)

© 2026 Ittahad Uz Zaman.
