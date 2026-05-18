# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A custom blog/content website for functional medicine and holistic lifestyle, built for a non-developer content creator. Monetized via affiliate links. Hosted on AWS.

## Open Questions

- [x] Domain: optimumu.life (brand: Optimum U) — currently a placeholder hosted elsewhere, will be cut over to AWS when ready
- [ ] AWS hosting strategy: Lightsail vs S3+CloudFront vs Amplify?
- [ ] DNS cutover: update optimumu.life nameservers/A record to point to AWS
- [ ] Financial Health hero image — to be provided, goes in `web/public/images/Financial Home Page.png`

## Project Status

**Sessions 1–3 complete.** Site is content-complete with 47 live blog articles, cover images, pillar organization, and category filtering.

### Completed
- [x] Dev container configured (Node 22, ports 4321 + 3333 forwarded)
- [x] Astro 5 + Tailwind v4 frontend scaffolded (`web/`)
- [x] Sanity Studio v3 scaffolded with content schemas (`studio/`)
- [x] Sanity project connected (project ID: lk5dzwr6, dataset: production)
- [x] Homepage: full-screen hero carousel (6 pillars), pillars grid, mission section, footer
- [x] Hero images in place for 5 of 6 pillars (Financial placeholder pending)
- [x] About page with gene/DNA diagram — double helix with 6 pillar atoms and sub-category orbital nodes
- [x] All 6 pillars defined: Mental, Emotional, Physical, Social, Spiritual, Financial
- [x] 47 blog articles seeded into Sanity with full body content
- [x] Cover images uploaded to Sanity and displayed on blog listing + individual post pages
- [x] Blog listing page (`/blog`) with pillar filter tabs and subcategory badges
- [x] Individual post pages (`/blog/[slug]`) with cover image hero
- [x] Pillar overview page (`/pillars`) — 6 cards, Social/Financial marked "Coming Soon"
- [x] Individual pillar pages (`/pillars/[pillar]`) — articles grouped by subcategory
- [x] 10 Sanity categories created with pillar field (Skin Care, Hair Care, Oral Health, Makeup & Beauty, Immune & Respiratory, Natural Protection, Focus & Clarity, Sleep & Rest, Hormonal Balance, Sacred Oils & Ritual)
- [x] All 47 posts tagged to categories; Frankincense + Myrrh dual-tagged (Physical + Spiritual)
- [x] Instagram link (`@_optimumu_`) added to footer
- [x] `category.ts` schema updated with `pillar` select field

### Up Next
- [ ] Financial Health hero image — drop into `web/public/images/` as `Financial Home Page.png`
- [ ] Affiliate disclosure page (`/affiliate-disclosure`) — required, footer already links to it
- [ ] Homepage "Latest Articles" section — wire up to real Sanity posts
- [ ] Resources/shop page for affiliate products
- [ ] SEO: sitemap, meta tags, Open Graph
- [ ] AWS deployment (S3 + CloudFront recommended)
- [ ] DNS cutover from current host to AWS
- [ ] Review and refine gene diagram appearance (labels, sizing, colors)

## Developer Context

- Built by a software architect in VSCode using a dev container
- Content managed by a non-developer (site owner/wife) via Sanity Studio
- No WordPress — custom Astro + Sanity stack
- Note: new page files added while dev server is running require a server restart to be picked up (Windows Docker bind-mount inotify limitation)

## Getting Started

```bash
npm install          # Install all workspace dependencies (run inside dev container)
npm run dev:web      # Astro frontend → localhost:4321
npm run dev:studio   # Sanity Studio  → localhost:3333
```

## Architecture

- **Frontend**: Astro 5 (static output) + Tailwind CSS v4
- **CMS**: Sanity v3 — content schemas in `studio/schemaTypes/`
- **Hosting**: AWS (strategy TBD — S3+CloudFront recommended)
- **Domain**: optimumu.life (DNS cutover pending, currently hosted elsewhere)

### Content Pillars (6 total)
1. Mental Health — `#C9A84C` (gold)
2. Emotional Health — `#8AA4C8` (blue)
3. Physical Health — `#7DB87A` (green)
4. Social Health — `#D4956A` (terracotta)
5. Spiritual Health — `#B48FD4` (purple)
6. Financial Health — `#5BBFB5` (teal)

### Key Files
- `web/src/components/HeroCarousel.astro` — homepage hero slideshow (6 slides)
- `web/src/components/PillarsSection.astro` — six pillars grid
- `web/src/components/GeneDiagram.astro` — DNA/gene visualization for About page
- `web/src/components/Header.astro` — site header with nav
- `web/src/components/Footer.astro` — footer with pillar links + Instagram
- `web/src/pages/index.astro` — homepage
- `web/src/pages/about.astro` — About page with gene diagram
- `web/src/pages/pillars/index.astro` — pillar overview (6 cards)
- `web/src/pages/pillars/[pillar].astro` — individual pillar page (articles by subcategory)
- `web/src/pages/blog/index.astro` — blog listing with pillar filter tabs
- `web/src/pages/blog/[slug].astro` — individual blog post
- `web/src/lib/sanity.ts` — Sanity API client
- `studio/schemaTypes/post.ts` — blog post content schema
- `studio/schemaTypes/author.ts` — author schema
- `studio/schemaTypes/category.ts` — category schema (includes `pillar` field)
- `scripts/seed-categories.mjs` — creates/tags all Sanity categories

### Brand
- **Logo**: "OptimumU" in Playfair Display, color `#C9A84C` (gold)
- **Fonts**: Playfair Display (headings/serif) + Inter (body)
- **Tone**: Serene, wholistic
- **Hero images**: `web/public/images/` — one per pillar
