export const siteUrl = 'https://seopune360.com/';
export const linkedInUrl = 'https://www.linkedin.com/company/seopune-360/';

export const homeQuestions = [
  {
    question: 'What does SEOPune360 help businesses with?',
    answer: 'SEOPune360 helps businesses in Pune and across India improve search visibility, build websites, and turn visits into enquiries. We review how customers find the business, what they see when they land on the site, and where the journey to a call or enquiry breaks down.',
    link: '/services/',
    label: 'Explore our services'
  },
  {
    question: 'How do SEO, AEO and GEO work together?',
    answer: 'SEO helps search engines discover and understand your pages. AEO focuses on giving customers clear answers to the questions they ask. GEO focuses on making your business and its expertise easier to understand in AI search experiences. All three benefit from accurate business details, clear service pages, and useful examples.',
    link: '/services/geo/',
    label: 'Explore AI search and GEO'
  },
  {
    question: 'What can I learn from the free website audit?',
    answer: 'The Laser Viewfinder checks your public website for crawl and indexing signals, page titles, headings, and internal links. It includes mobile and desktop Lighthouse results when available, plus an AI search and business schema check. The report groups findings into priorities so you can decide what to fix first.',
    link: '/audit/',
    label: 'Run a website audit'
  }
];

const organizationId = siteUrl+'#organization';
export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': organizationId, name: 'SEOPune360', url: siteUrl,
      logo: siteUrl+'seopune360-logo.jpg', email: 'seopune360@gmail.com', telephone: '+918483837969',
      address: {'@type':'PostalAddress',addressLocality:'Pune',addressRegion:'Maharashtra',addressCountry:'IN'},
      sameAs: [linkedInUrl]
    },
    {'@type':'WebSite','@id':siteUrl+'#website',name:'SEOPune360',url:siteUrl,publisher:{'@id':organizationId},inLanguage:'en-IN'},
    ...[
      ['SEO','services/seo/'],
      ['AI Search & GEO','services/geo/'],
      ['Lead Generation','services/lead-generation/'],
      ['Business Branding','services/business-branding/'],
      ['Website Development','services/website-development/']
    ].map(([name,path])=>({'@type':'Service','@id':siteUrl+path+'#service',name,url:siteUrl+path,provider:{'@id':organizationId},areaServed:'India'})),
    {
      '@type':'FAQPage','@id':siteUrl+'#faq',url:siteUrl+'#faq',isPartOf:{'@id':siteUrl+'#website'},
      mainEntity:homeQuestions.map(({question,answer})=>({'@type':'Question',name:question,acceptedAnswer:{'@type':'Answer',text:answer}}))
    }
  ]
};

