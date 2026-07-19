# NEET Expert — Premium Cinematic Website

Build a full-scope, luxury educational site on the existing TanStack Start stack. Every section built in v1. Hero is a true Apple-style scroll-driven frame sequence powered by the 212 uploaded frames.

## 1. Design system

- Tokens in `src/styles.css` (oklch conversions of the brief):
  - `--background` #F8FAFC, `--foreground` #1A1A1A
  - `--primary` #071B35 (Deep Navy), `--secondary` #1E5EFF (Royal Blue), `--accent` #D4AF37 (Luxury Gold), `--success` #1FA971
  - Gradients: `--gradient-navy`, `--gradient-gold`, `--gradient-hero-fade`
  - Shadows: `--shadow-soft`, `--shadow-elevated`, `--shadow-gold-glow`
  - Radius scale + generous spacing scale for luxury whitespace
- Fonts via `<link>` in `__root.tsx` head (never `@import` a URL): Poppins 700/800 for headings, Inter 400/500/600 body. Map through `@theme`.
- Subtle glassmorphism utility (`.glass`, `.glass-nav`) — light blur only.
- All shadcn tokens preserved; add semantic tokens on top.

## 2. Assets pipeline (hero frames)

The uploaded ZIP has **212 sequential 4K JPGs (~37 MB total)**. Shipping them raw is too heavy. Preprocess once, then serve from the Lovable CDN:

1. Extract ZIP to `/tmp/frames`.
2. Downscale + recompress with ffmpeg: `1600px` wide, WebP q=72 (desktop) and `900px` wide q=68 (mobile). Expected ~35–55 KB/frame → ~8–12 MB total per tier.
3. Upload every frame with `lovable-assets create` → collect returned CDN URLs.
4. Emit `src/data/heroFrames.ts` exporting `{ desktop: string[], mobile: string[], count: 212 }` — no binaries land in the repo.
5. Upload the NEET Expert logo the same way → `src/assets/logo.png.asset.json`. Use it in loader, nav, hero, contact, footer. Generate a favicon crop and wire it in root `head().links`; delete the default `public/favicon.ico`.

## 3. Hero scroll animation (the centerpiece)

- Route: `/` (replace placeholder).
- `HeroSequence` component:
  - `<canvas>` sized to viewport, `object-fit: cover` math done in JS with devicePixelRatio.
  - Preloader: eagerly loads first 24 frames, then streams the rest in the background with a small concurrent pool (6). A progress ring on the loader screen reflects preload %.
  - Chooses desktop vs mobile manifest from `matchMedia('(max-width: 768px)')`.
  - GSAP ScrollTrigger pins the canvas for ~`212 * 12px`of scroll (tuned for ~5 screen-heights);`scrub: 0.5` for buttery frame mapping; on tick draws the currently-loaded nearest frame (falls back to previous frame if target not yet loaded → no flicker). Reverse scroll works identically because we always draw the resolved index.
  - Lenis smooth scroll installed globally; ScrollTrigger `scrollerProxy` wired to Lenis.
  - After the pin releases, page continues naturally into About.
- `HeroOverlay` (logo image + "NEET Expert" wordmark in Poppins ExtraBold + tagline + two CTAs):
  - Tied to the same ScrollTrigger. Progress 0→0.30: subtle parallax `y`, scale 1→0.95, blur 0→8px, opacity 1→0. Progress >0.30: fully hidden.
  - CTAs: `Book Free Consultation` (scrolls to /#contact), `Explore Colleges` (scrolls to Colleges). Magnetic hover (mouse-follow translate) + ripple on click.
- `Navbar`:
  - Fixed. Same ScrollTrigger drives a `data-scrolled` attribute at progress ≥ 0.30.
  - Transparent white text → glass white bg + navy text + border + soft shadow, logo scales 1→0.9. Sticky for the rest of the site.
  - Links: Home, About, Services, Process, Colleges, Success, Blog, FAQ, Contact.
  - Mobile: hamburger → full-screen glass sheet.

## 4. Loading screen

- Shown until the first 24 hero frames + fonts are ready. Centered logo with a gold arc progress ring, tagline underneath, elegant fade-out.

## 5. Sections (all in v1)

Each section is its own component under `src/components/sections/`, animated with GSAP ScrollTrigger + subtle Framer Motion for micro-interactions. Reveal patterns rotate: mask reveal, blur reveal, staggered fade-up, image parallax.

- **About**: split layout, editorial imagery (generate 1 hero photo), Mission/Vision cards, animated counters (Students Guided, Top Ranks, Colleges Covered, Years).
- **Services** (10 cards): luxury cards with gold icon chip, tilt on hover, soft glow, gradient border on hover.
- **Why Choose Us**: 4 stat blocks + comparison table (NEET Expert vs Others) with animated checkmarks.
- **Counselling Process**: 8-step vertical timeline; connecting line draws in on scroll; each node reveals with stagger.
- **Colleges**: searchable/filterable grid (Government / Private / Deemed tabs), sample dataset of ~24 colleges with name, state, type, fees range, expected cutoff. Search + type filter, no backend query needed for v1.
- **Success Stories**: luxury carousel (embla) of student cards with photo, name, rank, college, quote, 5-star rating.
- **Blog**: 6 modern cards (title, category tag, date, excerpt, cover image); static data for v1, ready to swap for DB later.
- **FAQ**: 10 items in shadcn Accordion with animated chevron and gold underline.
- **Contact**: split panel — left (dark navy) shows logo, phone, email, Instagram, tagline; right shows enquiry form.
- **Footer**: dark navy, logo, quick links, services list, contact, newsletter email input (posts to same enquiry endpoint with a `type: 'newsletter'` flag), Instagram/mail/phone icons, copyright.

## 6. Backend (Lovable Cloud + Resend)

- Enable Lovable Cloud.
- Create table `enquiries` (id, name, phone, email, state, neet_score, preferred_college, message, source, created_at) + INSERT-only RLS for anon (spam-throttled). GRANT statements included.
- Link the **Resend connector** (`standard_connectors--connect resend`). User provides API key via the connector flow.
- Server function `submitEnquiry` (`src/lib/enquiry.functions.ts`):
  - Zod validation (name 2–100, phone 10-digit IN, email, message ≤ 1000).
  - Simple spam protection: honeypot field + per-IP 60s throttle in memory + minimum submit time.
  - Insert row via `supabaseAdmin` (loaded inside handler).
  - Send email to `expertneet121@gmail.com` via Resend connector gateway (`from: NEET Expert <onboarding@resend.dev>` for now; note that a verified domain is needed for production deliverability — surface this to the user).
  - Returns `{ ok: true }` or structured error.
- Contact form uses `useServerFn` + react-hook-form + zod resolver; loading spinner on submit, sonner toast on success/error.

## 7. Motion / interaction library

- Install: `gsap`, `@gsap/react`, `lenis`, `framer-motion` (already), `embla-carousel-react`.
- Global providers: LenisProvider in `__root.tsx` component tree (client-only), scroll progress bar fixed at top (gold gradient) tied to Lenis.
- Reusable primitives in `src/components/motion/`: `MagneticButton`, `TiltCard`, `RevealText`, `BlurReveal`, `ParallaxImage`, `AnimatedCounter`, `RippleButton`.
- Respect `prefers-reduced-motion`: skip parallax/tilt, keep opacity fades short, replace hero scrub with a simple crossfade sequence.

## 8. SEO / head

- `__root.tsx`: keep sitewide defaults minimal (no `og:image`), add favicon link to new logo.
- `/` (index) `head()`: title `NEET Expert — NEET UG Counselling & Medical Admission Guidance`, description under 160 chars, matching `og:title`/`og:description`, `og:image` = absolute URL of the uploaded logo, `twitter:card: summary_large_image`, JSON-LD `Organization` with phone/email/sameAs Instagram.
- Semantic HTML: single `<main>` in root Outlet wrapper, one `<h1>` in hero, section landmarks, alt text on every image.

## 9. Performance

- Preload only the first 24 hero frames; stream the rest.
- Responsive `srcset` handled by two manifests (desktop/mobile).
- `<link rel="preload" as="image">` for the first frame in `/` head.
- Route-level code split for heavy sections (Colleges grid, Blog) via `React.lazy` + `<Suspense>` under `<ClientOnly>` where needed.
- Lazy load below-the-fold images with `loading="lazy"`.

## 10. Build order (single pass)

1. Design tokens + fonts + Lenis + scroll progress bar.
2. Enable Cloud, migration for `enquiries`, connect Resend.
3. Preprocess frames → upload → generate `heroFrames.ts`; upload logo.
4. Loading screen + Navbar shell.
5. Hero canvas + overlay + ScrollTrigger wiring.
6. About → Services → Why Us → Process.
7. Colleges → Success → Blog → FAQ.
8. Contact form + `submitEnquiry` server fn.
9. Footer + newsletter.
10. SEO/head, favicon, verify build, sanity-check hero via Playwright screenshot.

## Technical notes

- Frames served from CDN via Lovable Assets — repo stays clean.
- Canvas draws to `devicePixelRatio` for crispness; resize handler rebuilds size and redraws current frame.
- ScrollTrigger `invalidateOnRefresh` on resize; `scrollerProxy` bridges Lenis so pin/scrub stay accurate.
- Reverse scroll: draw function reads `Math.round(progress * (count-1))` and clamps to the highest loaded index ≤ target if not yet available; this guarantees no flicker and correct playback in both directions.
- Resend: for owner-only test delivery `onboarding@resend.dev` works. To send from `no-reply@neetexpert.in` (or similar) the user must verify a domain in Resend — flagged in the final message.
- All spec libraries (Next.js/Three.js) are dropped or substituted: Three.js not required for the hero (canvas 2D is faster and matches Apple's approach exactly); Next.js replaced by TanStack Start as agreed.

## Deliverable

A single-pass build of the entire site: cinematic scroll-controlled hero, 30% fade of hero copy, transparent→glass navbar transformation, and all 10 sections wired with premium motion, backed by Lovable Cloud + Resend for real enquiry delivery.  
  
  
also add navbar in the scroll animtion 