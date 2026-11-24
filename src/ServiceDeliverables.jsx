const details = {
  seo: {
    intro: 'Turn a technical review into a prioritized search programme with clear ownership, page-level changes and measurable enquiry paths.',
    deliverables: [['Technical discovery', 'Crawl and indexation review, canonical and redirect checks, internal link mapping, and a prioritized implementation backlog.'], ['Intent and page mapping', 'Map commercial queries to the right pages, resolve overlapping targets, and prepare title, heading and content briefs.'], ['Measurement and review', 'Agree conversion events, record the baseline, and review Search Console and enquiry trends alongside a dated change log.']],
    faqs: [['What will the SEO review deliver?', 'A prioritized set of technical and on-page recommendations, keyword-to-page mapping, and an agreed measurement plan. Implementation scope is confirmed before work starts.'], ['Can you guarantee first-page rankings?', 'No. Rankings depend on competition, search intent, website quality and search engine changes. We measure agreed work and observed outcomes without promising positions.'], ['Do you only work with businesses in Pune?', 'No. We are based in Pune and plan targeting around the locations and customers relevant to each business.']],
  },
  geo: {
    intro: 'Make your services and evidence understandable to both people and retrieval systems, with an explicit distinction between observed citations and assumptions.',
    deliverables: [['Entity and evidence audit', 'Review organization details, service definitions, author information and sources that support your claims.'], ['Content and structured data', 'Prepare concise answers to real buying questions, strengthen supporting pages, and align structured data with visible content.'], ['Visibility sampling', 'Document prompts, platforms, dates and citations in a repeatable review. Track changes without presenting a small sample as universal AI visibility.']],
    faqs: [['What is included in an AI search visibility review?', 'A review of entity clarity, content structure and supporting evidence, plus dated samples of relevant AI search responses where accessible.'], ['Does structured data guarantee an AI citation?', 'No. Structured data can clarify supported information, but AI systems independently select sources and responses vary by query and context.'], ['How does GEO work with SEO?', 'Both benefit from crawlable, useful pages and clear information. GEO adds reviews of answer structure, source evidence and observed AI citations to the search programme.']],
  },
  development: {
    intro: 'We build websites around what customers need to find and do. We agree which pages, content and integrations the project needs, then check the key journeys before launch.',
    deliverables: [
      ['Plan the pages and journeys', 'Map the main tasks visitors need to complete, such as comparing services, finding contact details or submitting an enquiry. Agree who will supply copy and images and who will update each part of the site.'],
      ['Build and test the website', 'Develop responsive pages and connect the agreed forms, content management tools and integrations. Check navigation, form validation, keyboard access and loading performance on mobile and desktop.'],
      ['Prepare the launch and handover', 'For a replacement site, map changed URLs to the best matching new pages and check important links before launch. Agree who will manage the domain, hosting and updates once the site is live.'],
    ],
    faqs: [
      ['Can you update my current website?', 'We first review the existing site and what you want to improve. Useful pages and features can often be retained. The proposal identifies what to update, what to rebuild, and which URLs need redirects.'],
      ['Will I be able to update the site myself?', 'If you want to manage content in-house, tell us what changes frequently. We can include a content management system for those pages and agree which edits your team will handle.'],
      ['What should I share before we begin?', 'Share your current domain, example sites, must-have pages and the main action you want visitors to take. Let us know about your launch deadline and any systems the website needs to connect to.'],
    ],
  },
  branding: {
    intro: 'We help businesses build or refresh an identity customers can recognize across their website, social profiles and printed materials. The project starts with your audience, offer and the places where your brand needs to work.',
    deliverables: [
      ['Define the positioning', 'Identify who the brand needs to reach, what customers value, and how to describe the offer clearly. Use that direction to guide messaging and visual decisions.'],
      ['Design the visual identity', 'Develop a logo system and a supporting palette and typography. Review concepts against common uses, including small digital placements, website headers and print, so you can see how each direction works.'],
      ['Prepare files and guidelines', 'Agree which final files and templates your team needs. The identity guide can cover logo variants, colours, type and usage examples so staff and suppliers can apply the same identity.'],
    ],
    faqs: [
      ['Can you refresh an existing brand?', 'Yes. We review current assets and identify what customers already recognize. We then agree which elements to carry forward and which need updating.'],
      ['What is included beyond a logo?', 'The agreed scope can include logo variations, colours, typography, brand guidelines and selected materials. List the items you need at the start so they can be included in the proposal.'],
      ['Where can I see examples of your branding work?', 'The portfolio below includes identity work for KJ Group, ERA Infratech and Koriv Studio. Open a project to see examples such as logo artwork, stationery or brand applications.'],
    ],
  },
  leads: {
    intro: 'We connect paid campaigns with the landing pages and follow-up process that turn interest into enquiries. We start by agreeing which services to promote, where your customers are, and how your team will assess the enquiries it receives.',
    deliverables: [
      ['Plan campaigns around buyer intent', 'Choose the audiences, locations and offers to test. Google Search can reach people already looking for a service. Meta can introduce an offer and bring interested visitors back. Channel choices depend on your market and goals.'],
      ['Build the enquiry journey', 'Match each ad to a relevant landing page. Give visitors a clear way to call, send a message or submit a form, and check that the details reach the team responsible for follow-up.'],
      ['Measure lead quality', 'Agree what counts as a valid and qualified enquiry. Track the relevant conversion actions and review campaign data alongside feedback from your sales team to guide changes to targeting, creative and spend.'],
    ],
    faqs: [
      ['How should I choose a starting budget?', 'Share your service area, offer, target customer and how many enquiries your team can handle. We use those details to propose an initial test and agree what evidence should guide later spending decisions.'],
      ['Can you use my existing website or landing page?', 'We review whether it explains the offer, works on mobile and makes it easy to enquire. Where useful, we recommend targeted changes or a dedicated page before sending paid traffic to it.'],
      ['How will we know whether the enquiries are useful?', 'We agree what a suitable lead looks like, then compare campaign data with your team’s feedback on calls, forms, bookings or other agreed outcomes.'],
    ],
  },
  growth: {
    intro: 'Connect acquisition with the experience after the click. Plan the work around qualified enquiries and sales follow-up, with priorities your team can act on.',
    deliverables: [['Baseline and priorities', 'Review traffic sources, landing pages and enquiry handling. Agree the commercial goal, measurement definitions and first experiments.'], ['Campaign-to-page alignment', 'Connect SEO, paid campaigns and relevant landing pages with coherent offers, proof and clear enquiry paths.'], ['Learning and iteration', 'Review campaign quality and conversion signals, document completed changes, and decide what to test next against the agreed baseline.']],
    faqs: [['What does a business growth engagement cover?', 'A tailored plan connecting acquisition, website experience and measurement. Channels, deliverables and responsibilities are agreed to match your business stage.'], ['How do you judge lead quality?', 'We agree useful definitions with your team, such as valid enquiries, qualified opportunities and sales follow-up outcomes, rather than treating every form submission as a sale.'], ['What client work can I review?', 'The published portfolio includes growth and digital campaign work for Lusso Marco and growth marketing and website work for Krishna Classical Homoeopathy Clinic. Public descriptions show the supplied scope; outcomes are included only when substantiated.']],
  },
};
export function serviceIntro(id) { return details[id]?.intro; }
export default function ServiceDeliverables({ id }) {
  const item = details[id];
  if (!item) return null;
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: item.faqs.map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })) };
  return <section className="section"><div className="container"><p className="eyebrow">From scope to delivery</p><div className="content-grid">{item.deliverables.map(([title, description], i) => <article className="content-card" key={title}><span className="card-number">0{i + 1}</span><h2>{title}</h2><p>{description}</p></article>)}</div><div className="service-faq"><p className="eyebrow">Before we begin</p><h2>Questions worth answering.</h2>{item.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} /></div></section>;
}

