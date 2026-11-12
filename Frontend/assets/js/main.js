/* ==========================================================
   Harshith Kumar — Portfolio  ·  main.js
   Layout, loader, theme, reveal, charts, tour, contact form
   ========================================================== */
(function () {
  "use strict";

  /* ---------------- Site config (edit here) ---------------- */
  const SITE = {
    name: "Kakkirala Harshith Kumar",
    email: "harshithkumar4452@gmail.com",
    // Add your number in international format to show a clickable "Call" link everywhere, e.g. "+91 98765 43210"
    phone: "",
    location: "Hyderabad, India",
    resume: "/assets/Harshith_Resume.pdf",
    github: "https://github.com/harshith-kumar4452",
    linkedin: "https://linkedin.com/in/kakkirala-harshithkumar",
    leetcode: "https://leetcode.com/u/user9425Wn/",
    // Optional: a Formspree / Getform endpoint to receive contact-form messages directly.
    // Leave empty to fall back to opening the visitor's mail app with the message pre-filled.
    formEndpoint: ""
  };
  window.SITE = SITE;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get(k, area = localStorage) { try { return area.getItem(k); } catch (e) { return null; } },
    set(k, v, area = localStorage) { try { area.setItem(k, v); } catch (e) {} }
  };
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Icons ---------------- */
  const I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    arrowUR: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    sun: '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2.2-2.4 3.7M12 17h.01"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8 19H5V9h3zM6.5 7.7A1.7 1.7 0 1 1 8.2 6a1.7 1.7 0 0 1-1.7 1.7zM19 19h-3v-4.9c0-1.2 0-2.7-1.6-2.7S12.5 12.6 12.5 14v5h-3V9h2.9v1.4a3.2 3.2 0 0 1 2.9-1.6c3.1 0 3.7 2 3.7 4.7z"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/></svg>'
  };
  window.ICONS = I;

  const NAV = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/achievements", label: "Achievements" },
    { href: "/contact", label: "Contact" }
  ];

  /* ---------------- Theme (before paint) ---------------- */
  const savedTheme = store.get("hk-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.setAttribute("data-theme", savedTheme || (prefersDark ? "dark" : "light"));

  /* ---------------- Current path ---------------- */
  function currentPath() {
    let p = location.pathname.replace(/\/index(\.html)?$/, "/").replace(/\.html$/, "").replace(/\/+$/, "");
    return p === "" ? "/" : p;
  }
  const PATH = currentPath();
  const isActive = (href) => href === PATH;

  /* ---------------- Header / footer ---------------- */
  function renderHeader() {
    const slot = $("#site-header");
    if (!slot) return;
    const links = NAV.map(n => `<li><a href="${n.href}"${isActive(n.href) ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("");
    const mlinks = NAV.map((n, i) => `<li style="transition-delay:${0.04 * i + 0.05}s"><a href="${n.href}"${isActive(n.href) ? ' aria-current="page"' : ""}>${n.label}<span class="idx">0${i + 1}</span></a></li>`).join("");
    slot.outerHTML = `
      <a class="skip" href="#main">Skip to content</a>
      <div class="progress-bar" aria-hidden="true"></div>
      <header class="site-header" id="top">
        <nav class="container nav" aria-label="Primary">
          <a href="/" class="logo" aria-label="Harshith Kumar — home" data-tour="logo">
            <span class="logo-mark">HK</span><span class="logo-text">Harshith Kumar</span>
          </a>
          <ul class="nav-links" data-tour="nav">${links}</ul>
          <div class="nav-actions">
            <button class="icon-btn tour-btn" type="button" aria-label="Take a tour of this site" title="Take the tour" data-tour="tour">${I.help}</button>
            <button class="icon-btn theme-toggle" type="button" aria-label="Toggle dark mode" title="Toggle theme" data-tour="theme">${I.sun}${I.moon}</button>
            <button class="icon-btn menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-tour="nav-mobile">
              <span class="menu-btn-inner"><span></span><span></span><span></span></span>
            </button>
          </div>
        </nav>
      </header>
      <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
        <ul>${mlinks}</ul>
        <div class="mm-foot">
          <a class="btn btn-primary btn-sm" href="mailto:${SITE.email}">${I.mail} Email me</a>
          ${SITE.phone ? `<a class="btn btn-sm" href="tel:${SITE.phone.replace(/[^+\d]/g, "")}">${I.phone} Call</a>` : ""}
          <a class="btn btn-sm" href="${SITE.resume}" download>${I.download} Resume</a>
        </div>
      </div>`;
  }

  function renderFooter() {
    const slot = $("#site-footer");
    if (!slot) return;
    const year = new Date().getFullYear();
    const tel = SITE.phone ? `<li><a href="tel:${SITE.phone.replace(/[^+\d]/g, "")}">${SITE.phone}</a></li>` : "";
    slot.outerHTML = `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <div>
              <a href="/" class="logo" aria-label="Harshith Kumar — home"><span class="logo-mark">HK</span><span class="logo-text">Harshith Kumar</span></a>
              <p class="muted" style="max-width:320px;margin:14px 0 0;font-size:14px">Full-stack developer building intelligent, data-driven products. Based in ${SITE.location}.</p>
            </div>
            <div class="footer-nav">
              <div><h4>Pages</h4><ul>${NAV.map(n => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}</ul></div>
              <div><h4>Elsewhere</h4><ul>
                <li><a href="${SITE.github}" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="${SITE.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="${SITE.leetcode}" target="_blank" rel="noopener noreferrer">LeetCode</a></li>
                <li><a href="${SITE.resume}" download>Resume (PDF)</a></li>
              </ul></div>
              <div><h4>Contact</h4><ul>
                <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>${tel}
                <li class="muted">${SITE.location}</li>
              </ul></div>
            </div>
          </div>
          <div class="footer-bottom">
            <span>© ${year} ${SITE.name}. All rights reserved.</span>
            <a href="#top" class="text-link">Back to top ↑</a>
          </div>
        </div>
      </footer>
      <div class="toast" role="status" aria-live="polite"></div>`;
  }

  function toast(msg) {
    const t = $(".toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove("show"), 2400);
  }
  window.toast = toast;

  /* ---------------- Behaviour ---------------- */
  function bindHeader() {
    const header = $(".site-header");
    const bar = $(".progress-bar");
    const onScroll = () => {
      header && header.classList.toggle("scrolled", window.scrollY > 8);
      if (bar) {
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
      }
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const tbtn = $(".theme-toggle");
    tbtn && tbtn.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      store.set("hk-theme", next);
    });

    const mbtn = $(".menu-btn"), menu = $("#mobile-menu");
    const setMenu = (open) => {
      mbtn.setAttribute("aria-expanded", String(open));
      mbtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("open", open);
      menu.setAttribute("aria-hidden", String(!open));
      document.body.classList.toggle("menu-open", open);
    };
    if (mbtn && menu) {
      mbtn.addEventListener("click", () => setMenu(mbtn.getAttribute("aria-expanded") !== "true"));
      $$("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
      addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
      addEventListener("resize", () => { if (innerWidth > 900) setMenu(false); });
    }

    const tour = $(".tour-btn");
    tour && tour.addEventListener("click", () => {
      if (PATH === "/") startTour();
      else { store.set("hk-tour-request", "1", sessionStorage); location.href = "/"; }
    });
  }

  /* Reveal + count-up + bars via IntersectionObserver */
  function bindReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target;
        el.classList.add("in");
        if (el.dataset.count) countUp(el);
        if (el.classList.contains("bar")) {
          const f = $(".bar-fill", el); if (f) f.style.width = el.dataset.value + "%";
          const p = $(".pct", el); if (p) countUp(p, +el.dataset.value, "%");
        }
        if (el.dataset.chart === "radar") drawRadar(el, true);
        if (el.dataset.chart === "donut") drawDonut(el, true);
        io.unobserve(el);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal, [data-count], .bar, .timeline, .tl-item, [data-chart]").forEach(el => io.observe(el));
  }

  function countUp(el, target, suffix) {
    target = target != null ? target : +el.dataset.count;
    suffix = suffix != null ? suffix : (el.dataset.suffix || "");
    const dec = (String(target).split(".")[1] || "").length;
    if (reduced) { el.innerHTML = target.toFixed(dec) + suffix; return; }
    const dur = 1400, t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.innerHTML = (target * e).toFixed(dec) + suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------------- Charts ---------------- */
  function drawRadar(host, animate) {
    const data = JSON.parse(host.dataset.values);
    const size = 360, c = size / 2, r = 120, n = data.length;
    const pt = (i, v) => {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
      return [c + Math.cos(a) * r * v, c + Math.sin(a) * r * v];
    };
    let rings = "";
    [0.25, 0.5, 0.75, 1].forEach(k => {
      rings += `<polygon class="grid-ring" points="${data.map((_, i) => pt(i, k).join(",")).join(" ")}"/>`;
    });
    let axes = "", labels = "";
    data.forEach((d, i) => {
      const [x, y] = pt(i, 1);
      axes += `<line class="axis" x1="${c}" y1="${c}" x2="${x}" y2="${y}"/>`;
      const [lx, ly] = pt(i, 1.24);
      const anchor = Math.abs(lx - c) < 4 ? "middle" : lx > c ? "start" : "end";
      labels += `<text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle">${d.label}</text>`;
      labels += `<text class="val" x="${lx}" y="${ly + 15}" text-anchor="${anchor}" dominant-baseline="middle">${d.value}%</text>`;
    });
    host.innerHTML = `<svg class="radar" viewBox="-40 -10 ${size + 80} ${size + 20}" role="img" aria-label="Radar chart of average skill level per category">
      ${rings}${axes}<polygon class="area" points=""/>${data.map(() => `<circle class="dot" r="4" cx="${c}" cy="${c}"/>`).join("")}${labels}</svg>`;
    const poly = $(".area", host), dots = $$(".dot", host);
    const render = (k) => {
      const pts = data.map((d, i) => pt(i, (d.value / 100) * k));
      poly.setAttribute("points", pts.map(p => p.join(",")).join(" "));
      dots.forEach((dot, i) => { dot.setAttribute("cx", pts[i][0]); dot.setAttribute("cy", pts[i][1]); });
    };
    if (!animate || reduced) return render(1);
    const t0 = performance.now();
    const step = (t) => { const k = Math.min(1, (t - t0) / 1300); render(1 - Math.pow(1 - k, 4)); if (k < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  function drawDonut(host, animate) {
    const data = JSON.parse(host.dataset.values);
    const total = data.reduce((s, d) => s + d.value, 0);
    const R = 60, C = 2 * Math.PI * R;
    let off = 0;
    const segs = data.map(d => {
      const len = (d.value / total) * C;
      const s = `<circle class="seg" cx="80" cy="80" r="${R}" stroke="${d.color}" stroke-dasharray="0 ${C}" data-len="${len - 2}" stroke-dashoffset="${-off}"/>`;
      off += len; return s;
    }).join("");
    host.innerHTML = `<div class="donut-wrap">
      <svg class="donut" viewBox="0 0 160 160" role="img" aria-label="Share of projects by domain"><circle class="bg" cx="80" cy="80" r="${R}"/>${segs}</svg>
      <ul class="legend">${data.map(d => `<li><i style="background:${d.color}"></i>${d.label}<span class="v">${d.value}</span></li>`).join("")}</ul></div>`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      $$(".seg", host).forEach(s => s.setAttribute("stroke-dasharray", `${s.dataset.len} ${C}`));
    }));
  }

  /* ---------------- Typed role ---------------- */
  function bindTyped() {
    const el = $(".typed");
    if (!el) return;
    const words = JSON.parse(el.dataset.words);
    if (reduced) { el.textContent = words[0]; return; }
    let w = 0, i = 0, del = false;
    const tick = () => {
      const word = words[w];
      i += del ? -1 : 1;
      el.textContent = word.slice(0, i);
      let d = del ? 35 : 70;
      if (!del && i === word.length) { del = true; d = 1700; }
      else if (del && i === 0) { del = false; w = (w + 1) % words.length; d = 300; }
      setTimeout(tick, d);
    };
    tick();
  }

  /* ---------------- Project filters ---------------- */
  function bindFilters() {
    const btns = $$(".filter");
    if (!btns.length) return;
    const cards = $$(".project");
    btns.forEach(b => {
      const f = b.dataset.filter;
      const n = f === "all" ? cards.length : cards.filter(c => c.dataset.cat.includes(f)).length;
      b.insertAdjacentHTML("beforeend", `<span class="count">${n}</span>`);
      b.addEventListener("click", () => {
        btns.forEach(x => x.setAttribute("aria-pressed", String(x === b)));
        cards.forEach(c => {
          const show = f === "all" || c.dataset.cat.includes(f);
          c.classList.toggle("hide", !show);
          if (show) { c.classList.remove("fade-swap"); void c.offsetWidth; c.classList.add("fade-swap"); }
        });
      });
    });
  }

  /* ---------------- Copy-to-clipboard ---------------- */
  function bindCopy() {
    $$("[data-copy]").forEach(b => b.addEventListener("click", async (e) => {
      e.preventDefault();
      try { await navigator.clipboard.writeText(b.dataset.copy); toast("Copied to clipboard ✓"); }
      catch (err) { toast("Couldn't copy — please copy it manually"); }
    }));
  }

  /* ---------------- Contact form ---------------- */
  function bindForm() {
    const form = $("#contact-form");
    if (!form) return;
    const ok = $(".alert-ok", form), err = $(".alert-err", form), btn = $("button[type=submit]", form);
    const rules = {
      name: v => v.trim().length >= 2 || "Please enter your name (at least 2 characters).",
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address.",
      message: v => v.trim().length >= 10 || "Your message should be at least 10 characters."
    };
    const check = (input) => {
      const res = rules[input.name] ? rules[input.name](input.value) : true;
      const field = input.closest(".field");
      field.classList.toggle("invalid", res !== true);
      $(".error", field).textContent = res === true ? "" : res;
      input.setAttribute("aria-invalid", String(res !== true));
      return res === true;
    };
    $$("input, textarea", form).forEach(inp => {
      inp.addEventListener("blur", () => inp.value && check(inp));
      inp.addEventListener("input", () => inp.closest(".field").classList.contains("invalid") && check(inp));
    });
    const show = (el, msg) => { [ok, err].forEach(a => a.classList.remove("show")); $(".msg", el).textContent = msg; el.classList.add("show"); };

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (form.website && form.website.value) return; // honeypot
      const valid = $$("input[name], textarea[name]", form).filter(i => rules[i.name]).map(check).every(Boolean);
      if (!valid) { show(err, "Please fix the highlighted fields and try again."); $(".invalid input, .invalid textarea", form)?.focus(); return; }
      const data = { name: form.name.value.trim(), email: form.email.value.trim(), message: form.message.value.trim() };
      btn.classList.add("loading"); btn.disabled = true;
      try {
        if (SITE.formEndpoint) {
          const res = await fetch(SITE.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
          if (!res.ok) throw new Error("Request failed");
          show(ok, `Thanks ${data.name.split(" ")[0]}! Your message was sent — I'll reply within 24–48 hours.`);
        } else {
          const subject = encodeURIComponent(`Portfolio enquiry from ${data.name}`);
          const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
          window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
          show(ok, `Thanks ${data.name.split(" ")[0]}! Your email app has opened with the message ready — just hit send.`);
        }
        form.reset();
      } catch (ex) {
        show(err, `Something went wrong sending your message. Please email me directly at ${SITE.email}.`);
      } finally {
        btn.classList.remove("loading"); btn.disabled = false;
      }
    });
  }

  /* ---------------- Clickable phone (shown only when configured) ---------------- */
  function bindPhone() {
    $$("[data-phone]").forEach(el => {
      if (!SITE.phone) { el.remove(); return; }
      const a = $("a", el) || el;
      a.href = "tel:" + SITE.phone.replace(/[^+\d]/g, "");
      const v = $(".v", el); if (v) v.textContent = SITE.phone;
      el.hidden = false;
    });
  }

  /* ---------------- GitHub graph fallback ---------------- */
  function bindGh() {
    const img = $(".gh-graph img");
    if (!img) return;
    img.addEventListener("error", () => { img.closest(".gh-graph").style.display = "none"; $(".gh-fallback").style.display = "block"; });
  }

  /* ==========================================================
     LOADER
     ========================================================== */
  function runLoader(done) {
    const seen = store.get("hk-loaded", sessionStorage);
    const name = "Harshith Kumar";
    const el = document.createElement("div");
    el.className = "loader" + (seen ? " quick" : "");
    el.setAttribute("aria-hidden", "true");
    let d = 0;
    const words = name.split(" ");
    const letters = words.map((w, wi) => `<span class="word">${w.split("").map(ch => `<span class="ch" style="animation-delay:${(d++ * 0.045 + 0.15).toFixed(3)}s">${ch}</span>`).join("")}${wi === words.length - 1 ? `<span class="ch dot" style="animation-delay:${(d * 0.045 + 0.2).toFixed(3)}s">.</span>` : ""}</span>`).join("");
    el.innerHTML = `
      <div class="panel top"></div><div class="panel bottom"></div>
      <div class="loader-grid"></div>
      <div class="loader-inner">
        <div class="loader-name">${letters}</div>
        <div class="loader-sub"><span class="phase">Initialising</span><span>Portfolio · ${new Date().getFullYear()}</span></div>
        <div class="loader-track"><div class="loader-fill"></div></div>
      </div>
      <div class="loader-meta">Full-stack developer<br>Data Science · AI · Web<br>${SITE.location}</div>
      <div class="loader-count"><b>000</b><span>%</span></div>`;
    document.body.prepend(el);
    document.body.style.overflow = "hidden";

    const finish = () => {
      el.classList.add("done");
      document.documentElement.classList.add("is-ready");
      document.body.style.overflow = "";
      store.set("hk-loaded", "1", sessionStorage);
      setTimeout(() => { el.classList.add("gone"); el.remove(); done && done(); }, 1150);
    };

    if (seen || reduced) { setTimeout(finish, seen ? 120 : 300); return; }

    const phases = ["Initialising", "Loading assets", "Compiling projects", "Rendering graphs", "Almost there", "Welcome"];
    const count = $(".loader-count b", el), fill = $(".loader-fill", el), phase = $(".phase", el);
    const dur = 2400, t0 = performance.now();
    let pageLoaded = document.readyState === "complete";
    addEventListener("load", () => { pageLoaded = true; });
    const step = (t) => {
      let k = Math.min(1, (t - t0) / dur);
      if (!pageLoaded && k > 0.9) k = 0.9; // hold at 90% until assets are in
      const e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      const v = Math.round(e * 100);
      count.textContent = String(v).padStart(3, "0");
      fill.style.transform = `scaleX(${e})`;
      phase.textContent = phases[Math.min(phases.length - 1, Math.floor(e * (phases.length - 1)))];
      if (k < 1) requestAnimationFrame(step);
      else setTimeout(finish, 280);
    };
    requestAnimationFrame(step);
    setTimeout(() => { pageLoaded = true; }, 6000); // never block for long
  }

  /* ==========================================================
     GUIDED TOUR (first visit)
     ========================================================== */
  const TOUR = [
    { title: "Welcome 👋", text: "Hi, I'm Harshith — a full-stack developer studying Data Science. Here's a 30-second tour of my portfolio." },
    { sel: '[data-tour="nav"], [data-tour="nav-mobile"]', title: "Navigate", text: "Six pages: About, Skills, Projects, Achievements and Contact. On phones, open the menu here." },
    { sel: '[data-tour="hero-cta"]', title: "Quick actions", text: "Reach out directly or download my resume as a PDF in one click." },
    { sel: '[data-tour="stats"]', title: "At a glance", text: "Key numbers — projects built, technologies, hackathon wins and CGPA." },
    { sel: '[data-tour="work"]', title: "Selected work", text: "Featured projects with code and live demos. See the Projects page for all of them, filterable by domain." },
    { sel: '[data-tour="theme"]', title: "Light or dark", text: "Switch themes anytime — your choice is remembered." },
    { sel: '[data-tour="tour"]', title: "Replay the tour", text: "Tap this button any time to see this guide again. Enjoy looking around!" }
  ];

  function visible(el) { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden"; }

  function startTour() {
    if ($(".tour-card")) return;
    const spot = document.createElement("div"); spot.className = "tour-spot center";
    const block = document.createElement("div"); block.className = "tour-block";
    const card = document.createElement("div"); card.className = "tour-card";
    card.setAttribute("role", "dialog"); card.setAttribute("aria-modal", "true"); card.setAttribute("aria-labelledby", "tour-title");
    document.body.append(block, spot, card);
    let i = 0;

    const end = () => {
      store.set("hk-tour-done", "1");
      [spot, block, card].forEach(n => { n.style.opacity = "0"; setTimeout(() => n.remove(), 300); });
      removeEventListener("keydown", onKey); removeEventListener("resize", place); removeEventListener("scroll", place);
    };
    const onKey = (e) => {
      if (e.key === "Escape") end();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const go = (dir) => { const n = i + dir; if (n < 0) return; if (n >= TOUR.length) return end(); i = n; show(); };

    function place() {
      const s = TOUR[i];
      const target = s.sel ? $$(s.sel).find(visible) : null;
      const cw = card.offsetWidth, ch = card.offsetHeight, pad = 8, m = 16;
      if (!target) {
        spot.classList.add("center");
        card.style.left = Math.max(m, (innerWidth - cw) / 2) + "px";
        card.style.top = Math.max(m, (innerHeight - ch) / 2) + "px";
        return;
      }
      spot.classList.remove("center");
      const r = target.getBoundingClientRect();
      Object.assign(spot.style, { left: r.left - pad + "px", top: r.top - pad + "px", width: r.width + pad * 2 + "px", height: r.height + pad * 2 + "px" });
      let top = r.bottom + pad + 14;
      if (top + ch > innerHeight - m) top = r.top - pad - 14 - ch;
      if (top < m) top = Math.min(innerHeight - ch - m, r.bottom + pad + 14);
      let left = r.left + r.width / 2 - cw / 2;
      left = Math.max(m, Math.min(left, innerWidth - cw - m));
      card.style.top = top + "px"; card.style.left = left + "px";
    }

    function show() {
      const s = TOUR[i];
      card.innerHTML = `
        <div class="t-step">Step ${i + 1} of ${TOUR.length}</div>
        <h3 id="tour-title">${s.title}</h3><p>${s.text}</p>
        <div class="tour-dots">${TOUR.map((_, k) => `<i class="${k === i ? "on" : ""}"></i>`).join("")}</div>
        <div class="tour-actions">
          <button class="tour-skip" type="button">${i === TOUR.length - 1 ? "" : "Skip tour"}</button>
          <div class="right">
            ${i > 0 ? '<button class="btn btn-sm" type="button" data-dir="-1">Back</button>' : ""}
            <button class="btn btn-sm btn-primary" type="button" data-dir="1">${i === TOUR.length - 1 ? "Finish" : i === 0 ? "Start tour" : "Next"}</button>
          </div>
        </div>`;
      $(".tour-skip", card).addEventListener("click", end);
      $$("[data-dir]", card).forEach(b => b.addEventListener("click", () => go(+b.dataset.dir)));
      const target = s.sel ? $$(s.sel).find(visible) : null;
      if (target) {
        const r = target.getBoundingClientRect();
        if (r.top < 70 || r.bottom > innerHeight - 40) {
          target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
          setTimeout(place, 450); setTimeout(place, 900);
        }
      }
      place();
      $("[data-dir='1']", card).focus({ preventScroll: true });
    }

    addEventListener("keydown", onKey);
    addEventListener("resize", place);
    addEventListener("scroll", place, { passive: true });
    block.addEventListener("click", () => go(1));
    window.scrollTo({ top: 0 });
    show();
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    renderHeader();
    renderFooter();
    bindHeader();
    bindTyped();
    bindFilters();
    bindCopy();
    bindForm();
    bindGh();
    bindPhone();
    runLoader(() => {
      bindReveal();
      const asked = store.get("hk-tour-request", sessionStorage);
      if (PATH === "/" && (asked || !store.get("hk-tour-done"))) {
        try { sessionStorage.removeItem("hk-tour-request"); } catch (e) {}
        setTimeout(startTour, 500);
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
