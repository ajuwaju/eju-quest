/* Neon Pass: views, router and game flow. */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const icon = (id, cls = "") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const S = () => Game.s;
  const view = $("#view");
  const hasJP = (s) => /[぀-ヿ一-龯]/.test(s);
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const subj = (id) => EJU.subjects.find(s => s.id === id);
  const district = (id) => EJU.districts.find(d => d.id === id);
  const sfx = (n, a) => window.SFX && SFX.play(n, a);
  const scene = (fn, a) => window.Scene3D && Scene3D[fn] && Scene3D[fn](a);

  /* ---------- Crew portraits (original, drawn here) ---------- */
  const colorVar = { acid: "var(--color-signal)", pink: "var(--color-pink)", cyan: "var(--color-cyan)", mint: "var(--color-mint)" };
  function avatar(id, size = "", mood = "calm") {
    const c = EJU.crew[id]; const col = colorVar[c.color];
    if (c.img) return `<img class="avatar photo ${size}" src="assets/crew/${c.img}-${size === "lg" ? "portrait" : mood}.webp" alt="${esc(c.name)}" width="120" height="120" style="--ring:${col}">`;
    const hair = {
      crop: `<path d="M30 34c0-12 8-18 20-18s20 6 20 18l-4-6H34z" fill="${col}" opacity=".9"/>`,
      bob: `<path d="M28 46c-2-20 8-30 22-30s24 10 22 30l-6 6V34c-6 2-22 2-32 0v18z" fill="${col}" opacity=".9"/>`,
      mohawk: `<path d="M44 30l2-20 4 4 4-6 2 22z" fill="${col}"/><path d="M33 34c2-8 8-12 17-12s15 4 17 12" fill="none" stroke="${col}" stroke-width="2"/>`,
      long: `<path d="M28 40c0-16 9-24 22-24s22 8 22 24v40h-8V38c-8-3-20-3-28 0v42h-8z" fill="${col}" opacity=".85"/>`
    }[c.hair];
    const visor = c.visor ? `<path d="M34 41h32l-3 6H37z" fill="${col}"/><path d="M34 41h32" stroke="var(--color-ink)" stroke-width="1" opacity=".6"/>` :
      `<path d="M39 43h6M55 43h6" stroke="var(--color-ink)" stroke-width="2.4" stroke-linecap="square"/>`;
    const scar = c.scar ? `<path d="M58 36l5 14" stroke="${col}" stroke-width="1.6"/>` : "";
    return `<svg class="avatar ${size}" viewBox="0 0 100 100" role="img" aria-label="${esc(c.name)}">
      <rect x="1" y="1" width="98" height="98" fill="var(--color-night-2)" stroke="${col}" stroke-width="1.5"/>
      <path d="M14 100c2-16 14-24 36-24s34 8 36 24" fill="var(--color-panel-solid)" stroke="${col}" stroke-width="2"/>
      <path d="M43 62v12h14V62" fill="var(--color-panel-solid)" stroke="${col}" stroke-width="2"/>
      <path d="M33 38c0-12 7-18 17-18s17 6 17 18v10c0 10-8 18-17 18s-17-8-17-18z" fill="var(--color-panel-solid)" stroke="${col}" stroke-width="2"/>
      ${hair}${visor}${scar}
      <path d="M46 56h8" stroke="var(--color-ink)" stroke-width="1.6" opacity=".7"/>
      <path d="M70 90l8-6h10" stroke="${col}" stroke-width="1" opacity=".6"/>
    </svg>`;
  }

  /* ---------- Exam dates ---------- */
  function session() { return EJU.sessions.find(s => s.id === S().session) || EJU.sessions[0]; }
  function fmtDate(iso, opts = { day: "numeric", month: "long", year: "numeric" }) { return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", opts); }
  function daysTo(iso) { return Math.max(0, Game.daysBetween(Game.today(), iso)); }

  /* ---------- Navigation ---------- */
  const NAV = [
    ["#/", "hub", "Hub"], ["#/map", "map", "Districts"], ["#/shards", "shard", "Shards"], ["#/intercept", "wave", "Intercepts"],
    ["#/boss", "target", "Corp exam"], ["#/writing", "chip", "Writing"], ["#/crew", "crew", "Crew"], ["#/shop", "shop", "Chrome clinic"], ["#/intel", "intel", "Intel"], ["#/resources", "ext", "Resources"], ["#/me", "user", "Runner"]
  ];
  const MOBILE = [["#/", "hub", "Hub"], ["#/map", "map", "Districts"], ["#/shards", "shard", "Shards"], ["#/intel", "intel", "Intel"], ["#/resources", "ext", "Resources"]];
  function renderNav() {
    const cur = "#/" + (location.hash.replace(/^#\/?/, "").split("/")[0] || "");
    const due = totalDue();
    $("#nav").innerHTML = NAV.map(([h, i, l]) => `<a href="${h}" ${cur === h ? 'aria-current="page"' : ""}>${icon(i)}<span>${l}</span>${h === "#/shards" && due ? `<span class="count">${due}</span>` : ""}</a>`).join("");
    $("#mobilebar").innerHTML = MOBILE.map(([h, i, l]) => `<a href="${h}" ${cur === h ? 'aria-current="page"' : ""}>${icon(i)}<span>${l}</span></a>`).join("");
  }
  function totalDue() { return EJU.decks.reduce((n, d) => n + Game.dueCards(d.id).due.length, 0); }

  function renderHUD() {
    const s = S(), L = Game.levelInfo();
    $("#hud").innerHTML = `<div class="hud">
      <div class="lvl">
        <div class="lvl-top"><span><b>${esc(s.callsign)}</b>, level <b class="data">${L.level}</b> ${esc(L.title)}</span><span class="data">${L.into} / ${L.need} XP</span></div>
        <div class="bar"><i style="--p:${L.pct.toFixed(3)}"></i></div>
      </div>
      <div class="hud-stat" title="Days in a row you hit your daily goal">${icon("uptime")}<span>Uptime <b>${s.uptime}</b></span></div>
      <div class="hud-stat" title="Creds: spend them at the chrome clinic">${icon("cred")}<span><b>${s.creds}</b> creds</span></div>
      <div class="hud-stat" title="XP earned today against your daily goal">${icon("bolt")}<span>Today <b>${Math.min(s.dayXP, s.dailyGoal)}/${s.dailyGoal}</b></span></div>
    </div>`;
  }

  /* ---------- Toasts, overlays, floating text ---------- */
  function toast(title, text, ic = "bolt") {
    const t = document.createElement("div"); t.className = "toast";
    t.innerHTML = `${icon(ic)}<div><b>${esc(title)}</b><span>${esc(text)}</span></div>`;
    $("#toasts").appendChild(t); setTimeout(() => t.remove(), 4200);
  }
  function overlay(html, onBind) {
    const root = $("#overlayRoot");
    root.innerHTML = `<div class="overlay" role="dialog" aria-modal="true"><div class="panel">${html}</div></div>`;
    const ov = root.firstElementChild;
    const close = () => { root.innerHTML = ""; };
    ov.addEventListener("click", e => { if (e.target === ov) close(); });
    document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", k); } });
    $$("[data-close]", ov).forEach(b => b.addEventListener("click", () => { sfx("tap"); close(); }));
    const f = ov.querySelector("button, a, input"); f && f.focus();
    onBind && onBind(ov, close);
    return close;
  }
  function floatText(txt, x, y) {
    const f = document.createElement("div"); f.className = "float"; f.textContent = txt;
    f.style.left = x + "px"; f.style.top = y + "px"; document.body.appendChild(f); setTimeout(() => f.remove(), 950);
  }

  /* Process queued game events: level ups, badges, story. */
  const pendingStory = [];
  function flushEvents() {
    const evs = Game.drain();
    evs.forEach(e => {
      if (e.type === "badge") { sfx("badge"); toast("Achievement: " + e.badge.name, e.badge.desc, "chip"); }
      if (e.type === "gig") { sfx("coin"); toast("Gig complete", e.gig.text + ". +" + e.gig.reward + " creds", "cred"); }
      if (e.type === "goal") { toast("Daily goal hit", "Uptime is now " + e.uptime + (e.uptime === 1 ? " day" : " days") + ".", "uptime"); }
      if (e.type === "freecache") toast("Neural cache earned", "Seven days of uptime. One missed day is covered.", "chip");
      if (e.type === "cache") toast("Neural cache used", "Your uptime survived a missed day.", "chip");
      if (e.type === "chapter") pendingStory.push(e.chapter);
    });
    const lv = evs.find(e => e.type === "level");
    if (lv) showLevelUp(lv.level);
    else if (pendingStory.length) showStory(pendingStory.shift());
    renderHUD(); renderNav();
  }
  function showLevelUp(n) {
    sfx("levelup"); scene("levelUp");
    const L = Game.levelInfo();
    overlay(`<div class="levelup"><p class="muted">Level up</p><div class="n data">${n}</div><h2>${esc(L.title)}</h2>
      ${talkHTML(line("levelUp"), "comm")}
      <button class="btn primary" data-close>Keep going</button></div>`, (ov, close) => {
        animateTalk(ov);
        ov.querySelector("[data-close]").addEventListener("click", () => { if (pendingStory.length) setTimeout(() => showStory(pendingStory.shift()), 50); });
      });
  }
  function storyText(c) { return c.text.replace("{exam}", fmtDate(session().exam)); }
  function showStory(c) {
    sfx("glitch"); S().readChapters[c.lvl] = true; Game.save();
    const who = EJU.crew[c.from];
    overlay(`<div class="stack"><div class="msg">${avatar(c.from)}<div><div class="who">${esc(who.name)} <span>${esc(who.role)}</span></div><h2 style="margin-top:6px">${esc(c.title)}</h2></div></div>
      <p>${esc(storyText(c))}</p>
      <div class="row">${c.gift ? `<button class="btn primary" id="openGift">${icon("lock")}Decrypt the packet</button>` : ""}<button class="btn ${c.gift ? "ghost" : "primary"}" data-close>Got it</button></div></div>`,
      (ov, close) => { const g = ov.querySelector("#openGift"); g && g.addEventListener("click", () => { close(); showGift(); }); });
  }
  function showGift() {
    const cfg = window.EJU_CONFIG || {};
    const text = (cfg.giftNote || "") + "\n\n" + (cfg.giftFrom ? "From " + cfg.giftFrom : "");
    overlay(`<div class="stack"><div class="msg">${avatar("allanah", "", "smile")}<div><div class="who">Allanah <span>Net diver, your partner</span></div><h2 style="margin-top:6px">Encrypted packet</h2></div></div><div class="decrypt" id="dec"></div><button class="btn primary" data-close>Close</button></div>`, (ov) => {
      const el = ov.querySelector("#dec"); const glyphs = "アイウエオカキクケコ01#%&*<>/\\";
      const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) { el.textContent = text; }
      else {
        let i = 0; sfx("boot");
        const tick = () => {
          i += 2; let out = text.slice(0, i);
          for (let k = 0; k < Math.min(12, text.length - i); k++) out += glyphs[Math.floor(Math.random() * glyphs.length)];
          el.textContent = out; if (i % 8 === 0) sfx("tick");
          if (i < text.length) requestAnimationFrame(tick); else el.textContent = text;
        };
        tick();
      }
    });
    if (!S().gift) { S().gift = true; Game.award("gift"); Game.save(); setTimeout(flushEvents, 600); }
  }

  /* ---------- Speech (listening drills and shards) ---------- */
  function jaVoice() { const v = speechSynthesis.getVoices(); return v.find(x => /ja[-_]JP/i.test(x.lang)) || v.find(x => /^ja/i.test(x.lang)); }
  function speak(lines, onEnd) {
    if (!("speechSynthesis" in window)) { onEnd && onEnd(false); return; }
    speechSynthesis.cancel();
    const voice = jaVoice();
    lines.forEach(([who, text], i) => {
      const u = new SpeechSynthesisUtterance(text); u.lang = "ja-JP"; if (voice) u.voice = voice;
      u.rate = 0.95; u.pitch = who === "f" ? 1.3 : who === "m" ? 0.75 : 1;
      if (i === lines.length - 1) u.onend = () => onEnd && onEnd(true);
      speechSynthesis.speak(u);
    });
  }
  if ("speechSynthesis" in window) speechSynthesis.getVoices();

  /* ================= VIEWS ================= */

  function vHub() {
    scene("mood", "hub");
    const s = S(), ses = session(), d = daysTo(ses.exam);
    const gigs = Game.gigs();
    const subs = Game.trackSubjects();
    const dists = EJU.districts.filter(x => subs.includes(x.subject));
    const latest = EJU.chapters.filter(c => c.lvl <= Game.level()).pop();
    const due = totalDue(); const miss = Game.mistakes().length;
    return `
    <div class="hero-wrap">
    <figure class="key-art" aria-hidden="true"><img src="assets/crew/dhruv-city.webp" alt="" width="1060" height="941"></figure>
    <section class="hero">
      <span class="kicker">EJU ${esc(ses.label)}<i></i>Level ${Game.level()} ${esc(Game.levelInfo().title)}</span>
      <h1>Get through the Gate<span class="jp" lang="ja">日本留学試験、合格へ</span></h1>
      <div class="countdown"><span class="num data">${d}</span><span class="lbl">days until the EJU on ${fmtDate(ses.exam)}</span></div>
      <div class="row">
        <a class="btn primary" href="#/mission/${dists[0].id}" id="quickRun">${icon("play")}Run a mission</a>
        <a class="btn" href="#/shards">${icon("shard")}Review shards${due ? ` <span class="data">${due}</span>` : ""}</a>
      </div>
    </section>
    </div>
    <div class="hazard" aria-hidden="true"></div>
    <div class="band">
      <nav class="tabs" aria-label="Jump to">
        <a href="#/" aria-current="page">Today</a><a href="#/map">Districts</a><a href="#/shards">Shards</a><a href="#/intercept">Intercepts</a><a href="#/boss">Corp exam</a>
      </nav>
      <div class="grid-2">
        <section class="panel stack">
          <div class="row between"><h2>Today's gigs</h2><span class="chip">${icon("cred")}Pays creds</span></div>
          <div>${gigs.map(g => `<div class="gig ${g.done ? "done" : ""}"><span class="tick">${g.done ? icon("check") : ""}</span>
            <span class="what">${esc(g.text)}<br><span class="small muted data">${g.prog}/${g.target}</span></span><span class="data small">+${g.reward}</span></div>`).join("")}</div>
        </section>
        <section class="panel stack">
          <h2>Crew channel</h2>
          ${latest ? `<div class="msg">${avatar(latest.from, "sm")}<div><div class="who">${esc(EJU.crew[latest.from].name)} <span>${esc(latest.title)}</span></div><p>${esc(storyText(latest).slice(0, 190))}…</p></div></div>
          <div class="row"><button class="btn small" data-story="${latest.lvl}">Read message</button><a class="btn small ghost" href="#/crew">All messages</a></div>` : ""}
        </section>
      </div>
    </div>
    <div class="hazard flip" aria-hidden="true"></div>
    <div class="stack-lg">
      <section class="stack">
        <div class="row between"><h2>Districts on your track</h2><a href="#/map">All districts</a></div>
        <div class="grid-auto">${dists.map(districtCard).join("")}</div>
      </section>
      <div class="grid-3">
        <a class="panel flat district" href="#/intercept" style="min-height:0"><h3>${icon("wave", "")} Intercepts</h3><p class="muted small">Listening drills read aloud in Japanese.</p></a>
        <a class="panel flat district" href="#/boss" style="min-height:0"><h3>Corp exam</h3><p class="muted small">${Game.level() >= 3 ? "Timed 20-question mock. No armor." : "Unlocks at level 3."}</p></a>
        <a class="panel flat district" href="#/mission/mistakes" style="min-height:0"><h3>Glitch log</h3><p class="muted small">${miss ? miss + " questions to fix." : "No open mistakes. Clean."}</p></a>
      </div>
    </div>`;
  }
  function districtCard(d) {
    const c = Game.control(d.subject), q = EJU.questions.filter(x => x.s === d.subject).length;
    const col = { sable: "pink", gear: "cyan", nyx: "mint", rook: "" }[d.crew];
    return `<a class="panel district" href="#/district/${d.id}">
      <span class="jp" lang="ja">${d.jp}</span><h3>${esc(d.name)}</h3>
      <p class="muted small">${esc(subj(d.subject).long)}. ${q} missions on file.</p>
      <div class="ctl"><span><span>Control</span><span class="data">${Math.round(c * 100)}%</span></span><div class="bar thin ${col}"><i style="--p:${c.toFixed(3)}"></i></div></div>
    </a>`;
  }

  function vMap() {
    scene("mood", "hub");
    const subs = Game.trackSubjects();
    return `<header class="stack" style="margin-bottom:var(--space-lg)"><h1>Districts</h1><p class="muted">Every district is one EJU subject. Answer a question right once and that block is yours. Your track: <b>${esc(EJU.tracks.find(t => t.id === S().track).name)}</b>.</p></header>
      <div class="grid-auto">${EJU.districts.map(d => districtCard(d) .replace('class="panel district"', `class="panel district" style="${subs.includes(d.subject) ? "" : "opacity:.6"}"`)).join("")}</div>`;
  }

  function vDistrict(id) {
    const d = district(id); if (!d) return vHub();
    scene("mood", id);
    const qs = EJU.questions.filter(q => q.s === d.subject);
    const topics = {};
    qs.forEach(q => { const t = topics[q.t] || (topics[q.t] = { n: 0, got: 0, seen: 0 }); t.n++; const r = S().q[q.id]; if (r) { t.seen++; if (r.right) t.got++; } });
    const c = EJU.crew[d.crew]; const miss = Game.mistakes().filter(q => q.s === d.subject).length;
    const deck = EJU.decks.find(k => k.subject === d.subject);
    return `<a href="#/map" class="small">${icon("back", "")}Districts</a>
    <header class="hero" style="padding-top:var(--space-md)"><span class="jp muted" lang="ja">${d.jp}</span><h1>${esc(d.name)}</h1><p>${esc(d.blurb)}</p>
      <div class="row"><a class="btn primary" href="#/mission/${d.id}">${icon("play")}Start mission</a>${miss ? `<a class="btn" href="#/mission/mistakes-${d.id}">Fix ${miss} glitches</a>` : ""}${deck ? `<a class="btn ghost" href="#/shards/${deck.id}">${icon("shard")}${esc(deck.name)} shards</a>` : ""}</div></header>
    <div class="grid-2">
      <section class="panel stack"><h2>Control by topic</h2>
        <ul class="list">${Object.entries(topics).map(([t, v]) => `<li><div class="row between"><span>${esc(t)}</span><span class="data small">${v.got}/${v.n}</span></div><div class="bar thin"><i style="--p:${(v.got / v.n).toFixed(3)}"></i></div></li>`).join("")}</ul>
      </section>
      <section class="panel stack"><div class="msg">${avatar(d.crew)}<div><div class="who">${esc(c.name)} <span>${esc(c.role)}</span></div><p>${esc(c.bio)}</p></div></div>
        <p class="muted small">Missions draw 8 questions from this district. Three wrong answers and you're flatlined, but you keep every XP you earned.</p></section>
    </div>`;
  }

  /* ---------- Mission runner ---------- */
  let run = null;
  function vMission(arg) {
    let pool, title, moodKey = "hub", dId = null;
    if (arg === "mistakes" || (arg || "").startsWith("mistakes-")) {
      const only = arg.split("-")[1];
      pool = Game.mistakes().filter(q => !only || q.s === only);
      title = "Glitch log";
      if (!pool.length) return `<section class="panel result"><h2>No glitches to fix</h2><p class="muted">Every question you've missed has since been answered right.</p><a class="btn primary" href="#/">Back to hub</a></section>`;
    } else {
      const d = district(arg); if (!d) return vHub();
      dId = d.id; moodKey = d.id; title = d.name;
      const qs = EJU.questions.filter(q => q.s === d.subject);
      // Prefer unseen and previously-missed questions.
      const weight = (q) => { const r = S().q[q.id]; return !r ? 0 : !r.lastRight ? 1 : 2 + Math.random(); };
      pool = shuffle(qs).sort((a, b) => weight(a) - weight(b));
    }
    scene("mood", moodKey);
    const maxHP = S().ware.armor ? 4 : 3;
    run = { title, district: dId, list: pool.slice(0, 8), i: 0, right: 0, hp: maxHP, maxHP, xp: 0, creds: 0, optic: !!S().ware.optic, answered: false, lost: false };
    sfx("boot");
    return missionHTML();
  }
  function missionHTML() {
    const q = run.list[run.i];
    const order = q._order || (q._order = shuffle(q.c.map((_, i) => i)));
    if (!run.line) { const [m, t] = line("start"); run.mood = m; run.line = t; }
    return `<div class="mission">
      <div class="mission-top">
        <div class="integrity" aria-label="Integrity ${run.hp} of ${run.maxHP}">${Array.from({ length: run.maxHP }, (_, i) => `<i class="${i < run.hp ? "" : "off"}"></i>`).join("")}</div>
        <div><div class="row between small"><span>${esc(run.title)}</span><span class="data">${run.i + 1}/${run.list.length}</span></div><div class="bar thin"><i style="--p:${(run.i / run.list.length).toFixed(3)}"></i></div></div>
        <div class="combo data" aria-label="Combo">${S().combo > 1 ? "x" + S().combo : ""}</div>
      </div>
      <div id="commBox" aria-live="polite">${talkHTML([run.mood, run.line], "comm")}</div>
      <section class="panel stack" id="qpanel">
        <div class="row between"><span class="topic">${esc(subj(q.s).name)}, ${esc(q.t)}</span>
          ${run.optic ? `<button class="btn small ghost" id="optic">${icon("scan")}Scanner optic</button>` : ""}</div>
        <p class="question ${hasJP(q.q) ? "jpq" : ""}" ${hasJP(q.q) ? 'lang="ja"' : ""}>${esc(q.q)}</p>
        <div class="choices">${order.map((ci, k) => `<button class="choice" data-ci="${ci}" ${hasJP(q.c[ci]) ? 'lang="ja"' : ""}><span class="k">${k + 1}</span><span>${esc(q.c[ci])}</span></button>`).join("")}</div>
        <button class="btn ghost small idk" id="idk" type="button">${icon("intel")}I don't know, show me</button>
        <div id="after"></div>
      </section>
      <p class="muted small" style="margin-top:var(--space-sm)">Keys 1 to 4 answer, 0 for "I don't know". Enter moves on. Not knowing costs no integrity.</p>
    </div>`;
  }
  function bindMission() {
    if (run.i === 0 && !run.answered) animateTalk($("#commBox"));
    $$(".choice").forEach(b => b.addEventListener("pointerdown", () => sfx("tap")));
    $$(".choice").forEach(b => b.addEventListener("click", (e) => choose(+b.dataset.ci, b, e)));
    const ib = $("#idk"); ib && ib.addEventListener("click", (e) => choose(-1, ib, e));
    const op = $("#optic"); op && op.addEventListener("click", () => {
      const q = run.list[run.i]; const wrong = shuffle(q.c.map((_, i) => i).filter(i => i !== q.a)).slice(0, 2);
      wrong.forEach(i => { const b = $(`.choice[data-ci="${i}"]`); b.classList.add("struck"); b.disabled = true; });
      run.optic = false; op.remove(); sfx("glitch");
    });
  }
  /* Allanah's lines: avoid repeating the last few in each pool. */
  const recent = {};
  function line(kind) {
    const pool = EJU.allanah[kind]; const seen = recent[kind] || (recent[kind] = []);
    const fresh = pool.map((_, i) => i).filter(i => !seen.includes(i));
    const i = fresh[Math.floor(Math.random() * fresh.length)];
    seen.push(i); if (seen.length > Math.min(4, pool.length - 1)) seen.shift();
    return pool[i];
  }
  /* A comms card that pops in from the corner on any screen. */
  let pingTimer, hubPinged = 0;
  function ping(kind, delay = 0) {
    if (!EJU.allanah[kind]) return;
    const [mood, text] = line(kind);
    setTimeout(() => {
      let el = $("#allanahPing");
      if (!el) { el = document.createElement("div"); el.id = "allanahPing"; el.className = "ping-card"; el.setAttribute("role", "status"); document.body.appendChild(el); }
      el.innerHTML = `${talkHTML([mood, text], "ping-body")}<button class="ping-x" type="button" aria-label="Dismiss">${icon("x")}</button>`;
      el.classList.remove("show"); void el.offsetWidth; el.classList.add("show"); animateTalk(el);
      el.querySelector(".ping-x").addEventListener("click", () => el.classList.remove("show"));
      sfx(mood === "shout" ? "deny" : "tick");
      clearTimeout(pingTimer); pingTimer = setTimeout(() => el.classList.remove("show"), 6500);
    }, delay);
  }
  function comm(kind) {
    const [mood, text] = line(kind);
    run.mood = mood; run.line = text;
    const box = $("#commBox"); if (!box) return;
    box.innerHTML = talkHTML([mood, text], "comm"); animateTalk(box);
  }
  /* Talking portrait: types the line while flipping between closed- and open-mouth frames from her sheet. */
  const MOUTH = { calm: ["calm", "shock"], smile: ["smile", "shock"], shout: ["calm", "shout"], shock: ["calm", "shock"] };
  ["calm", "smile", "shout", "shock"].forEach(m => { const i = new Image(); i.src = `assets/crew/allanah-${m}.webp`; });
  function talkHTML([mood, text], cls = "") {
    return `<div class="talker ${cls}" data-mood="${mood}">${avatar("allanah", "sm", mood)}<div><b>Allanah</b><p><span class="sr">${esc(text)}</span><span class="say" aria-hidden="true">${esc(text)}</span></p></div></div>`;
  }
  function animateTalk(root = document) {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.querySelectorAll(".talker:not(.talked)").forEach(t => {
      t.classList.add("talked"); if (reduce) return;
      const mood = t.dataset.mood, img = t.querySelector("img"), say = t.querySelector(".say");
      const full = say.textContent, [closed, open] = MOUTH[mood] || MOUTH.calm;
      const src = m => `assets/crew/allanah-${m}.webp`;
      let i = 0, flip = false, last = 0; say.textContent = ""; t.classList.add("talking");
      const step = (now) => {
        if (!t.isConnected) return;
        i = Math.min(full.length, i + 1); say.textContent = full.slice(0, i);
        if (now - last > 120) { last = now; flip = !flip && full[i - 1] !== " "; img.src = src(flip ? open : closed); }
        if (i < full.length) setTimeout(() => requestAnimationFrame(step), 26);
        else { img.src = src(mood); t.classList.remove("talking"); }
      };
      requestAnimationFrame(step);
    });
  }
  /* Expandable step-by-step explanation: the question's own steps, then the general method for its topic. */
  function explainTab(q, open) {
    const steps = q.st || [], how = EJU.methods[q.t] || [];
    if (!steps.length && !how.length) return "";
    return `<details class="steps" ${open ? "open" : ""}><summary>${icon("intel")}Step-by-step explanation</summary>
      ${steps.length ? `<h4>Solving this one</h4><ol>${steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}
      ${how.length ? `<h4>How to tackle ${esc(q.t.toLowerCase())} questions</h4><ol>${how.map(x => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}
      <p class="muted small">This question goes to your Glitch log if you missed it, so it comes back until you get it right.</p></details>`;
  }
  function choose(ci, btn, e) {
    if (run.answered) return; run.answered = true;
    const q = run.list[run.i], ok = ci === q.a, idk = ci < 0;
    Game.answer(q.id, ok);
    $$(".choice").forEach(b => { b.disabled = true; if (+b.dataset.ci === q.a) b.classList.add("right"); });
    const ib = $("#idk"); if (ib) ib.disabled = true;
    const r = btn.getBoundingClientRect();
    if (idk) {
      comm("idk"); sfx("flip");
    } else if (ok) {
      const combo = S().combo; const bonus = Math.min(combo - 1, 5) * 2;
      const xp = 10 + bonus, cr = 8 + Math.min(combo, 6);
      run.right++; run.xp += xp; run.creds += cr;
      Game.addXP(xp, cr);
      combo > 2 ? sfx("combo", combo) : sfx("correct"); scene("pulse");
      floatText("+" + xp + " XP", r.left + r.width - 120, r.top);
      comm(combo >= 4 ? "combo" : "right");
    } else {
      comm("wrong");
      btn.classList.add("wrong"); run.hp--; sfx("wrong"); scene("hit");
      $$(".integrity i").forEach((el, k) => el.classList.toggle("off", k >= run.hp));
      $("#qpanel").classList.remove("shake"); void $("#qpanel").offsetWidth; $("#qpanel").classList.add("shake");
      const f = document.createElement("div"); f.className = "glitch-flash"; document.body.appendChild(f); setTimeout(() => f.remove(), 300);
    }
    const last = run.i >= run.list.length - 1 || run.hp <= 0;
    $("#after").innerHTML = `<div class="explain"><b>${ok ? "Clean hit." : idk ? "No problem. The answer is: " + esc(q.c[q.a]) : "Glitch. The answer is: " + esc(q.c[q.a])}</b><br>${esc(q.e)}</div>
      ${explainTab(q, !ok)}
      <div class="row" style="margin-top:var(--space-md)"><button class="btn primary" id="next">${last ? "Finish run" : "Next"}</button></div>`;
    $("#next").focus({ preventScroll: true });
    $("#next").addEventListener("click", () => { sfx("nav"); last ? endMission() : (run.i++, run.answered = false, view.innerHTML = missionHTML(), bindMission()); });
    flushEvents();
  }
  function endMission() {
    const total = run.list.length, flat = run.hp <= 0;
    const clean = !flat && run.hp === run.maxHP && run.i >= total - 1;
    if (!flat && run.district) { const bonus = clean ? 40 : 15; Game.addXP(bonus, bonus); run.xp += bonus; run.creds += bonus; }
    Game.finishMission(run.district, run.right, total, clean);
    flat ? sfx("fail") : sfx("levelup");
    const pct = run.right / (run.i + 1);
    view.innerHTML = `<section class="panel result">
      ${flat ? `<h2>Flatlined</h2><p class="muted">Integrity hit zero. Every point you earned still counts. Patch up and run it again.</p>` :
        `${pct >= 0.8 ? `<div class="stamp" lang="ja">合格</div>` : ""}<h2>${clean ? "Clean run" : "Run complete"}</h2>`}
      <div class="big data">${run.right}/${run.i + 1}</div>
      <div style="max-width:460px;width:100%;text-align:left">${talkHTML(line(flat ? "flatline" : clean ? "clean" : pct < 0.5 ? "wrong" : "done"), "comm")}</div>
      <div class="row" style="justify-content:center"><span class="chip on">${icon("bolt")}+${run.xp} XP</span><span class="chip on">${icon("cred")}+${Math.round(run.creds * Game.mult())} creds</span></div>
      <div class="row" style="justify-content:center">
        ${run.district ? `<a class="btn primary" href="#/mission/${run.district}" id="again">${icon("play")}Run it again</a><a class="btn" href="#/district/${run.district}">District</a>` : `<a class="btn primary" href="#/mission/mistakes" id="again">Keep fixing</a>`}
        <a class="btn ghost" href="#/">Hub</a></div>
    </section>`;
    animateTalk(view);
    $("#again") && $("#again").addEventListener("click", (e) => { e.preventDefault(); route(true); });
    flushEvents();
  }

  /* ---------- Corp exam (boss) ---------- */
  let boss = null, bossTimer = null;
  function vBoss() {
    scene("mood", "boss");
    if (Game.level() < 3) return `<section class="panel result">${icon("lock", "")}<h2>Corp exam locked</h2><p class="muted">Reach level 3 and Gear brings the simulation online. You're level ${Game.level()}.</p><a class="btn primary" href="#/">Run missions</a></section>`;
    const past = S().bosses.slice(-5).reverse();
    return `<header class="hero"><h1>Corp exam</h1><p>Twenty questions from your track, one clock, no armor and no scanner. It feels like the real thing on purpose.</p>
      <div class="row"><button class="btn primary" id="startBoss">${icon("target")}Start the exam</button></div></header>
      ${past.length ? `<section class="panel stack"><h2>Past attempts</h2><ul class="list">${past.map(b => `<li class="row between"><span>${fmtDate(b.day)}</span><span class="data">${b.score}/${b.total} (${Math.round(b.score / b.total * 100)}%)</span></li>`).join("")}</ul></section>` : ""}`;
  }
  function startBoss() {
    const subs = Game.trackSubjects();
    const pool = shuffle(EJU.questions.filter(q => subs.includes(q.s))).slice(0, 20);
    const secs = Math.round(pool.length * 60 * (S().ware.reflex ? 1.25 : 1));
    boss = { list: pool, i: 0, right: 0, left: secs, total: secs, answers: [] };
    sfx("alarm"); renderBoss(); ping("bossStart", 300);
    clearInterval(bossTimer);
    bossTimer = setInterval(() => {
      boss.left--; const t = $("#bossClock"); if (t) t.textContent = clock(boss.left);
      if (boss.left <= 30 && boss.left > 0) sfx("tick");
      if (boss.left <= 0) { clearInterval(bossTimer); endBoss(); }
    }, 1000);
  }
  const clock = (s) => Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  function renderBoss() {
    const q = boss.list[boss.i];
    view.innerHTML = `<div class="mission"><div class="mission-top"><span class="data" id="bossClock" style="font-size:var(--text-xl);color:var(--color-danger)">${clock(boss.left)}</span>
      <div><div class="row between small"><span>Corp exam</span><span class="data">${boss.i + 1}/${boss.list.length}</span></div><div class="bar thin pink"><i style="--p:${(boss.i / boss.list.length).toFixed(3)}"></i></div></div><span></span></div>
      <section class="panel stack"><span class="topic">${esc(subj(q.s).name)}, ${esc(q.t)}</span>
        <p class="question ${hasJP(q.q) ? "jpq" : ""}">${esc(q.q)}</p>
        <div class="choices">${(q._order || (q._order = shuffle(q.c.map((_, i) => i)))).map((ci, k) => `<button class="choice" data-ci="${ci}"><span class="k">${k + 1}</span><span>${esc(q.c[ci])}</span></button>`).join("")}</div>
        <button class="btn ghost small idk" id="idk" type="button">Skip, I don't know</button></section></div>`;
    const pickB = (ci) => {
      const ok = ci === q.a; sfx("tap");
      Game.answer(q.id, ok); if (ok) boss.right++; boss.answers.push({ q, ci });
      if (boss.i < boss.list.length - 1) { boss.i++; renderBoss(); } else { clearInterval(bossTimer); endBoss(); }
    };
    $$(".choice").forEach(b => b.addEventListener("click", () => pickB(+b.dataset.ci)));
    $("#idk").addEventListener("click", () => pickB(-1));
  }
  function endBoss() {
    const total = boss.list.length, pct = boss.right / total;
    Game.finishBoss(boss.right, total);
    const xp = boss.right * 12; Game.addXP(xp, boss.right * 10);
    sfx(pct >= 0.7 ? "levelup" : "fail"); ping(pct >= 0.7 ? "bossPass" : "bossFail", 900);
    view.innerHTML = `<section class="panel result">${pct >= 0.7 ? `<div class="stamp" lang="ja">合格</div>` : ""}<h2>${pct >= 0.7 ? "Corp breached" : "Security held. This time."}</h2>
      <div class="big data">${Math.round(pct * 100)}%</div><p class="muted">${boss.right} of ${total} right with ${clock(boss.left)} left. +${xp} XP.</p>
      <div class="row" style="justify-content:center"><a class="btn primary" href="#/mission/mistakes">Fix the glitches</a><a class="btn ghost" href="#/">Hub</a></div></section>
      <section class="panel stack" style="margin-top:var(--space-lg)"><h2>Review</h2><ul class="list">${boss.answers.map(({ q, ci }) => `<li><span class="${hasJP(q.q) ? "jp" : ""}">${esc(q.q)}</span><span class="small ${ci === q.a ? "" : "muted"}">${ci === q.a ? "Right" : (ci < 0 ? "Skipped" : "You chose " + esc(q.c[ci])) + ". Answer: " + esc(q.c[q.a])}</span>${ci === q.a ? "" : `<span class="small">${esc(q.e)}</span>${explainTab(q, false)}`}</li>`).join("")}</ul></section>`;
    flushEvents();
  }

  /* ---------- Shards (flashcards) ---------- */
  let shard = null;
  function vShards() {
    scene("mood", "jp");
    return `<header class="hero"><h1>Data shards</h1><p>Flashcards that come back right before you'd forget them. Get one right and it returns later; miss it and it comes back tomorrow.</p></header>
      <div class="grid-auto">${EJU.decks.map(d => { const { due, fresh } = Game.dueCards(d.id); const m = Game.deckMastery(d.id);
        return `<a class="panel district" href="#/shards/${d.id}"><span class="jp muted" lang="ja">${d.jp}</span><h3>${esc(d.name)}</h3>
          <p class="muted small">${d.cards.length} shards. ${due.length} due, ${fresh.length} new.</p>
          <div class="ctl"><span><span>Mastery</span><span class="data">${Math.round(m * 100)}%</span></span><div class="bar thin cyan"><i style="--p:${m.toFixed(3)}"></i></div></div></a>`; }).join("")}</div>`;
  }
  function vDeck(id) {
    const d = EJU.decks.find(x => x.id === id); if (!d) return vShards();
    const { due, fresh } = Game.dueCards(id);
    const queue = shuffle(due).concat(fresh.slice(0, 10));
    shard = { d, queue, i: 0, good: 0 };
    if (!queue.length) return `<section class="panel result"><h2>All caught up</h2><p class="muted">Nothing due in ${esc(d.name)} today. Come back tomorrow, or run a mission.</p><a class="btn primary" href="#/shards">Other decks</a></section>`;
    return deckHTML();
  }
  function deckHTML() {
    const { d, queue, i } = shard; const c = d.cards[queue[i]];
    const jpFront = hasJP(c[0]);
    return `<div class="mission"><div class="mission-top"><a href="#/shards" class="iconbtn" aria-label="Back to decks">${icon("back")}</a>
      <div><div class="row between small"><span>${esc(d.name)}</span><span class="data">${i + 1}/${queue.length}</span></div><div class="bar thin cyan"><i style="--p:${(i / queue.length).toFixed(3)}"></i></div></div><span></span></div>
      <div class="card3d" id="card"><div class="card-inner" tabindex="0" role="button" aria-label="Flip card">
        <div class="panel face front"><div class="term ${jpFront ? "jp" : ""}" ${jpFront ? 'lang="ja"' : ""}>${esc(c[0])}</div><div class="hint">${d.id === "vocab" ? "" : esc(c[1])}</div><p class="muted small">Tap or press space to flip</p></div>
        <div class="panel face back cyan"><div class="term ${jpFront ? "jp" : ""}" style="font-size:1.8rem" ${jpFront ? 'lang="ja"' : ""}>${esc(c[0])}</div>${d.id === "vocab" ? `<div class="hint jp" lang="ja">${esc(c[1])}</div>` : ""}<div class="meaning">${esc(c[2])}</div></div>
      </div></div>
      <div class="row" style="justify-content:center;margin-top:var(--space-lg)" id="grade" hidden>
        <button class="btn" data-g="0">${icon("x")}Again</button><button class="btn primary" data-g="1">${icon("check")}Got it</button>
        ${d.speak ? `<button class="iconbtn" id="say" aria-label="Hear it">${icon("sound")}</button>` : ""}</div></div>`;
  }
  function bindDeck() {
    const card = $("#card"); if (!card) return;
    const flip = () => { card.classList.toggle("flipped"); sfx("flip"); $("#grade").hidden = false; };
    card.querySelector(".card-inner").addEventListener("click", flip);
    card.querySelector(".card-inner").addEventListener("keydown", e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } });
    $$("#grade [data-g]").forEach(b => b.addEventListener("click", () => grade(b.dataset.g === "1")));
    const say = $("#say"); say && say.addEventListener("click", () => { const c = shard.d.cards[shard.queue[shard.i]]; speak([["n", hasJP(c[0]) ? c[0].replace(/〜/g, "") : c[2]]]); });
  }
  function grade(good) {
    Game.gradeCard(shard.d.id, shard.queue[shard.i], good);
    Game.addXP(good ? 3 : 1, good ? 2 : 0);
    sfx(good ? "correct" : "tap"); if (good) scene("pulse");
    shard.good += good ? 1 : 0;
    if (!good) { shard.queue.push(shard.queue[shard.i]); if (Math.random() < 0.7) ping("cardBad"); }
    else if (shard.good % 4 === 0) ping("cardGood");
    shard.i++;
    if (shard.i >= shard.queue.length) {
      view.innerHTML = `<section class="panel result"><h2>Deck cleared</h2><div class="big data">${shard.good}</div><p class="muted">shards locked in.</p><div class="row" style="justify-content:center"><a class="btn primary" href="#/shards">More decks</a><a class="btn ghost" href="#/">Hub</a></div></section>`;
      sfx("levelup");
    } else { view.innerHTML = deckHTML(); bindDeck(); }
    flushEvents();
  }

  /* ---------- Intercepts (listening) ---------- */
  function vIntercept(id) {
    scene("mood", "jp");
    const can = "speechSynthesis" in window;
    if (!id) return `<header class="hero"><h1>Intercepts</h1><p>Sable caught these transmissions. Each one is read aloud in Japanese like the EJU listening section. Listen, then answer the question at the end.</p>
      ${can ? "" : `<p class="panel flat">Your browser can't read Japanese aloud, so each intercept shows its transcript instead.</p>`}</header>
      <div class="grid-auto">${EJU.listening.map((l, i) => `<a class="panel district" style="min-height:0" href="#/intercept/${l.id}"><span class="muted small data">Signal ${String(i + 1).padStart(2, "0")}</span><h3>${esc(l.title)}</h3><p class="small ${S().listen[l.id] ? "" : "muted"}">${S().listen[l.id] ? "Decoded" : "Not decoded yet"}</p></a>`).join("")}</div>`;
    const l = EJU.listening.find(x => x.id === id); if (!l) return vIntercept();
    return `<div class="mission"><a href="#/intercept" class="small">${icon("back")}Intercepts</a>
      <section class="panel stack" style="margin-top:var(--space-md)"><h2>${esc(l.title)}</h2>
        <div class="row"><button class="btn primary" id="play">${icon("play")}Play transmission</button><button class="btn ghost" id="tx">Show transcript</button></div>
        <div id="transcript" hidden lang="ja" class="jp">${l.lines.map(([w, t]) => `<p>${w === "n" ? "" : w === "f" ? "女：" : "男："}${esc(t)}</p>`).join("")}</div>
        <p class="question jpq" lang="ja">${esc(l.lines[l.lines.length - 1][1])}</p>
        <div class="choices">${l.c.map((c, k) => `<button class="choice" data-ci="${k}" lang="ja"><span class="k">${k + 1}</span><span>${esc(c)}</span></button>`).join("")}</div>
        <div id="after"></div></section></div>`;
  }
  function bindIntercept(id) {
    const l = EJU.listening.find(x => x.id === id); if (!l) return;
    const can = "speechSynthesis" in window;
    $("#play").addEventListener("click", () => { sfx("glitch"); if (can) speak(l.lines); else $("#transcript").hidden = false; });
    $("#tx").addEventListener("click", () => { $("#transcript").hidden = !$("#transcript").hidden; });
    let done = false;
    $$(".choice").forEach(b => b.addEventListener("click", (e) => {
      if (done) return; done = true; const ci = +b.dataset.ci, ok = ci === l.a;
      $$(".choice").forEach(x => { x.disabled = true; if (+x.dataset.ci === l.a) x.classList.add("right"); });
      if (!ok) b.classList.add("wrong");
      sfx(ok ? "correct" : "wrong"); scene(ok ? "pulse" : "hit");
      if (ok) Game.addXP(15, 12);
      Game.finishListen(l.id, ok);
      $("#transcript").hidden = false;
      $("#after").innerHTML = `<div class="explain"><b>${ok ? "Signal decoded." : "Signal lost."}</b> ${esc(l.e)}</div><div class="row" style="margin-top:var(--space-md)"><a class="btn primary" href="#/intercept">Next intercept</a></div>`;
      flushEvents();
    }));
  }

  /* ---------- Crew ---------- */
  function vCrew() {
    scene("mood", "hub");
    const lvl = Game.level();
    const leads = Object.keys(EJU.crew).filter(k => EJU.crew[k].lead);
    return `<header class="hero"><h1>The crew</h1><p>You, your partner, and four people who want you through the Gate. New messages unlock as you level up.</p></header>
      <div class="grid-2 leads" style="margin-bottom:var(--space-lg)">${leads.map(k => { const c = EJU.crew[k];
        return `<section class="panel lead" style="--ring:${colorVar[c.color]}"><img class="lead-art" src="assets/crew/${c.img}-portrait.webp" alt="${esc(c.name)}" width="356" height="490" loading="lazy">
          <div class="stack"><span class="kicker">${k === "dhruv" ? "Lead" : "Partner"}</span><h2>${esc(c.name)}</h2><p class="muted small">${esc(c.role)}</p><p>${esc(c.bio)}</p>
          <div class="moods">${["calm", "smile", "shout", "shock"].map(m => `<img src="assets/crew/${c.img}-${m}.webp" alt="" width="64" height="64" loading="lazy">`).join("")}</div></div></section>`; }).join("")}</div>
      <h2 style="margin-bottom:var(--space-md)">Side crew</h2>
      <div class="grid-2" style="margin-bottom:var(--space-xl)">${Object.keys(EJU.crew).filter(k => !EJU.crew[k].lead).map(k => { const c = EJU.crew[k];
        return `<section class="panel msg">${avatar(k, "lg")}<div><h3>${esc(c.name)}</h3><p class="muted small">${esc(c.role)}${EJU.districts.filter(d => d.crew === k).length ? ", runs " + EJU.districts.filter(d => d.crew === k).map(d => d.name).join(", ") : ""}</p><p>${esc(c.bio)}</p></div></section>`; }).join("")}</div>
      <section class="stack"><h2>Messages</h2>
      ${EJU.chapters.map(c => c.lvl <= lvl ? `<div class="panel flat msg">${avatar(c.from, "sm")}<div><div class="who">${esc(EJU.crew[c.from].name)} <span>${esc(c.title)}</span></div><p>${esc(storyText(c))}</p>${c.gift ? `<button class="btn small primary" style="margin-top:8px" id="openGift2">${icon("lock")}Decrypt the packet</button>` : ""}</div></div>`
        : `<div class="panel flat row">${icon("lock", "")}<span class="muted">Encrypted. Unlocks at level ${c.lvl}.</span></div>`).join("")}</section>`;
  }

  /* ---------- Ripperdoc (shop) ---------- */
  function vShop() {
    scene("mood", "shop");
    const s = S();
    return `<header class="hero"><h1>Chrome clinic</h1><p>Spend creds on cyberware that changes how missions play, or on a new HUD colour. You have <b class="data">${s.creds}</b> creds.</p></header>
      <section class="stack" style="margin-bottom:var(--space-xl)"><h2>Cyberware</h2><div class="grid-auto">${EJU.cyberware.map(w => {
        const owned = w.consumable ? s.cache : s.ware[w.id];
        const full = w.consumable ? s.cache >= w.max : !!s.ware[w.id];
        return `<div class="panel stack"><div class="row between"><h3>${esc(w.name)}</h3><span class="chip ${owned ? "on" : ""}">${w.consumable ? s.cache + "/" + w.max : owned ? "Installed" : icon("cred") + w.price}</span></div>
          <p class="muted small">${esc(w.desc)}</p><button class="btn small ${full ? "ghost" : "primary"}" data-ware="${w.id}" ${full ? "disabled" : ""}>${full ? (w.consumable ? "Full" : "Installed") : "Install for " + w.price}</button></div>`; }).join("")}</div></section>
      <section class="stack"><h2>HUD colour</h2><div class="grid-auto">${EJU.skins.map(k => {
        const own = s.skins[k.id], on = s.skin === k.id;
        return `<div class="panel flat stack" data-skin="${k.id}"><div class="row between"><h3>${esc(k.name)}</h3><span style="width:28px;height:28px;background:var(--color-signal);box-shadow:0 0 14px var(--color-signal)"></span></div><p class="muted small">${esc(k.desc)}</p>
          <button class="btn small ${on ? "ghost" : own ? "" : "primary"}" data-skinbuy="${k.id}" ${on ? "disabled" : ""}>${on ? "Equipped" : own ? "Equip" : "Buy for " + k.price}</button></div>`; }).join("")}</div></section>`;
  }
  function bindShop() {
    $$("[data-ware]").forEach(b => b.addEventListener("click", () => {
      if (Game.buyWare(b.dataset.ware)) { sfx("buy"); scene("pulse"); toast("Installed", EJU.cyberware.find(w => w.id === b.dataset.ware).name, "chip"); }
      else { sfx("deny"); toast("Not enough creds", "Run missions and gigs to earn more.", "cred"); }
      route(); flushEvents();
    }));
    $$("[data-skinbuy]").forEach(b => b.addEventListener("click", () => {
      if (Game.buySkin(b.dataset.skinbuy)) { sfx("buy"); applySkin(); } else { sfx("deny"); toast("Not enough creds", "Run missions and gigs to earn more.", "cred"); }
      route(); flushEvents();
    }));
  }
  function applySkin() { document.documentElement.dataset.skin = S().skin; }

  /* ---------- Intel (exam guide and resources) ---------- */
  function vIntel() {
    scene("mood", "jw");
    const ses = session();
    return `<header class="hero"><h1>Intel</h1><p>Everything about the real exam, from JASSO's official 2027 guidelines, plus the best free study material we could find.</p></header>
    <div class="stack-lg">
      <section class="grid-2">
        ${EJU.sessions.map(x => `<div class="panel stack ${x.id === ses.id ? "hot" : ""}"><h2>${esc(x.label)}</h2><dl class="kv">
          <dt>Exam day</dt><dd><b>${fmtDate(x.exam, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</b></dd>
          <dt>Applications</dt><dd>${fmtDate(x.apply[0])} to ${fmtDate(x.apply[1])}, 5 pm Japan time</dd>
          <dt>Exam voucher mailed</dt><dd>${fmtDate(x.voucher)} (in Japan, tentative)</dd>
          <dt>Results online</dt><dd>${esc(x.results)} (based on past years)</dd></dl></div>`).join("")}
      </section>
      <section class="panel stack"><h2>The four subjects</h2><div class="table-wrap"><table><thead><tr><th>Subject</th><th>Time</th><th>Score</th><th>Language</th><th>What's in it</th></tr></thead>
        <tbody>${EJU.format.map(f => `<tr><td><b>${esc(f.subj)}</b></td><td class="data">${esc(f.time)}</td><td class="data">${esc(f.score)}</td><td>${esc(f.lang)}</td><td>${esc(f.parts)}</td></tr>`).join("")}</tbody></table></div>
        <p class="muted small">On the day: Japanese first, then Science or Japan and the World, then Mathematics.</p></section>
      <section class="grid-2">
        <div class="panel stack"><h2>Good to know</h2><ul class="list">${EJU.facts.map(f => `<li>${esc(f)}</li>`).join("")}</ul></div>
        <div class="panel stack"><h2>Game plan to the Gate</h2><ul class="list">${EJU.plan.map(p => `<li><b>${esc(p.when)}</b><span class="muted small">${esc(p.what)}</span></li>`).join("")}</ul></div>
      </section>
      <section class="panel stack"><h2>The Japanese test, part by part</h2><div class="table-wrap"><table><thead><tr><th>Part</th><th>Time</th><th>Score</th><th>What happens</th></tr></thead>
        <tbody>${EJU.japaneseParts.map(p => `<tr><td><b>${esc(p.part)}</b></td><td class="data">${esc(p.time)}</td><td class="data">${esc(p.score)}</td><td>${esc(p.detail)}</td></tr>`).join("")}</tbody></table></div>
        <div class="row"><a class="btn small primary" href="#/writing">${icon("chip")}Practise writing</a><a class="btn small" href="#/intercept">${icon("wave")}Practise listening</a></div></section>
      <section class="grid-2">
        <div class="panel stack"><h2>How scoring works</h2>
          <p>Every part except writing is <b>scaled</b> with item response theory, so a score from a harder session is worth the same as one from an easier session. There's no pass mark: each university sets its own.</p>
          <p>The essay is marked by trained raters in levels:</p>
          <div class="table-wrap"><table><thead><tr><th>Score</th><th>Level</th><th>What it means</th></tr></thead><tbody>${EJU.writingRubric.map(r => `<tr><td class="data">${r[0]}</td><td><b>${r[1]}</b></td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div></div>
        <div class="panel stack"><h2>Where the middle is</h2><p class="muted small">Average and highest scores, ${esc(EJU.averages.label)}.</p>
          <div class="table-wrap"><table><thead><tr><th>Subject</th><th>Average</th><th>Top</th></tr></thead><tbody>${EJU.averages.rows.map(r => `<tr><td>${esc(r[0])}</td><td class="data">${esc(r[1])}</td><td class="data">${esc(r[2])}</td></tr>`).join("")}</tbody></table></div>
          <p class="muted small">Physics, chemistry and biology are each out of 100; two of them make the 200-point Science score. <a href="${esc(EJU.averages.source)}" target="_blank" rel="noopener">Source: JASSO</a></p></div>
      </section>
      <section class="stack"><h2>What each subject covers (2026 syllabus)</h2><div class="grid-auto">${EJU.syllabus.map(x => `<div class="panel flat stack"><h3>${esc(x.subj)}</h3><ul class="list small">${x.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul><a href="${esc(x.url)}" target="_blank" rel="noopener" class="small">Full syllabus ${icon("ext", "")}</a></div>`).join("")}</div></section>
      <section class="stack"><h2>Strategy</h2><div class="grid-auto">${EJU.strategy.map(x => `<div class="panel flat stack"><h3>${esc(x.h)}</h3><p class="small">${esc(x.p)}</p></div>`).join("")}</div></section>
      <section class="panel stack hot"><h2>Past papers and every resource</h2><p>Official past papers, prep books, apps and videos are sorted on their own page.</p><div class="row"><a class="btn primary" href="#/resources">${icon("ext")}Open Resources</a></div></section>
      <p class="muted small">Exam facts are from JASSO's Guidelines for 2027 EJU (published November 2026). Always double-check dates on the JASSO site before applying.</p>
    </div>`;
  }

  /* ---------- Resources ---------- */
  function vResources() {
    scene("mood", "jw");
    const link = (it) => `<a class="panel flat stack res" href="${esc(it.url)}" target="_blank" rel="noopener"><span class="row between" style="gap:6px"><b>${esc(it.name)}</b>${icon("ext", "")}</span><span class="muted small">${esc(it.note)}</span></a>`;
    return `<header class="hero"><h1>Resources</h1><p>Every official page, past paper, book, app and video worth his time, sorted by type. Links open the source; nothing is copied here.</p></header>
      <nav class="tabs res-tabs" aria-label="Jump to section">${EJU.resources.map((g, i) => `<a href="#res-${i}" data-jump="res-${i}">${esc(g.group)}</a>`).join("")}<a href="#res-papers" data-jump="res-papers">Past paper list</a></nav>
      <div class="stack-lg" style="margin-top:var(--space-lg)">
      ${EJU.resources.map((g, i) => `<section class="stack" id="res-${i}"><h2>${icon(g.icon, "")} ${esc(g.group)}</h2><div class="grid-auto">${g.items.map(link).join("")}</div></section>`).join("")}
      <section class="panel stack" id="res-papers"><h2>Official past papers, session by session</h2>
        <p class="small">Free PDFs from JASSO with question booklets and correct answers. Math and Science are posted up to 2021; Japanese and Japan and the World up to the 2018 1st session. Print one, set a timer, and treat it like the real thing. Newer papers are only in the printed booklets.</p>
        <div class="table-wrap"><table><thead><tr><th>Session</th><th>Subjects online</th><th></th></tr></thead><tbody>${EJU.pastPapers.map(p => `<tr><td><b>${esc(p.session)}</b></td><td>${esc(p.has)}</td><td><a href="${esc(p.url)}" target="_blank" rel="noopener">Open ${icon("ext", "")}</a></td></tr>`).join("")}</tbody></table></div>
        <p class="muted small">JASSO owns the copyright on these questions and asks that they aren't reposted, which is why this site links to them instead.</p></section>
      </div>`;
  }

  /* ---------- Writing practice (記述) ---------- */
  let writeTimer = null;
  function vWriting(id) {
    scene("mood", "jp");
    const done = S().writing || {};
    if (!id) return `<header class="hero"><h1>Writing</h1><p>The EJU essay: pick one of two themes, write 400 to 500 characters in 30 minutes, worth up to 50 points. Each set below is an original practice prompt in the same style.</p></header>
      <div class="grid-auto">${EJU.writing.map((w, i) => `<a class="panel district" style="min-height:0" href="#/writing/${w.id}"><span class="muted small data">Set ${String(i + 1).padStart(2, "0")}</span><h3>${esc(w.a)}</h3><p class="small jp" lang="ja">${esc(w.pair[0].slice(0, 46))}…</p><span class="small ${done[w.id] ? "" : "muted"}">${done[w.id] ? "Written: " + done[w.id] + " characters" : "Not written yet"}</span></a>`).join("")}</div>
      <section class="panel stack" style="margin-top:var(--space-xl)"><h2>How it's scored</h2><div class="table-wrap"><table><thead><tr><th>Score</th><th>Level</th><th>What it means</th></tr></thead><tbody>${EJU.writingRubric.map(r => `<tr><td class="data">${r[0]}</td><td><b>${r[1]}</b></td><td>${esc(r[2])}</td></tr>`).join("")}</tbody></table></div></section>`;
    const w = EJU.writing.find(x => x.id === id); if (!w) return vWriting();
    return `<div class="mission"><div class="mission-top"><a href="#/writing" class="iconbtn" aria-label="Back to prompts">${icon("back")}</a>
      <div><div class="row between small"><span>Writing, ${esc(w.a)}</span><span class="data" id="wClock">30:00</span></div><div class="bar thin pink"><i id="wBar" style="--p:0"></i></div></div><span></span></div>
      <section class="panel stack"><p class="muted small">Choose one theme:</p>
        <div class="seg" id="wPick">${w.pair.map((p, i) => `<button type="button" data-p="${i}" aria-pressed="${i === 0}">Theme ${i + 1}</button>`).join("")}</div>
        <p class="question jpq" lang="ja" id="wPrompt">${esc(w.pair[0])}</p>
        <textarea id="wText" lang="ja" rows="12" placeholder="ここに書いてください（400〜500字）" aria-label="Your essay"></textarea>
        <div class="row between"><span class="data" id="wCount">0 / 500</span><div class="row"><button class="btn small" id="wStart">${icon("play")}Start 30-minute timer</button><button class="btn small primary" id="wDone">${icon("check")}Finish</button></div></div>
        <details class="steps" open><summary>${icon("intel")}Checklist before you finish</summary><ul class="checks">${EJU.writingChecklist.map((c, i) => `<li><label><input type="checkbox" data-ck="${i}"> ${esc(c)}</label></li>`).join("")}</ul></details>
        <details class="steps"><summary>${icon("intel")}How to structure it</summary><ol>${EJU.methods.Writing.map(x => `<li>${esc(x)}</li>`).join("")}</ol>
          <p class="small jp" lang="ja">例：私は〜に賛成である。理由は二つある。第一に、〜。第二に、〜。確かに〜という意見もある。しかし、〜。以上の理由から、私は〜と考える。</p></details>
      </section></div>`;
  }
  function bindWriting(id) {
    const w = EJU.writing.find(x => x.id === id); if (!w) return;
    const ta = $("#wText"), cnt = $("#wCount"), key = "neonpass.draft." + id;
    try { ta.value = localStorage.getItem(key) || ""; } catch (e) {}
    const upd = () => { const n = ta.value.replace(/\s/g, "").length; cnt.textContent = n + " / 500"; cnt.style.color = n > 500 ? "var(--color-danger)" : n >= 400 ? "var(--color-mint)" : ""; try { localStorage.setItem(key, ta.value); } catch (e) {} return n; };
    ta.addEventListener("input", upd); upd();
    $$("#wPick button").forEach(b => b.addEventListener("click", () => { $$("#wPick button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); $("#wPrompt").textContent = w.pair[+b.dataset.p]; sfx("tap"); }));
    $("#wStart").addEventListener("click", () => {
      clearInterval(writeTimer); let left = 1800; sfx("alarm"); ta.focus();
      writeTimer = setInterval(() => {
        left--; const c = $("#wClock"); if (!c) return clearInterval(writeTimer);
        c.textContent = clock(left); $("#wBar").style.setProperty("--p", (1 - left / 1800).toFixed(3));
        if (left === 180) ping("writeLate");
        if (left <= 0) { clearInterval(writeTimer); sfx("fail"); c.textContent = "Time"; }
      }, 1000);
    });
    $("#wDone").addEventListener("click", () => {
      clearInterval(writeTimer); const n = upd();
      if (n < 40) { ping("writeEmpty"); return; }
      const s = S(); s.writing = s.writing || {}; const first = !s.writing[id]; s.writing[id] = n; Game.save();
      const ok = n >= 400 && n <= 500, checks = $$("[data-ck]:checked").length;
      const xp = (ok ? 40 : 20) + checks * 2; Game.addXP(xp, first ? 30 : 10);
      sfx("levelup"); toast("Essay saved", `${n} characters, +${xp} XP`, "check");
      ping(ok ? "writeGood" : n < 400 ? "writeShort" : "writeLong"); flushEvents();
    });
  }

  /* ---------- Runner profile and settings ---------- */
  function vMe() {
    scene("mood", "hub");
    const s = S(), L = Game.levelInfo();
    const got = EJU.badges.filter(b => s.badges[b.id]).length;
    const days = []; for (let i = 13; i >= 0; i--) { const k = Game.dayKey(new Date(Date.now() - i * 86400000)); days.push([k, s.history[k] || 0]); }
    const max = Math.max(s.dailyGoal, ...days.map(d => d[1]));
    const answered = Object.values(s.q).reduce((n, r) => n + r.seen, 0), right = Object.values(s.q).reduce((n, r) => n + r.right, 0);
    return `<header class="hero"><h1>${esc(s.callsign)}</h1><p>Level ${L.level} ${esc(L.title)}. ${s.xp} XP total, best uptime ${s.bestUptime} days, ${got} of ${EJU.badges.length} achievements.</p></header>
    <div class="stack-lg">
      <section class="grid-2">
        <div class="panel stack"><h2>Last 14 days</h2>
          <div style="display:grid;grid-template-columns:repeat(14,minmax(0,1fr));gap:4px;align-items:end;height:120px" role="img" aria-label="XP per day for the last 14 days">
            ${days.map(([k, v]) => `<div title="${k}: ${v} XP" style="height:${Math.max(3, v / max * 100)}%;background:${v >= s.dailyGoal ? "var(--color-signal)" : "var(--color-rule)"}"></div>`).join("")}</div>
          <p class="muted small">Bright bars are days you hit your goal of ${s.dailyGoal} XP.</p></div>
        <div class="panel stack"><h2>Record</h2><dl class="kv">
          <dt>Questions answered</dt><dd class="data">${answered}</dd><dt>Accuracy</dt><dd class="data">${answered ? Math.round(right / answered * 100) : 0}%</dd>
          <dt>Missions run</dt><dd class="data">${s.missions}</dd><dt>Shards reviewed</dt><dd class="data">${s.cardsReviewed}</dd>
          <dt>Best combo</dt><dd class="data">${s.bestCombo}</dd><dt>Neural caches</dt><dd class="data">${s.cache}</dd></dl></div>
      </section>
      <section class="stack"><h2>Achievements</h2><div class="grid-auto">${EJU.badges.map(b => `<div class="badge ${s.badges[b.id] ? "got" : ""}"><span class="hex">${icon(s.badges[b.id] ? "check" : "lock")}</span><div><b>${esc(b.name)}</b><span>${esc(b.desc)}</span></div></div>`).join("")}</div></section>
      <section class="panel stack"><h2>Settings</h2>
        <label>Callsign<input type="text" id="cs" maxlength="20" value="${esc(s.callsign)}"></label>
        <div class="stack"><span class="small" style="font-weight:600">Track</span><div class="seg" data-set="track">${EJU.tracks.map(t => `<button type="button" data-v="${t.id}" aria-pressed="${s.track === t.id}">${esc(t.name)}</button>`).join("")}</div>
          <p class="muted small">${esc(EJU.tracks.find(t => t.id === s.track).note)}</p></div>
        <div class="stack"><span class="small" style="font-weight:600">Target exam</span><div class="seg" data-set="session">${EJU.sessions.map(t => `<button type="button" data-v="${t.id}" aria-pressed="${s.session === t.id}">${esc(t.label)}</button>`).join("")}</div></div>
        <div class="stack"><span class="small" style="font-weight:600">Daily goal</span><div class="seg" data-set="dailyGoal">${[30, 60, 100, 150].map(n => `<button type="button" data-v="${n}" aria-pressed="${s.dailyGoal === n}">${n} XP</button>`).join("")}</div></div>
        <div class="stack"><span class="small" style="font-weight:600">Effects</span><div class="seg"><button type="button" id="fx" aria-pressed="${s.settings.effects}">Scanlines</button></div></div>
      </section>
      <section class="panel stack"><h2>Save file</h2><p class="muted small">Progress lives in this browser. Download a backup to move it to another device.</p>
        <div class="row"><button class="btn small" id="exp">Download backup</button><label class="btn small ghost" style="display:inline-flex">Load backup<input type="file" id="imp" accept="application/json" class="sr"></label><button class="btn small ghost" id="rst">Wipe everything</button></div></section>
    </div>`;
  }
  function bindMe() {
    $("#cs").addEventListener("change", e => { S().callsign = e.target.value.trim() || "Runner"; Game.save(); renderHUD(); toast("Callsign updated", S().callsign, "user"); });
    $$("[data-set]").forEach(g => $$("button", g).forEach(b => b.addEventListener("click", () => {
      const k = g.dataset.set; S()[k] = k === "dailyGoal" ? +b.dataset.v : b.dataset.v; if (k === "track") S().gigs = null; Game.save(); sfx("tap"); route();
    })));
    $("#fx").addEventListener("click", () => { S().settings.effects = !S().settings.effects; Game.save(); applyFx(); route(); });
    $("#exp").addEventListener("click", () => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([Game.exportSave()], { type: "application/json" })); a.download = "neon-pass-save.json"; a.click(); });
    $("#imp").addEventListener("change", e => { const f = e.target.files[0]; if (!f) return; f.text().then(t => { try { Game.importSave(t); toast("Save loaded", "Welcome back.", "check"); applySkin(); route(); } catch (err) { toast("That file isn't a Neon Pass save", "Pick the .json file from Download backup.", "x"); } }); });
    $("#rst").addEventListener("click", () => {
      overlay(`<div class="stack"><h2>Wipe all progress?</h2><p class="muted">XP, creds, shards and achievements are deleted from this browser. This can't be undone unless you have a backup.</p><div class="row"><button class="btn" id="yes">Wipe it</button><button class="btn primary" data-close>Keep my progress</button></div></div>`,
        (ov, close) => ov.querySelector("#yes").addEventListener("click", () => { Game.reset(); close(); location.hash = "#/"; boot(); }));
    });
  }
  function applyFx() { document.body.classList.toggle("scan", !!S().settings.effects); }

  /* ---------- First run ---------- */
  function onboarding() {
    const s = S();
    overlay(`<div class="stack"><div class="msg">${avatar("rook")}<div><div class="who">Rook <span>Handler</span></div><h2 style="margin-top:6px">New runner on the board</h2></div></div>
      <p>I run a crew that gets people through the Gate: the EJU, the exam for Japanese universities. Tell me who you are and what you're aiming for.</p>
      <label>Callsign<input type="text" id="ob-cs" maxlength="20" placeholder="Pick a name" value=""></label>
      <div class="stack"><span class="small" style="font-weight:600">Which track?</span><div class="seg" id="ob-track">${EJU.tracks.map(t => `<button type="button" data-v="${t.id}" aria-pressed="${s.track === t.id}">${esc(t.name)}</button>`).join("")}</div></div>
      <div class="stack"><span class="small" style="font-weight:600">Target exam</span><div class="seg" id="ob-ses">${EJU.sessions.map(t => `<button type="button" data-v="${t.id}" aria-pressed="${s.session === t.id}">${esc(t.label)}</button>`).join("")}</div></div>
      <button class="btn primary" id="ob-go">${icon("bolt")}Jack in</button></div>`, (ov, close) => {
      const seg = (id, key) => $$("#" + id + " button", ov).forEach(b => b.addEventListener("click", () => { $$("#" + id + " button", ov).forEach(x => x.setAttribute("aria-pressed", "false")); b.setAttribute("aria-pressed", "true"); s[key] = b.dataset.v; sfx("tap"); }));
      seg("ob-track", "track"); seg("ob-ses", "session");
      ov.querySelector("#ob-go").addEventListener("click", () => {
        s.callsign = ov.querySelector("#ob-cs").value.trim() || s.callsign; s.onboarded = true; s.gigs = null; Game.save();
        SFX.unlock(); sfx("boot"); close(); route();
        setTimeout(() => showStory(EJU.chapters[0]), 300);
      });
    });
  }

  /* ---------- Router ---------- */
  function route(force) {
    if (speechSynthesis && speechSynthesis.speaking) speechSynthesis.cancel();
    clearInterval(bossTimer); clearInterval(writeTimer);
    const pc = $("#allanahPing"); pc && pc.classList.remove("show");
    const parts = location.hash.replace(/^#\/?/, "").split("/");
    const [a, b] = parts;
    let html;
    switch (a) {
      case "": case undefined: html = vHub(); break;
      case "map": html = vMap(); break;
      case "district": html = vDistrict(b); break;
      case "mission": html = vMission(b); break;
      case "boss": html = vBoss(); break;
      case "shards": html = b ? vDeck(b) : vShards(); break;
      case "intercept": html = vIntercept(b); break;
      case "crew": html = vCrew(); break;
      case "shop": html = vShop(); break;
      case "intel": html = vIntel(); break;
      case "resources": html = vResources(); break;
      case "writing": html = vWriting(b); break;
      case "me": html = vMe(); break;
      default: html = vHub();
    }
    view.innerHTML = html;
    $$("#view h1").forEach(h => { h.dataset.text = h.firstChild ? h.firstChild.textContent : h.textContent; });
    if (a === "mission" && run) bindMission();
    if (a === "shards" && b) bindDeck();
    if (a === "intercept" && b) bindIntercept(b);
    if (a === "shop") bindShop();
    if (a === "me") bindMe();
    if (a === "writing" && b) bindWriting(b);
    $$("[data-jump]").forEach(x => x.addEventListener("click", (e) => { e.preventDefault(); const t = document.getElementById(x.dataset.jump); t && t.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }));
    if (a === "boss") { const sb = $("#startBoss"); sb && sb.addEventListener("click", startBoss); }
    $$("[data-story]").forEach(x => x.addEventListener("click", () => showStory(EJU.chapters.find(c => c.lvl === +x.dataset.story))));
    const g2 = $("#openGift2"); g2 && g2.addEventListener("click", showGift);
    renderNav(); renderHUD();
    if (!force) window.scrollTo(0, 0);
    if ((!a || a === "hub") && S().onboarded && Date.now() - hubPinged > 180000) {
      hubPinged = Date.now(); const s = S();
      ping(s.dayXP >= s.dailyGoal ? "hubDone" : s.dayXP > 0 ? "hubSome" : (s.uptime === 0 && s.bestUptime > 0) ? "hubStreakLost" : "hubLazy", 1200);
    }
    $("#main").focus({ preventScroll: true });
  }

  /* Keyboard: 1-4 answers, Enter for next */
  document.addEventListener("keydown", e => {
    if (e.target.matches("input, textarea, select")) return;
    if (/^[1-4]$/.test(e.key)) { const b = $$(".choices .choice")[+e.key - 1]; if (b && !b.disabled) b.click(); }
    if (e.key === "0") { const b = $("#idk"); if (b && !b.disabled) b.click(); }
    if (e.key === "Enter") { const n = $("#next"); if (n && document.activeElement !== n) n.click(); }
  });
  /* Light hover blips on primary controls */
  document.addEventListener("pointerover", e => { if (e.pointerType === "mouse" && e.target.closest && e.target.closest(".btn, .nav a, .district") && !e.target.closest("[data-hovered]")) { const el = e.target.closest(".btn, .nav a, .district"); el.dataset.hovered = "1"; sfx("hover"); el.addEventListener("pointerleave", () => delete el.dataset.hovered, { once: true }); } });
  document.addEventListener("click", e => { const a = e.target.closest("a[href^='#/']"); if (a) sfx("nav"); }, true);
  document.addEventListener("pointerdown", () => SFX.unlock(), { once: true });

  /* Sound toggles */
  function syncSound() {
    const m = S().settings.muted;
    [$("#muteBtn"), $("#muteBtnM")].forEach(b => { if (!b) return; b.setAttribute("aria-pressed", String(!m)); b.setAttribute("aria-label", m ? "Sound effects off" : "Sound effects on"); b.innerHTML = icon(m ? "mute" : "sound"); });
    const mb = $("#musicBtn"); mb.setAttribute("aria-pressed", String(!!S().settings.music)); mb.setAttribute("aria-label", S().settings.music ? "Ambient music on" : "Ambient music off");
    SFX.setMuted(m);
  }
  [$("#muteBtn"), $("#muteBtnM")].forEach(b => b && b.addEventListener("click", () => { S().settings.muted = !S().settings.muted; Game.save(); syncSound(); sfx("tap"); }));
  $("#musicBtn").addEventListener("click", () => { S().settings.music = !S().settings.music; Game.save(); SFX.setMusic(S().settings.music); syncSound(); });

  function boot() {
    applySkin(); applyFx(); syncSound(); route();
    if (!S().onboarded) setTimeout(onboarding, 400);
    else flushEvents();
  }
  addEventListener("hashchange", () => route());
  boot();
})();
