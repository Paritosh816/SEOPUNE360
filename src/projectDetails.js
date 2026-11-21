const shots = '/images/client-projects/';
const logos = '/images/client-logos/';
const brand = '/images/business-branding/';

// Screenshots are captures of public pages. Campaign diagrams are explanatory,
// not screenshots of ad accounts or evidence of measured performance.
export const projectDetails = {
  'ananya-rishtey': {
    logo: logos + 'ananya-rishtey.png', website: 'https://www.ananyarishtey.com/', portfolioEmbed: 'blocked',
    portfolioPreview: shots + 'ananya-rishtey-homepage.jpg',
    headline: 'A warmer introduction to finding a life partner.',
    overview: 'Ananya Rishtey introduces a matrimony app through a website built around a personal decision. Warm colours, expressive typography and animated phone previews give visitors an approachable introduction to the product before they explore its features and plans.',
    focus: [ ['Product storytelling', 'A clear sequence takes visitors from the promise of the app to how matching, compatibility and family involvement are presented.'], ['A visible next step', 'Launch messaging, plan comparisons and a dedicated vendor registration journey serve two different audiences without mixing their paths.'], ['A recognisable visual language', 'Floral details, a warm palette and product demonstrations create continuity throughout the website.'] ],
    gallery: [{ src: shots + 'ananya-rishtey-home.jpg', title: 'App launch website', caption: 'The live homepage combines a warm visual identity with an animated product preview.', url: 'https://www.ananyarishtey.com/' }],
  },
  intellidant: {
    logo: logos + 'intellidant.webp', website: 'https://intellidant.com/',
    headline: 'Making dental software easier to understand.',
    overview: 'IntelliDant’s website presents a practice management product to dental clinics. The website development work centres on explaining the offer: what the software covers, how its plans compare and where a clinic can begin registration. Dashboard-style visuals make the product tangible without overwhelming the first visit.',
    focus: [ ['A clear product overview', 'Patients, appointments, billing and other modules are organised into an easy-to-scan feature presentation.'], ['Plans that can be compared', 'The pricing section gives visitors a structured way to understand the available plans and their differences.'], ['A direct registration journey', 'Prominent registration links and contact options connect product discovery to the next step.'] ],
    gallery: [{ src: shots + 'intellidant-home.jpg', title: 'Software presentation', caption: 'A live homepage capture showing the product introduction and illustrative dashboard.', url: 'https://intellidant.com/' }],
  },
  'adi-dev': {
    logo: logos + 'adi-dev.png', website: 'https://www.adidev.com.au/',
    headline: 'A clear website for the work behind the build.',
    overview: 'A.D.I DEV supports residential builders in Australia with tender and estimation, project management and administration. Its website organises these services into distinct sections, helping business visitors understand the support available and find the right enquiry path.',
    focus: [ ['Three clear service areas', 'Detailed service sections turn a broad operational offer into a navigable structure.'], ['An international business audience', 'Construction imagery and direct service language keep the presentation relevant to Australian builders.'], ['Separate enquiry and careers paths', 'Business enquiries and recruitment have their own sections, with navigation that brings each audience to the appropriate form.'] ],
    gallery: [{ src: shots + 'adi-dev-home.jpg', title: 'Australian B2B website', caption: 'The live website introduces its tender and estimation support through a construction-led presentation.', url: 'https://www.adidev.com.au/' }],
  },
  'kj-group': {
    logo: brand + 'kj-group-logo-variations.jpg', logoLayout: 'sheet',
    headline: 'An identity with a strong architectural foundation.',
    overview: 'The KJ Group branding portfolio brings together the identity for Kishor Jamdar’s real-estate business. An architectural monogram anchors the mark, while deep blue and orange give the identity a distinctive contrast across its different applications.',
    focus: [ ['A distinctive monogram', 'The building-inspired symbol connects the initials with the real-estate category.'], ['Consistent colour treatments', 'Light, orange and dark-blue variations show how the identity can remain recognisable on different backgrounds.'], ['Brand applications', 'The supplied project artwork shows the identity across stationery and presentation mockups.'] ],
  },
  'lusso-marco': {
    logo: logos + 'lusso-marco.svg', website: 'https://lussomarco.com/', portfolioEmbed: 'blocked',
    portfolioPreview: shots + 'lusso-marco-homepage.jpg',
    landing: 'https://lussomarco.com/products/noxious', campaign: 'commerce',
    headline: 'From fragrance discovery to product consideration.',
    overview: 'Lusso Marco’s scope combines growth marketing and digital campaigns. The Noxious product page is the supplied destination for this showcase: it brings product imagery, fragrance notes, volume and purchase information together so visitors can explore the product after encountering the brand.',
    focus: [ ['Product-led campaign context', 'Noxious gives the campaign story a specific product, with a recognisable bottle and an individual fragrance narrative.'], ['Continuity after the click', 'Product details and photography provide the context visitors need to continue considering the offer.'], ['A connected growth journey', 'Google Ads and Meta Ads sit within the approved digital campaign scope. The diagram below explains the journey without presenting simulated campaign results.'] ],
    gallery: [{ src: shots + 'lusso-marco-landing.jpg', title: 'Noxious product destination', caption: 'Actual capture of the supplied Noxious page. Availability and pricing reflect the page at capture time.', url: 'https://lussomarco.com/products/noxious' }],
  },
  'shaw-toyota': {
    logo: logos + 'shaw-toyota.webp', website: 'https://shawtoyotapune.com/',
    landing: 'https://shawtoyotapune.com/new-cars/toyota-urban-cruiser-hyryder.html', campaign: 'leads',
    headline: 'A focused path from model interest to enquiry.',
    overview: 'Shaw Toyota’s portfolio scope is PPC lead generation. The supplied Urban Cruiser Hyryder page shows the destination of a model-specific customer journey, bringing together vehicle imagery, variant information and a visible route to request an offer from the dealership.',
    focus: [ ['Model-specific relevance', 'The landing page keeps the visitor’s attention on the Hyryder rather than a general catalogue.'], ['Information before enquiry', 'Vehicle details, variants and price information help a prospective buyer decide what to ask about.'], ['A clear enquiry step', 'The offer form asks for contact details and a dealer outlet so the visitor can request a follow-up.'] ],
    gallery: [{ src: shots + 'shaw-toyota-landing.jpg', title: 'Hyryder landing page', caption: 'Actual model-page capture from the landing URL supplied for the PPC project.', url: 'https://shawtoyotapune.com/new-cars/toyota-urban-cruiser-hyryder.html' }, { src: shots + 'shaw-toyota-enquiry.jpg', title: 'Offer enquiry form', caption: 'The public offer-request interface. No enquiry was submitted.' }],
  },
  'shaw-tata': {
    logo: logos + 'shaw-tata.webp', website: 'https://www.shawcars.in/',
    landing: 'https://www.shawcars.in/new-cars/tata-punch.html', campaign: 'leads',
    headline: 'Turning interest in Tata Punch into a clear next step.',
    overview: 'Shaw Tata’s engagement is focused on PPC lead generation. The Tata Punch page supplied for this project gives prospective buyers a specific destination to explore the vehicle and request an offer. The showcase pairs that page with its enquiry interface to explain the customer journey.',
    focus: [ ['A specific vehicle destination', 'Model imagery and a dedicated overview keep the landing experience aligned with interest in Tata Punch.'], ['Useful comparison information', 'Variant, specification and price sections support consideration before visitors request more information.'], ['An enquiry-focused action', 'The offer form provides a visible next step with contact fields and an outlet selection.'] ],
    gallery: [{ src: shots + 'shaw-tata-landing.jpg', title: 'Tata Punch landing page', caption: 'Actual capture of the supplied vehicle page, including its offer call to action.', url: 'https://www.shawcars.in/new-cars/tata-punch.html' }, { src: shots + 'shaw-tata-enquiry.jpg', title: 'Offer enquiry form', caption: 'The public lead-enquiry interface. No enquiry was submitted.' }],
  },
  'krishna-clinic': {
    logo: logos + 'krishna-clinic.png', website: 'https://krishnaclassicalhomoeopathy.com/',
    headline: 'A connected presence across website and social channels.',
    overview: 'Krishna Classical Homoeopathy Clinic’s project combines social media, growth marketing and website development. The website brings doctor profiles, consultation options, clinic locations and appointment enquiries into one place. Its orange-and-white visual identity connects the clinic’s website with its social presence, giving visitors a recognisable route from discovery to contact.',
    focus: [ ['Website development', 'Doctor profiles, consultation modes and location details help visitors find practical clinic information and request an appointment.'], ['Social media / Growth Marketing', 'Social communication and growth marketing support awareness of the practice and connect interested audiences with the clinic’s website and contact options.'], ['A connected online presence', 'The website brings together clinic information, videos and social-channel links, with consistent branding throughout the visitor journey.'] ],
    gallery: [{ src: shots + 'krishna-clinic-home.jpg', title: 'Clinic website', caption: 'The homepage introduces the clinic with its original visual identity, location links and appointment call to action.', url: 'https://krishnaclassicalhomoeopathy.com/' }],
  },
  'hotel-shivtara': {
    logo: logos + 'hotel-shivtara.jpg', logoLayout: 'dark', website: 'https://hotelshivtara.com/',
    headline: 'A welcoming first look at a stay in Jejuri.',
    overview: 'Hotel Shivtara’s website puts the property, room choices and practical guest information at the centre of the visit. Photography introduces the hotel, while room pages, a gallery, a virtual-tour link and clear contact options help travellers explore before they enquire.',
    focus: [ ['A strong sense of place', 'Exterior and interior photography introduce the hotel and its Jejuri location.'], ['Room choices made visible', 'Dedicated room sections present the different accommodation options with photographs and amenity information.'], ['Practical guest journeys', 'Phone links, directions, contact details and frequently asked questions help visitors plan their next step.'] ],
    gallery: [{ src: shots + 'hotel-shivtara-home.jpg', title: 'Hotel website', caption: 'Live homepage capture showing the property introduction and room-discovery links.', url: 'https://hotelshivtara.com/' }, { src: shots + 'hotel-shivtara-rooms.jpg', title: 'Room browsing', caption: 'The room page combines photographs with amenities and direct enquiry links.', url: 'https://hotelshivtara.com/rooms.html' }],
  },
  'era-infratech': {
    logo: brand + 'era-infratech-02.jpg', logoLayout: 'sheet',
    headline: 'A bold identity for an infrastructure-focused brand.',
    overview: 'ERA Infratech’s branding pairs a bold red wordmark with a deep navy accent. The gallery shows how the identity carries through business cards, stationery and a cityscape mockup.',
    focus: [ ['A strong primary mark', 'The compact ERA lettering gives the identity a distinct silhouette.'], ['Colour consistency', 'White, red and navy treatments show the mark across contrasting backgrounds.'], ['Brand applications', 'Business cards, letterhead and envelopes show the identity in print. The cityscape mockup shows how the white mark reads over photography.'] ],
  },
  fpt: {
    logo: brand + 'originals/FPT.jpeg', logoLayout: 'dark',
    headline: 'Branding support for the India office.',
    overview: 'This project showcases branding work for the FPT Powertrain Technologies India office. The gallery includes the brand identity manual, logo and colour guidelines, and Original Reman campaign artwork.',
    focus: [ ['India-office scope', 'Branding support for the FPT Powertrain Technologies India office.'], ['Brand guidelines', 'The artwork documents logo variations, clear space, colours and use on different backgrounds.'], ['Original Reman campaign', 'The supplied campaign boards show the FPT identity alongside engine illustrations and photography.'] ],
  },
  'freshia': { logo: brand + 'freshia-01.jpg', logoLayout: 'sheet' },
  'gaurav-vishwasrao': { logo: brand + 'gaurav-vishwasrao-01.jpg', logoLayout: 'sheet' },
  'jijai-milk': { logo: brand + 'jijai-milk-01.jpg', logoLayout: 'sheet' },
  'koriv-studio': {
    logo: brand + 'koriv-studio-02.jpg', logoLayout: 'sheet',
    headline: 'A detailed mark with a warm, crafted character.',
    overview: 'Koriv Studio’s logo pairs an intricate circular emblem with a restrained wordmark. The stacked and horizontal arrangements use a warm orange and brown palette that carries through the stationery and mug mockups.',
    focus: [ ['Symbol and wordmark', 'The detailed emblem contrasts with simple lettering in both logo arrangements.'], ['A restrained palette', 'The orange and brown colour swatches document the palette for digital and print use.'], ['Applications in context', 'The mockups show the logo on an envelope, mugs, a notebook and an embossed card.'] ],
  },
};
