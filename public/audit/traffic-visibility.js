(() => {
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const link = (url, label) => {
    try {
      const parsed = new URL(url);
      return /^https?:$/.test(parsed.protocol) ? `<a href="${esc(parsed.href)}" target="_blank" rel="noopener noreferrer">${esc(label || url)} ↗</a>` : esc(label);
    } catch { return esc(label); }
  };
  const table = (headers, rows) => `<div class="seo-table-scroll" tabindex="0" role="region" aria-label="Top five pages by estimated traffic"><table class="seo-table"><thead><tr>${headers.map(header => `<th scope="col">${esc(header)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
  const badge = status => `<span class="seo-badge${status === "Top Traffic Page" ? " positive" : ""}">${esc(status)}</span>`;
  const integer = value => Number(value || 0).toLocaleString("en-IN");

  window.renderTrafficVisibility = result => {
    const data = result.trafficVisibility;
    document.getElementById("traffic-visibility")?.remove();
    if (!data) return;
    const section = document.createElement("section");
    section.className = "seo-section";
    section.id = "traffic-visibility";
    section.setAttribute("aria-labelledby", "traffic-heading");
    const tierDetail = data.trancoRank ? `Tranco #${integer(data.trancoRank)}` : "No Top 1M Tranco rank";
    const rows = (data.topPages || []).map(page => `<tr><td>#${esc(page.rank)}</td><td>${link(page.url, page.title)}<small>${esc(page.path || page.url)}</small></td><td><div class="equity-meter"><strong>${esc(integer(page.estimatedMonthlyVisits))}</strong><progress max="100" value="${Math.min(100, Math.max(1, page.trafficSharePercent))}" aria-label="Estimated ${integer(page.estimatedMonthlyVisits)} visits per month"></progress></div></td><td>${esc(page.trafficSharePercent)}%</td><td>${badge(page.status)}</td></tr>`).join("");
    section.innerHTML = `<div class="seo-section-heading"><span class="seo-overline">04 / Search visibility</span><h2 id="traffic-heading">Estimated Website Traffic & Top 5 Pages</h2><p>Directionally modeled from public web signals. It does not require a website login.</p></div><div class="equity-kpis"><article class="equity-kpi"><span>Est. Monthly Visits</span><strong>${esc(data.displayVisits)}</strong><small>Estimated average CTR: ${esc(data.estimatedAvgCtr)}</small></article><article class="equity-kpi"><span>Est. Search Impressions</span><strong>${esc(data.displayImpressions)}</strong><small>GSC-style monthly search views</small></article><article class="equity-kpi"><span>Pages Indexed on Google</span><strong>${esc(integer(data.indexedPagesCount))}</strong><small>${esc(data.indexedPageSource === "Google site: results" ? "Observed from Google site: results" : "Using crawled-page count while site: data is unavailable")}</small></article><article class="equity-kpi"><span>Traffic Tier</span><strong>${esc(data.trafficTier)}</strong><small>${esc(tierDetail)}</small></article></div><h3>Top 5 Pages by Estimated Traffic</h3>${rows ? table(["#", "Page", "Est. Monthly Visits", "Traffic Share", "Status"], rows) : '<p class="seo-empty">No eligible content, service or product pages were available from this crawl.</p>'}<p class="seo-source">${esc(data.transparency)}</p>`;
    document.getElementById("crawl-diagnostics")?.before(section);
  };
})();

