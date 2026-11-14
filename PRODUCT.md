# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing codebase: plain static HTML/CSS/JS, no build step, no package manager. Deployed to Firebase Hosting (`firebase.json`, `.firebaserc`, `deploy.ps1`, `deploy.sh`). The only third-party runtime dependency is Google Fonts (Rethink Sans, Geist Mono). Font Awesome and the Firebase compat SDK were both removed in the 2026 redesign — icons are an inline SVG sprite, and the visitor counter was dropped. Keep the no-build constraint — the deploy scripts push the repo root directly.

## Users

Primary: **hiring managers, engineering leaders, and technical recruiters** evaluating Ittahad Uz Zaman ("Akash") for senior/lead backend and platform engineering roles. They arrive from LinkedIn, GitHub, or a CV link, usually on a first pass of many candidates, and they are deciding in under a minute whether this person has real depth at scale. They want: seniority evidence, systems depth, scale of systems owned, and proof that the claims are backed by shipped work.

Secondary (confirmed, not leading): engineering peers arriving from his technical articles and open-source packages.

## Product Purpose

A single-page personal portfolio that gets Ittahad shortlisted for senior software engineering roles. Success is a recruiter or hiring manager finishing the page convinced he operates at senior level on distributed .NET systems, and then contacting him. It is a persuasion surface, not a résumé dump — but every claim on it must be a real, verifiable fact already present in his record.

## Positioning

A backend/platform engineer whose record spans **both ends of the scale axis**: production microservices work on one of Bangladesh's largest ERP solutions and a multi-country e-signature product (Switzerland, Germany, Bhutan, Bangladesh), *and* authored open-source infrastructure libraries plus published technical writing on the exact patterns he ships (Saga, CQRS, OpenTelemetry, MassTransit, multi-tenancy). The combination of shipped enterprise scale, published libraries, and written teaching on the same stack is the thing a neighboring portfolio cannot truthfully copy.

## Operating Context

Read in a browser, most often desktop at work during candidate screening, frequently on mobile from a LinkedIn in-app browser. Typical visit is short and scanning-led: visitors look for current title and employer, years of experience, technology stack, and then one or two pieces of evidence. The page is also sent as a link in applications and DMs, so the first viewport is often the only thing seen.

## Capabilities and Constraints

Single page, anchor-navigated sections: Home, About, Experience, Projects, Articles, Open Source, Contact. No routing, no CMS, no backend of its own.

Confirmed functionality to preserve:
- **Light/dark theme toggle**, persisted in a cookie, with system-preference as the initial default. Non-negotiable.
- **Portrait photo**: Removed per user request. Photo files preserved in `.private-photos/` (untracked, excluded from deployment).
- **Animated typing effect** on the hero role line. Non-negotiable.
- Anchor navigation with scroll-spy active state; mobile nav drawer.
- Scroll progress indicator.
- Trace section: Removed per user request.
- Firebase visitor counter: removed in the 2026 redesign. The user did not mark it non-negotiable, and it was the only reason the page loaded the Firebase SDK.

Constraints: no build step; no npm; no project screenshots, logos, or client imagery available.

## Brand Commitments

- Name: **Ittahad Uz Zaman**, alias **Akash**. Both are used; the alias is the informal/logo form.
- Current role: Senior Software Engineer, BRAC IT Services Limited (Feb 2025 – present). Previously SELISE Digital Platforms.
- Contact: contact@ittahad.site · linkedin.com/in/ittahad · github.com/ittahad · youtube.com/@ittahadakash
- Voice: plain, technical, understated. States facts and scale; does not sell with adjectives.
- **Binding visual reference, set by the user: https://awmedia.marketing/** — its design language and animation system are to be adopted at full commitment ("full agency showmanship"). This supersedes the incumbent look, which was itself derived from zarcerog.com and is now anti-reference only.

## Evidence on Hand

Real and verifiable, already in the repo:
- **Experience**: 5 roles with dates and responsibilities — BRAC IT (Senior SWE, Feb 2025–present), SELISE (Senior SWE / Deputy Engineering Manager, Nov 2023–Jan 2025), SELISE (Software Engineer, Nov 2019–Nov 2023), UIU Teaching Assistant, UIU Undergraduate Assistant.
- **Projects (9)**: DailyPrep.dev, SELISE Signature, Examr, MinimalFramework, MEDexam, Application Cloud Platform (ACP), Online Business Management, Dhaka Routes and Alerts, WeatherDelight.
- **Articles (6)**, published externally: Saga pattern with RabbitMQ + MongoDB; generic command-processing pipeline with MassTransit; OpenTelemetry tracing in .NET; CI/CD with GitHub Actions × DigitalOcean; loosely coupled microservices in .NET; multi-tenant architecture with Node/Express/Mongoose.
- **Open source (8 repos)**: node-identity, node-amqp, MinimalFramework, node-mailer, node-storage, rabbitMqAndOutbox, algo_sort, BDLocations.
- **Education**: B.Sc. CSE, United International University, 2019, CGPA 3.98/4.00.
- **Certifications (10 listed)**: GKE, Angular, Node/Express/MongoDB, Cloud 101, Docker Mastery, Kubernetes for Beginners, Flutter, SQL, Tailwind, Clean Code.
- **Publications (2)**: "Cardiac Disease Predictor: An IoT and ML-driven health care system"; "Towards IoT and ML Driven Cardiac Status Prediction System".
- **Stat claims currently on the site**: 8+ years experience, 20+ projects, 15+ certifications, 2 publications.
- **Assets**: `favicon-64.png`, `icon-180.png`, `og-600.jpg` (generated monogram/typography assets). Photo sources moved to `.private-photos/` and not deployed.

Absences that must never be fabricated: no testimonials, no client quotes, no awards, no company logos, no project screenshots or live-site imagery, no performance benchmarks, no salary/rate or availability claims, no review scores. Only the 10 certifications actually listed may be named, even though the stat says 15+.

## Product Principles

1. **Scale is the headline.** The strongest true facts are "one of the largest ERP solutions in the country" and "e-signature product shipped to four countries." Lead with magnitude, not with job titles.
2. **Every claim has a receipt on the page.** Articles back the architecture claims, repos back the library claims, the timeline backs the seniority claim. Nothing asserted without the evidence beside it.
3. **Decided in one viewport.** A screening visitor who leaves after the first screen must already know the role, the stack, the scale, and how to get in touch.
4. **Density is credibility here.** The audience is technical; real specifics (CQRS, MassTransit, OpenTelemetry, Kubernetes) earn more trust than simplification. Compress, never dilute.
5. **No invented proof.** There is no imagery, no client list, and no testimonial to draw on — so composition, typography, and motion carry the production value instead.

## Accessibility & Inclusion

No user-specific requirement was established. Baseline obligations apply and are treated as binding: keyboard-reachable navigation and controls, visible focus states, text contrast that holds in both themes, honored `prefers-reduced-motion`, and content that is present and legible with animation disabled or unsupported.
