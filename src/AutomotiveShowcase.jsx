import { useEffect, useRef, useState } from 'react';
import { showcaseDealerships, showcasePath } from './automotiveShowcase.js';
import { dealershipProof } from './dealershipProof.js';
import './automotive-showcase.css';

const linkTo = (dealer) => showcasePath + dealer.id + '/';
const months = ['September', 'October'];
const platforms = ['Google Ads', 'Meta Ads'];
const zoomLevels = [100, 150, 200, 300, 400, 500, 600];
const format = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

function Reveal({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const element = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      element.dataset.revealed = 'true';
      observer.disconnect();
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div className="auto-reveal" ref={ref}>{children}</div>;
}

function MetricStrip({ items }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(() => !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : 0);
  useEffect(() => {
    if (!items.length || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      function tick(now) {
        const position = Math.min((now - start) / 750, 1);
        setProgress(1 - (1 - position) ** 3);
        if (position < 1) frame = requestAnimationFrame(tick);
      }
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    observer.observe(ref.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [items]);
  if (!items.length) return null;
  return <dl className="auto-metrics" ref={ref}>{items.map(({ label, value, context }) => (
    <div key={label}>
      <dt>{label}</dt>
      <dd><span aria-hidden="true">{format.format(Math.round(value * progress * 100) / 100)}</span><span className="sr-only">{format.format(value)}</span></dd>
      {context && <dd className="auto-metric-context">{context}</dd>}
    </div>
  ))}</dl>;
}

function Cover({ dealer, eager = false }) {
  return <img src={dealer.cover} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async"
    {...(eager ? { fetchPriority: 'high' } : {})} />;
}

function LiveSite({ dealer }) {
  return <a className="auto-link" href={dealer.website} target="_blank" rel="noopener noreferrer">View Live Site <span aria-hidden="true">↗</span></a>;
}

function DealershipCTA({ onStart }) {
  return <section className="auto-cta">
    <div><h2>Scale your dealership enquiries and test-drive bookings.</h2><p>Tell us where you sell or service vehicles and which enquiries you want more of. We’ll reply by email.</p></div>
    <button className="button" type="button" aria-haspopup="dialog" onClick={(event) => onStart(event.currentTarget, 'leads', 'Automobile')}>
      Share your requirements <span aria-hidden="true">↗</span>
    </button>
  </section>;
}

function ShowcaseIndex({ onStart }) {
  const [featuredId, setFeaturedId] = useState('shaw-toyota');
  const featured = showcaseDealerships.find((dealer) => dealer.id === featuredId);
  const proof = dealershipProof[featured.id];
  return <>
    <section className="auto-hero auto-container">
      <div className="auto-hero-intro">
        <p className="eyebrow">Automotive client showcase</p>
        <h1>A growth system for <span>car dealerships.</span></h1>
        <p>Connect dealership websites and dedicated landing pages with high-intent Google Search and Meta lead campaigns. Give buyers a clear route to call, enquire or request a test drive.</p>
        <a className="auto-link" href="#dealerships">Explore the dealerships <span aria-hidden="true">↓</span></a>
      </div>
      <div className="auto-spotlight">
        <div className="auto-spotlight-media"><Cover key={featured.id} dealer={featured} eager /></div>
        <div className="auto-spotlight-copy" aria-live="polite">
          <p className="eyebrow">Featured dealership</p>
          <h2>{featured.name}</h2>
          <p>{featured.market}</p>
          <div className="auto-link-row"><a className="auto-link" href={linkTo(featured)}>Explore project <span aria-hidden="true">↗</span></a><LiveSite dealer={featured} /></div>
        </div>
        <div className="auto-switches auto-feature-switch" role="group" aria-label="Featured dealership">
          {showcaseDealerships.map((dealer) => <button type="button" key={dealer.id} aria-pressed={dealer.id === featuredId}
            onClick={() => setFeaturedId(dealer.id)}>{dealer.name}</button>)}
        </div>
      </div>
    </section>
    <div className="auto-container auto-index-body">
      {proof && <section className="auto-summary" key={featuredId}>
        <p className="eyebrow">{featured.name} · September & October</p>
        <h2>Paid acquisition at a glance.</h2>
        <MetricStrip items={proof.headlines} />
        <p className="auto-note">{proof.note}</p>
      </section>}
      <section className="auto-dealer-section" id="dealerships">
        <div className="auto-section-title"><p className="eyebrow">Selected work</p><h2>Explore the dealerships.</h2></div>
        <Reveal>
          <div className="auto-dealer-grid">
            {showcaseDealerships.map((dealer) => (
              <a className="auto-dealer-card" href={linkTo(dealer)} key={dealer.id}>
                <div className="auto-card-media"><Cover dealer={dealer} /></div>
                <div className="auto-card-caption"><div><h3>{dealer.name}</h3><p>{dealer.market}</p></div><span aria-hidden="true">↗</span></div>
              </a>
            ))}
          </div>
        </Reveal>
      </section>
      <DealershipCTA onStart={onStart} />
    </div>
  </>;
}

function ProofLightbox({ capture, onClose }) {
  const ref = useRef(null);
  const [zoomIndex, setZoomIndex] = useState(0);
  const zoom = zoomLevels[zoomIndex];
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog.open) dialog.showModal();
  }, []);
  return <dialog className="auto-lightbox" ref={ref} aria-labelledby="auto-lightbox-title" onClose={onClose}>
    <header>
      <h3 id="auto-lightbox-title">{capture.title}</h3>
      <div className="auto-lightbox-controls">
        <button type="button" disabled={zoomIndex === 0} onClick={() => setZoomIndex(zoomIndex - 1)} aria-label="Zoom out">−</button>
        <output aria-label="Zoom level">{zoom}%</output>
        <button type="button" disabled={zoomIndex === zoomLevels.length - 1} onClick={() => setZoomIndex(zoomIndex + 1)} aria-label="Zoom in">+</button>
        <button type="button" onClick={() => ref.current.close()} aria-label="Close dashboard preview" autoFocus>×</button>
      </div>
    </header>
    <div className="auto-lightbox-scroll"><img src={capture.src} width="1600" height="900" style={{ width: zoom + '%' }} alt={capture.title + ' with account and billing details redacted'} /></div>
  </dialog>;
}

function DashboardProof({ proof, dealer }) {
  const [month, setMonth] = useState(months[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [selected, setSelected] = useState(null);
  const opener = useRef(null);
  const entry = proof.months[month][platform];
  function close() {
    setSelected(null);
    opener.current?.focus({ preventScroll: true });
  }
  return <section className="auto-proof" aria-labelledby="auto-proof-heading">
    <div className="auto-section-title"><p className="eyebrow">Paid acquisition proof</p><h2 id="auto-proof-heading">2-Month Performance Snapshot</h2><p>September and October dashboards for {dealer.name}. Sensitive account, campaign, and spending details have been removed from the images.</p></div>
    <div className="auto-proof-controls">
      <div className="auto-switches" role="group" aria-label="Dashboard month">{months.map((item) => (
        <button type="button" key={item} aria-pressed={item === month} onClick={() => setMonth(item)}>{item}</button>
      ))}</div>
      <div className="auto-switches" role="group" aria-label="Dashboard platform">{platforms.map((item) => (
        <button type="button" key={item} aria-pressed={item === platform} onClick={() => setPlatform(item)}>{item}</button>
      ))}</div>
    </div>
    <div key={month + platform} className="auto-proof-content">
      <h3>{month} · {platform}</h3>
      <MetricStrip items={entry.metrics} />
      {entry.note && <p className="auto-note">{entry.note}</p>}
      {entry.captures.length > 0 && <div className="auto-captures">{entry.captures.map((capture) => <figure key={capture.src}>
        <button type="button" aria-haspopup="dialog" aria-label={'Enlarge ' + capture.title} onClick={(event) => {
          opener.current = event.currentTarget;
          setSelected(capture);
        }}><img src={capture.src} alt="" width="1600" height="900" loading="lazy" decoding="async" /></button>
        <figcaption>{capture.title}</figcaption>
      </figure>)}</div>}
    </div>
    {selected && <ProofLightbox capture={selected} onClose={close} />}
  </section>;
}

function DealershipDetail({ dealer, onStart }) {
  const proof = dealershipProof[dealer.id];
  const related = showcaseDealerships.filter((item) => item.id !== dealer.id);
  return <>
    <section className="auto-hero auto-container auto-detail-hero">
      <div className="auto-hero-intro">
        <a className="auto-link" href={showcasePath}>← All dealerships</a>
        <p className="eyebrow">{dealer.name} · {dealer.market}</p>
        <h1>{dealer.headline}</h1>
        {proof && <MetricStrip items={proof.headlines} />}
        <LiveSite dealer={dealer} />
      </div>
      <div className="auto-detail-cover"><Cover dealer={dealer} eager /></div>
    </section>
    <div className="auto-container auto-detail-body">
      <section className="auto-context">
        <div><p className="eyebrow">Overview</p><h2>{dealer.name}</h2><p>{dealer.description}</p></div>
        <div><p className="eyebrow">Dealership challenge</p><p>{dealer.challenge}</p></div>
      </section>
      <section className="auto-execution">
        <div className="auto-section-title"><p className="eyebrow">Execution</p><h2>Brand, website and enquiry funnel.</h2></div>
        <Reveal><div className="auto-execution-grid">{dealer.execution.map(([title, text]) => (
          <article key={title}><h3>{title}</h3><p>{text}</p></article>
        ))}</div></Reveal>
      </section>
      {proof && <>
        <DashboardProof dealer={dealer} proof={proof} />
        <section className="auto-summary"><p className="eyebrow">Results summary</p><h2>What the dashboards report.</h2><p>{proof.note}</p></section>
      </>}
      <nav className="auto-next" aria-label="Explore another dealership">
        <h2>Explore another dealership.</h2>
        <div>{related.map((item) => <a className="auto-link" key={item.id} href={linkTo(item)}>{item.name} <span aria-hidden="true">↗</span></a>)}</div>
      </nav>
      <DealershipCTA onStart={onStart} />
    </div>
  </>;
}

export default function AutomotiveShowcase({ path, onStart }) {
  const id = path.slice(showcasePath.length).replace(/\/$/, '');
  const dealer = showcaseDealerships.find((item) => item.id === id);
  if (id && !dealer) return <section className="auto-container auto-missing"><h1>Dealership not found</h1><a className="auto-link" href={showcasePath}>View the automotive showcase ↗</a></section>;
  return <div className="auto-showcase">{dealer ? <DealershipDetail dealer={dealer} onStart={onStart} /> : <ShowcaseIndex onStart={onStart} />}</div>;
}
