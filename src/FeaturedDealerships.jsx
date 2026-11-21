import { useEffect, useRef, useState } from 'react';
import { automotiveProjects } from './automotiveProjects.js';
import { showcaseDealerships, showcasePath } from './automotiveShowcase.js';
import { dealershipProof } from './dealershipProof.js';
import './featured-dealerships.css';

const format = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const rotationInterval = 4600;
const initialSelection = { active: 0, previous: null, direction: null };
const stories = {
  'shaw-toyota': {
    summary: 'High-intent Google Search and Meta campaigns built around test-drive, exchange, and showroom enquiries across Pune locations.',
    quote: 'SEOPUNE360 restructured our search and Meta campaigns around high-intent showroom buyers, giving our sales team a steady flow of verified test-drive calls and qualified enquiries.',
    attribution: 'Marketing & Digital Desk, Shaw Toyota',
  },
  'shaw-tata': {
    summary: 'Multi-model passenger vehicle lead generation combining high-intent Google Search call extensions with localised Meta lead campaigns.',
    quote: 'Their focus on call-qualified search traffic and structured Meta campaigns translated directly into measurable showroom walk-ins and booking enquiries across our models.',
    attribution: 'Digital Marketing Team, Shaw Tata',
  },
  'hallmark-honda': {
    badge: 'Multi-Location Showroom Lead Engine',
    summary: 'A local dealership experience designed to capture test-drive, service, and model enquiries across Mumbai.',
    quote: 'Working with SEOPUNE360 gave our Mumbai showrooms a cleaner, faster digital journey that makes it effortless for car buyers to enquire and book test drives.',
    attribution: 'Operations & Marketing Team, Hallmark Honda',
  },
  'garnet-skoda': {
    badge: 'High-Intent Test-Drive & Model Funnel',
    summary: 'A model-focused dealership website designed to bring high-intent Škoda buyers to showroom enquiries across Mumbai and Navi Mumbai.',
    quote: 'SEOPUNE360 brought sharper structure to how prospective buyers explore models and connect with our showroom team online, elevating enquiry quality.',
    attribution: 'Showroom Digital Team, Garnet Skoda',
  },
};

const slides = Object.entries(stories).map(([id, story]) => {
  const dealer = showcaseDealerships.find((item) => item.id === id);
  return {
    ...(dealer || automotiveProjects.find((item) => item.id === id)),
    ...story,
    href: (dealer ? showcasePath : '/case-studies/') + id + '/',
    metrics: dealershipProof[id]?.headlines,
  };
});

export default function FeaturedDealerships() {
  const root = useRef(null);
  const viewport = useRef(null);
  const drag = useRef(null);
  const ignoreClickUntil = useRef(0);
  const [{ active, previous, direction }, setSelection] = useState(initialSelection);
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const slide = slides[active];
  const rotating = visible && tabVisible && !hovered && !focused && !paused && !expanded && !reduced;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => setReduced(query.matches);
    query.addEventListener('change', onMotionChange);
    const reveal = (inView) => {
      setVisible(inView);
      if (inView) setRevealed(true);
    };
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => {
      reveal(entry.isIntersecting && entry.intersectionRatio >= .15);
    }, { threshold: .15 }) : null;
    if (observer) observer.observe(viewport.current);
    else reveal(true);
    if (window.location.hash === '#featured-case-studies') root.current.scrollIntoView({ block: 'start' });
    return () => { observer?.disconnect(); query.removeEventListener('change', onMotionChange); };
  }, []);

  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    setFocused(root.current.contains(document.activeElement) && document.activeElement.matches(':focus-visible'));
  }, [active]);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => {
      setSelection({ active: (active + 1) % slides.length, previous: active, direction: 'next' });
    }, rotationInterval);
    return () => window.clearTimeout(timer);
  }, [active, rotating]);

  function select(index, movement = index > active ? 'next' : 'previous') {
    if (index === active) return;
    setExpanded(false);
    setSelection({ active: index, previous: active, direction: movement });
  }

  function move(step) {
    select((active + step + slides.length) % slides.length, step > 0 ? 'next' : 'previous');
  }

  function pointerStart(event) {
    if (event.button !== 0 || event.target.closest('button')) return;
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  }

  function pointerFinish(event) {
    const start = drag.current;
    drag.current = null;
    if (start?.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) < 45 || Math.abs(dx) <= Math.abs(event.clientY - start.y)) return;
    ignoreClickUntil.current = performance.now() + 450;
    move(dx < 0 ? 1 : -1);
  }

  function renderSlide(item, index, outgoing = false) {
    return <article key={item.id} className={'featured-dealer' + (outgoing ? ' featured-dealer-outgoing' : '')}
      aria-label={item.name + ', ' + (index + 1) + ' of ' + slides.length}
      aria-hidden={outgoing || undefined} inert={outgoing || undefined}
      onAnimationEnd={outgoing ? (event) => {
        if (event.target === event.currentTarget) {
          setSelection((current) => current.previous === index ? { ...current, previous: null } : current);
        }
      } : undefined}>
      <a className="featured-dealer-card" href={item.href} rel={item.href.startsWith(showcasePath) ? 'nofollow' : undefined}>
        <div className="featured-dealer-media"><img src={item.cover} alt="" decoding="async" draggable={false} /></div>
        <div className="featured-dealer-copy">
          <h3>{item.name}</h3>
          {item.metrics ? <ul className="featured-dealer-metrics">{item.metrics.map(({ label, value, context }) => (
            <li key={label}><b>{format.format(value)} {label}</b><small>{context}</small></li>
          ))}</ul> : <p className="featured-dealer-badge">{item.badge}</p>}
          <p>{item.summary}</p>
          <span className="text-link">View case study ↗</span>
        </div>
      </a>
    </article>;
  }

  return <section id="featured-case-studies" className="featured-dealers container" ref={root} aria-labelledby="featured-dealers-title"
    aria-roledescription="carousel" onPointerEnter={(event) => {
      if (event.pointerType === 'mouse' && window.matchMedia('(any-hover: hover)').matches) setHovered(true);
    }}
    onPointerLeave={(event) => { if (event.pointerType === 'mouse') setHovered(false); }}
    onFocusCapture={(event) => setFocused(event.target.matches(':focus-visible'))} onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
    }} onKeyDown={(event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }
    }}>
    <header className="featured-dealers-heading">
      <div><p className="eyebrow">Automotive portfolio</p><h2 id="featured-dealers-title">Featured case studies.</h2></div>
      <div className="featured-dealers-arrows">
        <span className="featured-dealer-position" aria-hidden="true">{active + 1} / {slides.length}</span>
        <button type="button" aria-label="Previous dealership" onClick={() => move(-1)}>←</button>
        <button type="button" aria-label="Next dealership" onClick={() => move(1)}>→</button>
      </div>
    </header>
    <div className="featured-dealers-viewport" ref={viewport} aria-live={rotating ? 'off' : 'polite'}
      onPointerDown={pointerStart} onPointerUp={pointerFinish} onPointerCancel={() => { drag.current = null; }}
      onDragStart={(event) => event.preventDefault()}
      onClickCapture={(event) => {
        if (performance.now() < ignoreClickUntil.current && event.target.closest('a')) { event.preventDefault(); event.stopPropagation(); }
      }}>
      <div className="featured-dealer-track" data-direction={direction}
        data-revealed={revealed} data-transitioning={previous !== null && !reduced}>
        {previous !== null && !reduced && renderSlide(slides[previous], previous, true)}
        {renderSlide(slide, active)}
        <div className="featured-dealer-progress" aria-hidden="true">
          {rotating && <span key={active} style={{ animationDuration: rotationInterval + 'ms' }} />}
        </div>
      </div>
      <div className="featured-dealer-story">
        <button type="button" aria-expanded={expanded} aria-controls="featured-story-preview" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Hide story preview' : 'Expand story preview'} <span aria-hidden="true">{expanded ? '−' : '+'}</span>
        </button>
        <div id="featured-story-preview" hidden={!expanded}>
          <blockquote><p>“{slide.quote}”</p><cite>{slide.attribution}</cite></blockquote>
        </div>
      </div>
    </div>
    <div className="featured-dealer-controls">
      <div className="featured-dealer-pills" role="group" aria-label="Choose a featured dealership">
        {slides.map(({ id, name }, index) => <button type="button" key={id} aria-pressed={index === active} onClick={() => select(index)}>{name}</button>)}
      </div>
      {!reduced && <button type="button" className="featured-dealer-pause" onClick={() => setPaused(!paused)}>{paused ? 'Resume rotation' : 'Pause rotation'}</button>}
    </div>
  </section>;
}
