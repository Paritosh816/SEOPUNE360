(() => {
  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const num = value => Number.isFinite(value) ? value.toLocaleString("en-IN") : "Unavailable";
  const utilityPath = /\/(?:cart|account|login|signup|sign-up|checkout|privacy|terms)(?:\/|$)/i;
  const link = (url, label) => {
    try {
      const parsed = new URL(url);
      return /^https?:$/.test(parsed.protocol) ? `<a href="${esc(parsed.href)}" target="_blank" rel="noopener noreferrer">${esc(label || url)} ↗</a>` : esc(label);
    } catch { return esc(label); }
  };
  const metric = (label, value, detail) => `<article class="equity-kpi"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(detail)}</small></article>`;
  const table = (headers, rows, label = "Scrollable results table") => `<div class="seo-table-scroll" tabindex="0" role="region" aria-label="${esc(label)}"><table class="seo-table"><thead><tr>${headers.map(header => `<th scope="col">${esc(header)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>`;
  const rankText = serp => serp.status === "found" ? `#${serp.position} · SERP Page ${serp.serpPage}` : serp.status === "not_found" ? "Not in Top 5 Pages (> #50)" : serp.status === "partial" ? "Incomplete search coverage" : "Live ranking unavailable";
  const plainFlag = (flag, url) => {
    const utility = (() => { try { return utilityPath.test(new URL(url).pathname); } catch { return false; } })();
    if (utility && flag === "Top Authority") return ["Utility Page", false];
    if (flag === "Top Authority") return ["Strong Page", true];
    if (flag === "Orphan Risk") return ["Hard to Find (No Links In)", false];
    if (flag === "Dead End") return ["Needs Next-Step Links", false];
    return [flag, false];
  };

  window.renderSeoReport = (result, rescan) => {
    const panel = document.getElementById("seo-intelligence");
    panel.classList.remove("hidden");
    if (!result.internalLinkEquity || !result.keywordAnalysis) {
      panel.innerHTML = "<h2>Search intelligence</h2><p>This scan service has not returned the search analysis yet. Try again after its update completes.</p>";
      return;
    }
    const equity = result.internalLinkEquity;
    const authority = result.authority || {};
    const analysis = result.keywordAnalysis;
    const rows = equity.pages.map((page, index) => {
      const flags = page.flags.map(flag => {
        const [label, positive] = plainFlag(flag, page.url);
        return `<span class="seo-badge${positive ? " positive" : ""}">${esc(label)}</span>`;
      }).join("") || "—";
      const path = new URL(page.url).pathname;
      return `<tr${index >= 10 ? " class=\"equity-extra hidden\"" : ""}><td>${link(page.url, page.title || path)}<small>${esc(path)}</small></td><td><div class="equity-meter"><span>${page.score}</span><progress max="100" value="${page.score}" aria-label="Page strength ${page.score} out of 100"></progress></div></td><td>${page.inboundCount}</td><td>${page.outboundCount}</td><td>${flags}</td></tr>`;
    }).join("");
    const authorityCard = authority.openPageRank == null
      ? `<article class="seo-metric"><span>External Domain PageRank</span><strong>—</strong><small>External comparison is unavailable</small></article>`
      : metric("External Domain PageRank", `${authority.openPageRank} / 10`, `${num(authority.referringDomains)} referring domains · Global rank ${num(authority.rank)}`);

    panel.innerHTML = `
      <section class="seo-section" aria-labelledby="equity-heading">
        <div class="seo-section-heading"><span class="seo-overline">01 / Site structure</span><h2 id="equity-heading">Most Important Pages (Internal Link Strength)</h2><p>Shows which pages your website promotes most through internal links.</p></div>
        <div class="equity-kpis">${authorityCard}${metric("Lighthouse technical SEO", result.technicalSeo?.mobile == null ? "Unavailable" : `${result.technicalSeo.mobile} / 100`, `Mobile · Desktop ${result.technicalSeo?.desktop ?? "unavailable"}${result.technicalSeo?.desktop == null ? "" : " / 100"}`)}${metric("Crawled link paths", `${equity.orphanCount} / ${equity.deadEndCount}`, `Hard-to-find pages / pages needing next-step links · ${equity.pagesAnalyzed} pages`)}</div>
        <h3>Pages in this crawl <span class="seo-muted">/ ${equity.pagesAnalyzed} crawled pages</span></h3>
        ${table(["Page", "Page Strength (0–100)", "Links Pointing Here", "Links Going Out", "Status"], rows, "Most important pages")}
        ${equity.pages.length > 10 ? '<button type="button" class="seo-button" id="equity-expand" aria-expanded="false">Show all crawled pages</button>' : ""}
        <p class="seo-source">Measured from internal links found across crawled pages.</p>
      </section>
      <section class="seo-section" aria-labelledby="keywords-heading">
        <div class="seo-section-heading"><span class="seo-overline">02 / Search position & competition</span><h2 id="keywords-heading">Homepage keyword & competitor benchmark</h2><p>Primary product/service niche: <strong>${esc(analysis.niche)}</strong></p></div>
        <p class="seo-source">${esc(analysis.nicheSource)}. ${analysis.location ? `Detected location: ${esc(analysis.location)} (${esc(analysis.locationSource)}). ` : ""}Search market: ${esc(analysis.market)} · ${esc(analysis.language)} · Checked ${esc(new Date(analysis.checkedAt).toLocaleString())}.</p>
        <p class="seo-source">${esc(analysis.extractionNote)} Server-rendered homepage signals only; JavaScript-only content may be missing.</p>
        <div class="keyword-tabs" role="tablist" aria-label="Homepage keywords">${analysis.keywords.map((keyword, index) => `<button type="button" role="tab" id="keyword-tab-${index}" aria-selected="${index === 0}" aria-controls="keyword-detail" tabindex="${index === 0 ? 0 : -1}" data-keyword="${index}">${esc(keyword.keyword)}</button>`).join("")}</div>
        <div id="keyword-detail" role="tabpanel" tabindex="0"></div>
        <details class="keyword-editor"><summary>Edit keywords and run a fresh scan</summary><form id="keyword-rescan"><label for="custom-keywords">Up to five phrases, one per line</label><textarea id="custom-keywords" rows="5" maxlength="504">${esc(analysis.keywords.map(keyword => keyword.keyword).join("\n"))}</textarea><p class="seo-source">Replace suggested phrases with the products or services you want to check. A fresh scan uses live provider requests.</p><button class="seo-button" type="submit">Recheck these keywords ↗</button><p id="keyword-error" role="alert"></p></form></details>
        <h3>Top 5 niche competitors</h3><p class="seo-source">Page 1 competitors across these keywords. Sorted by shared keywords, then average position. Directories and the scanned domain are excluded. ${analysis.authorityAsOf ? `Authority dataset: ${esc(analysis.authorityAsOf)}.` : ""}</p>
        ${analysis.competitors.length ? table(["Competitor", "Shared keywords", "Best / avg rank", "Domain PR / 10", "Referring domains"], analysis.competitors.map(competitor => `<tr><td>${link(competitor.sampleRankingUrl, competitor.competitorDomain)}<small>${esc(competitor.sampleRankingTitle)}</small></td><td>${competitor.sharedKeywordsCount} / ${analysis.keywords.length}</td><td>#${competitor.bestRank} / ${competitor.avgRank}</td><td>${competitor.openPageRank == null ? "—" : competitor.openPageRank}</td><td>${competitor.referringDomains == null ? "—" : num(competitor.referringDomains)}</td></tr>`).join("")) : '<p class="seo-empty">No eligible competitors were returned. This does not mean there is no competition; check the keyword search status above.</p>'}
        ${analysis.authorityError ? `<p class="seo-source">${esc(analysis.authorityError)}</p>` : ""}<p class="seo-source">Search results vary by location and time. These observations support a review; they do not guarantee rankings.</p>
      </section>`;

    if (result.aeoGeo) {
      const aeo = result.aeoGeo;
      const schema = aeo.schema || {};
      panel.insertAdjacentHTML("beforeend", `<section class="seo-section" id="aeo-geo-readiness"><div class="seo-section-heading"><span class="seo-overline">03 / AI Search, AEO & GEO Readiness</span><h2>AI Search, AEO & GEO Readiness</h2><p>Observable signals that can help answer engines discover and understand this site.</p></div><div class="equity-kpis">${metric("Readiness score", `${aeo.score} / 100`, `${aeo.checks.filter(check => check.pass).length} of ${aeo.checks.length} checks passed`)}${metric("Structured data", `${schema.score ?? 0} / 100`, `${(schema.types || []).length} schema types detected`)}</div><ul class="aeo-checks">${aeo.checks.map(check => `<li><b>${check.pass ? "✓" : "○"} ${esc(check.label)}</b><small>${esc(typeof check.detail === "string" ? check.detail : JSON.stringify(check.detail))}</small></li>`).join("")}</ul><h3>AI crawler access</h3><p>${(aeo.bots || []).map(bot => `${esc(bot.bot)}: ${esc(bot.status)}`).join(" · ")}</p><h3>Structured data scorecard</h3><p><b>Detected:</b> ${esc((schema.detected || []).join(", ") || "None")} · <b>Missing:</b> ${esc((schema.missing || []).join(", ") || "None")}</p><p>Types: ${esc((schema.types || []).join(", ") || "None")}. Key fields: ${(schema.fields || []).map(field => `${esc(field.field)} ${field.present ? "✓" : "−"}`).join(" · ")}${schema.malformedBlocks?.length ? ` · Malformed JSON-LD blocks: ${schema.malformedBlocks.length}` : ""}</p><h3>Quick wins</h3><ul>${aeo.recommendations.map(recommendation => `<li>${esc(recommendation)}</li>`).join("")}</ul></section>`);
    }

    const showKeyword = index => {
      const row = analysis.keywords[index];
      const detail = document.getElementById("keyword-detail");
      if (!row) { detail.innerHTML = '<p class="seo-empty">No credible commercial phrases found in the homepage HTML. Add custom keywords below.</p>'; return; }
      panel.querySelectorAll("[data-keyword]").forEach((button, tabIndex) => { button.setAttribute("aria-selected", String(tabIndex === index)); button.tabIndex = tabIndex === index ? 0 : -1; });
      detail.setAttribute("aria-labelledby", `keyword-tab-${index}`);
      const checks = [["Title", "inTitle"], ["H1", "inH1"], ["H2", "inH2"], ["Meta description", "inMetaDesc"], ["First 100 words", "inFirst100Words"]];
      detail.innerHTML = `<div class="keyword-result"><span class="seo-overline">${esc(row.source)}</span><h3>${esc(rankText(row.serp))}</h3>${row.serp.rankedUrl ? `<p>${esc(row.serp.rankedPageType)} · ${link(row.serp.rankedUrl)}</p>` : ""}<p class="seo-source">${esc(row.serp.provider || "No search provider available")} · ${row.serp.checkedResults} organic results checked.${row.serp.error ? ` ${esc(row.serp.error)}` : ""}</p><div class="keyword-checks">${checks.map(([label, key]) => `<span class="${row.placement[key] ? "present" : "absent"}">${row.placement[key] ? "✓" : "−"} ${label}</span>`).join("")}</div><p class="seo-source">Keyword placement score <strong>${row.optimizationScore}%</strong> · Exact phrase matching; a content checklist, not a ranking prediction.</p><h4>Top Page 1 competitors for this keyword</h4>${row.competitors.length ? table(["Competitor / position", "Search result title & snippet", "Domain PR / 10"], row.competitors.map(competitor => `<tr><td>${link(competitor.url, competitor.competitorDomain)}<small>#${competitor.position}</small></td><td>${esc(competitor.title)}<small>${esc(competitor.snippet)}</small></td><td>${num(competitor.openPageRank)}</td></tr>`).join("")) : '<p class="seo-empty">No eligible Page 1 competitors available for this query.</p>'}<div class="keyword-actions"><h4>Recommended next steps</h4><ul>${row.actions.map(action => `<li>${esc(action)}</li>`).join("")}</ul></div></div>`;
    };
    showKeyword(0);
    const tabs = [...panel.querySelectorAll("[data-keyword]")];
    tabs.forEach((button, index) => {
      button.addEventListener("click", () => showKeyword(index));
      button.addEventListener("keydown", event => {
        let next;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = tabs.length - 1;
        if (next !== undefined) { event.preventDefault(); showKeyword(next); tabs[next].focus(); }
      });
    });
    panel.querySelector("#equity-expand")?.addEventListener("click", event => {
      const expanded = event.currentTarget.getAttribute("aria-expanded") !== "true";
      panel.querySelectorAll(".equity-extra").forEach(row => row.classList.toggle("hidden", !expanded));
      event.currentTarget.setAttribute("aria-expanded", String(expanded));
      event.currentTarget.textContent = expanded ? "Show top 10 pages" : "Show all crawled pages";
    });
    document.getElementById("keyword-rescan")?.addEventListener("submit", event => {
      event.preventDefault();
      const keywords = document.getElementById("custom-keywords").value.split("\n").map(value => value.trim()).filter(Boolean);
      if (!keywords.length || keywords.length > 5 || keywords.some(keyword => keyword.length > 100)) {
        document.getElementById("keyword-error").textContent = "Enter one to five phrases, each no longer than 100 characters.";
        return;
      }
      rescan(analysis.homepageUrl, keywords);
    });
  };
})();

