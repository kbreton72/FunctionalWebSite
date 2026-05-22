# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A custom blog/content website for functional medicine and holistic lifestyle, built for a non-developer content creator. Monetized via affiliate links. Hosted on AWS.

## Local Development URL

After `npm run infra:local`, the site is available at **http://optimumu.localhost** (port 80).

The CDK stack creates a Route53 hosted zone + ACM cert for `optimumu.localhost` in LocalStack (auto-validated). LocalStack listens on port 80 via `GATEWAY_LISTEN` and routes requests by CloudFront alternate domain name. Modern browsers resolve `*.localhost` to `127.0.0.1` automatically — no hosts file changes needed.

## Production Deploy Checklist (one-time before first `cdk deploy`)

### Security (do these first)
1. **Revoke exposed GitHub PAT** — `infra/cdk.out/OptimumUStack.template.json` contains a plaintext token; revoke it immediately at GitHub → Settings → Developer settings → Personal access tokens. Do NOT commit `cdk.out/` to git.
2. **AWS CodeConnections** — AWS Console → Developer Tools → Connections → Create connection → GitHub → authorize the `FunctionalWebSite` repo. Copy the connection ARN.
3. **Set context flag** — in `infra/cdk.json` change `"useCodeConnections": "false"` → `"true"` (or pass `-c useCodeConnections=true` on the CLI). This removes the PAT-based `GitHubSourceCredentials` construct entirely.
4. **Store Sanity webhook secret** — add `SANITY_WEBHOOK_SECRET` to AWS Secrets Manager. The stack currently falls back to empty string if the env var is missing, which causes silent runtime failures.

### Domain & TLS (production only — not needed for local)
5. **ACM cert** — the CDK stack creates a cert for `optimumu.life` + `www.optimumu.life` automatically on deploy (cert lives in the CloudFormation stack). The deploy will hang at cert creation until DNS validation completes.
6. **DNS validation** — after starting `cdk deploy`, AWS will issue a CNAME record that must be added to your registrar. Add it, wait for cert issuance, then deploy continues.
7. **Route53** (optional, simplifies DNS) — set `hostedZoneId` in `infra/cdk.json`; CDK will write the validation CNAME and the CloudFront A alias records automatically. Leave it empty to manage DNS at your registrar manually.

### Deploy
8. **Deploy** — `npm run infra:deploy` from project root (pass `-c useCodeConnections=true` once CodeConnections is configured).
9. **DNS cutover** — point `optimumu.life` A record to the `DistributionDomain` stack output (or let Route53 handle it if `hostedZoneId` is set).
10. **Configure Sanity webhook** — paste the `WebhookEndpoint` output URL into Sanity → API → Webhooks, using the same secret.

### Post-deploy hardening
11. **Enable S3 versioning** — protects content from accidental stack deletion (`removalPolicy: DESTROY` is currently set).
12. **Add CloudWatch alarms** — at minimum: Lambda errors and CodeBuild failures.
13. **Enable CloudFront access logs** to S3 for debugging.

## Open Questions

- [x] Domain: optimumu.life (brand: Optimum U) — currently a placeholder hosted elsewhere, will be cut over to AWS when ready
- [x] AWS hosting strategy: S3 + CloudFront (decided, implemented in CDK stack)
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
- [ ] **AWS deployment** — complete Production Deploy Checklist above before running `cdk deploy`
- [ ] DNS cutover from current host to AWS — see Production Deploy Checklist (steps 5–9)
- [ ] Review and refine gene diagram appearance (labels, sizing, colors)

### Known Infra Issues (fix before production)
- [ ] **CRITICAL**: Revoke exposed GitHub PAT in `cdk.out/` (see Deploy Checklist step 1)
- [ ] `SANITY_WEBHOOK_SECRET` falls back to empty string — add synth-time validation or use Secrets Manager
- [x] `isLocal` declaration was after first use (TDZ bug) — moved to top of constructor
- [x] Custom domain + ACM cert wired into CloudFront; `domainName`/`hostedZoneId` in `cdk.json`
- [x] Lambda hot-reload documented; `npm run dev:lambda` added for local watch workflow
- [ ] S3 bucket has `removalPolicy: DESTROY` + no versioning — stack deletion wipes all content
- [ ] CloudFront `CACHING_OPTIMIZED` caches HTML — consider shorter TTL or per-type cache headers
- [ ] No CodeBuild cache — every build runs full `npm ci` from scratch

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
- **Hosting**: AWS S3 + CloudFront (CDK stack implemented in `infra/`)
- **Domain**: optimumu.life (DNS cutover pending, currently hosted elsewhere)
- **CI/CD**: Sanity webhook → API Gateway → Lambda (HMAC verified) → CodeBuild → S3 sync + CloudFront invalidation

### Content Pillars (6 total)
1. Mental Health — `#C9A84C` (gold)
2. Emotional Health — `#8AA4C8` (blue)
3. Physical Health — `#7DB87A` (green)
4. Social Health — `#D4956A` (terracotta)
5. Spiritual Health — `#B48FD4` (purple)
6. Financial Health — `#5BBFB5` (teal)

### Key Files

#### Infrastructure
- `infra/bin/app.ts` — CDK app entry point
- `infra/lib/stack.ts` — main stack: S3, CloudFront, CodeBuild, Lambda, API Gateway
- `infra/lib/webhook-lambda/index.ts` — webhook handler (HMAC verify + CodeBuild trigger)
- `infra/cdk.json` — CDK context config (bucket name, `useCodeConnections` flag)
- `infra/patches/s3-path-style.cjs` — patches AWS SDK for LocalStack path-style URL compatibility

#### Frontend
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
