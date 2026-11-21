import { automotiveProjects } from './automotiveProjects.js';

export const showcasePath = '/automotive-showcase/';
const photos = '/images/client-projects/';

const dealershipStories = {
  'hallmark-honda': {
    market: 'Thane · Honda sales',
    cover: photos + 'hallmark-honda-showcase.jpg',
    headline: 'Help Honda buyers find a clear next step.',
    challenge: 'A buyer comparing Honda models needs a quick way to move from product information to a conversation with the dealership.',
    execution: [
      ['Brand', 'Keep the dealership and Honda model range recognisable throughout the browsing journey.'],
      ['Website', 'Use the published dealer site as the starting point for model exploration.'],
      ['Enquiry', 'Bring contact options into the buying journey so visitors can ask about the right car.'],
    ],
  },
  'shaw-toyota': {
    market: 'Pune · Toyota sales',
    cover: photos + 'shaw-toyota-landing.jpg',
    headline: 'A focused path from Hyryder interest to dealership enquiries.',
    challenge: 'A campaign for a specific Toyota model needs a page that answers buying questions and gives the visitor a direct way to request an offer.',
    execution: [
      ['Brand', 'Keep Toyota and the Urban Cruiser Hyryder at the centre of the campaign journey.'],
      ['Website', 'Point model interest toward a dedicated page with imagery, variants and pricing information.'],
      ['Enquiry', 'Use the offer form to collect customer details and their preferred outlet for follow-up.'],
    ],
  },
  'shaw-tata': {
    market: 'Pune · Tata sales',
    cover: photos + 'shaw-tata-landing.jpg',
    headline: 'Turn Tata Punch model interest into a clear enquiry.',
    challenge: 'Prospective buyers arriving from a campaign need to compare the model and reach an outlet without searching through a general vehicle catalogue.',
    execution: [
      ['Brand', 'Give Tata Punch a distinct destination within the Shaw Tata dealership experience.'],
      ['Website', 'Put model imagery, specifications and price information together on the vehicle page.'],
      ['Enquiry', 'Make the offer request and outlet selection part of the same journey.'],
    ],
  },
  'garnet-skoda': {
    market: 'Mumbai & Navi Mumbai · Škoda sales',
    cover: photos + 'garnet-skoda-feature.jpg',
    headline: 'Give Škoda buyers a direct route from model research to the showroom.',
    challenge: 'Buyers comparing models need to find the right vehicle and reach a showroom without losing their place in the buying journey.',
    execution: [
      ['Brand', 'Present Škoda vehicles and the Garnet dealership within a consistent experience.'],
      ['Website', 'Organise the dealership website around the model range so buyers can compare options.'],
      ['Enquiry', 'Connect model browsing with showroom contact and test-drive enquiries.'],
    ],
  },
  'garve-hyundai': {
    market: 'Wadgaon, Pune · Hyundai sales',
    cover: photos + 'garve-hyundai-showcase.jpg',
    headline: 'Give local Hyundai buyers a dedicated sales destination.',
    challenge: 'Customers looking for a nearby showroom need to identify the right dealership location before getting in touch about a vehicle.',
    execution: [
      ['Brand', 'Show the Hyundai sales experience in the context of the Garve dealership.'],
      ['Website', 'Use a dedicated sales page for the Wadgaon location.'],
      ['Enquiry', 'Help customers move from exploring the range to contacting the sales team.'],
    ],
  },
  'garve-honda-service': {
    market: 'Pimpri, Pune · Honda service',
    cover: photos + 'garve-honda-service-showcase.jpg',
    headline: 'Make it easier for Honda owners to find their service centre.',
    challenge: 'Existing Honda owners looking for servicing need the right branch and a practical way to reach the service team.',
    execution: [
      ['Brand', 'Keep the Honda service centre and its local branch easy to identify.'],
      ['Website', 'Present the Pimpri Colony location through its dedicated Garve Honda page.'],
      ['Enquiry', 'Give service customers a clear route to contact the branch.'],
    ],
  },
};

export const showcaseDealerships = Object.entries(dealershipStories).map(([id, story]) => ({
  ...automotiveProjects.find((client) => client.id === id),
  ...story,
}));
