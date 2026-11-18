(() => {
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const link = (url, label) => {
    try {
      const parsed = new URL(url);
      return /^https?:$/.test(parsed.protocol) ? `<a href="${esc(parsed.href)}" target="_blank" rel="noopener noreferrer">${esc(label || url)} ↗</a>` : esc(label);
    } catch { return esc(label); }
  };
  const table = (headers, rows) => `<div class="seo-table-scroll" tabindex="0" role="region" aria-label="Top five pages driving search visibility"><table class="seo-table"><thead><tr>${headers.map(header => `<th scope="col">${esc(header)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
  const badge = status => `<span class="seo-badge${status === "Main Traffic Driver" ? " positive" : ""}">${esc(status)}</span>`;

  window.renderTrafficVisibility = result => {
    const data = result.trafficVisibility;
    const existing = document.getElementById("traffic-visibility");
    if (existing) existing.remove();
    if (!data) return;
    const section = document.createElement("section");
    section.className = "seo-section";
    section.id = "traffic-visibility";
    section.setAttribute("aria-labelledby", "traffic-heading");
    const realUser = data.cruxActive ? "Active (CrUX Verified)" : "Emerging / Low";
    const realUserDetail = data.cruxActive ? "Chrome real-user data is available" : "Below Chrome CrUX threshold";
    const pages = (data.topPages || []).map(page => `<tr><td>#${esc(page.rank)}</td><td>${link(page.url, page.title)}<small>${esc(page.url)}</small></td><td>${esc(page.trafficShare)}</td><td>${esc(page.monthlyVisits)}</td><td>${badge(page.status)}</td></tr>`).join("");
    section.innerHTML = `<div class="seo-section-heading"><span class="seo-overline">04 / Search visibility</span><h2 id="traffic-heading">Website Traffic & Top 5 Pages</h2><p>Estimated from live Google indexing, Chrome real-user signals (CrUX), and SERP positions.</p></div><div class="equity-kpis"><article class="equity-kpi"><span>Est. Monthly Search Traffic</span><strong>${esc(data.estimatedMonthlyTraffic)}</strong><small>Directional estimate, not analytics data</small></article><article class="equity-kpi"><span>Google Real-User Traffic</span><strong>${esc(realUser)}</strong><small>${esc(realUserDetail)}</small></article><article class="equity-kpi"><span>Global Web Popularity</span><strong>${esc(data.globalPopularity)}</strong><small>Public Tranco ranking · Page 1 visibility ${esc(data.pageOneVisibilityScore)} / 100</small></article></div><h3>Top 5 Pages Driving Search Visibility</h3><p class="seo-source">${esc(data.indexedPageSource === "Google indexed-page order" ? "Ordered from the available Google indexed-page results, then balanced with observed search positions and internal page strength." : "Live indexed-page results were unavailable, so this uses the strongest non-utility pages found in the completed crawl.")}</p>${pages ? table(["Rank", "Top Indexed Page", "Est. Traffic Share", "Est. Monthly Visits", "Visibility Status"], pages) : '<p class="seo-empty">No eligible content or service pages were available from this crawl.</p>'}<div class="keyword-actions"><p>Want exact visitor counts and keyword clicks? Connect Google Search Console with our team for a free deep traffic review.</p></div><p class="seo-source">${esc(data.transparency)}</p>`;
    const anchor = document.getElementById("crawl-diagnostics");
    if (anchor) anchor.before(section);
  };
})();

