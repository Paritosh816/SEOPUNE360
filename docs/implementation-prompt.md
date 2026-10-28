## 20. Final high-precision GitHub coding prompt

> Work in the existing SEOPune360 repository. Read `docs/website-build-specification.md` fully, inspect the current framework, homepage, routes, styles/design tokens, assets, and integrations before editing. Keep changes focused on the homepage and follow the existing stack and conventions. The screenshots in `docs/flowtrix-reference/` and §19 of the specification are the authoritative visual references for the hero texture, client/industry selector, services showcase, and timeline.
>
> Preserve SEOPune360's existing identity and exact current CSS color tokens. The observed palette is deep navy/near-black, turquoise/cyan, mint highlights, warm off-white, muted cool gray, and charcoal/blue-gray. Inspect the source website/assets for exact values; do not guess hex values. Recreate Flowtrix-like composition, textures, hover/selection behavior, and transitions with SEOPune360 colors only. Do not copy Flowtrix's logo, copy, lime/green brand palette, client assets, or proprietary video.
>
> **Hero:** Build a full-width dark two-column stage. On the left, use approved SEOPune360 proof, a large off-white headline with one aqua-highlighted phrase, URL scan form, audit reassurance, and existing brand description. On the right, add an oversized cropped circular glow/orb with soft grain and horizontal aurora ribbons. Float an authored 16:9 client-showcase video card at the lower right, overlapping the glow. The user-provided Flowtrix MP4 is a visual/pacing reference; use SEOPune360's approved client footage and a configurable `clientShowreelSrc` in production. Use a poster first, user-initiated playback, accessible controls, mobile fallbacks, and reduced-motion support. Never autoplay audio.
>
> **Client/industry selector:** Use a large centered title, left vertical list of the requested industries (B2B, Hospitality, Fintech, Automobile, B2C, Real Estate, Healthcare), and a right three-column logo/description grid. Clicking or keyboard-selecting a category must switch the visible client set and active color/progress indicator. Animate old items out and new items in using a short fade/upward reveal/stagger without layout shift. Use approved clients and accurate descriptions. On phones, use a horizontal filter row or select and stack client cards.
>
> **Services showcase:** Do not use generic static cards. Create the dark title/intro block and broad active banner with relevant service image left, large service title center, rounded capability pills right, and a restrained textured glow behind it. Below, show large numbered inactive service rows. Use SEOPune360's actual offers: SEO Services, GEO Optimization, Lead Generation, Total Business Growth, Website Design, and Development. Hover/focus previews and click/tap persistently selects a service. Change image/title/pills together with a stable-height crossfade and subtle masked/side reveal; use SEOPune360 aqua/teal/mint, not Flowtrix green. On mobile, use accessible tap-to-expand rows.
>
> **Case studies and process:** Keep the accessible case-study selector updating all active project content in place. Recreate the process screenshot as a dark Gantt-like week grid with Start and Week 2–8 labels, dotted vertical guides, staggered overlapping bars, phase labels, timing tags, icon tiles, and titles. Use SEOPune360 palette tints only. Use actual approved timings or label estimates indicative. Convert to a vertical timeline on mobile.
>
> **Footer:** Build a functional Flowtrix-style system adapted to SEOPune360: pre-footer CTA, brand block, working link groups for Services, Case Studies/Portfolio, Industries, Resources, and Company, optional approved client/partner links, and a real newsletter form only if the repository has an integration. Add Terms & Conditions, Privacy Policy, and Cookie Settings. Cookie Settings opens an accessible preferences panel with Necessary locked on and optional Analytics/Marketing/Functional choices; save and persist preferences and do not load optional trackers before consent. A clickable email is allowed. Never display a physical address, office location, map, or address block.
>
> Keep the agreed scope: no Minds Behind the Work/team section, testimonials, or FAQ/Q&A. Do not fabricate logos, client metrics, reviews, audit results, partner claims, or timelines. Keep the audit flow honest and connected only to an existing secure integration; otherwise label it as a sample/demo and route to the real contact flow. Ensure every CTA/link has a working destination, selectors work by pointer/keyboard/touch, images have reserved dimensions, video is lazy-loaded, responsive layouts are polished, and reduced-motion/accessibility states are included. Run the repository's appropriate existing checks and report changes, behavior, checks run, and missing assets/integrations.

## 17. Research notes and limits

The Flowtrix homepage and the user-provided screenshots were used to document the visual patterns. SEOPune360 was opened visually at desktop size; its dark navy/near-black, turquoise/cyan, mint, off-white, and cool-gray palette was observed alongside its wordmark and aqua CTA treatment. Exact SEOPune360 color hex values still need to be extracted from its current source styles/assets during implementation. The screenshot states show the intended visual hierarchy; where the exact interaction timing was not observable, this brief specifies accessible, conventional behavior. The MP4 URL was provided as a reference; the video file itself was not available to the text inspection, so no frame-by-frame claims are made. Use it as a user-provided framing/pacing cue and build the production reel from SEOPune360 assets.

Sources: [Flowtrix homepage](https://www.flowtrix.co/) and [Flowtrix free audit destination](https://audit.flowtrix.co/).




## 18. GitHub implementation handoff

Use this document as the source brief for implementing the SEOPune360 homepage in the existing repository. Before coding, inspect the repository structure, current framework, routing, design tokens, brand assets, integrations, and existing page behavior. Follow the project's established conventions and reuse its components and styles where practical; do not replace the stack or rewrite unrelated pages without a clear need.

### Recommended implementation order

1. **Repository and brand review:** identify the app entry point, existing routes/components, current SEOPune360 logo/assets, exact color tokens, typography, CTA destinations, and available audit/contact integrations. Record any missing content or services as explicit blockers/placeholders.
2. **Design foundation and shell:** define/reuse color and type tokens, responsive container/grid, buttons, focus styles, header, desktop mega-menus, mobile navigation drawer, and footer shell.
3. **Homepage sections:** implement hero/banner/showreel, client-logo trust area and directory, services, enterprise case-study selector, process timeline, Why Us comparison, and final CTA in the requested order.
4. **Website audit:** connect only to an existing or approved backend. If none is available, show a clearly marked sample/demo state and a working contact CTA. Do not fabricate live scan results or expose secrets in client code.
5. **Consent and legal UI:** implement the Cookie Settings panel and preference persistence in a way consistent with the project's privacy/consent setup. Include the requested legal links and keep physical addresses out of rendered page content.
6. **Polish and delivery:** review phone/tablet/desktop layouts, keyboard/focus states, reduced motion, loading/error/empty states, image/video performance, metadata, and all acceptance checklist items. Use the repository's existing lint/typecheck/build/test commands when appropriate and report what was run and any remaining gaps.

### Suggested component boundaries

Adapt these to the framework already in the repository; names are suggestions, not a requirement:

- `SiteHeader` and accessible `MegaMenu` / `MobileNav`.
- `HeroSection` with URL scan form and `Showreel`.
- `ClientLogoStrip`, `ClientDirectory`, and industry filter.
- `ServicesSection` and service disclosure cards.
- `CaseStudySelector` with an independently renderable active case-study panel.
- `ProcessTimeline`, `WhyUsComparison`, and `WebsiteAuditSection`.
- `FinalCTA`, `SiteFooter`, and `CookieSettings`.
- Structured content data for services, industries, clients, case studies, and process steps, separated from presentation where the project architecture supports it.

### Data and integration rules

- Reuse approved SEOPune360 client logos and verified case-study results already available in the repository or provided by the user. Do not invent client names, numbers, endorsements, or credentials.
- Keep booking URL, email/contact destination, legal URLs, social URLs, and any audit endpoint in the project's appropriate configuration/content layer. Do not hard-code secrets into browser code.
- Keep the audit flow honest: show real results only when the server integration returns them; otherwise label the visual clearly as a sample report.
- If a requested destination/internal page does not exist yet, link to a safe current route or use a clearly marked placeholder destination agreed by the project owner. Do not create detailed internal-page designs in this homepage task.
- Keep the user's required menu categories, no-address rule, omitted team/testimonial sections, and deferred FAQ as explicit review checks during implementation.

### Coding-agent task prompt

> Read `docs/website-build-specification.md` completely before changing code. Inspect the existing repository and identify the framework, current homepage, brand assets, styles/design tokens, routes, and integrations. Implement the homepage described there in the existing stack, keeping the SEOPune360 color scheme and identity while applying Flowtrix-inspired layout and interaction patterns. Build the header menus, responsive mobile navigation, hero/showreel, client trust area and filterable directory, service section, interactive case-study selector, process timeline, Why Us comparison, honest website-audit experience, CTA, footer, and cookie preferences. Do not add the Minds Behind the Work/team section, testimonials, FAQ/Q&A, or a physical address. Reuse approved content and assets; do not fabricate results. Keep internal pages out of scope. Make every interaction work with pointer, keyboard, and touch as applicable; respect reduced motion and responsive layouts. Follow existing repository conventions, keep changes focused, run the appropriate existing project checks, and summarize changed files, behavior, checks, and any missing inputs or backend dependencies.


