import { useEffect, useRef } from 'react';
import { showcaseDealerships, showcasePath } from './automotiveShowcase.js';
import { dealershipProof } from './dealershipProof.js';

const numbers = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const toyotaConversions = dealershipProof['shaw-toyota'].headlines[0].value;
const [tataConversions, tataCalls] = dealershipProof['shaw-tata'].months.September['Google Ads'].metrics;
const highlights = {
  'shaw-toyota': {
    value: numbers.format(Math.floor(toyotaConversions)) + '+',
    label: 'Google Ads conversions',
    quote: 'SEOPUNE360 restructured our search and Meta campaigns around high-intent showroom buyers, delivering verified test-drive calls and enquiries.',
    attribution: 'Marketing & Digital Desk',
  },
  'shaw-tata': {
    value: numbers.format(tataConversions.value),
    label: 'Google Ads conversions · September',
    detail: numbers.format(tataCalls.value) + ' reported phone calls',
    quote: 'Their focus on call-qualified search traffic and structured Meta campaigns translated directly into measurable showroom walk-ins and bookings.',
    attribution: 'Digital Marketing Team',
  },
  'hallmark-honda': {
    value: '3.8×',
    label: 'Showroom enquiry lift',
    quote: 'Working with SEOPUNE360 gave our Mumbai showrooms a cleaner, faster digital journey that makes it effortless for buyers to enquire.',
    attribution: 'Operations & Marketing',
  },
  'garnet-skoda': {
    value: '64%',
    label: 'Higher test-drive leads',
    quote: 'SEOPUNE360 brought sharper structure to how prospective buyers explore models and connect with our showroom team online.',
    attribution: 'Showroom Digital Team',
  },
  'garve-hyundai': {
    value: '2.9×',
    label: 'Qualified call volume',
    quote: 'Our digital enquiry funnel became far more structured, bringing consistent test-drive and model requests to our Pune showroom team.',
    attribution: 'Digital Desk',
  },
  'garve-honda-service': {
    value: '71%',
    label: 'Service booking growth',
    quote: 'Localized search visibility and direct service booking pathways drove a clear jump in scheduled workshop visits.',
    attribution: 'Service Operations',
  },
};

const stories = Object.entries(highlights).map(([id, highlight]) => ({
  ...showcaseDealerships.find((dealer) => dealer.id === id),
  ...highlight,
}));

function MarqueeCards({ repeated = false }) {
  return <div className="auto-marquee-set" aria-hidden={repeated || undefined}>
    {stories.map((story, index) => (
      <a key={story.id} className="auto-marquee-card" href={showcasePath + story.id + '/'} tabIndex={repeated ? -1 : undefined}>
        <img src={story.cover} alt="" decoding="async" loading={!repeated && index < 2 ? 'eager' : 'lazy'} />
        <div className="auto-marquee-result">
          <strong>{story.value}</strong><span>{story.label}</span>
          {story.detail && <small>{story.detail}</small>}
        </div>
        <h2>{story.name}</h2>
        <div className="auto-marquee-quote">
          <blockquote title={story.quote}>“{story.quote}”</blockquote>
          <cite>{story.attribution} <span aria-hidden="true">•</span> {story.name}</cite>
        </div>
      </a>
    ))}
  </div>;
}

export default function AutomotiveMarquee() {
  const hero = useRef(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const section = hero.current;
    const observer = new IntersectionObserver(([entry]) => {
      section.dataset.inView = String(entry.intersectionRatio >= .12);
    }, { threshold: .12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function resetKeyboardScroll(event) {
    if (event.currentTarget.contains(event.relatedTarget) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    event.currentTarget.scrollLeft = 0;
  }

  return <section className="auto-marquee-hero" aria-labelledby="automotive-hero-heading" ref={hero}>
    <div className="auto-marquee-content">
      <p className="auto-hero-badge">Automotive Case Studies</p>
      <h1 id="automotive-hero-heading">Explore our Automotive Portfolio</h1>
      <ul className="auto-hero-credentials" aria-label="Dealership growth services">
        <li>Google Ads &amp; Meta Campaigns</li>
        <li>High-Intent Test-Drive Funnels</li>
        <li>Dealership Web &amp; Growth</li>
      </ul>
      <a className="auto-marquee-cta" href="#dealerships">Explore the dealerships <span aria-hidden="true">↓</span></a>
      <p className="auto-marquee-subtext">See how we scale showroom walk-ins, qualified phone calls, and test-drive enquiries.</p>
    </div>
    <label className="auto-marquee-motion">
      <input className="sr-only" type="checkbox" aria-label="Pause background carousel" />
      <span className="auto-marquee-pause" aria-hidden="true">Ⅱ &nbsp; Pause motion</span>
      <span className="auto-marquee-resume" aria-hidden="true">▷ &nbsp; Resume motion</span>
    </label>
    <div className="auto-marquee-window" role="group" aria-label="Dealership highlights" onBlur={resetKeyboardScroll}>
      <div className="auto-marquee-track">
        <MarqueeCards />
        <MarqueeCards repeated />
      </div>
    </div>
    <div className="auto-marquee-vignette" aria-hidden="true" />
  </section>;
}
