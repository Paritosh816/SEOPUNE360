export default function Brand({ footer = false }) {
  const logoFilter = footer ? 'brand-logo-key-footer' : 'brand-logo-key-header';
  return (
    <a className={'brand' + (footer ? ' brand-footer' : '')} href="/" aria-label="SEOPune360 home">
      <svg className="brand-logo" viewBox="0 0 4238 677" aria-hidden="true">
        <defs>
          <clipPath id={logoFilter + '-image-clip'}>
            <rect x="190" y="110" width="2970" height="460" />
          </clipPath>
          <filter id={logoFilter} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="0 0 0 0 0.318
              0 0 0 0 0.761
              0 0 0 0 0.737
              -0.634 -2.135 -0.215 0 2.983" />
          </filter>
        </defs>
        <image href="/seopune360-logo.jpg" width="4238" height="677" clipPath={`url(#${logoFilter}-image-clip)`} filter={`url(#${logoFilter})`} />
        <text className="brand-logo-addition" x="700" y="540">SEO</text>
        <text className="brand-logo-addition" x="3190" y="540">360</text>
      </svg>
    </a>
  );
}
