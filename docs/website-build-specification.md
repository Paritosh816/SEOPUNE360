# Homepage Build Specification and Recreation Prompt

**Reference reviewed:** [Flowtrix](https://www.flowtrix.co/) homepage, checked 26 October 2026. This document records the homepage scope and project context for later internal-page planning. It describes the visible structure and observed content, then turns it into an implementation brief for the user's own brand. Recreate the interaction patterns and quality, not Flowtrix's exact copy, marks, client assets, or proprietary media.

## 1. Project requirements

- Build a polished, responsive agency homepage inspired by Flowtrix's information architecture and interaction patterns, while keeping SEOPune360's existing website identity and color scheme.
- Brand reference: the existing [SEOPune360 website](https://seopune360.com/). Preserve its palette and recognizable brand elements while refreshing layouts and interactions.
- Primary audience: B2B, enterprise, SaaS, AI, fintech, hospitality, automotive, B2C, real estate, and healthcare prospects.
- Primary conversion actions: **Book a Call** and **Scan my website / Run free audit**.
- Header menus: **Website** (Design, Development, Growth); **Case Studies** (Case Studies, Portfolios); **Industries** (B2B, Hospitality, Fintech, Automobile, B2C, Real Estate, Healthcare); **Company** (About Us); and a prominent Book a Call button.
- Include a client-logo trust area, services, interactive enterprise case-study selector, process/timeline, Why Us comparison, website-audit feature, CTA, and footer.
- Omit the “Minds Behind the Work”/team section and all client testimonials. Do not add a Q&A/FAQ section yet.
- Footer must include Terms & Conditions, Privacy Policy, and Cookie Settings. Do not show a street address, office location, or map anywhere. A clickable email link is allowed.
- Internal pages are out of scope for this pass. Build links/routes so they can be filled in later without inventing their detailed content.

## 2. Reference homepage anatomy

The live homepage's crawlable content presents these elements, in this order or close to it:

1. Header with a Book a Call action.
2. Hero headline about making a website and brand ready for enterprise buyers, a website URL field, “Scan my website” action, a “Free / AI website audit / under 2 minutes” promise, and a short agency positioning paragraph.
3. Large visual/showreel area and brand-story sequence. Text moves through the product's story, sameness of AI-generated sites, the value of taste, enterprise buyer confidence, and clear differentiation. The crawl identifies a “Show Work 2026” showreel asset and video player.
4. Client trust logos and a “Trusted by companies across industries” section.
5. Long client/project directory with industry filtering, client descriptions, and outcome metrics; a Load More control appears.
6. “Our Services”: six numbered service groups—Website Development, Branding, UI/UX Design, Motion Videos, SEO and AEO, and CRO—with short capability lists.
7. “Our recent works with enterprises”: visual case-study cards and a selector/thumbnail strip. The page exposes multiple work items and Read case study links.
8. “How the work gets done”: a horizontal Start-to-Week-8 timeline with kickoff, strategy/moodboarding, full-scale design/style guide, refinement/development, testing/QA, launch/support.
9. “The minds behind the work” team content — **exclude**.
10. “Words from the teams we’ve worked with” testimonial carousel — **exclude**.
11. “Why Flowtrix and not another website agency?” comparison with six differentiators — preserve this section's purpose and adapt its copy to the user's brand.
12. Recent articles grid — optional, not requested as a must-have; reserve a slot only if the user has content and wants it.
13. Website Audit: sample score and category breakdown, a Run Free Audit link, and a second URL scan prompt.
14. Certifications/partner proof and ratings — optional supporting content; use only real, approved credentials.
15. FAQ/Q&A — **defer**.
16. Conversion CTA, then extensive multi-column footer, newsletter option, company links, email contact, legal links, and cookie preferences.

## 3. Visual direction and layout system

Use Flowtrix as a quality, layout, and motion benchmark while preserving SEOPune360's own visual identity. The existing SEOPune360 homepage uses a dark near-black/deep navy foundation, vivid turquoise/cyan accents, pale mint highlights, warm off-white headings, muted cool-gray body text, and dark charcoal/blue-gray surfaces. The logo and primary buttons use bright aqua/turquoise; retain those recognizable cues across the refresh. Flowtrix effects (transitions, hover states, reveal choreography, selector behavior) should sit on top of SEOPune360's established palette; do not import Flowtrix's colors or replace SEOPune360's theme. The reference reads as a modern, editorial agency site: oversized high-contrast typography, spacious sections, large project imagery, compact labels, and polished transitions. Match its hierarchy and pacing rather than copying its brand identity.

- Use a consistent max-width container, generous vertical section spacing, and a clear desktop grid. Keep text measure readable and align section headings, controls, and cards to a shared grid.
- Establish a type scale with a bold display face for the hero/section titles, a highly readable body face, and small uppercase/eyebrow labels. Use responsive `clamp()` sizing and avoid line breaks that create awkward orphan words.
- Preserve SEOPune360's palette: dark near-black/deep navy backgrounds; bright turquoise/cyan as the primary accent; pale mint as a supporting highlight; warm off-white for headlines; muted cool gray for body copy; and charcoal/blue-gray for panels, borders, and cards. Keep the logo and aqua CTA treatment recognizable.
- When implementing, inspect the existing site styles/assets and carry the exact current color tokens/hex values into reusable CSS variables; do not guess new hex values from this visual description. Apply the same tokens to every new section, menu, audit chart, focus state, and mobile layout. Maintain WCAG-readable contrast; use lighter/darker shades from the same palette for legible states rather than switching to Flowtrix colors.
- Use high-resolution project visuals with consistent aspect ratios, intentional crops, and defined fallback images. Avoid loading large full-resolution video on mobile by default.
- Keep logo assets crisp and correctly proportioned. Do not recolor client logos unless the brand rules permit it.
- Use restrained shadows, borders, and radii. Prefer clear layout and imagery over decorative effects that compete with content.
- Give every interactive control a designed hover, focus, active, and selected state. Use a short brand-color underline/reveal for nav links; let menu panels fade/slide into place and remain open while the pointer moves into them; make buttons brighten and lift slightly with a small arrow shift; give clickable project imagery a restrained zoom/overlay; and show visible selection colors on filters, service rows, and timeline phases. Use only SEOPune360 color tokens. Match hover with keyboard focus and touch selection, and never make essential information hover-only.

## 4. Header and navigation behavior

### Desktop

- Keep the header visible at the top; use a compact sticky state after scrolling if appropriate. Logo at left, primary nav centered or grouped, Book a Call button on the right.
- Website, Case Studies, Industries, and Company trigger accessible mega-menus on pointer hover and keyboard activation. Menus must remain open while pointer moves from trigger into panel; close on Escape, outside click, or focus leaving the menu region.
- Website mega-menu has three clearly separated groups: Design, Development, Growth. Each group can contain a concise descriptor and links, but detailed internal pages are future scope.
- Case Studies menu has Case Studies and Portfolios.
- Industries menu lists B2B, Hospitality, Fintech, Automobile, B2C, Real Estate, Healthcare.
- Company menu links to About Us. Use the requested Company label, with About Us as its destination.
- Book a Call is a high-contrast button that points to the user's scheduling URL or contact flow; use a configurable destination.

### Mobile/tablet

- Replace hover menus with a menu button and full-screen or full-height drawer. Use tap-to-expand accordions for each menu group.
- Keep Book a Call visible in the drawer and, if the layout allows, as a compact header CTA.
- Provide large touch targets, prevent background scroll while the drawer is open, close after navigation, and restore focus to the menu button.
- Ensure menu content fits narrow screens, scrolls independently, and never clips behind the browser viewport or safe areas.

## 5. Hero, banners, and video/showreel

### Screenshot-led hero composition

Recreate the composition and texture of the supplied Flowtrix hero screenshot while retaining SEOPune360's colors and brand content:

- Use a full-width, deep navy/near-black hero stage with a thin, quiet top divider and a spacious two-column composition. On wide desktop, the left content column occupies roughly half the canvas; a large abstract glow and the client-showcase media occupy the right side.
- At the top of the left stack, show a compact proof badge. Use SEOPune360's real proof points only after confirming they remain approved. Do not copy the Clutch mark, star rating, or Flowtrix wording unless SEOPune360 has a verified equivalent.
- Set a very large, bold, 2–3 line headline in warm off-white. Highlight only the key phrase or final line using SEOPune360's turquoise/cyan/mint accent treatment. Keep the original SEOPune360 message and voice.
- Place the website URL field and audit CTA in one row on desktop. Use a subdued outlined dark field and a high-contrast SEOPune360 aqua button; add a short free-audit reassurance line below. Keep the supporting brand description below that.
- Behind the right media, create the texture seen in the reference: an oversized cropped circular/orbital form, soft luminous rim, blurred radial bloom, subtle grain, and wide horizontal aurora-like ribbons near the bottom. Rebuild these shapes with SEOPune360 palette tokens (teal/turquoise, mint, deep navy); do not use Flowtrix's lime/green hue values or copy its logo/graphic asset. Layer texture behind text/media and preserve text contrast.
- Float a 16:9 client-showcase video card over the lower-right part of the banner, with a restrained rounded border, fine brand-color glow, dark poster overlay, centered play button, and deliberate overlap across the horizontal glow band.
- Keep decorative orb/ribbon layers behind content with `pointer-events: none`; no texture layer may block the form, video controls, links, or keyboard focus.

### Video behavior

Use the user-provided [Flowtrix showreel video](https://media.flowtrix.co/flowtrix/showreel-preview-1080-zdsiwbn4.mp4) as a reference for framing, pacing, and client-showcase presentation. Build the SEOPune360 version from approved client logos, website captures, and project footage; treat the Flowtrix clip as a reference, not as SEOPune360's own client reel. Store the final SEOPune360 media URL in a configurable content field such as `clientShowreelSrc` and provide an authored poster image.

- Show a poster and centered play button before playback. Start video only after the visitor activates play; never autoplay audio.
- Provide accessible play/pause, mute, seek, captions when available, Escape/close behavior in a lightbox, and keyboard-operable controls. Do not invent captions or audio descriptions.
- On mobile use `playsinline`, a lightweight poster, and a full-width 16:9 card beneath the hero copy. Avoid loading the full video before the visitor plays it; offer a clear fallback if playback fails.

### Form and motion

- Use a configurable website placeholder such as `www.yourwebsite.com`. Validate the URL, normalize an omitted scheme before submission, show inline errors/loading/success/failure states, and do not imply a real scan if no audit backend is connected.
- Animate headline and supporting UI in with a short, restrained stagger. Use a brief opacity/mask reveal for the abstract banner texture and a clean poster-to-video transition. Keep transitions around 300–700 ms, avoid forced auto-advancing copy, and honor `prefers-reduced-motion`.
- At tablet widths, stack or overlap the media beneath the left copy without squeezing the form. On phones, use one column, preserve heading and CTA order, keep the video card within the viewport, and simplify the orb/ribbon textures.
- Preload only critical fonts and the video poster. Lazy-load the actual video and all noncritical media.

## 6. Client and industry selector (screenshot-specific)

Build the “Trusted by companies across industries” section like the supplied screenshot's structure and interaction, using SEOPune360's own palette and approved client list.

- Center a large, high-contrast heading above a two-part content area. On desktop, place a vertical stack of category buttons on the left and a three-column client grid on the right.
- Include the requested categories B2B, Hospitality, Fintech, Automobile, B2C, Real Estate, and Healthcare. Only show categories that have approved portfolio entries; do not imply a client exists in an unsupported category.
- Each category control is a wide, rounded rectangular row. The active category uses a deep brand panel or aqua/mint fill with readable text and a thin animated turquoise progress/selection bar along its lower edge. Inactive controls use a quieter charcoal/blue-gray surface and shift to a subtle brighter border/background on hover and keyboard focus. Preserve original client-logo colors.
- Each client tile uses the client's real logo near its top, a concise factual description lower down, and a fine horizontal divider. Keep card geometry aligned across each row even when descriptions differ in length. Use approved logo files and alt text; never invent a metric where none is supplied.
- Clicking or keyboard-selecting a category updates the active color state and replaces the visible client grid in place. Animate the grid as a coordinated transition: old logos/descriptions fade and move up slightly; new tiles fade in with a small upward reveal and light stagger. Keep geometry fixed and images dimensioned to prevent layout jumps. Preload the next category's logos where reasonable.
- The selected category remains selected after pointer exit; do not make the interaction hover-only. Hover previews may activate on desktop, but click/tap is the persistent selection and keyboard users get the same state. Support arrow keys/Home/End if implemented as tabs, announce category/result count, and expose `aria-selected`/`aria-controls` correctly.
- On mobile, place category controls in a horizontally scrollable chip row or compact select above a one-column client list. Keep touch targets large and do not require hover.
- Provide an empty state or hide unsupported categories. A slow logo marquee may appear in a separate trust strip, but don't continuously animate the selector's client cards.

## 7. Interactive services showcase (screenshot-specific)

Do not render this section as a generic static six-card grid. Match the supplied Flowtrix Services screenshot's editorial structure: dark heading block, one large active horizontal service banner, and a vertical sequence of oversized inactive service titles below it. Keep SEOPune360's brand palette and actual service offering.

Use these six service entries, adapted from the current SEOPune360 website: **SEO Services**, **GEO Optimization**, **Lead Generation**, **Total Business Growth**, **Website Design**, and **Development**. Each entry needs a concise, accurate benefit line and 2–4 capability chips drawn from SEOPune360's real offer. Do not add branding or motion-video services unless SEOPune360 confirms it offers them.

### Desktop behavior and layout

- Begin with a large “Our Services” heading and a short sentence about the connected growth offer on a dark navy/near-black surface.
- Show one selected service at a time in a wide, shallow banner spanning the content width. Place a project/analytics visual on the left, a large service title in the center, and 2–4 rounded capability pills on the right. Use a soft textured radial/aurora backdrop with image-specific artwork; texture and motion follow §5 but use SEOPune360 color tokens.
- Below the active banner, show the remaining services as numbered rows with large type and generous spacing. The next title is visibly distinct and invites selection; preserve the screenshot's transition from compact active banner to oversized inactive rows.
- The first service may be active on entry. Hovering an inactive row previews/activates its matching banner, and click or keyboard selection makes that service persistently active. Do not require pointer hover. Use `:focus-visible` as an equivalent interaction.
- When selection changes, crossfade outgoing image and text; move the new image in subtly from the side with a brief mask/clip reveal, while title and capability pills rise/fade into place. Keep banner frame and height stable; use a restrained 450–650 ms transition and avoid abrupt full-section jumps. Preload adjacent service images. Respect reduced motion.
- Hover/focus on service rows and pills should show clear brand-colored feedback. Keep service selection and navigation as separate actions so previewing doesn't accidentally leave the homepage.

### Mobile behavior

- Replace the desktop horizontal banner/vertical title interaction with stacked, tap-to-expand service rows. Expanding a row reveals its service image, title, capability pills, short copy, and link.
- Ensure text, image, and chips reflow without horizontal scrolling. Touch, keyboard, and screen-reader interaction must match desktop behavior.

## 8. Interactive enterprise case-study selector

- Build an accessible tablist or button selector for case studies. Each selector includes a client/project label and optional logo/thumb. Selecting one updates the main case-study panel in place: image/video, client/context, concise challenge/approach/result narrative, verified metrics, and “Read case study” link.
- The active item must have a clear visual indicator and semantic selected state. Support keyboard arrow navigation if using ARIA tabs, Home/End, and focus management. On mobile the selector becomes a horizontally scrollable, keyboard/touch-friendly strip or a labeled native select.
- Animate panel changes with a short opacity/transform transition; respect reduced motion. Avoid layout jumps by stabilizing the media frame and text region.
- Ensure deep-linkable case-study routes can be added later. The homepage selector must still work without navigating away.
- Use only supplied case studies and substantiated results. Placeholder content must be labeled during development and replaced before launch.

## 9. “How the work gets done” timeline (screenshot-specific)

Use the supplied screenshot's schedule-board composition instead of a plain list of steps. On desktop, build a dark, bordered timeline canvas with a horizontal ruler labeled Start and Week 2 through Week 8, thin dotted vertical week guides, and staggered phase bars at different vertical positions. Bars overlap in time to show that real phases can run in parallel.

Each phase bar includes a small phase/status label, a week-range tag, an icon tile, and a clear title. Include the actual SEOPune360 process stages and timing after the project owner confirms them; the reference timeline shows kickoff, design strategy/moodboarding, full-scale design/style guide, refinement/development, testing/QA, and launch/support, with ranges around weeks 1–8. Do not promise Flowtrix's timeline as SEOPune360's guaranteed schedule. If no schedule is supplied, label dates as indicative.

Use a cohesive sequence of SEOPune360 palette tints—turquoise, cyan, mint, and deeper teal—rather than copying Flowtrix's orange, lime, purple, and multicolor phase hues. Active hover/focus may brighten a bar's border/glow and slightly raise it; clicking a phase can reveal a concise deliverable note. Keep stage text readable and do not communicate status by color alone. Animate progress emphasis gently on scroll, not as a distracting moving timeline.

On mobile, convert the week grid into a vertical timeline with week labels, connected markers, and compact phase cards. Keep overlapping timing understandable through explicit week ranges; don't shrink the desktop grid until text becomes unreadable. The content must remain understandable with motion disabled.

## 10. Why Us comparison

Include a two-column comparison or a series of paired rows: user's agency approach versus a generic alternative. The reference's six themes are a useful content framework:

- Strategic foundation.
- Design with taste and clarity.
- One connected team.
- Complex B2B/industry expertise.
- Clear ownership from kickoff to launch.
- A site built to evolve after launch.

Use non-aggressive, evidence-based language. The visual should make comparison easy to scan, with a distinct highlighted column, simple iconography, and stacked rows on mobile. Do not copy Flowtrix's exact prose or make unsubstantiated superiority claims.

## 11. Website Audit feature (priority feature)

The live reference promotes an AI website audit from the hero and includes a dedicated audit presentation. The visible sample is titled “Website Audit,” promises a clear roadmap by category, shows a score of 40 (Sternify Score) and labels categories such as Positioning (40 / High), Target Audience (70 / Moderate), Website Structure (40 / High), and Social Proof (80 / Low Impact), then offers “Run Free Audit” and a URL scan form. Its separate audit destination describes a buyer-and-search-crawler review, a roughly one-minute result, and nine categories: Positioning, Differentiation, Target Audience, Website Structure, Social Proof, Brand Consistency, Conversion Paths, SEO and AEO, and Metadata and Technical. Treat these as reference patterns; do not reuse Flowtrix or Sternify branding, score data, or claim an AI engine exists unless implemented.

### Recommended experience

1. Entry points: hero URL scan and dedicated audit section CTA.
2. Input: website URL, with validation, consent/privacy note, submit button, and clear statement of what is analyzed and how long it takes. Avoid asking for unnecessary personal information.
3. Progress: visible step/status treatment with a cancel/retry path; never fake a completed scan.
4. Results: overall score plus category cards, e.g. Positioning, Differentiation, Target Audience, Website Structure, Social Proof, Brand Consistency, Conversion Paths, SEO and AEO, Metadata and Technical. Add accessibility and performance checks when the audit actually measures them. Each card shows score/severity, a short explanation, and actionable recommendation.
5. Roadmap: prioritized quick wins and deeper recommendations; distinguish automated observations from expert review and make limitations clear.
6. Next action: download/share report if supported and Book a Call CTA. A retry/new URL action should be available.
7. Failure states: invalid URL, unreachable site, blocked scan, timeout, rate limit, service unavailable. Explain the issue and allow retry without losing the entered URL.

### Implementation and trust requirements

- Connect the form to a real audit API/backend before presenting live analysis. Keep API keys server-side. Rate-limit and validate requests; protect against SSRF by restricting protocols, blocking private/local network destinations, and safely handling redirects. Do not fetch arbitrary URLs from the browser or expose infrastructure details.
- If no backend exists, provide a clearly labeled sample/demo report and a waitlist/contact action. Never fabricate a user's audit results.
- Show privacy and retention details beside the submit action. Do not store submitted domains longer than required without a clear policy.
- Make charts/cards understandable without color alone; use text labels, contrast, and accessible progress semantics.

## 12. CTA, Flowtrix-style footer functionality, and cookie settings

### Final CTA

Place a strong conversion band immediately before the footer, with a large headline, concise audit/growth promise, primary Book a Call or free-audit CTA, and secondary Case Studies link. Use SEOPune360's typography, colors, and imagery. All destinations must be configured and functional.

### Footer layout and interactions

Match the breadth and working behavior of Flowtrix's footer while adapting it to SEOPune360 and the no-address requirement:

- Start with the SEOPune360 logo, one short brand statement, and a prominent contact/audit action.
- Use clear multi-column link groups for Services, Case Studies/Portfolio, Industries, Resources, and Company. Populate them with actual site sections and requested navigation categories. Preserve Website menu groups (Design, Development, Growth), Case Studies/Portfolios, requested industries, and Company/About Us destination where appropriate.
- Include a Clients group with selected approved client links/logos only if those destinations exist. Add partner/technology or rating badges only when SEOPune360 has current, approved credentials. Do not copy Flowtrix products, partner badges, review claims, or client links.
- Add a newsletter signup only if a real mailing-list destination is configured. It needs email validation, consent language, submit/loading/success/error states, and protection from repeat submission. If there is no integration, omit the live-looking form rather than leaving a dead button.
- Add a contact area with a clickable `mailto:` link if desired. **Never render a physical address, office location, map, or location pin/address block anywhere.**
- Footer bottom row contains copyright, Terms & Conditions, Privacy Policy, and Cookie Settings. Every link must route to a real page or an explicitly configured future destination; no `href="#"` placeholders for controls presented as working links.
- Optional dynamic time-zone clocks or “Ask AI”/social links may be included only if they provide real behavior and fit the SEOPune360 site; they are not required for this phase.

### Cookie Settings behavior

- Clicking Cookie Settings opens an accessible modal/panel with a clear title, close control, short explanation, and categories: Necessary (always on/disabled), Analytics, Marketing, and Functional. Include a concise description for each category.
- Provide Save Preferences and, when supported by the actual consent implementation, Accept all and Reject optional controls. Save and persist choices using the project's consent mechanism; allow reopening the panel from the footer. Optional scripts must wait for consent.
- Show focus trap, Escape close, focus return, visible toggles, and readable saved/updated confirmation. Do not pretend to manage categories whose scripts are not used.

## 13. Responsive, accessibility, SEO, and performance requirements

- Design and verify at 320px, 375px, 768px, 1024px, and wide desktop widths. Prevent horizontal overflow. Reflow grids, menus, timeline, audit panel, and project selector intentionally.
- Use semantic landmarks, one H1, nested headings, meaningful alt text, labels/instructions for inputs, visible focus, keyboard navigation, and accessible names for icon buttons.
- Support reduced motion, sufficient contrast, minimum touch target sizing, and screen-reader status announcements for form/audit/filter updates.
- Use responsive image sources, modern formats, explicit dimensions, lazy loading below fold, and optimized video. Avoid layout shift and large blocking scripts.
- Add page title/description, canonical URL, Open Graph metadata, social preview image, sitemap/robots configuration, and structured data only where accurate.
- Use stable client-side state for filters, selectors, menu accordions, and cookie preferences. Ensure progressive enhancement and useful fallback content.

## 14. Content and asset checklist

Before implementation, gather: brand logo and color/type guidelines; hero headline and positioning copy; approved showreel/poster; client logos with use permissions; case-study images and verified metrics; service descriptions; process timing and deliverables; Why Us proof points; audit backend/API details and privacy policy; booking URL; contact email; legal policy URLs; social links; approved partner credentials; and footer copyright entity. Use neutral placeholders for missing data and flag them for replacement.

## 15. Acceptance checklist

- [ ] Desktop mega-menus open by hover, click, and keyboard; mobile drawer/accordions work by touch and keyboard.
- [ ] Book a Call is obvious in header and final CTA.
- [ ] Hero URL form validates and reports real processing/error states.
- [ ] Showreel has poster/fallback and accessible controls; no forced audio.
- [ ] Logo strip works without motion and does not shift layout.
- [ ] Client filter and Load More work and preserve selection.
- [ ] The active-service banner updates its image/title/capability pills on hover, focus, click, and touch, with a stable frame and reduced-motion behavior.
- [ ] Case-study selector updates all panel content without a page reload and is keyboard accessible.
- [ ] Process timeline is clear on desktop and mobile.
- [ ] Why Us section is present with adapted content.
- [ ] Website Audit preview and live/demo state are clearly distinguished; no fabricated results.
- [ ] Team/Minds Behind the Work and testimonials are absent.
- [ ] FAQ/Q&A is absent for this phase.
- [ ] Footer legal links and Cookie Settings are present; no physical address appears.
- [ ] Responsive layout has no clipped content or horizontal scrolling at target widths.
- [ ] Reduced-motion, keyboard, screen-reader labels, privacy/consent, and performance behaviors are addressed.

## 16. Detailed recreation prompt

> Build a complete, responsive homepage for SEOPune360 using Flowtrix's public homepage as a reference for information architecture, editorial pacing, interaction quality, and conversion patterns. Preserve the existing SEOPune360 website color scheme and recognizable brand identity from https://seopune360.com/. The current palette is dark near-black/deep navy, vivid turquoise/cyan, pale mint, warm off-white, muted cool gray, and charcoal/blue-gray. Inspect the existing site CSS/assets and reuse its exact color tokens/hex values rather than guessing. Apply Flowtrix-inspired motion and interaction behavior using SEOPune360's palette; do not import Flowtrix's colors or brand identity. Do not copy Flowtrix's exact wording, logo, proprietary visuals, client marks, or testimonials. Use my brand assets and content; where missing, add clearly marked replaceable placeholders.
>
> Create a polished agency site with a persistent responsive header. Navigation must include Website with Design, Development, and Growth groups; Case Studies with Case Studies and Portfolios; Industries with B2B, Hospitality, Fintech, Automobile, B2C, Real Estate, and Healthcare; Company linking to About Us; and a prominent Book a Call button. Desktop dropdowns must support hover, click, keyboard, Escape, and focus handling. On mobile, use an accessible drawer with tap-to-expand groups and large touch targets.
>
> Build the hero to match the supplied reference composition: dark two-column stage, compact proof badge, oversized off-white headline with a SEOPune360 aqua-highlighted key phrase, URL scan row, audit reassurance, and supporting copy on the left. On the right, layer a huge cropped circular glow/orb, soft grain, and horizontal aurora ribbons behind a floating 16:9 client-showcase video card. Match the texture and composition, not Flowtrix colors. Use the supplied Flowtrix showreel URL only as a framing/pacing reference; build the actual SEOPune360 reel from approved client assets. Keep it poster-first, user-initiated, accessible, and mobile-friendly.
>
> Follow with the screenshot-style client directory: centered heading, vertical category selector on the left, and a three-column grid of approved client logos and factual descriptions on the right. Clicking a category must visibly change the active color/progress line and crossfade/stagger the grid in place. Use SEOPune360 colors, keep client logo colors intact, and make it work by click, keyboard, and touch. Build the services showcase as a dark intro followed by a broad active-service banner (image left, large title center, capability pills right) and oversized numbered inactive service rows. Hover/focus/click changes the active service image, title, and pills with a stable-height crossfade/masked reveal. Use SEOPune360's real services: SEO, GEO, lead generation, business growth, website design, and development.
>
> Add an interactive case-study selector that updates the approved visual, project description, challenge/approach/results, verified metrics, and case-study link in place. Then build the screenshot-style process timeline: a dark week-grid canvas with Start and Week 2–8 ruler, dotted vertical guides, staggered overlapping phase bars, labels, week-range tags, icon tiles, and titles. Use actual SEOPune360 process/timing or label estimates indicative. Recolor interactions using only SEOPune360 teal/cyan/mint shades; active hover/focus gets a clear glow/border. Convert it into readable stacked timeline cards on mobile.
>
> Include a Why Us comparison section covering strategic foundation, clear distinctive design, one connected team, relevant industry expertise, clear ownership, and continued evolution after launch. Write original, factual copy. Include the priority Website Audit feature: a URL entry point, a clear progress/result state, an overall score and category breakdown, prioritized recommendations, and a next-step CTA. Connect a real secure audit backend; if no backend is available, label the report as a demo and never pretend a real domain was scanned. Include validation, failure/retry states, privacy language, rate limiting, and safe server-side URL handling.
>
> Finish with a strong CTA and a functional multi-column footer like Flowtrix's: brand block, working link groups for Services, Case Studies/Portfolio, Industries, Resources, and Company, optional approved client/partner links, and a real newsletter form only if an integration exists. Add Terms & Conditions, Privacy Policy, and Cookie Settings. Cookie Settings opens an accessible panel with Necessary locked on and optional Analytics/Marketing/Functional toggles; save preferences and do not load optional trackers before consent. A clickable email link is allowed. Never show a physical address or office location.
>
> Do not include the Minds Behind the Work/team section, do not include client testimonials, and do not include a Q&A/FAQ section in this phase. Keep internal pages out of scope while structuring navigation and content so those pages can be built later.
>
> Implement responsive layouts for narrow phones through wide desktops, semantic HTML, keyboard access, visible focus, screen-reader announcements, reduced-motion support, optimized images/video, stable layout dimensions, and appropriate SEO/social metadata. Use authentic, approved assets and verified client/results data. Provide polished loading, empty, validation, and error states for every interactive feature.

## 19. Screenshot-based gap analysis and visual behavior requirements

The attached references clarify which details were missing from the earlier, more general brief. These are distinct interaction patterns and must not be reduced to generic cards or decorative hover animations.

The four distinct screenshots are included beside this README for GitHub review: [hero banner](flowtrix-reference/hero-banner.png), [client/industry selector](flowtrix-reference/client-industry-selector.png), [services showcase](flowtrix-reference/services-showcase.png), and [process timeline](flowtrix-reference/process-timeline.png). Upload the `flowtrix-reference` folder with the README so these relative links continue to work.

### A. Hero/banner texture and client-showcase video

The hero reference is a dark full-bleed stage with proof, headline, URL scan action, reassurance, and description on the left. A giant cropped orb occupies the upper-right area; an illuminated horizontal haze runs behind the lower portion; a floating video preview overlaps that haze. The visual identity comes from the orb/rim-light/ribbon texture and media placement. For SEOPune360, retain the existing dark navy foundation and use aqua/turquoise/mint light, rather than copying Flowtrix's lime/green hue. The reel should use SEOPune360 client footage and logos, with a custom poster and accessible play state.

The user-provided video URL is [Flowtrix's showreel preview](https://media.flowtrix.co/flowtrix/showreel-preview-1080-zdsiwbn4.mp4). Use it as framing and pacing inspiration. Configure the actual SEOPune360 client reel independently.

### B. Clickable industry/client directory

The screenshot shows a centered heading, a left vertical filter stack, and a right three-column client grid. Each grid item aligns a client logo at the top and its short explanation lower down, with a thin divider. A selected filter has a dark/accent treatment and short progress indicator at its base; inactive filters have a quiet surface. For SEOPune360, translate those states into the current dark navy/turquoise/mint palette. A category click must replace the visible logos and descriptions, not only recolor the filter. The grid changes with a coordinated fade/short upward reveal and no layout shift. On mobile, filters become a horizontal chips row/select and client items stack.

### C. Services changing-image showcase

The reference uses a dark “Our Services” heading block; a wide active banner containing an image at left, a large service title in the middle, and pill-shaped capabilities at right; then oversized inactive service labels below. The active banner has a soft, abstract, bright textured backdrop. Each selection must use an image relevant to that particular service. Hover/focus previews and click/tap selects the service; image and copy transition together, with reserved image space and stable banner dimensions. Use a SEOPune360 aqua/teal glow rather than the reference's green hue. Do not replace this with a static grid.

### D. Staggered process timeline

The screenshot shows a week ruler across the top, dotted vertical grid lines, and phase cards distributed diagonally across separate lanes. Each card's horizontal length implies its duration; colored tags identify its stage and week range; an icon tile and phase name sit inside. Use this Gantt-like composition on desktop, with phase tints derived from SEOPune360's turquoise/cyan/mint palette. Show real overlaps and clear week ranges. On mobile, use a vertical milestone timeline.

### E. Footer functionality

The target is a working footer system, not just a similar visual block: strong pre-footer CTA; multi-column real navigation; optional newsletter signup with real submission states; approved proof/partner links; contact by clickable email; legal links; and a Cookie Settings panel that saves preferences and gates optional scripts. Remove Flowtrix office addresses and never add a physical address for SEOPune360. Do not show controls or forms that have no destination/backend.

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


