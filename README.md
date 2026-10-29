# SEOPune360 Website

A responsive React and Vite website for SEOPune360. Its independent service, client story, portfolio, product/platform, industry, company, and contact pages keep the site's deep navy and aqua identity while using Flowtrix as a reference for navigation, hover states, and editorial page structure.

## Open this project in Codex

This repository is synced in the Codex workspace. To preview it in Codex, open a terminal for this project and run:

```sh
npm ci
npm run dev -- --host 0.0.0.0
```

Open the local address Vite prints. The project uses `src/App.jsx`, `src/style.css`, and the Vite setup in `vite.config.js`.

## Build for deployment

Run `npm run build`. The production-ready site is written to `dist/`. The `dist/` and `node_modules/` folders are excluded from Git by `.gitignore`.

## Publish with GitHub Pages

The included `.github/workflows/pages.yml` builds the site and publishes it to GitHub Pages whenever changes reach the `main` branch. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source. The workflow uses Node.js 22 and the lockfile for repeatable installs.

The intended custom domain is `seopune360.com`. GitHub Pages must be configured with that domain in **Settings → Pages**. Then update the domain's DNS records at its DNS provider: set the apex A records to GitHub Pages' current IP addresses and set `www` as a CNAME to the account's GitHub Pages hostname. DNS updates replace the domain's current website destination and may take time to propagate. Follow the current [GitHub custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for exact values and HTTPS setup.

## What is implemented

- Responsive navigation with working desktop hover/click menus and a mobile accordion menu.
- Independent pages for six services, case studies and individual client stories, client portfolio, products/platform journeys, seven industries, company, process, and contact.
- Wide desktop hover menus and a linked mobile accordion for Services, Work, Industries, and Company.
- Each industry page uses existing client portfolio content; no case study is invented for sectors without published client work.
- The Products & Platforms page presents current client work and is clearly identified as a portfolio showcase, not a separate SEOPune360 product catalogue.
- The homepage retains the industry filter, service showcase, case-study selector, timeline, about section, and website-audit request.
- Animated service showcase with hover, focus, and click selection.
- Interactive client case-study selector with matching project details.
- Responsive eight-week project timeline.
- Why SEOPune360 section.
- Website-audit request section with a branded report preview.
- Footer navigation, Terms & Conditions and Privacy Policy dialogs, and saved Cookie Settings.
- Keyboard focus styles, Escape-to-close dialogs/menus, reduced-motion support, and mobile layouts.

## Add your showreel video

The hero player is ready for an SEOPune360 video. Add your approved MP4 at:

`public/media/seopune360-client-showreel.mp4`

The Flowtrix video was used as a motion reference and is not embedded as SEOPune360 client footage.

## Before publishing

- Replace the text-based client wordmarks with approved client logo files when available.
- Add the approved Terms & Conditions and Privacy Policy copy. The current dialogs identify that those texts still need to be supplied.
- Connect the website-audit request to a real audit workflow if you want automated scans. The current form prepares an email request and does not claim to run a scan or invent an audit score.
- Confirm the contact email in `src/App.jsx` (`CONTACT_EMAIL`).
- Add the real showreel MP4 described above.

No physical address, testimonials, team section, or Q&A section is included.

## Project files

- `src/App.jsx` — page sections, content, and interactive behavior
- `src/style.css` — colors, layout, responsive states, and effects
- `vite.config.js` — independent static HTML entry paths and page metadata for GitHub Pages
- `public/` — favicon and media assets
- `docs/` — build specification, implementation prompt, and reference screenshots


