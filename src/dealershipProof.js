const assetRoot = '/automotive-showcase/proof/';
const metric = (label, value, context) => ({ label, value, context });
const capture = (dealer, month, file, title) => ({ src: assetRoot + dealer + '/' + month + '-' + file + '.png', title });

const toyotaSeptember = { conversions: 1114.06, calls: 80, meta: 377 };
const toyotaOctober = { conversions: 1854.01, calls: 84, meta: 343 };
const tataSeptember = { conversions: 414.81, calls: 31, meta: 44 };
const tataOctoberMeta = 233;

function google(dealer, month, totals, includeBreakdown = true) {
  const slug = month.toLowerCase();
  return {
    metrics: [metric('Google Ads conversions', totals.conversions), metric('Google Ads phone calls', totals.calls)],
    captures: [
      capture(dealer, slug, 'google-overview', month + ' Google Ads overview'),
      ...(includeBreakdown ? [capture(dealer, slug, 'google-breakdown', month + ' Google Ads campaign breakdown')] : []),
    ],
  };
}

function meta(dealer, month, value) {
  return {
    metrics: [metric('Meta Results', value, 'Visible lead-labelled rows')],
    note: 'Adds the visible Results rows labelled Leads, Leads (Form), or Meta leads. Other objectives and rows with no visible result label are excluded.',
    captures: [capture(dealer, month.toLowerCase(), 'meta', month + ' Meta Ads campaign results')],
  };
}

export const dealershipProof = {
  'shaw-toyota': {
    headlines: [
      metric('Google Ads conversions', toyotaSeptember.conversions + toyotaOctober.conversions, 'September + October'),
      metric('Google Ads phone calls', toyotaSeptember.calls + toyotaOctober.calls, 'September + October'),
      metric('Meta Results', toyotaSeptember.meta + toyotaOctober.meta, 'Visible lead-labelled rows · September + October'),
    ],
    note: 'Google Ads figures are dashboard-reported conversions and phone calls. Meta Results count visible lead-labelled rows. The three measures are separate and do not establish unique leads or booked test drives.',
    months: {
      September: { 'Google Ads': google('shaw-toyota', 'September', toyotaSeptember), 'Meta Ads': meta('shaw-toyota', 'September', toyotaSeptember.meta) },
      October: { 'Google Ads': google('shaw-toyota', 'October', toyotaOctober), 'Meta Ads': meta('shaw-toyota', 'October', toyotaOctober.meta) },
    },
  },
  'shaw-tata': {
    headlines: [
      metric('Google Ads conversions', tataSeptember.conversions, 'Verified September dashboard'),
      metric('Google Ads phone calls', tataSeptember.calls, 'Verified September dashboard'),
      metric('Meta Results', tataSeptember.meta + tataOctoberMeta, 'Visible lead-labelled rows · September + October'),
    ],
    note: 'Shaw Tata has verified Google Ads figures for September and Meta evidence for both months. October Google Ads figures are pending a confirmed Shaw Tata dashboard. The figures do not establish unique leads or booked test drives.',
    months: {
      September: { 'Google Ads': google('shaw-tata', 'September', tataSeptember, false), 'Meta Ads': meta('shaw-tata', 'September', tataSeptember.meta) },
      October: {
        'Google Ads': { metrics: [], captures: [], note: 'October Google Ads figures will be added when a Shaw Tata dashboard for that month is confirmed.' },
        'Meta Ads': meta('shaw-tata', 'October', tataOctoberMeta),
      },
    },
  },
};
