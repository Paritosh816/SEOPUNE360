# SEOPune360 Website

A responsive React and Vite homepage for SEOPune360. The visual direction keeps the site's deep navy, aqua, mint, and cyan palette while using Flowtrix-inspired motion, hover states, content transitions, and layout patterns.

## Open this project in VS Code

1. Open **Visual Studio Code**.
2. Choose **File → Open Folder…**.
3. Open this exact folder:

   `C:\Users\maith\Documents\Codex\2026-10-26\referenced-chatgpt-conversation-this-is-an\outputs\SEOPune360-Website`

4. If VS Code asks whether you trust the folder, choose **Yes, I trust the authors**.
5. Choose **Terminal → New Terminal**.
6. Run `npm install` once, then run `npm run dev` and open the local web address Vite prints in the terminal (usually `http://localhost:5173`).

Open the **SEOPune360-Website folder itself**, not the `outputs` folder and not an individual file.

If VS Code says `npm` is not recognized, install Node.js LTS, restart VS Code, and run `npm run dev` again. If the dependencies are missing, run `npm install` once before `npm run dev`.

## Build for deployment

Run `npm run build`. The production-ready site is written to `dist/`. The `dist/` and `node_modules/` folders are excluded from Git by `.gitignore`.

## Publish with GitHub Pages

The included `.github/workflows/pages.yml` builds the site and publishes it to GitHub Pages whenever changes reach the `main` branch. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source. The workflow uses Node.js 22 and the lockfile for repeatable installs.

The intended custom domain is `seopune360.com`. GitHub Pages must be configured with that domain in **Settings → Pages**. Then update the domain's DNS records at its DNS provider: set the apex A records to GitHub Pages' current IP addresses and set `www` as a CNAME to the account's GitHub Pages hostname. DNS updates replace the domain's current website destination and may take time to propagate. Follow the current [GitHub custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) for exact values and HTTPS setup.

## What is implemented

- Responsive navigation with working desktop hover/click menus and a mobile accordion menu.
- Website menu groups for **Design**, **Development**, and **Growth**.
- Case Studies and Portfolios links, Company/About Us links, and a Book a Call email action.
- The seven requested industry filters; selecting one updates the client names and descriptions.
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
- `public/` — favicon and media assets
- `docs/` — build specification, implementation prompt, and reference screenshots

