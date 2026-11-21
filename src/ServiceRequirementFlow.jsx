import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './service-requirement-flow.css';

const CONTACT_API = import.meta.env.VITE_CONTACT_API_URL ?? 'https://seopune360-audit-module.vercel.app/api/contact';
const INDUSTRIES = [
  'Automobile', 'Real Estate', 'Healthcare', 'Hospitality', 'Matrimonial', 'D2C / Lifestyle',
  'Manufacturing', 'Infratech', 'B2B', 'Other',
];
const TIMELINES = ['Within a month', 'In 1–3 months', 'Exploring options'];
const STEPS = ['Service', 'Business context', 'Requirements', 'Email hand-off'];
const QUESTIONS = {
  seo: {
    goals: ['Rank for high-intent searches', 'Get found locally', 'Recover lost search traffic'],
    prompt: 'Where should customers find you?',
    choices: ['One city', 'Multiple cities', 'Across India', 'International'],
    detail: 'Target city or priority service',
    detailHint: 'e.g. Pune · Toyota car servicing',
    website: true,
  },
  geo: {
    goals: ['Get cited in AI answers', 'Improve brand accuracy in AI search', 'Find gaps in AI visibility'],
    prompt: 'Where do you want to appear?',
    choices: ['Google AI Overviews', 'ChatGPT', 'Perplexity', 'Across AI platforms'],
    detail: 'Topics or questions customers ask',
    detailHint: 'e.g. Best home loan options in Pune',
    website: true,
  },
  leads: {
    goals: ['More qualified enquiries', 'Lower cost per lead', 'Launch paid campaigns'],
    prompt: 'What kind of leads should the campaign bring in?',
    choices: ['Phone calls', 'Form enquiries', 'WhatsApp messages', 'A mix'],
    detail: 'Target city or offer',
    detailHint: 'e.g. Thane · test-drive enquiries',
    website: true,
  },
  branding: {
    goals: ['Logo & visual identity', 'Brand refresh', 'Packaging or brand materials'],
    prompt: 'What do you need designed first?',
    choices: ['Logo system', 'Brand guidelines', 'Packaging', 'Sales materials'],
    detail: 'Brand name or materials needed',
    detailHint: 'e.g. New dairy brand · milk packaging',
  },
  development: {
    goals: ['New fast website', 'Redesign & conversion', 'Dedicated landing pages'],
    prompt: 'What are you building?',
    choices: ['Business website', 'Landing page', 'Online store', 'Custom site'],
    detail: 'Key pages or features',
    detailHint: 'e.g. Product pages and enquiry forms',
    website: true,
  },
  growth: {
    goals: ['End-to-end search + ads + web', 'Increase sales from existing traffic', 'Build a 90-day growth plan'],
    prompt: 'Where should we start?',
    choices: ['Search & content', 'Paid campaigns', 'Website conversion', 'Full growth review'],
    detail: 'Market or priority offer',
    detailHint: 'e.g. Maharashtra · expand our dealership network',
    website: true,
  },
};

function ChoiceGroup({ label, name, options, value, onChange, required = false }) {
  return <fieldset className="requirements-choices">
    <legend>{label}{!required && <small>Optional</small>}</legend>
    <div className="requirements-chips">
      {options.map((option) => <label className="requirements-chip" key={option.value}>
        <input type="radio" name={name} value={option.value} required={required}
          checked={option.value === value} onChange={() => onChange(option.value)} />
        <span>{option.label}</span>
      </label>)}
    </div>
  </fieldset>;
}

const choices = (options) => options.map((label) => ({ label, value: label }));

function ProjectExamples({ clients, service, industry, servicePath }) {
  const serviceMatches = clients.filter((client) => client.serviceIds.includes(service.id));
  const exactMatches = serviceMatches.filter((client) => client.industries.includes(industry));
  const industryMatches = clients.filter((client) => client.industries.includes(industry) && !serviceMatches.includes(client));
  const examples = exactMatches.length
    ? [...exactMatches, ...serviceMatches.filter((client) => !exactMatches.includes(client))].slice(0, 2)
    : industryMatches.length ? [...serviceMatches.slice(0, 1), industryMatches[0]] : serviceMatches.slice(0, 2);

  return <section className="requirements-proof" aria-label="Relevant examples">
    <h3>{exactMatches.length ? 'Related client work' : 'Work you can review'}</h3>
    {!serviceMatches.length && <a href={servicePath} target="_blank" rel="noopener noreferrer">
      <strong>{service.title} scope <span aria-hidden="true">↗</span></strong>
      <span>{service.items.slice(0, 2).join(' · ')}</span>
    </a>}
    {examples.map((client) => <a key={client.id} href={'/case-studies/' + client.id + '/'} target="_blank" rel="noopener noreferrer">
      <strong>{client.name} <span aria-hidden="true">↗</span></strong>
      <span>{client.industries.join(' / ')} · {client.service}</span>
    </a>)}
  </section>;
}

function publicWebsite(value) {
  if (!value.trim()) return '';
  try {
    const address = value.trim();
    const url = new URL(/^[\w+.-]+:\/\//.test(address) ? address : 'https://' + address);
    if (!['https:', 'http:'].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password) return null;
    return url.href;
  } catch {
    return null;
  }
}

export default function ServiceRequirementFlow({ request, onClose, services, clients, servicePaths, contactEmail }) {
  const [serviceId, setServiceId] = useState(request?.serviceId || '');
  const [industry, setIndustry] = useState('');
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState({ name: '', email: '', phone: '', brief: '' });
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [fallback, setFallback] = useState('');
  const stageHeading = useRef(null);
  const scrollArea = useRef(null);
  const startedAt = useRef(Date.now());
  const pending = useRef(false);
  const service = services.find((item) => item.id === serviceId);
  const questions = QUESTIONS[serviceId];
  const requirements = answers[serviceId] || {};

  useEffect(() => {
    if (!request || pending.current) return;
    if (request.serviceId) setServiceId(request.serviceId);
    if (request.industry) setIndustry(request.industry);
    if (Date.now() - startedAt.current > 25 * 60 * 1000) startedAt.current = Date.now();
    setError('');
    setFallback('');
    setStep(0);
    setReceipt(null);
  }, [request]);

  useEffect(() => {
    if (!request) return;
    const dismiss = (event) => { if (event.key === 'Escape' && !event.defaultPrevented) onClose(); };
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [request, onClose]);

  useEffect(() => {
    if (request) {
      if (scrollArea.current) scrollArea.current.scrollTop = 0;
      stageHeading.current?.focus({ preventScroll: true });
    }
  }, [request, step, receipt]);

  function updateAnswer(field, value) {
    setAnswers((previous) => ({ ...previous, [serviceId]: { ...previous[serviceId], [field]: value } }));
    setError('');
    setFallback('');
  }

  function move(next) {
    setError('');
    setFallback('');
    setStep(next);
  }

  function confirmContext(event) {
    event.preventDefault();
    if (step === 0 && service) move(1);
    if (step === 1 && industry && requirements.goal) move(2);
    if (step === 2) {
      if (questions.website && publicWebsite(requirements.website || '') === null) {
        setError('Enter a valid website address, such as example.com.');
        document.getElementById('requirements-website')?.focus();
        return;
      }
      move(3);
    }
  }

  async function submit(event) {
    event.preventDefault();
    if (pending.current) return;
    const honey = new FormData(event.currentTarget).get('_honey');
    if (honey) return;
    const fields = Object.fromEntries(Object.entries(contact).map(([key, value]) => [key, value.trim()]));
    if (!fields.name || !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(fields.email) || !fields.brief) {
      setError('Enter your name, a valid work email, and a short project brief.');
      return;
    }
    const website = questions.website ? publicWebsite(requirements.website || '') : '';
    const summary = [
      ['Service', service.title], ['Industry', industry], ['Goal', requirements.goal],
      ['Priority', requirements.priority], ['Timeline', requirements.timeline],
      [questions.detail, requirements.detail?.trim()], ['Website', website], ['Project brief', fields.brief],
    ].filter(([, value]) => value);
    const subject = 'Project requirements | ' + service.title;
    const emailLines = [['Name', fields.name], ['Work email', fields.email], ['Phone or WhatsApp', fields.phone], ...summary]
      .filter(([, value]) => value).map(([label, value]) => label + ': ' + value);
    const mailto = 'mailto:' + contactEmail + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(emailLines.join('\r\n'));
    setError('');
    setFallback('');

    if (!CONTACT_API) {
      setFallback(mailto);
      setError('Open your email app to send the prepared brief.');
      return;
    }
    if (Date.now() - startedAt.current > 29 * 60 * 1000) {
      startedAt.current = Date.now();
      setFallback(mailto);
      setError('Your session was refreshed. Try again in a moment or email the prepared brief.');
      return;
    }

    pending.current = true;
    setSending(true);
    try {
      const response = await fetch(CONTACT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name, email: fields.email, phone: fields.phone, service: service.title,
          ...(website ? { website } : {}),
          _honey: '', _started_at: startedAt.current,
          message: 'PROJECT REQUIREMENTS — ' + summary.map(([label, value]) => label + ': ' + value).join(' | '),
        }),
        redirect: 'error',
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok || (await response.json()).success !== true) {
        setFallback(mailto);
        setError(response.status === 429 ? 'Please wait before sending another request, or email the prepared brief.' : 'We couldn’t confirm your request. Try again or email the prepared brief.');
        return;
      }
      setReceipt({ summary, email: fields.email });
      setContact({ name: '', email: '', phone: '', brief: '' });
      setAnswers({});
      setIndustry('');
      startedAt.current = Date.now();
    } catch {
      setFallback(mailto);
      setError('We couldn’t confirm your request. Try again or email the prepared brief.');
    } finally {
      pending.current = false;
      setSending(false);
    }
  }

  if (!request) return null;

  const titles = ['What can we help with?', 'Tell us about your business', 'What should we focus on?', 'Send your project brief'];
  return createPortal(<aside className="requirements-drawer" id="service-requirement-drawer" role="dialog" aria-labelledby="requirements-title">
    <header className="requirements-header">
      <div><p className="eyebrow">Project enquiry</p><h2 id="requirements-title">Plan your project</h2></div>
      <button className="requirements-close" type="button" onClick={onClose} aria-label="Close project enquiry">×</button>
    </header>
    <div className="requirements-scroll" ref={scrollArea}>
      {receipt ? <section className="requirements-stage requirements-receipt">
        <h3 ref={stageHeading} tabIndex={-1}>Project brief sent</h3>
        <p>We’ll reply to <strong>{receipt.email}</strong> with follow-up questions and next steps.</p>
        <dl>{receipt.summary.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section> : <>
        <ol className="requirements-progress" aria-label="Enquiry progress">
          {STEPS.map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} data-done={index < step}>
            <span aria-hidden="true">{index + 1}</span><span>{label}</span>
          </li>)}
        </ol>
        {step > 0 && <div className="requirements-selection">
          <span>{service.title}</span><button type="button" disabled={sending} onClick={() => move(0)}>Change service</button>
        </div>}
        <form key={step} className="requirements-stage" onSubmit={step === 3 ? submit : confirmContext}>
          <h3 ref={stageHeading} tabIndex={-1}>{titles[step]}</h3>
          {step === 0 && <ChoiceGroup label="Choose one service" name="project-service" required
            value={serviceId} onChange={setServiceId} options={services.map(({ id, title }) => ({ value: id, label: title }))} />}
          {step === 1 && <>
            <ChoiceGroup label="Industry or business type" name="project-industry" options={choices(INDUSTRIES)}
              value={industry} required onChange={setIndustry} />
            <ChoiceGroup label="Primary goal" name="project-goal" options={choices(questions.goals)}
              value={requirements.goal} required onChange={(value) => updateAnswer('goal', value)} />
          </>}
          {step === 2 && <>
            <ProjectExamples clients={clients} service={service} industry={industry === 'Manufacturing' ? 'Manufacturing Industry' : industry} servicePath={servicePaths[serviceId]} />
            <ChoiceGroup label={questions.prompt} name="project-priority" options={choices(questions.choices)}
              value={requirements.priority} onChange={(value) => updateAnswer('priority', value)} />
            <ChoiceGroup label="When would you like to start?" name="project-timeline" options={choices(TIMELINES)}
              value={requirements.timeline} onChange={(value) => updateAnswer('timeline', value)} />
            <div className="requirements-fields">
              <label>{questions.detail} <small>Optional</small><input maxLength={160} placeholder={questions.detailHint}
                value={requirements.detail || ''} onChange={(event) => updateAnswer('detail', event.target.value)} /></label>
              {questions.website && <label>Website <small>Optional</small><input id="requirements-website" inputMode="url" autoComplete="url"
                maxLength={250} placeholder="example.com" value={requirements.website || ''} onChange={(event) => updateAnswer('website', event.target.value)} /></label>}
            </div>
          </>}
          {step === 3 && <>
            <p className="requirements-context">{industry} · {requirements.goal}</p>
            <div className="requirements-trap" aria-hidden="true"><input name="_honey" tabIndex={-1} autoComplete="off" aria-label="Leave this blank" /></div>
            <div className="requirements-fields" onChange={() => { setError(''); setFallback(''); }}>
              <label>Name<input autoComplete="name" maxLength={120} required disabled={sending}
                value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} /></label>
              <label>Work email<input type="email" autoComplete="email" maxLength={254} required disabled={sending}
                value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} /></label>
              <label>Phone or WhatsApp <small>Optional</small><input type="tel" autoComplete="tel" maxLength={50} disabled={sending}
                value={contact.phone} onChange={(event) => setContact({ ...contact, phone: event.target.value })} /></label>
              <label>Project brief<textarea rows={3} maxLength={1000} required disabled={sending}
                placeholder="Tell us what you need and what success looks like."
                value={contact.brief} onChange={(event) => setContact({ ...contact, brief: event.target.value })} /></label>
            </div>
          </>}
          {error && <p className="requirements-error" role="alert">{error}</p>}
          {fallback && <a className="text-link requirements-email" href={fallback}>Email the prepared brief ↗</a>}
          <div className="requirements-actions">
            {step > 0 && <button className="button button-outline" type="button" disabled={sending} onClick={() => move(step - 1)}>Back</button>}
            <button className="button" type="submit" disabled={sending}>
              {step === 3 ? (sending ? 'Sending…' : 'Send project brief') : 'Continue'}
            </button>
          </div>
        </form>
      </>}
    </div>
    {receipt && <footer className="requirements-done"><button className="button" type="button" onClick={onClose}>Done</button></footer>}
  </aside>, document.body);
}
