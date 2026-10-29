import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const routes = [
  ['/services/', 'Digital Growth Services', 'Explore SEO, AI search, lead generation, website design, and development services from SEOPune360.'],
  ['/services/seo/', 'SEO Services', 'Build lasting search visibility with technical, on-page, and local SEO services.'],
  ['/services/geo/', 'AI Search & GEO', 'Make your expertise easier to discover across search engines and AI answer experiences.'],
  ['/services/lead-generation/', 'Lead Generation', 'Create a clearer path from discovery to a useful sales conversation.'],
  ['/services/website-design/', 'Website Design', 'Create a clear, useful website experience that reflects your brand.'],
  ['/services/website-development/', 'Website Development', 'Build a fast, accessible website ready to support business growth.'],
  ['/services/business-growth/', 'Business Growth', 'Connect search, content, and website improvements into a focused growth plan.'],
  ['/case-studies/', 'Client Case Studies', 'Read SEOPune360 client stories and reported outcomes across search, websites, and growth.'],
  ...['kj-group', 'crevolution', 'rivan-travels', 'shaw-tata', 'shaw-toyota', 'krishna-clinic', 'hotel-shivtara'].map((id) => [`/case-studies/${id}/`, `${id.replaceAll('-', ' ')} client story`, 'Explore the published SEOPune360 client project summary and reported outcomes.']),
  ['/portfolio/', 'Client Portfolio', 'Browse businesses represented in the current SEOPune360 client portfolio.'],
  ['/products/', 'Products & Platforms', 'Explore client products and platform journeys represented in SEOPune360 published work.'],
  ['/industries/', 'Industries', 'Explore the industries represented in the current SEOPune360 client portfolio.'],
  ...['b2b', 'hospitality', 'fintech', 'automobile', 'b2c', 'real-estate', 'healthcare'].map((slug) => [`/industries/${slug}/`, `${slug.replaceAll('-', ' ')} digital growth`, `Explore SEOPune360 services and published client work for ${slug.replaceAll('-', ' ')} businesses.`]),
  ['/about/', 'About SEOPune360', 'Learn about SEOPune360’s connected approach to search, websites, and business growth.'],
  ['/process/', 'Our Process', 'See how a SEOPune360 project moves from discovery through launch and support.'],
  ['/contact/', 'Contact SEOPune360', 'Start a conversation about your website, search visibility, or business growth goals.'],
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
    },
  };
}

export default defineConfig({
  plugins: [react(), staticRoutePages()],
});

