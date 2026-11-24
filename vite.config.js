import { automotiveProjects } from './src/automotiveProjects.js';
import { showcaseDealerships, showcasePath } from './src/automotiveShowcase.js';
import { homeSchema, siteUrl } from './src/home-readiness.js';
import { createServer, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createElement } from 'react';
import { renderToReadableStream, renderToString } from 'react-dom/server';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const routes = [
  ['/services/', 'Digital Growth Services', 'Explore SEO, AI search, lead generation, business branding, and website development from SEOPune360.'],
  ['/services/seo/', 'SEO Services', 'Build lasting search visibility and connect organic SEO with a wider growth marketing plan.'],
  ['/services/geo/', 'AI Search & GEO', 'Make your expertise easier to discover across search engines and AI answer experiences.'],
  ['/services/lead-generation/', 'Lead Generation', 'Connect Google Ads and Meta Ads with landing pages and conversion paths to help turn attention into enquiries.'],
  ['/services/business-branding/', 'Business Branding', 'Build a distinctive brand identity and consistent messaging that helps your business stand out and earn trust.'],
  ['/services/website-development/', 'Website Development', 'Build a fast, accessible website ready to support business growth.'],
  ['/services/business-growth/', 'Business Growth', 'Connect search, content, and website improvements into a focused growth plan.'],
  ['/case-studies/', 'Client Case Studies', 'Read SEOPune360 client stories, marketing channel mixes, and reported outcomes where available.'],
  ['/case-studies/ananya-rishtey/', 'Ananya Rishtey Website Development', 'Explore a matrimony website with visual storytelling, animated product previews, and vendor registration pages.'],
  ['/case-studies/intellidant/', 'IntelliDant Website Development', 'Explore a dental software website with product presentation, plan comparisons, and clinic registration pages.'],
  ['/case-studies/adi-dev/', 'A.D.I DEV Website Development', 'Explore an Australian B2B construction support website with service, enquiry, and careers journeys.'],
  ['/case-studies/kj-group/', 'KJ Group Branding', 'Browse the KJ Group visual identity project, including logo variations and examples of the brand in use.'],
  ['/case-studies/shaw-tata/', 'Shaw Tata Lead Generation', 'See how SEOPune360 used paid campaigns to support vehicle discovery and enquiries for Shaw Tata.'],
  ['/case-studies/shaw-toyota/', 'Shaw Toyota Lead Generation', 'Explore the paid advertising campaign for Shaw Toyota, designed to reach prospective buyers and encourage dealership enquiries.'],
  ['/case-studies/krishna-clinic/', 'Krishna Classical Homoeopathy Clinic', 'Explore the website, social media and growth marketing work for Krishna Classical Homoeopathy Clinic.'],
  ['/case-studies/hotel-shivtara/', 'Hotel Shivtara Website Development', 'See the website work for Hotel Shivtara in Jejuri, with hotel information for guests planning their stay.'],
  ['/case-studies/era-infratech/', 'ERA Infratech Branding', 'See the ERA Infratech branding project, from logo variations to stationery and brand mockups.'],
  ['/case-studies/fpt/', 'FPT Powertrain Technologies Branding', 'View brand guidelines and campaign artwork prepared for the India office of FPT Powertrain Technologies.'],
  ['/case-studies/koriv-studio/', 'Koriv Studio Logo Design', 'Explore Koriv Studio’s logo design through identity artwork and branded mockups.'],
  ...automotiveProjects.filter(({ id }) => id !== 'shaw-toyota' && id !== 'shaw-tata')
    .map(({ id, name, description }) => [`/case-studies/${id}/`, `${name} client story`, description]),
  ['/case-studies/lusso-marco/', 'Lusso Marco Growth Marketing Case Study', 'Explore growth marketing and digital campaign work for Lusso Marco.'],
  ['/case-studies/freshia/', 'Freshia Branding', 'Branding artwork for Freshia, presented across three supplied design boards.'],
  ['/case-studies/gaurav-vishwasrao/', 'Gaurav Vishwasrao Branding', 'Logo and branding artwork for Gaurav Vishwasrao Architects, shown across three supplied design boards.'],
  ['/case-studies/jijai-milk/', 'Jijai Milk Branding', 'Branding and packaging artwork for Jijai Milk, presented across two supplied pack designs.'],
  ['/portfolio/', 'Client Portfolio', 'Browse businesses represented in the current SEOPune360 client portfolio.'],
  ['/products/', 'Products & Platforms', 'Explore client products and platform journeys represented in SEOPune360 published work.'],
  ['/industries/', 'Industries', 'Explore the industries represented in the current SEOPune360 client portfolio.'],
  ...['matrimonial', 'healthcare', 'real-estate', 'hospitality', 'automobile', 'manufacturing-industry', 'infratech', 'd2c-lifestyle'].map((slug) => [`/industries/${slug}/`, `${slug.replaceAll('-', ' ')} digital growth`, `Explore SEOPune360 services and published client work for ${slug.replaceAll('-', ' ')} businesses.`]),
  ['/about/', 'About SEOPune360', 'Learn about SEOPune360’s connected approach to search, websites, and business growth.'],
  ['/process/', 'Our Process', 'See how a SEOPune360 project moves from discovery through launch and support.'],
  ['/contact/', 'Contact SEOPune360', 'Start a conversation about your website, search visibility, or business growth goals.'],
  ['/growth-plan/', 'Build My Growth Plan', 'Get a suggested growth service and practical first 90-day sequence based on your business goal.'],
  ['/sitemap/', 'SEOPune360 Sitemap', 'Browse all SEOPune360 pages, services, client stories, and industries.'],
];

const showcaseRoutes = [
  [showcasePath, 'Automotive Client Showcase', 'Explore selected SEOPune360 dealership projects.'],
  ...showcaseDealerships.map(({ id, name, headline }) => [showcasePath + id + '/', name + ' Dealership Showcase', headline]),
];

async function writePrerenderedPages(outputDirectory, homeTemplate) {
  const template = await readFile(join(outputDirectory, 'automotive-showcase', 'index.html'), 'utf8');
  const mount = '<div id="root"></div>';
  if (!template.includes(mount)) throw new Error('Missing automotive showcase mount in the built HTML.');

  const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const renderer = await createServer({
    configFile: false,
    plugins: [react()],
    server: { middlewareMode: true, hmr: false, watch: null, ws: false },
  });
  try {
    const { default: App } = await renderer.ssrLoadModule('/src/App.jsx');
    const homeContent = renderToString(createElement(App, { pathname: '/' }));
    const schema = JSON.stringify(homeSchema).replaceAll('<', '\\u003c');
    if (!homeTemplate.includes(mount) || !homeTemplate.includes('id="site-structured-data"')) {
      throw new Error('Missing homepage mount or structured-data script in the built HTML.');
    }
    const home = homeTemplate
      .replace(/(<script type="application\/ld\+json" id="site-structured-data">)[\s\S]*?(<\/script>)/, (_,start,end) => start + schema + end)
      .replace('</head>', () => `  <link rel="canonical" href="${siteUrl}" />\n  </head>`)
      .replace(mount, () => `<div id="root" data-prerendered="home">${homeContent}</div>`);
    await writeFile(join(outputDirectory, 'index.html'), home, 'utf8');

    for (const [path] of routes) {
      const file = join(outputDirectory, path.slice(1), 'index.html');
      const page = await readFile(file, 'utf8');
      const element = createElement(App, { pathname: path });
      let content;
      if (path === '/portfolio/') {
        const stream = await renderToReadableStream(element);
        await stream.allReady;
        content = await new Response(stream).text();
      } else {
        content = renderToString(element);
      }
      await writeFile(file, page.replace(mount, () => `<div id="root" data-prerendered="${path}">${content}</div>`), 'utf8');
    }

    const { default: AutomotiveShowcase } = await renderer.ssrLoadModule('/src/AutomotiveShowcase.jsx');
    for (const [path, title, description] of showcaseRoutes) {
      const canonical = `https://seopune360.com${path}`;
      const pageTitle = escapeHtml(title) + ' | SEOPune360';
      const pageDescription = escapeHtml(description);
      const content = renderToString(createElement(AutomotiveShowcase, { path }));
      const page = template
        .replace(/<title>[^<]*<\/title>/, () => `<title>${pageTitle}</title>`)
        .replace(/<meta name="description" content="[^"]*"\s*\/>/, () => `<meta name="description" content="${pageDescription}" />`)
        .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, () => `<meta property="og:title" content="${pageTitle}" />`)
        .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, () => `<meta property="og:description" content="${pageDescription}" />`)
        .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, () => `<meta property="og:url" content="${canonical}" />`)
        .replace('</head>', () => `  <link rel="canonical" href="${canonical}" />\n  </head>`)
        .replace(mount, () => `<div id="root" data-showcase-path="${path}">${content}</div>`);
      const outputPath = join(outputDirectory, path.slice(1), 'index.html');
      await mkdir(dirname(outputPath), { recursive: true });
      await writeFile(outputPath, page, 'utf8');
    }
  } finally {
    await renderer.close();
  }
}

function staticRoutePages() {
  return {
    name: 'seopune360-static-route-pages',
    apply: 'build',
    async writeBundle(outputOptions, bundle) {
      const outputDirectory = outputOptions.dir || 'dist';
      const html = await readFile(join(outputDirectory, 'index.html'), 'utf8');
      const innerCss = Object.keys(bundle).find(name => /(?:^|\/)inner-pages-[^/]+\.css$/.test(name));
      if (!innerCss) throw new Error('Missing the inner-page stylesheet.');
      for (const [path, title, description] of routes) {
        const canonical = `https://seopune360.com${path}`;
        const escapedTitle = title.replaceAll('&', '&amp;');
        const escapedDescription = description.replaceAll('&', '&amp;');
        const page = html
          .replace(/<title>[^<]*<\/title>/, `<title>${escapedTitle} | SEOPune360</title>`)
          .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/, `$1${escapedDescription}$2`)
          .replace(/(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)/, `$1${escapedTitle} | SEOPune360$2`)
          .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
          .replace('</head>', `<link rel="canonical" href="${canonical}" />\n  <link rel="stylesheet" href="/${innerCss}" />\n  </head>`);
        const outputPath = join(outputDirectory, path.slice(1), 'index.html');
        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, page, 'utf8');
      }
      await writePrerenderedPages(outputDirectory, html);

      const industryRedirects = {
        matrimony: 'matrimonial', 'healthcare-technology': 'healthcare', 'construction-support': 'real-estate',
        b2b: '', b2c: '', fintech: '',
      };
      for (const [oldSlug, newSlug] of Object.entries(industryRedirects)) {
        const target = '/industries/' + (newSlug ? newSlug + '/' : '');
        const outputPath = join(outputDirectory, 'industries', oldSlug, 'index.html');
        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=' + target + '"><link rel="canonical" href="https://seopune360.com' + target + '"><title>Industry page moved | SEOPune360</title></head><body><a href="' + target + '">Explore this industry</a></body></html>', 'utf8');
      }

      const sitemapUrls = ['/', '/audit/', ...routes.map(([path]) => path)];
      const escapeXml = (value) => value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&apos;');
      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...sitemapUrls.map((path) => `  <url><loc>${escapeXml(`https://seopune360.com${path}`)}</loc></url>`),
        '</urlset>',
        '',
      ].join('\n');
      await writeFile(join(outputDirectory, 'sitemap.xml'), sitemap, 'utf8');

      const auditApiUrl = (process.env.VITE_AUDIT_API_URL || '').trim();
      if (auditApiUrl) {
        const auditPath = join(outputDirectory, 'audit', 'index.html');
        const auditHtml = await readFile(auditPath, 'utf8');
        const escapedApiUrl = auditApiUrl.replaceAll('&', '&amp;').replaceAll('"', '&quot;');
        const configuredAuditHtml = auditHtml.replace(
          /<meta name="seo360-audit-api-url" content=""\s*\/>/,
          `<meta name="seo360-audit-api-url" content="${escapedApiUrl}" />`,
        );
        await writeFile(auditPath, configuredAuditHtml, 'utf8');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), staticRoutePages()],
  build: {
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        'inner-pages': resolve('src/inner-pages.css'),
        showcase: resolve('automotive-showcase/index.html'),
      },
    },
  },
});



