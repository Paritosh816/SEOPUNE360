import { useEffect, useState } from 'react';
const CONTACT_EMAIL = 'seopune360@gmail.com';
const SHOWREEL_PATH = '/media/seopune360-client-showreel.mp4';

const industries = [
  { id: 'All industries', label: 'All industries' },
  { id: 'B2B', label: 'B2B' },
  { id: 'Hospitality', label: 'Hospitality' },
  { id: 'Fintech', label: 'Fintech' },
  { id: 'Automobile', label: 'Automobile' },
  { id: 'B2C', label: 'B2C' },
  { id: 'Real Estate', label: 'Real Estate' },
  { id: 'Healthcare', label: 'Healthcare' },
];

const clients = [
  { name: 'KJ Group', type: 'Real Estate', description: 'Real estate group serving buyers and investors across Pune.', tone: 'logo-kj' },
  { name: 'Crevolution LLP', type: 'B2B', description: 'Architecture and interior design studio with a project-led service journey.', tone: 'logo-crevolution' },
  { name: 'Rivan Travels', type: 'B2C', description: 'Travel company focused on discoverability and booking enquiries.', tone: 'logo-rivan' },
  { name: 'Shaw Tata', type: 'Automobile', description: 'Tata Motors dealership with local search and test-drive enquiries.', tone: 'logo-tata' },
  { name: 'Shaw Toyota', type: 'Automobile', description: 'Toyota dealership serving customers across the Pune region.', tone: 'logo-toyota' },
  { name: 'Krishna Classical Homoeopathy Clinic', type: 'Healthcare', description: 'Healthcare clinic connecting local patients with its services.', tone: 'logo-krishna' },
  { name: 'Hotel Shivtara', type: 'Hospitality', description: 'Hotel website and local visibility for guests planning a stay.', tone: 'logo-shivtara' },
];

const caseStudies = [
  {
    id: 'kj-group', label: 'KJ Group', category: 'Real Estate', mark: 'KJ GROUP', tone: 'case-realestate',
    copy: 'A clearer local search presence and more useful property journeys helped KJ Group connect with people looking for real estate in Pune.',
    metrics: ['+210% organic traffic', '48 monthly site-visit leads', '12 local keywords in the top 3'],
  },
  {
    id: 'crevolution', label: 'Crevolution LLP', category: 'Architecture & Interiors', mark: 'CREVOLUTION', tone: 'case-architecture',
    copy: 'A stronger search foundation helped Crevolution reach people looking for architecture and interior design services in Pune.',
    metrics: ['+165% organic traffic', '22 monthly project enquiries', 'Top 5 for “architects in Pune”'],
  },
  {
    id: 'rivan-travels', label: 'Rivan Travels', category: 'Travel', mark: 'RIVAN TRAVELS', tone: 'case-travel',
    copy: 'Search-focused pages and a more direct booking journey made it easier for travellers to discover and enquire with Rivan Travels.',
    metrics: ['+230% organic traffic', '+85% bookings', '18,000 monthly visits'],
  },
  {
    id: 'shaw-tata', label: 'Shaw Tata', category: 'Automobile', mark: 'TATA MOTORS', tone: 'case-automobile',
    copy: 'Local search improvements helped nearby customers find the dealership, explore vehicles, and take the next step toward a test drive.',
    metrics: ['+155% local traffic', '60+ monthly test-drive leads', '12 local terms in the top 3'],
  },
  {
    id: 'shaw-toyota', label: 'Shaw Toyota', category: 'Automobile', mark: 'TOYOTA', tone: 'case-toyota',
    copy: 'A focused local visibility programme strengthened discovery for the dealership and its vehicle range across Pune.',
    metrics: ['+190% local traffic', '600 monthly leads', 'Top local visibility for Toyota showroom searches'],
  },
  {
    id: 'krishna-clinic', label: 'Krishna Classical Homoeopathy Clinic', category: 'Healthcare', mark: 'KRISHNA CLINIC', tone: 'case-healthcare',
    copy: 'The clinic improved local discoverability and made it simpler for patients to understand its services and request an appointment.',
    metrics: ['+205% organic traffic', '95 monthly appointment enquiries', 'Top 3 for local homeopathy searches'],
  },
  {
    id: 'hotel-shivtara', label: 'Hotel Shivtara', category: 'Hospitality', mark: 'HOTEL SHIVTARA', tone: 'case-hospitality',
    copy: 'A fast, locally focused hotel experience made key information easier to find for people planning a stay in Pune.',
    metrics: ['95+ PageSpeed score', 'Top 3 for hotel keywords', 'Top local map visibility'],
  },
];

const services = [
  { id: 'seo', number: '01', title: 'Search Engine Optimization', summary: 'Build lasting visibility for the searches that matter to your business.', items: ['Technical and on-page SEO', 'Local SEO and Google Business Profile', 'Content and keyword strategy'], type: 'search' },
  { id: 'geo', number: '02', title: 'AI Search & GEO', summary: 'Make your expertise easier to discover across search engines and AI answer experiences.', items: ['Entity and topic clarity', 'Structured content foundations', 'AI search visibility reviews'], type: 'ai' },
  { id: 'leads', number: '03', title: 'Lead Generation', summary: 'Create a clear path from discovery to a useful sales conversation.', items: ['Landing page planning', 'Conversion journey improvements', 'Campaign and enquiry support'], type: 'leads' },
  { id: 'design', number: '04', title: 'Website Design', summary: 'Give customers a confident, easy-to-use experience that reflects your brand.', items: ['UX and information architecture', 'Responsive visual design', 'Conversion-focused page layouts'], type: 'design' },
  { id: 'development', number: '05', title: 'Website Development', summary: 'Build a fast, accessible website that is ready to support your next stage of growth.', items: ['Responsive front-end development', 'CMS and integrations', 'Performance and accessibility'], type: 'development' },
  { id: 'growth', number: '06', title: 'Total Business Growth', summary: 'Connect search, content, and website improvements into a focused growth plan.', items: ['SEO and content planning', 'Website conversion improvements', 'Measurement and iteration'], type: 'growth' },
];

const processSteps = [
  { title: 'Discovery & goals', phase: 'Kick-off', weeks: 'Week 1–2', start: 1, span: 2, color: 'gold', icon: '◎' },
  { title: 'Strategy & direction', phase: 'Strategy', weeks: 'Week 2–3', start: 2, span: 2, color: 'mint', icon: '↗' },
  { title: 'Design & content', phase: 'Design', weeks: 'Week 3–5', start: 3, span: 3, color: 'lime', icon: '▧' },
  { title: 'Development', phase: 'Build', weeks: 'Week 4–6', start: 4, span: 3, color: 'blue', icon: '⌘' },
  { title: 'Review & QA', phase: 'Quality', weeks: 'Week 6–7', start: 6, span: 2, color: 'green', icon: '✓' },
  { title: 'Launch & support', phase: 'Launch', weeks: 'Week 7–8', start: 7, span: 2, color: 'violet', icon: '↗' },
];

const auditItems = [
  ['Search visibility', 'On-page and local search foundations'],
  ['Website experience', 'Navigation, mobile usability, and clarity'],
  ['Technical health', 'Speed, accessibility, and structure'],
  ['Content & trust', 'Useful information and proof points'],
  ['Conversion journey', 'Calls to action and enquiry paths'],
];

const aboutLinks = [['About Us', '#about'], ['Our Process', '#process'], ['Selected Work', '#case-studies']];

function Brand({ footer = false }) {
  const logoFilter = footer ? 'brand-logo-key-footer' : 'brand-logo-key-header';
  return (
    <a className={'brand' + (footer ? ' brand-footer' : '')} href="#top" aria-label="SEOPune360 home">
      <svg className="brand-logo" viewBox="190 110 2970 460" aria-hidden="true">
        <defs>
          <filter id={logoFilter} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 0.318
              0 0 0 0 0.761
              0 0 0 0 0.737
              -0.634 -2.135 -0.215 0 2.983" />
          </filter>
        </defs>
        <image href="/seopune360-logo.jpg" width="4238" height="677" filter={`url(#${logoFilter})`} />
      </svg>
    </a>
  );
}

function ArrowIcon() {
  return <svg viewBox="0 0 18 18" aria-hidden="true"><path d="M3.5 9h10m-4-4 4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Header({ onChooseService, onChooseIndustry }) {
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
  const goToService = (id) => { onChooseService(id); closeMenus(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); };
  const goToIndustry = (id) => { onChooseIndustry(id); closeMenus(); document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' }); };
  const toggleMenu = (name) => setOpenMenu((current) => current === name ? '' : name);
  const serviceMenus = [
    { title: 'Design', copy: 'Build a clearer brand experience', action: () => goToService('design') },
    { title: 'Development', copy: 'Fast, accessible website builds', action: () => goToService('development') },
    { title: 'Growth', copy: 'Search visibility and lead growth', action: () => goToService('growth') },
  ];

  const mobileMenus = [
    { id: 'website', label: 'Website', items: serviceMenus.map((item) => [item.title, item.action]) },
    { id: 'cases', label: 'Case Studies', items: [['Case Studies', () => { closeMenus(); document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' }); }], ['Portfolios', () => { closeMenus(); document.getElementById('clients')?.scrollIntoView({ behavior: 'smooth' }); }]] },
    { id: 'industries', label: 'Industries', items: industries.map((item) => [item.label, () => goToIndustry(item.id)]) },
    { id: 'company', label: 'Company', items: aboutLinks.map(([label, href]) => [label, () => { closeMenus(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }]) },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="main-nav" aria-label="Main navigation">
          <div className={'nav-item' + (openMenu === 'website' ? ' open' : '')} onMouseEnter={() => setOpenMenu('website')} onMouseLeave={() => setOpenMenu('')}>
            <button className="nav-trigger" aria-expanded={openMenu === 'website'} aria-controls="menu-website" onClick={() => toggleMenu('website')}>Website <span className="chevron" /></button>
            <div className="mega-menu mega-wide" id="menu-website" aria-hidden={openMenu !== 'website'}>
              {serviceMenus.map((item) => <button className="mega-card" key={item.title} onClick={item.action}><span>{item.title}</span><small>{item.copy}</small><i><ArrowIcon /></i></button>)}
            </div>
          </div>
          <div className={'nav-item' + (openMenu === 'cases' ? ' open' : '')} onMouseEnter={() => setOpenMenu('cases')} onMouseLeave={() => setOpenMenu('')}>
            <button className="nav-trigger" aria-expanded={openMenu === 'cases'} aria-controls="menu-cases" onClick={() => toggleMenu('cases')}>Case Studies <span className="chevron" /></button>
            <div className="mega-menu" id="menu-cases" aria-hidden={openMenu !== 'cases'}>
              <a className="menu-link" href="#case-studies" onClick={closeMenus}>Case Studies <ArrowIcon /></a>
              <a className="menu-link" href="#clients" onClick={closeMenus}>Portfolios <ArrowIcon /></a>
            </div>
          </div>
          <div className={'nav-item' + (openMenu === 'industries' ? ' open' : '')} onMouseEnter={() => setOpenMenu('industries')} onMouseLeave={() => setOpenMenu('')}>
            <button className="nav-trigger" aria-expanded={openMenu === 'industries'} aria-controls="menu-industries" onClick={() => toggleMenu('industries')}>Industries <span className="chevron" /></button>
            <div className="mega-menu industry-menu" id="menu-industries" aria-hidden={openMenu !== 'industries'}>
              {industries.map((item) => <button className="industry-menu-link" key={item.id} onClick={() => goToIndustry(item.id)}>{item.label}<ArrowIcon /></button>)}
            </div>
          </div>
          <div className={'nav-item' + (openMenu === 'company' ? ' open' : '')} onMouseEnter={() => setOpenMenu('company')} onMouseLeave={() => setOpenMenu('')}>
            <button className="nav-trigger" aria-expanded={openMenu === 'company'} aria-controls="menu-company" onClick={() => toggleMenu('company')}>Company <span className="chevron" /></button>
            <div className="mega-menu" id="menu-company">
              {aboutLinks.map(([label, href]) => <a className="menu-link" href={href} key={label} onClick={closeMenus}>{label}<ArrowIcon /></a>)}
            </div>
          </div>
        </nav>
        <a className="button header-call" href={'mailto:' + CONTACT_EMAIL + '?subject=Book%20a%20call%20with%20SEOPune360'}>Book a Call <span className="call-icon">↗</span></a>
        <button className={'menu-toggle' + (mobileOpen ? ' is-open' : '')} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={mobileOpen} aria-controls="mobile-navigation" onClick={() => setMobileOpen((value) => !value)}>
          <span /><span /><span />
        </button>
      </div>
      <div className={'mobile-nav' + (mobileOpen ? ' is-open' : '')} id="mobile-navigation" aria-hidden={!mobileOpen}>
        <div className="mobile-nav-panel">
          {mobileMenus.map((group) => <div className="mobile-group" key={group.id}>
            <button className="accordion-trigger" aria-expanded={mobileGroup === group.id} onClick={() => setMobileGroup((current) => current === group.id ? '' : group.id)}>{group.label}<span /></button>
            {mobileGroup === group.id && <div className="accordion-content">{group.items.map(([label, action]) => <button key={label} onClick={action}>{label}</button>)}</div>}
          </div>)}
          <a className="button header-call mobile-call" href={'mailto:' + CONTACT_EMAIL + '?subject=Book%20a%20call%20with%20SEOPune360'} onClick={closeMenus}>Book a Call <span className="call-icon">↗</span></a>
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
      <section className="showreel-dialog" role="dialog" aria-modal="true" aria-labelledby="showreel-title">
        <div className="dialog-heading"><div><p className="eyebrow">SEOPune360 showreel</p><h2 id="showreel-title">Client work, in motion.</h2></div><button className="icon-button" aria-label="Close video" onClick={onClose}>×</button></div>
        {!failed ? <video className="showreel-video" controls autoPlay playsInline onError={() => setFailed(true)}><source src={SHOWREEL_PATH} type="video/mp4" />Your browser does not support this video.</video> :
          <div className="video-missing"><span className="missing-play">▶</span><h3>Add your client showreel</h3><p>The player is connected and ready. Put your approved MP4 at <code>site/public/media/seopune360-client-showreel.mp4</code> and it will play here.</p><a className="button button-outline" href={'mailto:' + CONTACT_EMAIL + '?subject=SEOPune360%20showreel'}>Ask about the showcase <ArrowIcon /></a></div>}
      </section>
    </div>
  );
}

function Hero({ onPlayShowreel }) {
  const [url, setUrl] = useState('');
  const [sent, setSent] = useState(false);
  function requestAudit(event) {
    event.preventDefault();
    const normalized = /^https?:\/\//i.test(url) ? url : 'https://' + url;
    setUrl(normalized);
    setSent(true);
  }
  return (
    <section className="hero" id="top">
      <div className="hero-backdrop" aria-hidden="true"><span className="hero-orb" /><span className="hero-light-band" /></div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="rating-link"><span className="rating-symbol">S</span><span>SEOPune360</span><b>SEO + digital growth</b></div>
          <p className="eyebrow">Digital growth for ambitious businesses</p>
          <h1>Get found. Earn trust. <span>Grow with purpose.</span></h1>
          <p className="hero-lead">SEO, websites, and lead generation that help your business reach the right people and turn attention into action.</p>
          <form className="audit-form" onSubmit={requestAudit}>
            <label className="sr-only" htmlFor="hero-site-url">Your website address</label>
            <input id="hero-site-url" type="text" inputMode="url" autoComplete="url" placeholder="www.yourwebsite.com" value={url} onChange={(event) => { setUrl(event.target.value); setSent(false); }} required pattern="(https?://)?[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}.*" title="Enter a website address such as example.com" />
            <button className="button audit-submit" type="submit">Request my free audit <ArrowIcon /></button>
          </form>
          {sent ? <p className="form-status" role="status">Your request is ready. <a href={'mailto:' + CONTACT_EMAIL + '?subject=Free%20website%20audit&body=' + encodeURIComponent('Please review my website: ' + url)}>Email {CONTACT_EMAIL} to send your website address.</a></p> : <p className="audit-note"><span>✦</span> Free website review <i /> No automated scan or report is claimed here</p>}
          <p className="hero-support">From better search visibility to a clearer website journey, one team helps you make the next step count.</p>
          <div className="hero-actions"><a className="text-link" href="#services">Explore our services <ArrowIcon /></a><span className="hero-proof"><b>SEO · Web · Growth</b><small>Built around your business</small></span></div>
        </div>
        <div className="hero-art-wrap">
          <div className="art-glow" aria-hidden="true" />
          <div className="hero-art" aria-label="SEOPune360 website and client showcase preview">
            <div className="art-topline"><span className="art-dots"><i /><i /><i /></span><span>SEOPUNE360 / GROWTH IN MOTION</span><span>01 — 07</span></div>
            <div className="art-main">
              <div className="art-brand-block"><span className="art-kicker">DISCOVER · ENGAGE · GROW</span><strong>More of the<br /><em>right attention.</em></strong><span className="art-cursor"><i /> search visibility</span></div>
              <div className="art-dashboard">
                <div className="dash-head"><span>Organic growth</span><b>↗</b></div>
                <div className="dash-number"><span>Organic</span><small>Illustrative search visibility preview</small></div>
                <svg className="chart-line" viewBox="0 0 280 112" aria-hidden="true"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="currentColor" stopOpacity=".3" /><stop offset="1" stopColor="currentColor" stopOpacity="0" /></linearGradient></defs><path d="M0 95 C28 82 38 86 57 70 S91 78 111 58 137 65 155 47 189 55 205 29 236 36 280 8 L280 112 L0 112Z" fill="url(#chartFill)" /><path d="M0 95 C28 82 38 86 57 70 S91 78 111 58 137 65 155 47 189 55 205 29 236 36 280 8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
                <div className="dash-labels"><span>SEARCH</span><span>CONTENT</span><span>LEADS</span></div>
              </div>
            </div>
            <div className="art-client-strip"><span>FEATURED CLIENTS</span><b>KJ GROUP</b><b>SHAW TATA</b><b>RIVAN TRAVELS</b></div>
            <button className="showreel-play" onClick={onPlayShowreel} aria-label="Play SEOPune360 client showreel"><span>▶</span></button>
            <div className="art-side-label">SEO · GROWTH <i /> DIGITAL GROWTH</div>
          </div>
          <div className="hero-caption"><span className="caption-mark">↗</span><span><b>Built for real business goals</b><small>Search visibility · Better enquiries · Sustainable growth</small></span></div>
        </div>
      </div>
      <div className="hero-scroll container"><span>Scroll to explore</span><i /></div>
    </section>
  );
}

function ClientSelector({ activeIndustry, setActiveIndustry }) {
    const matching = activeIndustry === 'All industries' ? clients : clients.filter((client) => client.type === activeIndustry);
  return (
    <section className="client-section section" id="clients">
      <div className="container">
        <div className="client-heading"><p className="eyebrow">Trusted by businesses across industries</p><h2>Local expertise.<br /><span>Work that moves businesses forward.</span></h2><p>Explore the companies and sectors represented in SEOPune360’s published work.</p></div>
        <div className="client-browser">
          <div className="industry-list" role="tablist" aria-label="Filter clients by industry">
            {industries.map((industry) => <button className={'industry-tab' + (activeIndustry === industry.id ? ' active' : '')} key={industry.id} role="tab" id={'industry-' + industry.id.replaceAll(' ', '-')} aria-selected={activeIndustry === industry.id} aria-controls="industry-panel" onClick={() => setActiveIndustry(industry.id)}>{industry.label}<span><ArrowIcon /></span></button>)}
          </div>
          <div className="industry-results" id="industry-panel" role="tabpanel" aria-labelledby={'industry-' + activeIndustry.replaceAll(' ', '-')} key={activeIndustry}>
            {activeIndustry === 'Fintech' ? <div className="industry-empty"><span className="empty-spark">✦</span><h3>Fintech work is coming soon</h3><p>We’ll add a client story here when a relevant project is ready to share.</p></div> : <>
              <div className="client-logo-row">{matching.map((client) => <div className={'client-wordmark ' + client.tone} key={client.name} aria-label={client.name}>{client.name}</div>)}</div>
              <div className="client-description-grid">{matching.map((client) => <article className="client-description" key={client.name}><span className="client-type">{client.type}</span><p>{client.description}</p><a href="#case-studies" onClick={() => window.dispatchEvent(new CustomEvent('select-case', { detail: client.name }))}>View project <ArrowIcon /></a></article>)}</div>
            </>}
            <div className="industry-footer"><span>{matching.length || '0'} {matching.length === 1 ? 'published client story' : 'published client stories'}</span><span className="result-progress"><i /></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceIllustration({ type }) {
  return <div className={'service-visual service-visual-' + type} aria-hidden="true">
    <div className="service-visual-grain" />
    {type === 'search' && <div className="search-window"><div className="window-chrome"><i /><i /><i /><span>seopune360.com / search</span></div><div className="search-content"><span className="search-chip">GOOGLE SEARCH</span><b>Find the<br /><em>right business.</em></b><div className="search-line"><i /> Pune SEO services <span>↗</span></div><div className="search-result"><b>SEOPune360</b><span>SEO that helps your business get found.</span></div></div></div>}
    {type === 'ai' && <div className="orbit-graphic"><span className="orbit orbit-a" /><span className="orbit orbit-b" /><span className="orbit-core">AI</span><b>SEARCH<br />SIGNALS</b></div>}
    {type === 'leads' && <div className="lead-funnel"><span className="funnel-step">DISCOVER</span><span className="funnel-step">ENGAGE</span><span className="funnel-step">ENQUIRE</span><i>↘</i></div>}
    {type === 'design' && <div className="design-canvas"><div className="design-sidebar"><i /><i /><i /><i /></div><div className="design-page"><small>YOUR BRAND, CLEARER</small><b>Make a strong<br /><em>first impression.</em></b><span /><span /><span /></div></div>}
    {type === 'development' && <div className="code-window"><div className="window-chrome"><i /><i /><i /><span>responsive-build.jsx</span></div><pre><b>&lt;section</b> className=<em>"fast"</em><b>&gt;</b>{'\\n'}  <i>accessible</i> <u>responsive</u>{'\\n'}  <strong>made for growth</strong>{'\\n'}<b>&lt;/section&gt;</b></pre></div>}
    {type === 'growth' && <div className="growth-wheel"><span>SEARCH</span><span>CONTENT</span><span>WEBSITE</span><span>LEADS</span><b>GROW<br />WITH<br />INTENT</b></div>}
    <span className="visual-label">SEOPUNE360 <i /> GROWTH STUDIO</span>
  </div>;
}

function Services({ activeService, setActiveService }) {
  const current = services.find((service) => service.id === activeService) || services[0];
  return (
    <section className="services-section section" id="services">
      <div className="container">
        <div className="section-title-row"><div><p className="eyebrow">Our services</p><h2>Everything you need to <span>grow online.</span></h2><p>Choose a service to explore the work behind it.</p></div><a className="text-link" href={'mailto:' + CONTACT_EMAIL + '?subject=SEOPune360%20services'}>Talk to our team <ArrowIcon /></a></div>
        <div className="service-showcase">
          <div className="service-band" key={current.id} id="service-showcase">
            <ServiceIllustration type={current.type} />
            <div className="service-band-copy"><span className="service-number">{current.number} / 06</span><h3>{current.title}</h3><p>{current.summary}</p><a href={'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('Tell me about ' + current.title)}>Explore this service <ArrowIcon /></a></div>
            <ul className="service-points">{current.items.map((item) => <li key={item}><span>↗</span>{item}</li>)}</ul>
          </div>
          <div className="service-list" role="tablist" aria-label="Choose a service">
            {services.map((service) => <button className={'service-row' + (activeService === service.id ? ' active' : '')} key={service.id} role="tab" id={'service-tab-' + service.id} aria-selected={activeService === service.id} aria-controls="service-showcase" onMouseEnter={() => setActiveService(service.id)} onFocus={() => setActiveService(service.id)} onClick={() => setActiveService(service.id)}><span className="row-number">({service.number})</span><span className="row-title">{service.title}</span><span className="row-arrow"><ArrowIcon /></span></button>)}
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
        <div className="section-title-row"><div><p className="eyebrow">Recent work with businesses</p><h2>Real businesses.<br /><span>Clearer digital growth.</span></h2></div><p className="section-intro">Select a client to view its published project summary and reported results.</p></div>
        <div className="case-layout">
          <div className="case-tabs" role="tablist" aria-label="Client case studies">
            {caseStudies.map((item) => <button className={'case-tab' + (activeCase === item.id ? ' active' : '')} key={item.id} role="tab" id={'case-tab-' + item.id} aria-selected={activeCase === item.id} aria-controls="selected-case" onClick={() => setActiveCase(item.id)}><span>{item.label}</span><small>{item.category}</small><ArrowIcon /></button>)}
          </div>
          <article className={'case-detail ' + current.tone} id="selected-case" role="tabpanel" aria-labelledby={'case-tab-' + current.id} key={current.id}>
            <div className="case-art" aria-hidden="true"><span className="case-art-kicker">SEOPUNE360 · CLIENT STORY</span><div className="case-art-logo">{current.mark}</div><div className="case-art-shapes"><i /><i /><i /></div><div className="case-art-bottom"><span>{current.category}</span><b>STRATEGY / SEARCH / GROWTH</b></div></div>
            <div className="case-copy"><p className="eyebrow">{current.category}</p><h3>{current.label}</h3><p>{current.copy}</p><ul className="case-metrics">{current.metrics.map((metric) => <li key={metric}><span>✦</span>{metric}</li>)}</ul><a className="text-link" href={'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('Ask about the ' + current.label + ' project')}>Ask about this project <ArrowIcon /></a></div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process-section section" id="process">
      <div className="container">
        <div className="section-title-row"><div><p className="eyebrow">How the work gets done</p><h2>One clear path from <span>kick-off to launch.</span></h2></div><p className="section-intro">A sample eight-week website project. Timing adjusts to scope, content, and approvals.</p></div>
        <div className="timeline-wrap" role="img" aria-label="Example website project timeline spanning eight weeks">
          <div className="timeline-week-head"><span>Start</span>{Array.from({ length: 8 }, (_, index) => <span key={index}>Week {index + 1}</span>)}</div>
          <div className="timeline-board">{processSteps.map((step, index) => <div className="timeline-track" key={step.title}>
            <span className="timeline-track-name">{step.phase}</span>
            <div className={'timeline-bar ' + step.color} style={{ '--start': step.start, '--span': step.span, '--row': index }}><div className="bar-meta"><span className="phase-tag">{step.phase}</span><span className="week-tag">{step.weeks}</span></div><div className="bar-content"><span className="bar-icon">{step.icon}</span><b>{step.title}</b><span className="bar-dots"><i /><i /></span></div></div>
          </div>)}</div>
          <p className="timeline-note">Example timeline; final delivery dates are agreed together.</p>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const points = [
    ['Local market understanding', 'Strategy shaped around your audience, service area, and business goals.'],
    ['One connected growth plan', 'Search, website, and lead generation work together instead of in silos.'],
    ['Clear, useful reporting', 'Understand what is changing and what the team recommends next.'],
    ['Built for long-term progress', 'Improve the foundations, measure outcomes, and keep learning over time.'],
  ];
  return (
    <section className="why-section section" id="about">
      <div className="container why-layout"><div className="why-copy"><p className="eyebrow">Why SEOPune360</p><h2>More than a website.<br /><span>A partner in your growth.</span></h2><p>Good digital work starts with understanding your business. We bring search, web, and growth thinking together to help people find you, trust you, and take the next step.</p><a className="button button-outline" href={'mailto:' + CONTACT_EMAIL + '?subject=Let%E2%80%99s%20talk%20about%20growth'}>Let’s talk about your goals <ArrowIcon /></a></div><div className="why-points">{points.map(([title, body], index) => <article className="why-point" key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{body}</p></div><i><ArrowIcon /></i></article>)}</div></div>
    </section>
  );
}

function AuditSection() {
  const [url, setUrl] = useState('');
  const [sent, setSent] = useState(false);
  function submit(event) { event.preventDefault(); setSent(true); }
  return (
    <section className="audit-section section" id="audit">
      <div className="audit-light" aria-hidden="true" />
      <div className="container audit-layout">
        <div className="audit-copy"><p className="eyebrow">Free website audit</p><h2>Find the next opportunity to <span>grow online.</span></h2><p>Request a human-led review of your website, search visibility, and enquiry journey. We’ll follow up with a clear set of observations and suggested next steps.</p><form className="audit-form audit-form-bottom" onSubmit={submit}><label className="sr-only" htmlFor="audit-site-url">Website address for audit</label><input id="audit-site-url" type="text" inputMode="url" autoComplete="url" placeholder="www.yourwebsite.com" value={url} onChange={(event) => { setUrl(event.target.value); setSent(false); }} required pattern="(https?://)?[a-zA-Z0-9][a-zA-Z0-9.-]*\.[a-zA-Z]{2,}.*" title="Enter a website address such as example.com" /><button className="button audit-submit" type="submit">Request my audit <ArrowIcon /></button></form>{sent && <p className="form-status" role="status">Ready to send: <a href={'mailto:' + CONTACT_EMAIL + '?subject=Free%20website%20audit&body=' + encodeURIComponent('Please review my website: ' + (/^https?:\/\//i.test(url) ? url : 'https://' + url))}>email us your website address.</a></p>}<small className="audit-disclaimer">This form prepares an email request; it does not run an automated scan or generate a score.</small></div>
        <div className="audit-report"><div className="report-header"><div><span className="report-kicker">SEOPUNE360 / REVIEW FRAMEWORK</span><h3>Website opportunity review</h3></div><span className="report-icon">✦</span></div><div className="report-progress"><div><span>Review areas</span><b>5 focus areas</b></div><i><span /></i></div><div className="report-list">{auditItems.map(([title, body], index) => <article className="report-row" key={title}><span className="report-index">0{index + 1}</span><div><b>{title}</b><small>{body}</small></div><span className="report-arrow"><ArrowIcon /></span></article>)}</div><div className="report-footer"><span><i /> HUMAN-LED WEBSITE REVIEW</span><span>SEO · UX · GROWTH</span></div></div>
      </div>
    </section>
  );
}

function Footer({ onCookieSettings, onLegal }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-cta"><div className="container footer-cta-inner"><div><p className="eyebrow">Your next growth chapter starts here</p><h2>Let’s make your online presence work harder.</h2></div><a className="button footer-button" href={'mailto:' + CONTACT_EMAIL + '?subject=Let%E2%80%99s%20talk%20about%20SEOPune360'}>Book a Call <ArrowIcon /></a></div></div>
      <div className="container footer-main"><div className="footer-brand-col"><Brand footer /><p>SEO, websites, and growth support for businesses ready to move forward.</p><a className="footer-email" href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL} <ArrowIcon /></a></div>
        <div className="footer-column"><h3>Services</h3><a href="#services">SEO Services</a><a href="#services">AI Search & GEO</a><a href="#services">Lead Generation</a><a href="#services">Website Design</a><a href="#services">Website Development</a></div>
        <div className="footer-column"><h3>Explore</h3><a href="#case-studies">Case Studies</a><a href="#clients">Portfolios</a><a href="#clients">Industries</a><a href="#process">How We Work</a><a href="#about">About Us</a></div>
        <div className="footer-column footer-contact"><h3>Get in touch</h3><p>Tell us what you’re working toward. We’ll help you find the next step.</p><a className="footer-email" href={'mailto:' + CONTACT_EMAIL}>{CONTACT_EMAIL} <ArrowIcon /></a><button className="footer-audit-link" onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}>Request a website audit <ArrowIcon /></button></div>
      </div>
      <div className="container footer-bottom"><span>© {year} SEOPune360. All rights reserved.</span><div className="legal-links"><button onClick={() => onLegal('Terms & Conditions')}>Terms &amp; Conditions</button><button onClick={() => onLegal('Privacy Policy')}>Privacy Policy</button><button onClick={onCookieSettings}>Cookie Settings</button></div><a className="back-to-top" href="#top">Back to top ↑</a></div>
    </footer>
  );
}

function CookieDialog({ onClose }) {
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
    try { window.localStorage.setItem('seopune360-cookie-preferences', JSON.stringify(next)); } catch { /* Settings still apply for this visit. */ }
    setSaved(true);
  }
  const groups = [
    ['necessary', 'Necessary', 'Always on', 'Required for basic site functions and security.'],
    ['analytics', 'Analytics', 'Optional', 'Help measure site use so the experience can improve.'],
    ['functional', 'Functional', 'Optional', 'Remember choices that improve how the site works.'],
    ['marketing', 'Marketing', 'Optional', 'Support campaign measurement when marketing tools are connected.'],
  ];
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="cookie-dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-title"><div className="dialog-heading"><div><p className="eyebrow">Your privacy choices</p><h2 id="cookie-title">Cookie Settings</h2></div><button className="icon-button" aria-label="Close cookie settings" onClick={onClose}>×</button></div><p className="cookie-intro">Choose which optional cookies you allow. Necessary cookies are always on. No analytics or marketing tags are included in this starter.</p><div className="cookie-options">{groups.map(([id, label, status, detail]) => <label className="cookie-option" key={id}><span><b>{label}</b><small>{detail}</small></span><span className="cookie-toggle"><input type="checkbox" checked={id === 'necessary' ? true : preferences[id]} disabled={id === 'necessary'} onChange={(event) => setPreferences((current) => ({ ...current, [id]: event.target.checked }))} /><i /></span><em>{status}</em></label>)}</div>{saved && <p className="form-status" role="status">Your preferences have been saved in this browser.</p>}<div className="dialog-actions"><button className="button button-outline" onClick={() => save({ analytics: false, marketing: false, functional: false })}>Reject optional</button><button className="button audit-submit" onClick={() => save(preferences)}>Save preferences</button><button className="button button-outline" onClick={() => save({ analytics: true, marketing: true, functional: true })}>Accept all</button></div></section></div>;
}

function LegalDialog({ title, onClose }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="legal-dialog" role="dialog" aria-modal="true" aria-labelledby="legal-title"><div className="dialog-heading"><div><p className="eyebrow">SEOPune360</p><h2 id="legal-title">{title}</h2></div><button className="icon-button" aria-label="Close" onClick={onClose}>×</button></div><p>The {title.toLowerCase()} link is ready, but approved policy wording has not been supplied for this website yet. Add your final business-approved policy text here before publishing.</p><a className="text-link" href={'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('Request SEOPune360 ' + title)}>Request the current policy <ArrowIcon /></a></section></div>;
}

function App() {
  const [activeIndustry, setActiveIndustry] = useState('All industries');
  const [activeService, setActiveService] = useState('seo');
  const [activeCase, setActiveCase] = useState('kj-group');
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [legalTitle, setLegalTitle] = useState('');

  return <div className="page-shell">
    <Header onChooseService={setActiveService} onChooseIndustry={setActiveIndustry} />
    <main><Hero onPlayShowreel={() => setShowreelOpen(true)} /><ClientSelector activeIndustry={activeIndustry} setActiveIndustry={setActiveIndustry} /><Services activeService={activeService} setActiveService={setActiveService} /><CaseStudies activeCase={activeCase} setActiveCase={setActiveCase} /><Process /><WhyUs /><AuditSection /></main>
    <Footer onCookieSettings={() => setCookieOpen(true)} onLegal={setLegalTitle} />
    {showreelOpen && <ShowreelModal onClose={() => setShowreelOpen(false)} />}
    {cookieOpen && <CookieDialog onClose={() => setCookieOpen(false)} />}
    {legalTitle && <LegalDialog title={legalTitle} onClose={() => setLegalTitle('')} />}
  </div>;
}

export default App;





