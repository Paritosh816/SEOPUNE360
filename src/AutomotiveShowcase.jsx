import { useEffect, useRef, useState } from 'react';
import Brand from './Brand.jsx';
import AutomotiveMarquee from './AutomotiveMarquee.jsx';
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
  if (!items.length) return null;
  return <dl className="auto-metrics">{items.map(({ label, value, context }) => (
    <div key={label}>
      <dt>{label}</dt>
      <dd>{format.format(value)}</dd>
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

function ShowcaseIndex() {
  return <>
    <AutomotiveMarquee />
    <div className="auto-container auto-index-body">
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
    <div className="auto-lightbox-scroll"><img src={capture.src} width="1600" height="900" style={{ width: zoom + '%' }} alt={capture.title + ' with account identifiers masked'} /></div>
  </dialog>;
}

function DashboardPanel({ entry, onEnlarge }) {
  return <>
    <MetricStrip items={entry.metrics} />
    {entry.note && <p className="auto-note">{entry.note}</p>}
    {entry.captures.length > 0 && <div className="auto-captures">{entry.captures.map((capture) => <figure key={capture.src}>
      <a href={capture.src} aria-haspopup={onEnlarge ? 'dialog' : undefined}
        aria-label={(onEnlarge ? 'Enlarge ' : 'View ') + capture.title}
        onClick={onEnlarge ? (event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          onEnlarge(capture, event.currentTarget);
        } : undefined}>
        <img src={capture.src} alt="" width="1600" height="900" loading="lazy" decoding="async" />
      </a>
      <figcaption>{capture.title}</figcaption>
    </figure>)}</div>}
  </>;
}

function DashboardProof({ proof, dealer, interactive }) {
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
    <div className="auto-section-title"><p className="eyebrow">Paid acquisition proof</p><h2 id="auto-proof-heading">2-Month Performance Snapshot</h2><p>September and October dashboards for {dealer.name}. Account identifiers are masked. Campaign columns, dates and charts appear in their original layout.</p></div>
    {interactive && <div className="auto-proof-controls">
      <div className="auto-switches" role="group" aria-label="Dashboard month">{months.map((item) => (
        <button type="button" key={item} aria-pressed={item === month} onClick={() => setMonth(item)}>{item}</button>
      ))}</div>
      <div className="auto-switches" role="group" aria-label="Dashboard platform">{platforms.map((item) => (
        <button type="button" key={item} aria-pressed={item === platform} onClick={() => setPlatform(item)}>{item}</button>
      ))}</div>
    </div>}
    <div key={month + platform} className="auto-proof-content">
      <h3>{month} · {platform}</h3>
      <DashboardPanel entry={entry} onEnlarge={interactive ? (capture, trigger) => {
        opener.current = trigger;
        setSelected(capture);
      } : undefined} />
    </div>
    {!interactive && months.flatMap((otherMonth) => platforms.map((otherPlatform) => {
      if (otherMonth === month && otherPlatform === platform) return null;
      return <details className="auto-proof-content auto-proof-fallback" key={otherMonth + otherPlatform}>
        <summary>{otherMonth} · {otherPlatform}</summary>
        <DashboardPanel entry={proof.months[otherMonth][otherPlatform]} />
      </details>;
    }))}
    {selected && <ProofLightbox capture={selected} onClose={close} />}
  </section>;
}

function DealershipDetail({ dealer, interactive }) {
  const proof = dealershipProof[dealer.id];
  return <>
    <section className="auto-hero auto-container auto-detail-hero">
      <div className="auto-hero-intro">
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
        <div className="auto-section-title"><p className="eyebrow">Digital &amp; funnel execution</p><h2>Brand, website and enquiry funnel.</h2></div>
        <Reveal><div className="auto-execution-grid">{dealer.execution.map(([title, text]) => (
          <article key={title}><h3>{title}</h3><p>{text}</p></article>
        ))}</div></Reveal>
      </section>
      {proof && <>
        <DashboardProof dealer={dealer} proof={proof} interactive={interactive} />
        <section className="auto-summary"><p className="eyebrow">Results summary</p><h2>What the dashboards report.</h2><p>{proof.note}</p></section>
      </>}
    </div>
  </>;
}

export default function AutomotiveShowcase({ path }) {
  const [interactive, setInteractive] = useState(false);
  useEffect(() => setInteractive(true), []);
  const id = path.replace(/\/index\.html$/, '/').replace(/\/+$/, '').slice(showcasePath.length);
  const dealer = showcaseDealerships.find((item) => item.id === id);
  return <div className="auto-showcase">
    <header className="auto-pitch-header auto-container">
      <Brand />{id && <a className="auto-link" href={showcasePath}>← Back to Automotive Showcase</a>}
    </header>
    <main>{dealer ? <DealershipDetail dealer={dealer} interactive={interactive} /> : id
      ? <section className="auto-container auto-missing"><h1>Dealership not found</h1></section>
      : <ShowcaseIndex />}</main>
  </div>;
}
