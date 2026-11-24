import { automotiveProjects } from './automotiveProjects.js';
import { lazy, Suspense, useCallback, useEffect, useState, useRef } from 'react';
import { projectDetails } from './projectDetails';
import ServiceDeliverables, { serviceIntro } from './ServiceDeliverables';
import Brand from './Brand.jsx';
import { showcasePath } from './automotiveShowcase.js';
const AutomotiveShowcase = lazy(() => import('./AutomotiveShowcase.jsx'));
const FeaturedDealerships = lazy(() => import('./FeaturedDealerships.jsx'));
const ServiceRequirementFlow = lazy(() => import('./ServiceRequirementFlow.jsx'));
const CONTACT_EMAIL = 'seopune360@gmail.com';
const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=918483837969';
import { homeQuestions, siteUrl, linkedInUrl as LINKEDIN_URL } from './home-readiness.js';
function LinkedInIcon() { return <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" fill="currentColor"><path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9C2 21.3 2.7 22 3.55 22h16.9c.85 0 1.55-.7 1.55-1.55V3.55C22 2.7 21.3 2 20.45 2ZM8.08 18.75H5.1V9.2h2.98v9.55ZM6.59 7.89a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46Zm12.16 10.86h-2.98V14.1c0-1.11-.02-2.55-1.56-2.55-1.56 0-1.8 1.22-1.8 2.47v4.73H9.43V9.2h2.86v1.3h.04a3.14 3.14 0 0 1 2.83-1.55c3.03 0 3.59 2 3.59 4.59v5.21Z" /></svg>; }
const SHOWREEL_PATH = '/media/seopune360-showreel-short.mp4';

const websiteProjects = [
  {
    id: 'ananya-rishtey', name: 'Ananya Rishtey', industry: 'Matrimonial',
    website: 'https://www.ananyarishtey.com/', tone: 'case-matrimony',
    description: 'A matrimony app launch website brought to life through warm visual storytelling, animated product previews, pricing, and a clear vendor registration journey.',
    scope: ['Visual storytelling', 'Animated product presentation', 'Plan comparison', 'Vendor registration pages'],
  },
  {
    id: 'intellidant', name: 'IntelliDant', industry: 'Healthcare',
    website: 'https://intellidant.com/', tone: 'case-software',
    description: 'A dental software website that makes practice management easier to understand through product modules, dashboard visuals, plan comparisons, and a clear clinic registration journey.',
    scope: ['Software product presentation', 'Dashboard-led visuals', 'Pricing comparison', 'Clinic registration pages'],
  },
  {
    id: 'adi-dev', name: 'A.D.I DEV', industry: 'Real Estate',
    website: 'https://www.adidev.com.au/', tone: 'case-construction',
    description: 'An international B2B website for an Australian construction support business, organising tender, estimation, project management, and administration services into clear enquiry and careers journeys.',
    scope: ['International B2B website', 'Service-led navigation', 'Business enquiry journey', 'Careers presentation'],
  },
];

// Approved client services and industries. All portfolio views share this mapping.
const clientProjects = [
  ...websiteProjects.map((project) => ({ ...project, industries: [project.industry], serviceTypes: ['Website Development'], serviceIds: ['development'] })),
  { id: 'kj-group', name: 'KJ Group', industries: ['Real Estate'], serviceTypes: ['Branding'], serviceIds: ['branding'], tone: 'case-realestate', description: 'Branding for KJ Group, with a visual identity presented across logo variations and branded applications.', scope: ['Branding', 'Visual identity', 'Brand applications'] },
  { id: 'lusso-marco', name: 'Lusso Marco', industries: ['D2C / Lifestyle'], serviceTypes: ['Growth Marketing', 'Digital Campaigns'], serviceIds: ['growth', 'leads'], tone: 'case-fragrance', description: 'Growth marketing and digital campaigns for Lusso Marco, connecting brand discovery with product consideration and online sales activity.', scope: ['Growth Marketing', 'Digital Campaigns', 'Google Ads', 'Meta Ads'] },
  { id: 'shaw-toyota', name: 'Shaw Toyota', industries: ['Automobile'], serviceTypes: ['PPC Lead Generation'], serviceIds: ['leads'], tone: 'case-toyota', description: 'PPC lead generation for Shaw Toyota, focused on reaching prospective vehicle buyers and encouraging dealership enquiries.', scope: ['PPC Lead Generation'] },
  { id: 'shaw-tata', name: 'Shaw Tata', industries: ['Automobile'], serviceTypes: ['PPC Lead Generation'], serviceIds: ['leads'], tone: 'case-automobile', description: 'PPC lead generation for Shaw Tata, supporting vehicle discovery and enquiries from prospective customers.', scope: ['PPC Lead Generation'] },
  { id: 'krishna-clinic', name: 'Krishna Classical Homoeopathy Clinic', industries: ['Healthcare'], serviceTypes: ['Social Media / Growth Marketing', 'Website Development'], serviceIds: ['growth', 'development'], tone: 'case-healthcare', description: 'Social media, growth marketing and website development for Krishna Classical Homoeopathy Clinic, connecting a clear website presence with ongoing communication and patient enquiries.', scope: ['Social Media / Growth Marketing', 'Website Development'] },
  { id: 'hotel-shivtara', name: 'Hotel Shivtara', industries: ['Hospitality'], serviceTypes: ['Website Development'], serviceIds: ['development'], tone: 'case-hospitality', description: 'Website development for Hotel Shivtara, presenting the hotel and key information for guests planning their stay.', scope: ['Website Development'] },
  { id: 'era-infratech', name: 'ERA Infratech', industries: ['Real Estate'], serviceTypes: ['Branding'], serviceIds: ['branding'], tone: 'case-realestate', description: 'Branding for ERA Infratech, with logo variations, stationery and brand mockups.', scope: ['Branding', 'Visual identity'] },
  { id: 'fpt', name: 'FPT Powertrain Technologies', industries: ['Manufacturing Industry'], serviceTypes: ['Branding'], serviceIds: ['branding'], serviceNote: 'India Office', tone: 'case-construction', description: 'Branding work for the India office of FPT Powertrain Technologies, shown through brand guidelines and campaign artwork.', scope: ['Branding — India Office'] },
  { id: 'koriv-studio', name: 'Koriv Studio', industries: ['Real Estate', 'Infratech'], serviceTypes: ['Branding'], serviceIds: ['branding'], tone: 'case-architecture', description: 'Logo work for Koriv Studio, presented through its identity artwork and branded mockups.', scope: ['Logo'] },
  { id: 'freshia', name: 'Freshia', industries: ['D2C / Lifestyle'], serviceTypes: ['Branding'], serviceIds: ['branding'], tone: 'case-fragrance', description: 'Branding artwork for Freshia, presented across three supplied design boards.', scope: ['Branding', 'Brand identity'] },
  { id: 'gaurav-vishwasrao', name: 'Gaurav Vishwasrao', industries: ['Real Estate'], serviceTypes: ['Branding'], serviceIds: ['branding'], tone: 'case-architecture', description: 'Logo and branding artwork for Gaurav Vishwasrao Architects, shown across three supplied design boards.', scope: ['Branding', 'Logo design'] },
  { id: 'jijai-milk', name: 'Jijai Milk', industries: ['D2C / Lifestyle'], serviceTypes: ['Branding'], serviceIds: ['branding'], tone: 'case-fragrance', description: 'Branding and packaging artwork for Jijai Milk, presented across two supplied pack designs.', scope: ['Branding', 'Packaging design'] },
];

for (const project of automotiveProjects) {
  if (clientProjects.some(client => client.id === project.id)) continue;
  clientProjects.push({
    ...project,
    industries: ['Automobile'],
    serviceTypes: ['Automotive Marketing'],
    serviceIds: ['leads'],
    tone: 'case-automobile',
    scope: ['Automotive marketing'],
  });
}

const industries = [
  { id: 'All industries', label: 'All industries' },
  ...[...new Set(clientProjects.flatMap((project) => project.industries))].map((name) => ({ id: name, label: name })),
];
const clients = clientProjects.map((project) => ({
  ...project, ...projectDetails[project.id], type: project.industries.join(' / '),
  service: project.serviceTypes.join(' + ') + (project.serviceNote ? ' (' + project.serviceNote + ')' : ''),
  tone: 'logo-website-project', caseId: project.id,
}));
const caseStudies = clients.map((client) => ({
  ...client, label: client.name, category: client.type, mark: client.name,
  tone: clientProjects.find((project) => project.id === client.id).tone,
  copy: client.description, metrics: [],
}));

const services = [
  { id: 'seo', number: '01', title: 'Search Engine Optimization', summary: 'Build lasting search visibility as part of a connected growth marketing plan.', items: ['Technical and on-page SEO', 'Local SEO and Google Business Profile', 'Content and keyword strategy'], type: 'search' },
  { id: 'geo', number: '02', title: 'AI Search & GEO', summary: 'Make your expertise easier to discover across search engines and AI answer experiences.', items: ['Entity and topic clarity', 'Structured content foundations', 'AI search visibility reviews'], type: 'ai' },
  { id: 'leads', number: '03', title: 'Lead Generation', summary: 'Connect Google Ads and Meta Ads with focused landing pages and conversion paths that help turn attention into enquiries.', items: ['Google Ads and Meta Ads campaign management', 'Landing page planning', 'Conversion journeys and enquiry tracking'], type: 'leads' },
  { id: 'branding', number: '04', title: 'Business Branding', summary: 'Create a distinctive, consistent brand that helps customers recognize and trust your business.', items: ['Brand positioning and messaging', 'Visual identity and logo systems', 'Brand guidelines and collateral'], type: 'branding' },
  { id: 'development', number: '05', title: 'Website Development', summary: 'Build a fast, accessible website that is ready to support your next stage of growth.', items: ['Responsive front-end development', 'CMS and integrations', 'Performance and accessibility'], type: 'development' },
  { id: 'growth', number: '06', title: 'Total Business Growth', summary: 'Connect search, content, and website improvements into a focused growth plan.', items: ['SEO and content planning', 'Website conversion improvements', 'Measurement and iteration'], type: 'growth' },
];

const auditItems = [
  ['Search visibility', 'On-page and local search foundations'],
  ['Website experience', 'Navigation, mobile usability, and clarity'],
  ['Technical health', 'Speed, accessibility, and structure'],
  ['Content & trust', 'Useful information and proof points'],
  ['Conversion journey', 'Calls to action and enquiry paths'],
];

const originalBrandingPath = '/images/business-branding/originals/';
const brandingProjects = [
  {
    id: 'era-infratech',
    sourceBoards: [
      ['Original logo variations', 'Era Infratech Logofolio-02.jpg'],
      ['Original identity presentation', 'Era Infratech Logofolio_Artboard 1.jpg'],
    ],
    artworks: [
      { src: '/images/business-branding/era-infratech-02.jpg', fullSize: originalBrandingPath + encodeURIComponent('ERA Infratech 02 - Logo variations.jpg'), width: 1200, height: 786, alt: 'ERA Infratech logo on white, red and navy backgrounds', label: 'Logo variations' },
      { src: '/images/business-branding/era-infratech-01.jpg', fullSize: originalBrandingPath + encodeURIComponent('ERA Infratech 01 - Business card.jpg'), width: 1200, height: 786, alt: 'Construction professional holding a red ERA Infratech business card', label: 'Business card mockup' },
      { src: '/images/business-branding/era-infratech-03.jpg', fullSize: originalBrandingPath + encodeURIComponent('ERA Infratech 03 - Stationery.jpg'), width: 1200, height: 786, alt: 'ERA Infratech letterhead, envelopes and business cards', label: 'Stationery' },
      { src: '/images/business-branding/era-infratech-04.jpg', fullSize: originalBrandingPath + encodeURIComponent('ERA Infratech 04 - Cityscape.jpg'), width: 1200, height: 786, alt: 'White ERA Infratech logo over an aerial cityscape', label: 'Cityscape mockup' },
    ],
  },
  {
    id: 'fpt',
    artworks: [
      { src: projectDetails.fpt.logo, fullSize: projectDetails.fpt.logo, width: 1600, height: 703, alt: 'FPT Powertrain Technologies logo on a red background', label: 'Logo artwork' },
      ...[
        ['Primary logo', 'FPT Powertrain Technologies red logo on white'],
        ['Brand Identity Manual', 'Title page of the FPT Brand Identity Manual'],
        ['Brand mark', 'FPT brand mark with accompanying identity guidance'],
        ['Logo variants', 'Red and black FPT logo variants'],
        ['Logo backgrounds', 'FPT logo treatments on white, red and black backgrounds'],
        ['Logo clear space', 'Clear-space guide for the FPT brand mark'],
        ['Colour palette', 'FPT red, black and grey brand colour swatches'],
        ['Logo application', 'FPT logo application on coloured and photographic backgrounds'],
        ['Original Reman illustration', 'Original Reman campaign artwork with an engine illustration on red'],
        ['Original Reman engine', 'Original Reman campaign artwork with an engine photograph and the line You Gain the Same Quality'],
        ['Original Reman sustainability', 'Original Reman artwork with a forest image and the line Sustainability Meets Performance'],
      ].map(([label, alt], index) => {
        const number = String(index + 1).padStart(2, '0');
        return {
          src: '/images/business-branding/fpt-' + number + '.jpg',
          fullSize: originalBrandingPath + 'FPT-' + number + '.jpg',
          width: 1600, height: 1048, alt, label,
        };
      }),
    ],
  },
  {
    id: 'kj-group',
    artworks: [
      { src: '/images/business-branding/kj-group-logo-variations.jpg', fullSize: originalBrandingPath + encodeURIComponent('KJ Group Logo.jpg'), width: 1050, height: 1050, alt: 'KJ Group logo and color variations', label: 'Logo variations' },
      { src: '/images/business-branding/kj-group-brand-applications.jpg', fullSize: originalBrandingPath + encodeURIComponent('KJ Group Branding.jpg'), width: 823, height: 1050, alt: 'KJ Group brand identity and stationery applications', label: 'Brand applications' },
      { src: '/images/business-branding/kj-group-brand-mockups.jpg', fullSize: originalBrandingPath + encodeURIComponent('KJ Group Mockup New.jpg'), width: 214, height: 1050, alt: 'KJ Group brand mockup presentation', label: 'Brand mockups' },
    ],
  },
  {
    id: 'koriv-studio',
    sourceBoards: [['Original identity presentation', 'KS Logo.jpg']],
    artworks: [
      { src: '/images/business-branding/koriv-studio-02.jpg', fullSize: originalBrandingPath + encodeURIComponent('Koriv Studio 02 - Stacked logo.jpg'), width: 1200, height: 786, alt: 'Koriv Studio’s circular emblem above the stacked wordmark', label: 'Stacked logo' },
      { src: '/images/business-branding/koriv-studio-01.jpg', fullSize: originalBrandingPath + encodeURIComponent('Koriv Studio 01 - Colour palette.jpg'), width: 1200, height: 786, alt: 'Koriv Studio’s brown and orange colour swatches', label: 'Colour palette' },
      { src: '/images/business-branding/koriv-studio-03.jpg', fullSize: originalBrandingPath + encodeURIComponent('Koriv Studio 03 - Horizontal logo.jpg'), width: 1200, height: 786, alt: 'Koriv Studio’s circular emblem beside the wordmark', label: 'Horizontal logo' },
      { src: '/images/business-branding/koriv-studio-04.jpg', fullSize: originalBrandingPath + encodeURIComponent('Koriv Studio 04 - Brand mockups.jpg'), width: 1200, height: 786, alt: 'Koriv Studio identity on an envelope, mugs, notebook and embossed card', label: 'Brand mockups' },
    ],
  },
  {
    id: 'freshia',
    artworks: [
      { src: '/images/business-branding/freshia-01.jpg', fullSize: originalBrandingPath + encodeURIComponent('Freshia Branding-01.jpg'), width: 1200, height: 786, alt: 'Freshia branding board 01', label: 'Branding board 01' },
      { src: '/images/business-branding/freshia-02.jpg', fullSize: originalBrandingPath + encodeURIComponent('Freshia Branding-02.jpg'), width: 1200, height: 786, alt: 'Freshia branding board 02', label: 'Branding board 02' },
      { src: '/images/business-branding/freshia-03.jpg', fullSize: originalBrandingPath + encodeURIComponent('Freshia Branding-03.jpg'), width: 1200, height: 786, alt: 'Freshia branding board 03', label: 'Branding board 03' },
    ],
  },
  {
    id: 'gaurav-vishwasrao',
    artworks: [
      { src: '/images/business-branding/gaurav-vishwasrao-01.jpg', fullSize: originalBrandingPath + encodeURIComponent('Gaurav Vishwasrao Architects Logo copy-01.jpg'), width: 1200, height: 786, alt: 'Gaurav Vishwasrao Architects logo board 01', label: 'Logo board 01' },
      { src: '/images/business-branding/gaurav-vishwasrao-02.jpg', fullSize: originalBrandingPath + encodeURIComponent('Gaurav Vishwasrao Architects Logo copy-02.jpg'), width: 1200, height: 786, alt: 'Gaurav Vishwasrao Architects logo board 02', label: 'Logo board 02' },
      { src: '/images/business-branding/gaurav-vishwasrao-03.jpg', fullSize: originalBrandingPath + encodeURIComponent('Gaurav Vishwasrao Architects Logo copy-03.jpg'), width: 1200, height: 786, alt: 'Gaurav Vishwasrao Architects logo board 03', label: 'Logo board 03' },
    ],
  },
  {
    id: 'jijai-milk',
    artworks: [
      { src: '/images/business-branding/jijai-milk-01.jpg', fullSize: originalBrandingPath + encodeURIComponent('Jijai Milk Package-01.jpg'), width: 1200, height: 786, alt: 'Jijai Milk packaging design 01', label: 'Packaging design 01' },
      { src: '/images/business-branding/jijai-milk-02.jpg', fullSize: originalBrandingPath + encodeURIComponent('Jijai Milk Package-02.jpg'), width: 1200, height: 786, alt: 'Jijai Milk packaging design 02', label: 'Packaging design 02' },
    ],
  },
].map((project) => {
  const client = clients.find((item) => item.id === project.id);
  return { ...project, name: client.name, category: client.service, industry: client.type, description: client.description };
});

const servicePaths = {
  seo: '/services/seo/',
  geo: '/services/geo/',
  leads: '/services/lead-generation/',
  branding: '/services/business-branding/',
  development: '/services/website-development/',
  growth: '/services/business-growth/',
};
const industryPath = (industry) => '/industries/' + industry.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '/';

function ArrowIcon() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3.5 9h10m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

const navigationGroups = [
  {
    id: 'services', label: 'Services', href: '/services/', kicker: 'What we do',
    title: 'Growth, from search to website.',
    copy: 'Explore the services that help people find your business, understand what you offer, and take the next step.',
    columns: [
      { title: 'Search & visibility', items: [
        ['SEO Services', 'Build lasting visibility in the searches that matter.', servicePaths.seo],
        ['AI Search & GEO', 'Make your expertise easier to find in AI answers.', servicePaths.geo],
      ] },
      { title: 'Digital experience & growth', items: [
        ['Lead Generation', 'Create a clearer path from discovery to enquiry.', servicePaths.leads],
        ['Business Branding', 'Build recognition and trust with a consistent brand identity.', servicePaths.branding],
        ['Website Development', 'Build a fast, accessible website for growth.', servicePaths.development],
        ['Business Growth', 'Connect search, content, and conversion work.', servicePaths.growth],
      ] },
    ],
  },
  {
    id: 'work', label: 'Work', href: '/case-studies/', kicker: 'Selected work',
    title: 'Client stories and digital experiences.',
    copy: 'See the businesses in SEOPune360’s published portfolio and the work described in their case studies.',
    columns: [
      { title: 'Explore our work', items: [
        ['Client Showreel', 'Explore selected projects in motion.', '/#showreel-story'],
        ['Case Studies', 'Read project summaries and reported outcomes.', '/case-studies/'],
        ['Client Portfolio', 'Browse businesses represented in the portfolio.', '/portfolio/'],
        ['Products & Platforms', 'Explore product and platform journeys across client work.', '/products/'],
      ] },
    ],
  },
  {
    id: 'industries', label: 'Industries', href: '/industries/', kicker: 'Who we work with',
    title: 'Digital growth for different buying journeys.',
    copy: 'Find the sectors represented in the current portfolio and see the work published for each.',
    columns: [
      { title: 'Industries', items: industries.filter((item) => item.id !== 'All industries').map((item) => [item.label, 'Explore digital growth for ' + item.label.toLowerCase() + ' businesses.', industryPath(item.id)]) },
    ],
  },
  {
    id: 'company', label: 'Company', href: '/about/', kicker: 'About SEOPune360',
    title: 'A connected partner for your next stage.',
    copy: 'Learn how we work, what guides our approach, and how a project moves from discovery to launch.',
    columns: [
      { title: 'Get to know us', items: [
        ['About Us', 'Our approach to search, websites, and business growth.', '/about/'],
        ['Our Process', 'A clear path from kickoff through launch and support.', '/process/'],
        ['Build my growth plan', 'Get a suggested starting point for your goal.', '/growth-plan/'],
      ] },
    ],
  },
];

function RequirementButton({ onStart, serviceId, industry, className, children }) {
  return <button type="button" aria-haspopup="dialog" className={'requirement-launch ' + className}
    onClick={(event) => onStart(event.currentTarget, serviceId, industry)}>{children}</button>;
}

function Header({ onStart }) {
  const [openMenu, setOpenMenu] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState('');

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setOpenMenu('');
        setMobileOpen(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [mobileOpen]);

  const closeMenus = () => { setOpenMenu(''); setMobileOpen(false); setMobileGroup(''); };
  const toggleMenu = (name) => setOpenMenu((current) => current === name ? '' : name);
  const mobileLinks = (group) => [
    ['View all ' + group.label.toLowerCase(), group.href],
    ...group.columns.flatMap((column) => column.items.map(([label, , href]) => [label, href])),
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="main-nav" aria-label="Main navigation">
          {navigationGroups.map((group) => <div className={'nav-item' + (openMenu === group.id ? ' open' : '')} key={group.id} onMouseEnter={() => setOpenMenu(group.id)} onMouseLeave={() => setOpenMenu('')} onFocus={() => setOpenMenu(group.id)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(''); }}>
            <button className="nav-trigger" aria-expanded={openMenu === group.id} aria-controls={'menu-' + group.id} onClick={() => toggleMenu(group.id)}>{group.label}<span className="chevron" /></button>
            <div className={'mega-menu mega-' + group.id} id={'menu-' + group.id} aria-hidden={openMenu !== group.id}>
              <div className="mega-intro"><p className="eyebrow">{group.kicker}</p><h2>{group.title}</h2><p>{group.copy}</p><a className="mega-overview" href={group.href} onClick={closeMenus}>Explore {group.label}<ArrowIcon /></a></div>
              <div className="mega-columns">{group.columns.map((column) => <div className="mega-column" key={column.title}><h3>{column.title}</h3>{column.items.map(([label, description, href]) => <a className="mega-link" href={href} key={label} onClick={closeMenus}><span><b>{label}</b><small>{description}</small></span><ArrowIcon /></a>)}</div>)}</div>
            </div>
          </div>)}
        </nav>
        <RequirementButton className="button header-call" onStart={onStart}>Send a project brief <ArrowIcon /></RequirementButton>
        <button className={'menu-toggle' + (mobileOpen ? ' is-open' : '')} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((value) => !value)}>
          <span /><span /><span />
        </button>
      </div>
      <div className={'mobile-nav' + (mobileOpen ? ' is-open' : '')} id="mobile-navigation" aria-hidden={!mobileOpen}>
        <div className="mobile-nav-panel">
          {navigationGroups.map((group) => <div className="mobile-group" key={group.id}>
            <button className="accordion-trigger" aria-expanded={mobileGroup === group.id} onClick={() => setMobileGroup((current) => current === group.id ? '' : group.id)}>{group.label}<span /></button>
            {mobileGroup === group.id && <div className="accordion-content">{mobileLinks(group).map(([label, href]) => <a href={href} key={label} onClick={closeMenus}>{label}<ArrowIcon /></a>)}</div>}
          </div>)}
          <RequirementButton className="button header-call mobile-call" onStart={(trigger) => {
            closeMenus();
            onStart(trigger.closest('.site-header').querySelector('.menu-toggle'));
          }}>Send a project brief <ArrowIcon /></RequirementButton>
        </div>
      </div>
    </header>
  );
}

function ShowreelModal({ onClose }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    function onKeyDown(event) { if (event.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="showreel-backdrop-glow" aria-hidden="true" />
      <section className="showreel-dialog" role="dialog" aria-modal="true" aria-labelledby="showreel-title">
        <div className="dialog-heading"><div><p className="eyebrow">SEOPune360 showreel</p><h2 id="showreel-title">Client work, in motion.</h2></div><button className="icon-button" aria-label="Close video" onClick={onClose}>×</button></div>
        {!failed ? <video className="showreel-video" poster={projectDetails.fpt.logo} controls autoPlay muted playsInline onError={() => setFailed(true)}><source src={SHOWREEL_PATH} type="video/mp4" />Your browser does not support this video.</video> :
          <div className="video-missing"><span className="missing-play">▶</span><h3>The showreel could not load</h3><p>Try refreshing the page or opening the video directly.</p><a className="button button-outline" href={SHOWREEL_PATH}>Open the showreel <ArrowIcon /></a></div>}
        <div className="showreel-modal-footer"><a href="/case-studies/" onClick={onClose}>Explore client stories <ArrowIcon /></a></div>
      </section>
    </div>
  );
}

function ScrollShowreel({ onCinema }) {
  const videoRef = useRef(null);
  const [failed, setFailed] = useState(false);
  return <section className="hero-showreel" id="showreel-story" aria-label="Client showreel">
    <div className="reel-heading"><span>SEOPUNE360 / SELECTED WORK</span><span>Play the film ↓</span></div>
    <div className="reel-frame">
      <video ref={videoRef} controls playsInline preload="none" poster={projectDetails.fpt.logo} src={SHOWREEL_PATH} onError={() => setFailed(true)} />
      {failed && <a className="button" href={SHOWREEL_PATH}>Open the showreel <ArrowIcon /></a>}
    </div>
    <div className="reel-footer"><span>Brands. Websites. Customer journeys.</span><button className="text-link" onClick={() => { videoRef.current?.pause(); onCinema(); }}>Cinema view <ArrowIcon /></button></div>
  </section>;
}

function Hero({ onPlayShowreel, onStart }) {
  return <section className="hero" id="top">
    <div className="container hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">SEO · Websites · Lead generation</p>
        <h1>From first search<br />to <span>real enquiries.</span></h1>
        <p className="hero-lead">SEOPUNE360 is a digital marketing agency in Pune, Maharashtra. We help businesses across India with SEO, AI search, website development, and lead generation.</p>
        <div className="hero-scanner">
          <label htmlFor="hero-scan-url">Laser Viewfinder · Free website scan</label>
          <form className="hero-scan-form" action="/audit/" method="get">
            <input id="hero-scan-url" name="domain" type="text" inputMode="url" autoComplete="url" aria-label="Website address to scan" placeholder="Enter your website URL" required pattern="(https?://)?[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}.*" title="Enter a website address such as example.com" />
            <button className="button" type="submit">Scan my website <ArrowIcon /></button>
          </form>
          <small>Up to 25 pages · PageSpeed · Keyword rankings & competitors</small>
        </div>
        <div className="hero-actions"><RequirementButton className="button" onStart={onStart}>Discuss your project <ArrowIcon /></RequirementButton><a className="text-link" href="#clients">Explore client work ↓</a></div>
        <div className="hero-service-links">
          <RequirementButton className="hero-service-option" onStart={onStart} serviceId="seo">Search visibility</RequirementButton>
          <RequirementButton className="hero-service-option" onStart={onStart} serviceId="development">Website experience</RequirementButton>
          <RequirementButton className="hero-service-option" onStart={onStart} serviceId="leads">Qualified enquiries</RequirementButton>
        </div>
      </div>
      <ScrollShowreel onCinema={onPlayShowreel} />
    </div>
  </section>;
}

function HomeQuestions() {
  return <section className="section container home-questions" id="faq" aria-labelledby="home-faq-title">
    <p className="eyebrow">Frequently asked questions</p>
    <h2 id="home-faq-title">Search, websites and enquiries</h2>
    <div className="home-question-grid">
      {homeQuestions.map(({question,answer,link,label}) => <article className="content-card" key={question}>
        <h3>{question}</h3>
        <p>{answer}</p>
        <a className="text-link" href={link}>{label}</a>
      </article>)}
    </div>
    <a className="agency-linkedin" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><LinkedInIcon /> Follow SEOPune360 on LinkedIn</a>
  </section>;
}

function ClientLogo({ client }) {
  return <span className={'client-logo-frame logo-layout-' + (client.logoLayout || 'standard')}>
    {client.logo ? <img src={client.logo} alt={client.name + ' logo'} loading="lazy" decoding="async" /> : <span className="client-name-mark">{client.name}</span>}
  </span>;
}

function projectGallery(client) {
  const artworks = brandingProjects.find((project) => project.id === client.id)?.artworks || [];
  return client.gallery || artworks.map((artwork) => ({ src: artwork.src, fullSize: artwork.fullSize, title: artwork.label, caption: artwork.alt, width: artwork.width, height: artwork.height }));
}

function ProjectCover({ client }) {
  const cover = projectGallery(client)[0];
  return <div className={'project-cover' + (cover ? '' : ' project-cover-logo')}>
    {cover ? <img src={cover.src} alt={cover.title + ' — ' + client.name} loading="lazy" decoding="async" /> : <ClientLogo client={client} />}
  </div>;
}

function ClientSelector({ activeIndustry, setActiveIndustry }) {
  const matching = activeIndustry === 'All industries' ? clients : clients.filter((client) => client.industries.includes(activeIndustry));
  return <section className="client-section section" id="clients"><div className="container">
    <div className="client-heading"><p className="eyebrow">The businesses behind our work</p><h2>Distinctive brands.<br /><span>Different paths to growth.</span></h2><p>Explore each client, the services behind the project, and the work in context.</p></div>
    <div className="client-browser">
      <div className="industry-list" role="tablist" aria-label="Filter clients by industry">{industries.map((industry) => <button className={'industry-tab' + (activeIndustry === industry.id ? ' active' : '')} key={industry.id} role="tab" id={'industry-' + industry.id.replaceAll(' ', '-')} aria-selected={activeIndustry === industry.id} aria-controls="industry-panel" onClick={() => setActiveIndustry(industry.id)}>{industry.label}<span><ArrowIcon /></span></button>)}</div>
      <div className="industry-results" id="industry-panel" role="tabpanel" aria-labelledby={'industry-' + activeIndustry.replaceAll(' ', '-')}>
        <div className="client-box-grid">{clients.map((client) => <PortfolioCard key={client.id} item={client} hidden={!matching.includes(client)} priority={matching.indexOf(client) >= 0 && matching.indexOf(client) < 3} />)}</div>
        <div className="industry-footer"><span aria-live="polite">{matching.length} {matching.length === 1 ? 'client' : 'clients'}</span><a href="/portfolio/">Browse by service ↗</a></div>
      </div>
    </div>
  </div></section>;
}

function CampaignJourney({ client }) {
  const commerce = client.campaign === 'commerce';
  const steps = commerce ? [['01', 'Discover', 'Campaign creative introduces the product.'], ['02', 'Explore', 'The product page explains the fragrance.'], ['03', 'Consider', 'Details and imagery support the next decision.']] : [['01', 'Search', 'A prospective buyer explores a vehicle.'], ['02', 'Compare', 'A model page provides relevant details.'], ['03', 'Enquire', 'An offer form creates a direct next step.']];
  return <section className="campaign-journey"><div><p className="eyebrow">The customer journey</p><h2>Give every click <span>a clear destination.</span></h2><p>A visual explanation of the campaign journey.</p></div><div className="journey-graphic">{steps.map(([number, title, copy]) => <div className="journey-step" key={number}><span className="journey-node">{number}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>;
}

function ClientProjectPage({ client }) {
  const isBranding = client.serviceIds.includes('branding');
  const sourceBoards = brandingProjects.find((project) => project.id === client.id)?.sourceBoards;
  const [failedImages, setFailedImages] = useState([]);
  const gallery = projectGallery(client).filter(item => !failedImages.includes(item.src));
  if (isBranding) gallery.sort((first, second) => artworkOrder.compare(decodeURIComponent(first.fullSize || first.src), decodeURIComponent(second.fullSize || second.src)));
  const related = clients.filter((item) => item.id !== client.id && item.serviceTypes.some((type) => client.serviceTypes.includes(type))).slice(0,3);
  return <section className="section project-story"><div className="container">
    <div className="project-summary"><ClientLogo client={client} /><div><h2>Project scope</h2><div className="project-tags">{client.serviceTypes.map((type) => <span key={type}>{type}</span>)}{client.serviceNote && <span>{client.serviceNote}</span>}</div></div></div>
    <div className="project-overview"><div><p className="eyebrow">The project</p><p className="project-lead">{client.overview || client.description}</p></div><aside><h3>At a glance</h3><dl><dt>Client</dt><dd>{client.name}</dd><dt>Industry</dt><dd>{client.type}</dd><dt>Services</dt><dd>{client.service}</dd></dl>{(client.landing || client.website) && <a className="text-link" href={client.landing || client.website} target="_blank" rel="noopener noreferrer">{client.landing ? 'Visit landing page' : 'Visit client website'} <ArrowIcon /></a>}</aside></div>
    {gallery.length > 0 && <section className="project-gallery" aria-label={'Project visuals for ' + client.name}><div className="section-title-row"><div><p className="eyebrow">Work in context</p><h2>{client.campaign ? 'The landing experience.' : client.serviceIds.includes('branding') ? 'The identity, in detail.' : 'A closer look at the website.'}</h2></div></div>{gallery.map((item, index) => {
      const Figure = isBranding ? BrandingGalleryFigure : 'figure';
      return <Figure className="project-figure" key={item.src}><div className="project-frame"><div className="project-frame-bar"><span><i /><i /><i /></span><b>{item.title}</b><span>{String(index + 1).padStart(2,'0')}</span></div><a href={item.fullSize || item.src} target="_blank" rel="noopener noreferrer" aria-label={'View full-size ' + item.title}><img src={item.src} alt={item.caption} width={item.width} height={item.height} loading="lazy" decoding="async" onError={() => setFailedImages(previous => [...previous, item.src])} /></a></div><figcaption><span>{item.caption}</span>{item.url && <a href={item.url} target="_blank" rel="noopener noreferrer">View source page ↗</a>}</figcaption></Figure>;
    })}{sourceBoards && <details className="project-source-boards"><summary>Original artwork files</summary><ul>{sourceBoards.map(([label, filename]) => (
      <li key={filename}><a className="text-link" href={originalBrandingPath + encodeURIComponent(filename)} target="_blank" rel="noopener noreferrer">{label} <ArrowIcon /></a></li>
    ))}</ul></details>}</section>}
    {client.focus && <section className="project-focus"><p className="eyebrow">What matters in this project</p><h2>Clarity in <span>every detail.</span></h2><div className="project-focus-grid">{client.focus.map(([title,copy],index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>}
    {client.campaign && <CampaignJourney client={client} />}
    {related.length > 0 && <section className="project-related"><p className="eyebrow">Explore more work</p><h2>Related client projects.</h2><div className="project-related-grid">{related.map((item, index) => <PortfolioCard key={item.id} item={item} priority={index < 3} />)}</div></section>}
    <a className="text-link" href="/portfolio/">Back to the portfolio <ArrowIcon /></a>
  </div></section>;
}

function ServiceIllustration({ type }) {
  return <div className={'service-visual service-visual-' + type} aria-hidden="true">
    <div className="service-visual-grain" />
    {type === 'search' && <div className="search-window"><div className="window-chrome"><i /><i /><i /><span>seopune360.com / search</span></div><div className="search-content"><span className="search-chip">GOOGLE SEARCH</span><b>Find the<br /><em>right business.</em></b><div className="search-line"><i /> Find the right service <span>↗</span></div><div className="search-result"><b>SEOPune360</b><span>SEO that helps your business get found.</span></div></div></div>}
    {type === 'ai' && <div className="orbit-graphic"><span className="orbit orbit-a" /><span className="orbit orbit-b" /><span className="orbit-core">AI</span><b>SEARCH<br />SIGNALS</b></div>}
    {type === 'leads' && <div className="lead-funnel"><span className="funnel-step">DISCOVER</span><span className="funnel-step">ENGAGE</span><span className="funnel-step">ENQUIRE</span><i>↘</i></div>}
    {type === 'branding' && <div className="brand-system"><div className="brand-system-label"><span>IDENTITY SYSTEM</span><b>01 / BRAND</b></div><div className="brand-system-lockup"><span className="brand-system-mark">B</span><div><strong>YOUR BRAND</strong><small>POSITIONING · VOICE · IDENTITY</small></div></div><div className="brand-system-colors"><i /><i /><i /><i /></div><div className="brand-system-type"><b>Aa</b><span>Distinctive by design</span></div></div>}
    {type === 'development' && <div className="code-window"><div className="window-chrome"><i /><i /><i /><span>responsive-build.jsx</span></div><pre><b>&lt;section</b> className=<em>"fast"</em><b>&gt;</b>{'\\n'}  <i>accessible</i> <u>responsive</u>{'\\n'}  <strong>made for growth</strong>{'\\n'}<b>&lt;/section&gt;</b></pre></div>}
    {type === 'growth' && <div className="growth-wheel"><span>SEARCH</span><span>CONTENT</span><span>WEBSITE</span><span>LEADS</span><b>GROW<br />WITH<br />INTENT</b></div>}
    <span className="visual-label">SEOPUNE360 <i /> GROWTH STUDIO</span>
  </div>;
}

function BrandingPortfolio({ onStart }) {
  return <section className="section branding-portfolio" aria-labelledby="branding-work-title"><div className="container">
    <div className="branding-portfolio-heading"><p className="eyebrow">Selected brand work</p><h2 id="branding-work-title">Identity work, made <span>for real businesses.</span></h2><p>A selection of logo and brand identity artwork supplied for SEOPune360 client projects.</p></div>
    <div className="branding-work-grid">{brandingProjects.map((project, index) => <PortfolioCard key={project.id} item={clients.find((client) => client.id === project.id)} priority={index < 3} />)}</div>
    <div className="branding-work-cta"><p>Building a brand or refreshing the one you have?</p><RequirementButton className="button" onStart={onStart} serviceId="branding">Talk about your brand <ArrowIcon /></RequirementButton></div>
  </div></section>;
}

function Services({ activeService, setActiveService, onStart }) {
  const current = services.find((service) => service.id === activeService) || services[0];
  return (
    <section className="services-section section" id="services">
      <div className="container">
        <div className="section-title-row"><div><p className="eyebrow">Our services</p><h2>Everything you need to <span>grow online.</span></h2><p>Choose a service to tell us what you need.</p></div><RequirementButton className="button button-outline" onStart={onStart}>Start a project <ArrowIcon /></RequirementButton></div>
        <div className="service-showcase">
          <div className="service-band" key={current.id} id="service-showcase">
            <ServiceIllustration type={current.type} />
            <div className="service-band-copy"><span className="service-number">{current.number} / 06</span><h3>{current.title}</h3><p>{current.summary}</p><RequirementButton className="text-link" onStart={onStart} serviceId={current.id}>Start project <ArrowIcon /></RequirementButton><a href={servicePaths[current.id]}>Service details <ArrowIcon /></a></div>
            <ul className="service-points">{current.items.map((item) => <li key={item}><span>↗</span>{item}</li>)}</ul>
          </div>
          <div className="service-list" role="group" aria-label="Choose a service">
            {services.map((service) => <button type="button" className={'service-row' + (activeService === service.id ? ' active' : '')} key={service.id} aria-haspopup="dialog" onMouseEnter={() => setActiveService(service.id)} onFocus={() => setActiveService(service.id)} onClick={(event) => { setActiveService(service.id); onStart(event.currentTarget, service.id); }}><span className="row-number" aria-hidden="true">({service.number})</span><span className="row-title">{service.title}</span><span className="row-arrow"><ArrowIcon /></span></button>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudies({ activeCase, setActiveCase }) {
  const current = caseStudies.find((item) => item.id === activeCase) || caseStudies[0];
  useEffect(() => {
    function selectFromClient(event) {
      const selected = caseStudies.find((item) => item.label === event.detail);
      if (selected) setActiveCase(selected.id);
    }
    window.addEventListener('select-case', selectFromClient);
    return () => window.removeEventListener('select-case', selectFromClient);
  }, [setActiveCase]);
  return (
    <section className="case-section section" id="case-studies">
      <div className="container">
        <div className="section-title-row"><div><p className="eyebrow">Recent work with businesses</p><h2>Real businesses.<br /><span>Clearer digital growth.</span></h2></div><p className="section-intro">Select a client to view its project scope and reported results where available.</p></div>
        <div className="case-layout">
          <div className="case-tabs" role="tablist" aria-label="Client case studies">
            {caseStudies.map((item) => <button className={'case-tab' + (activeCase === item.id ? ' active' : '')} key={item.id} role="tab" id={'case-tab-' + item.id} aria-selected={activeCase === item.id} aria-controls={'selected-case-' + item.id} onClick={() => setActiveCase(item.id)}><span>{item.label}</span><small>{item.category}</small><ArrowIcon /></button>)}
          </div>
          <div>{caseStudies.map((item) => <div id={'selected-case-' + item.id} role="tabpanel" aria-labelledby={'case-tab-' + item.id} hidden={item.id !== current.id} key={item.id}><PortfolioCard item={item} priority={item.id === current.id} hidden={item.id !== current.id} /></div>)}</div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const stages = [
    ['Understand the starting point', 'Review the business goal, customer journey, current website and available performance data.', 'A clear problem to solve'],
    ['Choose the right scope', 'Agree priorities, responsibilities and success measures around the work your business needs.', 'An agreed plan and deliverables'],
    ['Build and validate', 'Develop the agreed work, review it together and check the important journeys across devices.', 'Work ready for release'],
    ['Review and improve', 'Use the agreed measures and customer feedback to decide what should happen next.', 'A focused next step'],
  ];
  return <section className="process-section section" id="process"><div className="container">
    <div className="section-title-row"><div><p className="eyebrow">Our approach</p><h2>Find the gap.<br /><span>Fix what matters.</span></h2></div><p className="section-intro">A shared process for search, websites and campaigns. Scope and timing are agreed around your project.</p></div>
    <div className="delivery-stages">{stages.map(([title, copy, outcome]) => <article key={title}><h3>{title}</h3><p>{copy}</p><span>{outcome} <ArrowIcon /></span></article>)}</div>
  </div></section>;
}

function WhyUs() {
  const points = [
    ['Customer understanding', 'Strategy shaped around your audience, buying decisions, and business goals.'],
    ['One connected growth plan', 'Search, website, and lead generation work together instead of in silos.'],
    ['Clear, useful reporting', 'Understand what is changing and what the team recommends next.'],
    ['Built for long-term progress', 'Improve the foundations, measure outcomes, and keep learning over time.'],
  ];
  return (
    <section className="why-section section" id="about">
      <div className="container why-layout"><div className="why-copy"><p className="eyebrow">Why SEOPune360</p><h2>More than a website.<br /><span>A partner in your growth.</span></h2><p>Good digital work starts with understanding your business. We bring search, web, and growth thinking together to help people find you, trust you, and take the next step.</p><a className="button button-outline" href={'mailto:' + CONTACT_EMAIL + '?subject=Let%E2%80%99s%20talk%20about%20growth'}>Let’s talk about your goals <ArrowIcon /></a><a className="agency-linkedin" href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><LinkedInIcon /> Connect on LinkedIn</a></div><div className="why-points">{points.map(([title, body], index) => <article className="why-point" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div><i><ArrowIcon /></i></article>)}</div></div>
    </section>
  );
}

function AuditSection() {
  return (
    <section className="audit-section section" id="audit">
      <div className="audit-light" aria-hidden="true" />
      <div className="container audit-layout">
        <div className="audit-copy"><p className="eyebrow">Free website audit</p><h2>Find the next opportunity to <span>grow online.</span></h2><p>Enter a website address to open the Laser Viewfinder and get a live crawl with PageSpeed checks.</p><form className="audit-form audit-form-bottom" action="/audit/" method="get"><label className="sr-only" htmlFor="audit-site-url">Website address for audit</label><input id="audit-site-url" name="domain" type="text" inputMode="url" autoComplete="url" placeholder="www.yourwebsite.com" required pattern="(https?://)?[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}.*" title="Enter a website address such as example.com" /><button className="button audit-submit" type="submit">Scan my website <ArrowIcon /></button></form><small className="audit-disclaimer">The live audit checks up to 25 pages and PageSpeed on mobile and desktop.</small></div>
        <div className="audit-report"><div className="report-header"><div><span className="report-kicker">SEOPUNE360 / REVIEW FRAMEWORK</span><h3>Website opportunity review</h3></div><span className="report-icon">✦</span></div><div className="report-progress"><div><span>Review areas</span><b>5 focus areas</b></div><i><span /></i></div><div className="report-list">{auditItems.map(([title, body], index) => <article className="report-row" key={title}><span className="report-index">0{index + 1}</span><div><b>{title}</b><small>{body}</small></div><span className="report-arrow"><ArrowIcon /></span></article>)}</div><div className="report-footer"><span><i /> HUMAN-LED WEBSITE REVIEW</span><span>SEO · UX · GROWTH</span></div></div>
      </div>
    </section>
  );
}

function Footer({ onCookieSettings, onLegal, onStart, showProjectBanner = true }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" id="footer">
      {showProjectBanner && <div className="footer-cta"><div className="container footer-cta-inner"><div><p className="eyebrow">Your next growth chapter starts here</p><h2>Let’s make your online presence work harder.</h2></div><RequirementButton className="button footer-button" onStart={onStart}>Start a project <ArrowIcon /></RequirementButton></div></div>}
      <div className="container footer-main"><div className="footer-brand-col"><Brand footer /><p>SEO, websites, and growth support for businesses ready to move forward.</p><a className="footer-email" href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL} <ArrowIcon /></a><div className="footer-social"><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="SEOPUNE360 on LinkedIn"><LinkedInIcon /></a></div></div>
        <div className="footer-column"><h3>Services</h3>{services.map((service) => <a href={servicePaths[service.id]} key={service.id}>{service.title}</a>)}</div>
        <div className="footer-column"><h3>Explore</h3><a href="/#showreel-story">Client Showreel</a><a href="/case-studies/">Case Studies</a><a href="/growth-plan/">Build my growth plan</a><a href="/portfolio/">Client Portfolio</a><a href="/products/">Products &amp; Platforms</a><a href="/industries/">Industries</a><a href="/process/">How We Work</a><a href="/about/">About Us</a><a href="/sitemap/">Sitemap</a></div>
        <div className="footer-column footer-contact"><h3>Get in touch</h3><p>Tell us what you’re working toward. We’ll help you find the next step.</p><a className="footer-email" href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL} <ArrowIcon /></a><a href="tel:+918483837969">Call +91 84838 37969</a><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp enquiry ↗</a><a className="footer-audit-link" href="/contact/">Request a website audit <ArrowIcon /></a></div>
      </div>
      <div className="container footer-bottom"><span>© {year} SEOPune360. All rights reserved.</span><div className="legal-links"><button onClick={() => onLegal('Terms & Conditions')}>Terms &amp; Conditions</button><button onClick={() => onLegal('Privacy Policy')}>Privacy Policy</button><button onClick={onCookieSettings}>Cookie Settings</button></div><a className="back-to-top" href="#top">Back to top ↑</a></div>
    </footer>
  );
}

function applyCookiePreferences(preferences) {
  try { window.localStorage.setItem('seopune360-cookie-preferences', JSON.stringify(preferences)); } catch { /* Settings still apply for this visit. */ }
  const consent = {
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: preferences.marketing ? 'granted' : 'denied',
    ad_user_data: preferences.marketing ? 'granted' : 'denied',
    ad_personalization: preferences.marketing ? 'granted' : 'denied',
    functionality_storage: preferences.functional ? 'granted' : 'denied',
    security_storage: 'granted',
  };
  if (typeof window.gtag === 'function') window.gtag('consent', 'update', consent);
  if (preferences.analytics || preferences.marketing) window.startOptionalTags?.();
}

function CookieDialog({ onClose, onSaved }) {
  const [preferences, setPreferences] = useState({ analytics: false, marketing: false, functional: false });
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    try {
      const current = JSON.parse(window.localStorage.getItem('seopune360-cookie-preferences') || '{}');
      setPreferences({ analytics: Boolean(current.analytics), marketing: Boolean(current.marketing), functional: Boolean(current.functional) });
    } catch { /* Storage may be disabled by the browser. */ }
    function onKeyDown(event) { if (event.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);
  function save(next) {
    setPreferences(next);
    applyCookiePreferences(next);
    setSaved(true);
    if (onSaved) onSaved();
  }
  const groups = [
    ['necessary', 'Necessary', 'Always on', 'Required for basic site functions and security.'],
    ['analytics', 'Analytics', 'Optional', 'Help measure site use so the experience can improve.'],
    ['functional', 'Functional', 'Optional', 'Remember choices that improve how the site works.'],
    ['marketing', 'Marketing', 'Optional', 'Support campaign measurement when marketing tools are connected.'],
  ];
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-title"><div className="dialog-heading"><div><p className="eyebrow">Your privacy choices</p><h2 id="cookie-title">Cookie Settings</h2></div><button className="icon-button" aria-label="Close cookie settings" onClick={onClose}>×</button></div><p className="cookie-intro">Choose which optional cookies you allow. Necessary cookies are always on. Analytics and advertising measurement stay off until enabled here. You can update this choice anytime in Cookie Settings.</p><div className="cookie-options">{groups.map(([id, label, status, detail]) => <label className="cookie-option" key={id}><span><b>{label}</b><small>{detail}</small></span><span className="cookie-toggle"><input type="checkbox" checked={id === 'necessary' ? true : preferences[id]} disabled={id === 'necessary'} onChange={(event) => setPreferences((current) => ({ ...current, [id]: event.target.checked }))} /><i /></span><em>{status}</em></label>)}</div>{saved && <p className="form-status" role="status">Your preferences have been saved in this browser.</p>}<div className="dialog-actions"><button className="button button-outline" onClick={() => save({ analytics: false, marketing: false, functional: false })}>Reject optional</button><button className="button audit-submit" onClick={() => save(preferences)}>Save preferences</button><button className="button button-outline" onClick={() => save({ analytics: true, marketing: true, functional: true })}>Accept all</button></div></section></div>;
}

function CookieNotice({ onAccept, onReject, onSettings }) {
  return <aside className="cookie-notice" aria-label="Cookie preferences">
    <div><b>Your privacy choices</b><p>Optional analytics and advertising measurement are off until you choose. You can change this anytime in Cookie Settings.</p></div>
    <div className="cookie-notice-actions"><button type="button" onClick={onReject}>Reject optional</button><button type="button" onClick={onSettings}>Settings</button><button type="button" onClick={onAccept}>Accept all</button></div>
  </aside>;
}

function LegalDialog({ title, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="legal-dialog" role="dialog" aria-modal="true" aria-labelledby="legal-title"><div className="dialog-heading"><div><p className="eyebrow">SEOPune360</p><h2 id="legal-title">{title}</h2></div><button className="icon-button" aria-label="Close" onClick={onClose}>×</button></div><p>The {title.toLowerCase()} link is ready, but approved policy wording has not been supplied for this website yet. Add your final business-approved policy text here before publishing.</p><a className="text-link" href={'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('Request SEOPune360 ' + title)}>Request the current policy <ArrowIcon /></a></section></div>;
}

function InsideHero({ kicker, title, accent, copy, compact = false }) {
  return <section className={compact ? 'inside-hero inside-hero-compact' : 'inside-hero'}><div className="container inside-hero-inner"><p className="eyebrow">{kicker}</p><h1>{title} <span>{accent}</span></h1><p>{copy}</p>{!compact && <a className="button" href="/contact/">Let’s talk <ArrowIcon /></a>}</div></section>;
}

function ContentCards({ items, render }) {
  return <div className="container content-card-grid">{items.map((item) => render(item))}</div>;
}

function ServiceClientPortfolio({ service }) {
  const projects = clients.filter((client) => client.serviceIds.includes(service.id));
  if (!projects.length) return null;
  return <section className="section website-projects"><div className="container">
    <div className="section-title-row"><div><p className="eyebrow">{service.title}</p><h2>Client work.<br /><span>Across different industries.</span></h2></div><p className="section-intro">Explore the clients and project scopes for this service.</p></div>
    <div className="case-explorer-grid">{projects.map((project, index) => <PortfolioCard key={project.id} item={project} priority={index < 3} />)}</div>
  </div></section>;
}

function CaseStudyExplorer() {
  const categories = ['All sectors', ...new Set(caseStudies.flatMap((item) => item.industries))];
  const serviceFilters = ['All services', ...new Set(caseStudies.flatMap((item) => item.serviceTypes))];
  const [activeServiceFilter, setActiveServiceFilter] = useState('All services');
  const [activeCategory, setActiveCategory] = useState('All sectors');
  const visibleStudies = caseStudies.filter((item) => (activeCategory === 'All sectors' || item.industries.includes(activeCategory)) && (activeServiceFilter === 'All services' || item.serviceTypes.includes(activeServiceFilter)));
  return <section className="section case-explorer-section"><div className="container case-explorer">
    <div className="case-explorer-heading"><div><p className="eyebrow">Client portfolio</p><h2>Find work by <span>service and industry.</span></h2></div><p>Explore our clients and the services delivered for each business.</p></div>
    <div className="case-filter-list" role="group" aria-label="Filter clients by service">{serviceFilters.map((label) => <button className={'case-filter' + (activeServiceFilter === label ? ' active' : '')} key={label} type="button" aria-pressed={activeServiceFilter === label} onClick={() => setActiveServiceFilter(label)}>{label}</button>)}</div>
    <div className="case-filter-list" role="group" aria-label="Filter case studies by sector">{categories.map((category) => <button className={'case-filter' + (activeCategory === category ? ' active' : '')} key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}>{category}</button>)}</div>
    <p className="case-result-count" aria-live="polite">{visibleStudies.length} {visibleStudies.length === 1 ? 'client' : 'clients'} shown</p>
    <div className="case-explorer-grid">{visibleStudies.length === 0 && <p className="content-note">No clients match this service and industry combination. Try another filter.</p>}{caseStudies.map((item) => <PortfolioCard key={item.id} item={item} hidden={!visibleStudies.includes(item)} priority={visibleStudies.indexOf(item) >= 0 && visibleStudies.indexOf(item) < 3} />)}</div>
    <p className="content-note">Select a client to explore its project scope.</p>
  </div></section>;
}


function GrowthPlanPage() {
  const goals = {
    enquiries: { label: 'Get more enquiries', serviceId: 'leads', summary: 'Connect paid campaigns, a focused landing page, and enquiry tracking.', steps: ['Clarify the audience, offer, and enquiry journey.', 'Prepare a landing page and tracking, then launch a measured campaign test.', 'Review enquiry quality and campaign data, then refine the next round.'] },
    sales: { label: 'Grow online sales', serviceId: 'leads', summary: 'Plan a clear path from product discovery to purchase across campaigns and product pages.', steps: ['Choose priority products, audiences, and an offer.', 'Build campaign and product-page journeys with conversion tracking.', 'Review performance, then adjust creative and targeting.'] },
    visibility: { label: 'Improve search visibility', serviceId: 'seo', summary: 'Strengthen the search and website foundations behind your priority pages.', steps: ['Review technical health, search intent, and priority pages.', 'Improve content, on-page SEO, and local or sector relevance.', 'Review Search Console and analytics signals, then expand the content plan.'] },
    brand: { label: 'Build brand awareness and trust', serviceId: 'branding', summary: 'Clarify what makes the business distinct and carry that message across customer touchpoints.', steps: ['Define the audience, positioning, and key messages.', 'Develop a consistent visual and verbal direction.', 'Apply it to priority website and campaign assets, then gather feedback.'] },
    website: { label: 'Improve my website experience', serviceId: 'development', summary: 'Make key website journeys clearer, faster, and easier to complete.', steps: ['Review navigation, mobile experience, speed, and conversion paths.', 'Prioritize and improve the pages with the clearest customer impact.', 'Review usage and feedback, then refine remaining pages and integrations.'] },
  };
  const [goal, setGoal] = useState('');
  const [industry, setIndustry] = useState('Not sure yet');
  const [website, setWebsite] = useState('');
  const [timing, setTiming] = useState('Exploring options');
  const [built, setBuilt] = useState(false);
  const plan = built && goals[goal];
  const service = plan && services.find((item) => item.id === plan.serviceId);
  function sendPlan() {
    if (!plan || !service) return;
    const message = [
      'I used the SEOPune360 growth planner and would like to discuss this suggested plan.',
      'Primary goal: ' + plan.label,
      'Industry: ' + industry,
      'Website: ' + (website || 'Not provided'),
      'Preferred timing: ' + timing,
      'Suggested service: ' + service.title,
      'Suggested 30 / 60 / 90 day sequence:',
      ...plan.steps.map((step, index) => (['Days 1–30: ', 'Days 31–60: ', 'Days 61–90: '][index] + step)),
    ].join('\n');
    try { window.sessionStorage.setItem('seopune360-growth-plan', JSON.stringify({ service: service.title, website, message })); } catch { /* The contact form can still be completed manually. */ }
    window.location.assign('/contact/?growth-plan=1');
  }
  return <section className="section growth-plan-section"><div className="container growth-plan-layout">
    <div className="growth-plan-intro"><p className="eyebrow">A useful starting point</p><h2>What are you <span>working toward?</span></h2><p>Answer a few short questions to get a practical service recommendation and suggested first 90 days. Review it before deciding whether to contact us.</p>
      <form className="growth-plan-form" onSubmit={(event) => { event.preventDefault(); setBuilt(true); }}>
        <label>What is your main goal?<select required value={goal} onChange={(event) => { setGoal(event.target.value); setBuilt(false); }}><option value="" disabled>Select a goal</option>{Object.entries(goals).map(([id, item]) => <option key={id} value={id}>{item.label}</option>)}</select></label>
        <label>Which sector is closest?<select value={industry} onChange={(event) => setIndustry(event.target.value)}><option>Not sure yet</option>{industries.filter((item) => item.id !== 'All industries').map((item) => <option key={item.id}>{item.label}</option>)}<option>Other</option></select></label>
        <label>Website <span className="contact-optional">Optional</span><input type="url" inputMode="url" placeholder="https://yourwebsite.com" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
        <label>When are you looking to start?<select value={timing} onChange={(event) => setTiming(event.target.value)}><option>As soon as practical</option><option>Within 1–3 months</option><option>Exploring options</option></select></label>
        <button className="button" type="submit">Build my plan <ArrowIcon /></button>
      </form>
    </div>
    <div className="growth-plan-result" aria-live="polite">{plan && service ? <>
      <p className="eyebrow">Your suggested starting point</p><h3>{service.title}</h3><p>{plan.summary}</p>
      <div className="growth-plan-context"><span>{industry}</span><span>{timing}</span></div>
      <ol>{plan.steps.map((step, index) => <li key={step}><span>{['Days 1–30', 'Days 31–60', 'Days 61–90'][index]}</span>{step}</li>)}</ol>
      <button className="button" type="button" onClick={sendPlan}>Discuss this plan by email <ArrowIcon /></button><p className="growth-plan-note">The plan is a starting point. Scope and timing can be tailored after we understand your business.</p>
    </> : <><p className="eyebrow">Your plan will appear here</p><h3>Start with the outcome you want.</h3><p>We’ll suggest a service area and a phased sequence based on the goal and context you share.</p><a className="text-link" href="/case-studies/">Explore published client work <ArrowIcon /></a></>}</div>
  </div></section>;
}

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState('');
  const [formStartedAt, setFormStartedAt] = useState('');
  const [automotive, setAutomotive] = useState(false);
  const [planContext, setPlanContext] = useState(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormStartedAt(Date.now());
    setAutomotive(params.get('source') === 'automotive');
    if (params.get('growth-plan') === '1') {
      try {
        setPlanContext(JSON.parse(window.sessionStorage.getItem('seopune360-growth-plan') || 'null'));
      } catch { /* The visitor can still fill out the form manually. */ }
    }
  }, []);

  async function handleContactSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    if (payload._honey) return;
    payload.message = payload.message.trim() || (automotive ? 'Interested in automotive lead generation.' : 'Please contact me about my enquiry.');
    if (automotive) payload.message = 'Automotive portfolio enquiry. ' + payload.message;
    setSubmitting(true);
    setFormError('');
    try {
      const response = await fetch('https://seopune360-audit-module.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error(result.error || 'We could not send your enquiry right now.');
      setSent(true);
      form.reset();
    } catch (error) {
      setFormError(error instanceof Error && error.message !== 'Failed to fetch'
        ? error.message
        : 'We could not reach the email service. Please try again or email seopune360@gmail.com directly.');
    } finally {
      setSubmitting(false);
    }
  }

  return <div className="contact-page"><section className="contact-hero">
    <div className="container contact-hero-grid">
      <div className="contact-intro">
        <p className="eyebrow">Let’s talk</p>
        <h1>Ready for <span>more enquiries?</span></h1>
        <p className="contact-lead">Tell us a little about your business and we’ll help you find the right next step.</p>
        <div className="contact-direct">
          <a href="tel:+918483837969"><span className="contact-direct-icon">↗</span><span><small>Call us</small><b>+91 84838 37969</b></span><ArrowIcon /></a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><span className="contact-direct-icon">↗</span><span><small>Message us</small><b>WhatsApp</b></span><ArrowIcon /></a>
          <a href={'mailto:' + CONTACT_EMAIL}><span className="contact-direct-icon">@</span><span><small>Email us</small><b>{CONTACT_EMAIL}</b></span><ArrowIcon /></a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><span className="contact-direct-icon"><LinkedInIcon /></span><span><small>Follow our work</small><b>Connect on LinkedIn</b></span><ArrowIcon /></a>
        </div>
      </div>
      <div className="contact-form-card" id="enquiry">
        <div className="contact-form-heading"><p className="eyebrow">Send an enquiry</p><h2>Let’s get started.</h2><p>Share your details and we’ll get back to you.</p></div>
        <form className="contact-form" onSubmit={handleContactSubmit}>
          <input type="text" name="_honey" className="contact-honey" tabIndex="-1" autoComplete="off" aria-hidden="true" />
          <input type="hidden" name="_started_at" value={formStartedAt} />
          <input type="hidden" name="_subject" value="New SEOPune360 website enquiry" />
          {planContext?.website && <input type="hidden" name="website" value={planContext.website} />}
          <div className="contact-form-grid">
            <label>Full name<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label>
            <label>Phone number <span className="contact-optional">Optional</span><input name="phone" type="tel" placeholder="+91" autoComplete="tel" /></label>
            <label className="contact-form-wide">Email address<input name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></label>
            <label className="contact-form-wide">What can we help with?
              <select name="service" defaultValue={planContext?.service || (automotive ? 'Lead Generation' : 'Not sure yet')} required>
                <option value="Not sure yet">Not sure yet</option>
                {services.map((service) => <option key={service.id} value={service.title}>{service.title}</option>)}
              </select>
            </label>
            <label className="contact-form-wide">Anything else? <span className="contact-optional">Optional</span><textarea name="message" rows="3" placeholder="Tell us about your business or goals" defaultValue={planContext?.message || ''} /></label>
          </div>
          <button className="button contact-submit" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send my enquiry'} <ArrowIcon /></button>
          <p className="contact-form-privacy">By submitting, you agree that SEOPune360 may contact you about your enquiry.</p>
          {sent && <p className="contact-form-status" role="status">Thank you. Your enquiry has been sent to the SEOPune360 team.</p>}
          {formError && <p className="contact-form-error" role="alert">{formError}</p>}
        </form>
      </div>
    </div>
    <div className="contact-hero-glow" aria-hidden="true" />
  </section></div>;
}

const artworkOrder = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

function BrandingGalleryFigure({ children }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setRevealed(true);
      observer.disconnect();
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <figure ref={ref} className="project-figure project-figure-artwork" data-revealed={revealed}>{children}</figure>;
}

function PortfolioCard({ item, priority = false, hidden = false }) {
  const [failedImage, setFailedImage] = useState(null);
  const artwork = brandingProjects.find(project => project.id === item.id)?.artworks[0];
  const image = artwork?.src || item.portfolioPreview || item.gallery?.[0]?.src;

  return <a hidden={hidden} className="portfolio-card" href={'/case-studies/' + item.id + '/'}>
    <span className="portfolio-visual">
      {image && failedImage !== image
        ? <img className={artwork ? undefined : 'portfolio-homepage-capture'} src={image} alt="" loading="lazy"
          decoding="async" fetchPriority={priority ? 'high' : undefined} onError={() => setFailedImage(image)} />
        : <span className="portfolio-no-image" aria-hidden="true"><ClientLogo client={item} /></span>}
    </span>
    <span className="portfolio-card-copy"><strong>{item.name}</strong><span className="portfolio-service">{item.service}</span></span>
  </a>;
}

function AutomotivePortfolio() {
  return <div className="automotive-grid">{automotiveProjects.map(({ id }, index) => <PortfolioCard key={id} item={clients.find(client => client.id === id)} priority={index < 3} />)}</div>;
}

function ServiceBreadcrumbs({ path, title }) {
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services/' },
    { name: title, path }
  ];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).href
    }))
  };
  return <div className="container service-breadcrumbs">
    <nav aria-label="Breadcrumb"><ol>
      {trail.map(item => <li key={item.path}>{item.path === path
        ? <span aria-current="page">{item.name}</span>
        : <a href={item.path}>{item.name}</a>}</li>)}
    </ol></nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema).replaceAll('<', '\\u003c')}} />
  </div>;
}

function PageContent({ path, onStart }) {
  const parts = path.split('/').filter(Boolean);
  const page = parts[0] || '';
  const service = page === 'services' && parts[1] ? services.find((item) => servicePaths[item.id] === path) : null;
  const caseStudy = page === 'case-studies' && parts[1] ? caseStudies.find((item) => item.id === parts[1]) : null;
  const industry = page === 'industries' && parts[1] ? industries.find((item) => industryPath(item.id) === path) : null;
  const intro = { 'growth-plan': ['Growth plan', 'Build a plan', 'around your goals.', 'Answer a few short questions to get a practical service recommendation and a suggested first 90 days.'], services: ['Services', 'Find the right support', 'for your next stage.', 'Explore connected services across search, website experience, lead generation, and growth.'], 'case-studies': ['Client stories', 'Work grounded in', 'real businesses.', 'Browse SEOPune360 client stories, marketing channel mixes, and reported outcomes where available.'], portfolio: ['Client portfolio', 'Businesses we’ve', 'worked with.', 'Explore businesses represented in the current SEOPune360 client portfolio.'], products: ['Products & platforms', 'Digital journeys,', 'built around people.', 'Explore the client products and platform journeys represented in SEOPune360’s published portfolio.'], industries: ['Industries', 'Different sectors,', 'clear digital paths.', 'Explore the industries represented in the current client portfolio.'], about: ['About SEOPune360', 'Search, websites,', 'and business growth.', 'We bring digital foundations together to help people find your business, understand what you offer, and take the next step.'], process: ['Our process', 'From a clear goal', 'to the next improvement.', 'See how discovery, strategy, design, development, review, and support fit together.'], contact: ['Get in touch', 'Let’s talk about', 'your next step.', 'Tell us what you are working toward and we’ll help identify a useful place to start.'], sitemap: ['Website sitemap', 'Explore the site', 'page by page.', 'Browse SEOPune360 pages, services, client stories, and industries from one place.'] };
  let head = intro[page];
  let items = [];
  let body = null;
  if (service) {
    head = ['Our services', service.title, 'for business growth.', service.summary];
    body = <><section className="section"><div className="container detail-layout"><div><p className="eyebrow">What’s included</p><h2>Focused work, <span>built around your goals.</span></h2><p>{serviceIntro(service.id) || service.summary}</p><RequirementButton className="button" onStart={onStart} serviceId={service.id}>Discuss this service <ArrowIcon /></RequirementButton></div><ul className="detail-points">{service.items.map((item) => <li key={item}><span>↗</span>{item}</li>)}</ul></div></section><ServiceDeliverables id={service.id} />{service.id === 'branding' ? <BrandingPortfolio onStart={onStart} /> : <ServiceClientPortfolio service={service} />}</>;
  } else if (page === 'services') items = services;
  else if (caseStudy) {
    head = [caseStudy.label + ' · ' + caseStudy.category, caseStudy.headline || caseStudy.label, '', caseStudy.copy];
    body = <ClientProjectPage key={caseStudy.id} client={caseStudy} />;
  } else if (page === 'case-studies') items = caseStudies;
  else if (page === 'portfolio' || page === 'products') items = clients;
  else if (industry && industry.id === 'Automobile') {
    head = ['Automotive lead generation', 'More local enquiries', 'for your dealership.', 'We help car dealerships and service centres attract local customers through SEO, dedicated websites, landing pages and strong paid promotions.'];
    body = <><section className="section"><div className="container detail-layout"><div><p className="eyebrow">More conversations with customers</p><h2>Turn local searches into <span>calls and enquiries.</span></h2><p>From being found online to making it easy for customers to contact your team, we help put your dealership in front of the right people.</p><RequirementButton className="button" onStart={onStart} serviceId="leads" industry="Automobile">Share your dealership requirements</RequirementButton></div><div><p>Looking to grow sales enquiries or service bookings? Let’s discuss your dealership and the customers you want to reach.</p><a className="text-link" href="tel:+918483837969">Call +91 8483837969 <ArrowIcon /></a></div></div></section>
      <section className="section"><div className="container"><p className="eyebrow">Our automotive experience</p><h2>Automotive businesses <span>we have worked with.</span></h2><p>Explore the automotive websites in our portfolio, from dealerships to service centres across Pune, Thane and Indore.</p><AutomotivePortfolio /></div></section>
      <section className="section"><div className="container"><p className="eyebrow">How we help</p><h2>What we can offer <span>your dealership.</span></h2><div className="content-card-grid">
        <article className="content-card"><h2>SEO</h2><p>Help local customers find your dealership when they search for cars, showrooms and service centres online.</p></article>
        <article className="content-card"><h2>Google Business Profile</h2><p>Manage and improve your profile so customers can find your business on Google Search and Maps and contact your team.</p></article>
        <article className="content-card"><h2>Dedicated websites and landing pages</h2><p>Make it easy for customers to explore your offering, call your team or submit an enquiry.</p></article>
        <article className="content-card"><h2>GEO visibility</h2><p>Help more potential customers discover your dealership through relevant searches.</p></article>
        <article className="content-card"><h2>Paid advertising</h2><p>Promote a model, offer or location to reach more interested customers when you need additional enquiries.</p></article>
        <article className="content-card"><h2>Calls and enquiries</h2><p>Give your sales and service teams more opportunities to speak with potential customers by phone or through website enquiries.</p></article>
      </div></div></section><section className="section"><div className="container detail-layout"><div><p className="eyebrow">Let’s talk</p><h2>Ready to grow <span>your dealership?</span></h2><p>Tell us about your business and the customers you want to reach.</p><a className="button" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Talk to us on WhatsApp</a></div><div><p><a href="tel:+918483837969">+91 8483837969</a></p><p><a href="mailto:seopune360@gmail.com">seopune360@gmail.com</a></p><a className="text-link" href="/contact/">Contact our team <ArrowIcon /></a></div></div></section></>;
  }
  else if (industry) {
    head = [industry.label + ' digital growth', 'Digital experiences', 'for ' + industry.label + '.', 'Explore the client work currently published for this sector, and the services that can support its next stage.'];
    items = clients.filter((client) => client.industries.includes(industry.label));
    body = <section className="section"><div className="container">{items.length === 0 ? <div className="empty-state"><h2>No published client case study for this category yet.</h2><p>We can still discuss the search and website needs of your business.</p><a className="button" href="/contact/">Talk with us <ArrowIcon /></a></div> : <><p className="eyebrow">Relevant services</p><div className="simple-links">{services.filter((item) => items.some((client) => client.serviceIds.includes(item.id))).map((item) => <a href={servicePaths[item.id]} key={item.id}>{item.title}<ArrowIcon /></a>)}</div></>}</div></section>;
  } else if (page === 'industries') items = industries.filter((item) => item.id !== 'All industries');
  else if (page === 'process') body = <Process />;
  else if (page === 'about') body = <WhyUs />;
  else if (page === 'contact') body = null;
  else if (page === 'growth-plan') body = <GrowthPlanPage />;
  else if (page === 'sitemap') {
    const sitemapGroups = [
      ['Main pages', [
        ['Home', '/'],
        ['All Services', '/services/'],
        ['All Case Studies', '/case-studies/'],
        ['Client Portfolio', '/portfolio/'],
        ['Products & Platforms', '/products/'],
        ['Industries', '/industries/'],
        ['About Us', '/about/'],
        ['How We Work', '/process/'],
        ['Contact', '/contact/'],
        ['Build my growth plan', '/growth-plan/'],
      ]],
      ['Services', services.map((item) => [item.title, servicePaths[item.id]])],
      ['Client Stories', caseStudies.map((item) => [item.label, `/case-studies/${item.id}/`])],
      ['Industries', industries.filter((item) => item.id !== 'All industries').map((item) => [item.label, industryPath(item.id)])],
    ];
    body = <section className="section sitemap-content"><div className="container"><div className="sitemap-grid">{sitemapGroups.map(([title, links]) => <section className="sitemap-group" key={title}><h2>{title}</h2><ul>{links.map(([label, href]) => <li key={href}><a href={href}>{label}<ArrowIcon /></a></li>)}</ul></section>)}</div></div></section>;
  }
  if (!head) head = ['SEOPune360', 'A practical digital', 'growth partner.', 'Explore services, client stories, and ways to work together.'];
  useEffect(() => {
    document.title = caseStudy ? `${caseStudy.label} Client Story | SEOPune360` : `${head[1]} ${head[2].replace(/[.]/g, '')} | SEOPune360`;
    window.scrollTo(0, 0);
  }, [path]);
  if (page === 'contact') return <ContactPage />;
  const renderCard = (item) => {
    if (page === 'services') return <article className="content-card service-requirement-card" key={item.id}><h2>{item.title}</h2><p>{item.summary}</p><RequirementButton className="text-link" onStart={onStart} serviceId={item.id}>Start {item.title} project <ArrowIcon /></RequirementButton></article>;
    if (page === 'industries' && !industry) return <a className="content-card" href={industryPath(item.id)} key={item.id}><span className="card-number">SECTOR</span><h2>{item.label}</h2><p>Explore the client work and digital growth needs represented in this sector.</p><span className="text-link">Explore industry <ArrowIcon /></span></a>;
    if (page === 'case-studies') return <a className="content-card" href={'/case-studies/' + item.id + '/'} key={item.id}><span className="card-number">{item.category}</span><h2>{item.label}</h2><p>{item.copy}</p><span className="text-link">Read client story <ArrowIcon /></span></a>;
    return <PortfolioCard key={item.id || item.name} item={item} priority={items.indexOf(item) < 3} />;
  };
  const titleParts = head[1].split(' ');
  return <>{service && <ServiceBreadcrumbs path={path} title={service.title} />}<InsideHero kicker={head[0]} title={titleParts.slice(0, Math.max(1, titleParts.length - 1)).join(' ')} accent={titleParts.length > 1 ? titleParts.slice(-1).join(' ') + (head[2] ? ' ' + head[2] : '') : head[2]} copy={head[3]} compact={page === 'portfolio' || Boolean(caseStudy)} />
    {page === 'portfolio' && <Suspense fallback={null}><FeaturedDealerships /></Suspense>}
    {((page === 'case-studies' && !caseStudy) || page === 'portfolio') ? <CaseStudyExplorer /> : items.length > 0 && <section className="section"><ContentCards items={items} render={renderCard} />{page === 'industries' && !industry && <p className="container content-note">A published client case study is not currently listed for every sector.</p>}{industry && items.length === 0 && <div className="container empty-state"><h2>No published client case study for this category yet.</h2><p>We can still discuss the search and website needs of your business.</p><a className="button" href="/contact/">Talk with us <ArrowIcon /></a></div>}</section>}{body}</>;
}

function App({ pathname = '/' }) {
  const cleanPath = pathname.replace(/\/+$/, '');
  const path = cleanPath ? cleanPath + '/' : '/';
  const [activeIndustry, setActiveIndustry] = useState('All industries');
  const [activeService, setActiveService] = useState('seo');
  const [activeCase, setActiveCase] = useState(caseStudies[0].id);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [cookieNoticeOpen, setCookieNoticeOpen] = useState(false);
  useEffect(() => {
    try {
      setCookieNoticeOpen(!window.localStorage.getItem('seopune360-cookie-preferences'));
    } catch {
      setCookieNoticeOpen(true);
    }
  }, []);
  const [legalTitle, setLegalTitle] = useState('');
  const [requirementRequest, setRequirementRequest] = useState(null);
  const opener = useRef(null);
  const startRequirements = useCallback((trigger, serviceId, industry) => {
    opener.current = trigger;
    setRequirementRequest({ serviceId, industry });
  }, []);
  const closeRequirements = useCallback(() => {
    setRequirementRequest(null);
    opener.current?.focus({ preventScroll: true });
  }, []);
  const pageService = services.find((service) => servicePaths[service.id] === path);
  const startPageRequirements = (trigger) => startRequirements(trigger, pageService?.id);
  if (path.startsWith(showcasePath)) {
    return <Suspense fallback={<p className="container" role="status">Loading automotive showcase…</p>}><AutomotiveShowcase path={path} /></Suspense>;
  }
  const showProjectBanner = path !== '/portfolio/' && !(path.startsWith('/case-studies/') && path !== '/case-studies/');

  return <div className="page-shell">
    <Header onStart={startPageRequirements} />
    <main>{path === '/' ? <><Hero onPlayShowreel={() => setShowreelOpen(true)} onStart={startRequirements} /><ClientSelector activeIndustry={activeIndustry} setActiveIndustry={setActiveIndustry} /><Services activeService={activeService} setActiveService={setActiveService} onStart={startRequirements} /><CaseStudies activeCase={activeCase} setActiveCase={setActiveCase} /><Process /><WhyUs /><HomeQuestions /><AuditSection /></> : <PageContent path={path} onStart={startRequirements} />}</main>
    <Footer onCookieSettings={() => setCookieOpen(true)} onLegal={setLegalTitle} onStart={startPageRequirements} showProjectBanner={showProjectBanner} />
    {cookieNoticeOpen && <CookieNotice onAccept={() => { applyCookiePreferences({ analytics: true, marketing: true, functional: true }); setCookieNoticeOpen(false); }} onReject={() => { applyCookiePreferences({ analytics: false, marketing: false, functional: false }); setCookieNoticeOpen(false); }} onSettings={() => setCookieOpen(true)} />}
    {showreelOpen && <ShowreelModal onClose={() => setShowreelOpen(false)} />}
    {cookieOpen && <CookieDialog onClose={() => setCookieOpen(false)} onSaved={() => setCookieNoticeOpen(false)} />}
    {legalTitle && <LegalDialog title={legalTitle} onClose={() => setLegalTitle('')} />}
    {requirementRequest && <Suspense fallback={<p className="container" role="status">Loading the project form…</p>}><ServiceRequirementFlow request={requirementRequest} onClose={closeRequirements} services={services} clients={clients} servicePaths={servicePaths} contactEmail={CONTACT_EMAIL} /></Suspense>}
  </div>;
}

export default App;








