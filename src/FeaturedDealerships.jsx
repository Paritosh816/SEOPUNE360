import { useEffect, useRef, useState } from 'react';
import { automotiveProjects } from './automotiveProjects.js';
import { showcaseDealerships, showcasePath } from './automotiveShowcase.js';
import { dealershipProof } from './dealershipProof.js';
import './featured-dealerships.css';

const format = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
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
    cover: '/images/client-projects/garnet-skoda-feature.jpg',
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
  const drag = useRef(null);
  const ignoreClickUntil = useRef(0);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState('next');
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(() => !document.hidden);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const slide = slides[active];
  const rotating = visible && tabVisible && !hovered && !focused && !paused && !expanded && !reduced;

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => setReduced(query.matches);
    query.addEventListener('change', onMotionChange);
    if (!('IntersectionObserver' in window)) return () => query.removeEventListener('change', onMotionChange);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .35 });
    observer.observe(root.current);
    return () => { observer.disconnect(); query.removeEventListener('change', onMotionChange); };
  }, []);

  useEffect(() => {
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = window.setTimeout(() => {
      setDirection('next');
      setActive((current) => (current + 1) % slides.length);
    }, 7800);
    return () => window.clearTimeout(timer);
  }, [active, rotating]);

  function select(index, movement = index > active ? 'next' : 'previous') {
    if (index === active) return;
    setDirection(movement);
    setExpanded(false);
    setActive(index);
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

  return <section className="featured-dealers container" ref={root} aria-labelledby="featured-dealers-title"
    aria-roledescription="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => {
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
        <button type="button" aria-label="Previous dealership" onClick={() => move(-1)}>←</button>
        <button type="button" aria-label="Next dealership" onClick={() => move(1)}>→</button>
      </div>
    </header>
    <div className="featured-dealers-viewport" aria-live={rotating ? 'off' : 'polite'}
      onPointerDown={pointerStart} onPointerUp={pointerFinish} onPointerCancel={() => { drag.current = null; }}
      onDragStart={(event) => event.preventDefault()}
      onClickCapture={(event) => {
        if (performance.now() < ignoreClickUntil.current && event.target.closest('a')) { event.preventDefault(); event.stopPropagation(); }
      }}>
      <article key={slide.id} className="featured-dealer" data-direction={direction} aria-label={slide.name + ', ' + (active + 1) + ' of ' + slides.length}>
        <a className="featured-dealer-card" href={slide.href} rel={slide.href.startsWith(showcasePath) ? 'nofollow' : undefined}>
          <div className="featured-dealer-media"><img src={slide.cover} alt="" loading="lazy" decoding="async" draggable={false} /></div>
          <div className="featured-dealer-copy">
            <h3>{slide.name}</h3>
            {slide.metrics ? <ul className="featured-dealer-metrics">{slide.metrics.map(({ label, value, context }) => (
              <li key={label}><b>{format.format(value)} {label}</b><small>{context}</small></li>
            ))}</ul> : <p className="featured-dealer-badge">{slide.badge}</p>}
            <p>{slide.summary}</p>
            <span className="text-link">View case study ↗</span>
          </div>
        </a>
        <div className="featured-dealer-story">
          <button type="button" aria-expanded={expanded} aria-controls="featured-story-preview" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'Hide story preview' : 'Expand story preview'} <span aria-hidden="true">{expanded ? '−' : '+'}</span>
          </button>
          <div id="featured-story-preview" hidden={!expanded}>
            <blockquote><p>“{slide.quote}”</p><cite>{slide.attribution}</cite></blockquote>
          </div>
        </div>
      </article>
    </div>
    <div className="featured-dealer-controls">
      <div className="featured-dealer-pills" role="group" aria-label="Choose a featured dealership">
        {slides.map(({ id, name }, index) => <button type="button" key={id} aria-pressed={index === active} onClick={() => select(index)}>{name}</button>)}
      </div>
      {!reduced && <button type="button" className="featured-dealer-pause" onClick={() => setPaused(!paused)}>{paused ? 'Resume rotation' : 'Pause rotation'}</button>}
    </div>
  </section>;
}
