import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const routes = [
  ['/services/', 'Digital Growth Services', 'Explore SEO, AI search, lead generation, business branding, and website development from SEOPune360.'],
  ['/services/seo/', 'SEO Services', 'Build lasting search visibility and connect organic SEO with a wider growth marketing plan.'],
  ['/services/geo/', 'AI Search & GEO', 'Make your expertise easier to discover across search engines and AI answer experiences.'],
  ['/services/lead-generation/', 'Lead Generation', 'Connect Google Ads and Meta Ads with landing pages and conversion paths to help turn attention into enquiries.'],
  ['/services/business-branding/', 'Business Branding', 'Build a distinctive brand identity and consistent messaging that helps your business stand out and earn trust.'],
  ['/services/website-development/', 'Website Development', 'Build a fast, accessible website ready to support business growth.'],
  ['/services/business-growth/', 'Business Growth', 'Connect search, content, and website improvements into a focused growth plan.'],
  ['/case-studies/', 'Client Case Studies', 'Read SEOPune360 client stories, marketing channel mixes, and reported outcomes where available.'],
  ...['kj-group', 'crevolution', 'rivan-travels', 'shaw-tata', 'shaw-toyota', 'krishna-clinic', 'hotel-shivtara'].map((id) => [`/case-studies/${id}/`, `${id.replaceAll('-', ' ')} client story`, 'Explore the published SEOPune360 client project summary and reported outcomes.']),
  ['/case-studies/lusso-marco/', 'Lusso Marco Growth Marketing Case Study', 'See how website SEO, Google Ads, and Meta Ads support growth marketing for a fragrance brand.'],
  ['/portfolio/', 'Client Portfolio', 'Browse businesses represented in the current SEOPune360 client portfolio.'],
  ['/products/', 'Products & Platforms', 'Explore client products and platform journeys represented in SEOPune360 published work.'],
  ['/industries/', 'Industries', 'Explore the industries represented in the current SEOPune360 client portfolio.'],
  ...['b2b', 'hospitality', 'fintech', 'automobile', 'b2c', 'real-estate', 'healthcare'].map((slug) => [`/industries/${slug}/`, `${slug.replaceAll('-', ' ')} digital growth`, `Explore SEOPune360 services and published client work for ${slug.replaceAll('-', ' ')} businesses.`]),
  ['/about/', 'About SEOPune360', 'Learn about SEOPune360’s connected approach to search, websites, and business growth.'],
  ['/process/', 'Our Process', 'See how a SEOPune360 project moves from discovery through launch and support.'],
  ['/contact/', 'Contact SEOPune360', 'Start a conversation about your website, search visibility, or business growth goals.'],
  ['/growth-plan/', 'Build My Growth Plan', 'Get a suggested growth service and practical first 90-day sequence based on your business goal.'],
  ['/sitemap/', 'SEOPune360 Sitemap', 'Browse all SEOPune360 pages, services, client stories, and industries.'],
];

function staticRoutePages() {
  return {
    name: 'seopune360-static-route-pages',
    apply: 'build',
    async writeBundle(outputOptions) {
      const outputDirectory = outputOptions.dir || 'dist';
      const html = await readFile(join(outputDirectory, 'index.html'), 'utf8');
      for (const [path, title, description] of routes) {
        const canonical = `https://seopune360.com${path}`;
        const escapedTitle = title.replaceAll('&', '&amp;');
        const escapedDescription = description.replaceAll('&', '&amp;');
        const page = html
          .replace(/<title>[^<]*<\/title>/, `<title>${escapedTitle} | SEOPune360</title>`)
          .replace(/(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/, `$1${escapedDescription}$2`)
          .replace(/(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)/, `$1${escapedTitle} | SEOPune360$2`)
          .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
          .replace('</head>', `<link rel="canonical" href="${canonical}" />\n  </head>`);
        const outputPath = join(outputDirectory, path.slice(1), 'index.html');
        await mkdir(dirname(outputPath), { recursive: true });
        await writeFile(outputPath, page, 'utf8');
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
});


