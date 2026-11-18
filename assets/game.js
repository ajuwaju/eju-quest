/* Game state: XP, levels, creds, uptime (streak), gigs, shards (spaced repetition), badges. Saved in localStorage. */
(function () {
  const KEY = "neonpass.save.v1";
  const today = () => dayKey(new Date());
  function dayKey(d) { return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }
  function daysBetween(a, b) { return Math.round((new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 86400000); }

  const fresh = () => ({
    v: 1, callsign: (window.EJU_CONFIG && EJU_CONFIG.defaultCallsign) || "Runner", onboarded: false,
    track: "all", session: "jun2027", dailyGoal: 60,
    xp: 0, creds: 0, uptime: 0, bestUptime: 0, lastGoalDay: null,
    day: today(), dayXP: 0, history: {},
    q: {},            // question id -> { seen, right, lastRight }
    cards: {},        // "deck:index" -> { box, due }
    cardsReviewed: 0,
    listen: {},       // listening id -> best correct bool
    combo: 0, bestCombo: 0,
    badges: {}, ware: {}, cache: 0, skin: "acid", skins: { acid: true },
    gigs: null, readChapters: {}, gift: false,
    bosses: [], missions: 0,
    settings: { muted: false, music: false, effects: true }
  });

  let S = load();
  const listeners = [];

  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) return Object.assign(fresh(), JSON.parse(raw)); } catch (e) {}
    return fresh();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} listeners.forEach(f => f(S)); }

  /* ---------- Levels ---------- */
  const xpFor = (lvl) => 50 * lvl * (lvl - 1);
  function level(xp = S.xp) { let l = 1; while (xp >= xpFor(l + 1)) l++; return l; }
  function levelInfo(xp = S.xp) {
    const l = level(xp), a = xpFor(l), b = xpFor(l + 1);
    let title = EJU.levelTitles[0][1];
    EJU.levelTitles.forEach(([n, t]) => { if (l >= n) title = t; });
    return { level: l, title, into: xp - a, need: b - a, pct: (xp - a) / (b - a) };
  }

  /* ---------- Day rollover and uptime ---------- */
  function rollDay() {
    const t = today();
    if (S.day === t) return;
    // Missed days: use neural cache if available.
    if (S.lastGoalDay) {
      const gap = daysBetween(S.lastGoalDay, t);
      if (gap > 1) {
        const missed = gap - 1;
        if (S.cache >= missed) { S.cache -= missed; S.lastGoalDay = dayKey(new Date(Date.now() - 86400000)); events.push({ type: "cache", n: missed }); }
        else { S.uptime = 0; }
      }
    }
    S.day = t; S.dayXP = 0; S.gigs = null;
    save();
  }

  const events = []; // queued UI events (level up, badges, story)
  function drain() { return events.splice(0, events.length); }

  function mult() { return S.ware.siphon ? 1.25 : 1; }

  function addXP(n, creds = 0) {
    rollDay();
    const before = level();
    S.xp += n; S.dayXP += n;
    S.history[S.day] = (S.history[S.day] || 0) + n;
    if (creds) S.creds += Math.round(creds * mult());
    if (S.dayXP >= S.dailyGoal && S.lastGoalDay !== S.day) {
      const yest = dayKey(new Date(Date.now() - 86400000));
      S.uptime = (S.lastGoalDay === yest || S.lastGoalDay === S.day) ? S.uptime + 1 : 1;
      S.lastGoalDay = S.day; S.bestUptime = Math.max(S.bestUptime, S.uptime);
      events.push({ type: "goal", uptime: S.uptime });
      if (S.uptime % 7 === 0 && S.cache < 2) { S.cache++; events.push({ type: "freecache" }); }
    }
    const after = level();
    if (after > before) {
      events.push({ type: "level", level: after });
      EJU.chapters.forEach(c => { if (c.lvl > before && c.lvl <= after) events.push({ type: "chapter", chapter: c }); });
    }
    progressGig("xp", n);
    checkBadges();
    save();
  }

  function addCreds(n) { S.creds += Math.round(n * mult()); save(); }

  /* ---------- Questions ---------- */
  function answer(qid, right) {
    const r = S.q[qid] || { seen: 0, right: 0, lastRight: false };
    r.seen++; if (right) r.right++; r.lastRight = right; S.q[qid] = r;
    if (right) { S.combo++; S.bestCombo = Math.max(S.bestCombo, S.combo); progressGig("combo", S.combo, true); }
    else S.combo = 0;
    save();
  }
  function control(subject) {
    const qs = EJU.questions.filter(q => q.s === subject);
    const got = qs.filter(q => S.q[q.id] && S.q[q.id].right > 0).length;
    return qs.length ? got / qs.length : 0;
  }
  function mistakes() { return EJU.questions.filter(q => S.q[q.id] && !S.q[q.id].lastRight); }

  /* ---------- Shards (Leitner boxes) ---------- */
  const INTERVALS = [0, 1, 3, 7, 14, 30];
  function cardKey(deck, i) { return deck + ":" + i; }
  function dueCards(deckId) {
    const d = EJU.decks.find(x => x.id === deckId); const t = today();
    const due = [], fresh = [];
    d.cards.forEach((c, i) => { const r = S.cards[cardKey(deckId, i)]; if (!r) fresh.push(i); else if (r.due <= t) due.push(i); });
    return { due, fresh };
  }
  function gradeCard(deckId, i, good) {
    const k = cardKey(deckId, i); const r = S.cards[k] || { box: 0 };
    r.box = good ? Math.min(r.box + 1, INTERVALS.length - 1) : 0;
    r.due = dayKey(new Date(Date.now() + INTERVALS[r.box] * 86400000));
    S.cards[k] = r; S.cardsReviewed++;
    progressGig("shards", 1);
    save();
  }
  function deckMastery(deckId) {
    const d = EJU.decks.find(x => x.id === deckId);
    let s = 0; d.cards.forEach((c, i) => { const r = S.cards[cardKey(deckId, i)]; if (r) s += r.box / (INTERVALS.length - 1); });
    return s / d.cards.length;
  }

  /* ---------- Gigs (daily contracts) ---------- */
  function rng(seed) { let s = 0; for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function trackSubjects() { return (EJU.tracks.find(t => t.id === S.track) || EJU.tracks[2]).subjects; }
  function gigs() {
    rollDay();
    if (S.gigs && S.gigs.day === S.day) return S.gigs.list;
    const r = rng(S.day + S.callsign); const subs = trackSubjects();
    const pickSub = subs[Math.floor(r() * subs.length)]; const dist = EJU.districts.find(d => d.subject === pickSub);
    const pool = [
      { id: "run", kind: "run", target: 1, district: dist.id, text: "Run a mission in " + dist.name, reward: 60 },
      { id: "shards", kind: "shards", target: 15 + Math.floor(r() * 3) * 5, text: "", reward: 50 },
      { id: "combo", kind: "combo", target: 4 + Math.floor(r() * 3), text: "", reward: 70 },
      { id: "listen", kind: "listen", target: 1, text: "Decode a listening intercept", reward: 50 },
      { id: "xp", kind: "xp", target: S.dailyGoal, text: "", reward: 40 }
    ];
    pool[1].text = "Review " + pool[1].target + " shards";
    pool[2].text = "Chain " + pool[2].target + " correct answers";
    pool[4].text = "Earn " + pool[4].target + " XP today";
    const pick = [pool[0]]; const rest = pool.slice(1).sort(() => r() - 0.5).slice(0, 2);
    const list = pick.concat(rest).map(g => Object.assign(g, { prog: 0, done: false }));
    S.gigs = { day: S.day, list }; save();
    return list;
  }
  function progressGig(kind, n, isMax, district) {
    if (!S.gigs || S.gigs.day !== S.day) return;
    S.gigs.list.forEach(g => {
      if (g.done || g.kind !== kind) return;
      if (kind === "run" && district && g.district !== district) return;
      g.prog = isMax ? Math.max(g.prog, n) : g.prog + n;
      if (g.prog >= g.target) { g.prog = g.target; g.done = true; S.creds += Math.round(g.reward * mult()); S.xp += 20; events.push({ type: "gig", gig: g }); }
    });
  }

  /* ---------- Missions and bosses ---------- */
  function finishMission(district, right, total, cleanRun) {
    S.missions++;
    progressGig("run", 1, false, district);
    const h = new Date().getHours();
    if (h >= 23 || h < 4) award("night");
    if (h >= 4 && h < 7) award("dawn");
    award("first");
    if (cleanRun) award("clean");
    save(); checkBadges();
  }
  function finishBoss(score, total) {
    S.bosses.push({ day: S.day, score, total });
    if (score / total >= 0.7) award("boss");
    save();
  }
  function finishListen(id, right) {
    if (right) S.listen[id] = true;
    progressGig("listen", 1);
    if (EJU.listening.every(l => S.listen[l.id])) award("intercept");
    save();
  }

  /* ---------- Shop ---------- */
  function buyWare(id) {
    const w = EJU.cyberware.find(x => x.id === id); if (!w) return false;
    if (S.creds < w.price) return false;
    if (w.consumable) { if (S.cache >= w.max) return false; S.cache++; }
    else { if (S.ware[id]) return false; S.ware[id] = true; }
    S.creds -= w.price; award("shopper"); save(); return true;
  }
  function buySkin(id) {
    const k = EJU.skins.find(x => x.id === id); if (!k) return false;
    if (S.skins[id]) { S.skin = id; save(); return true; }
    if (S.creds < k.price) return false;
    S.creds -= k.price; S.skins[id] = true; S.skin = id; save(); return true;
  }

  /* ---------- Badges ---------- */
  function award(id) { if (S.badges[id]) return; S.badges[id] = S.day; events.push({ type: "badge", badge: EJU.badges.find(b => b.id === id) }); }
  function checkBadges() {
    if (S.bestCombo >= 5) award("combo5");
    if (S.bestCombo >= 10) award("combo10");
    if (S.bestUptime >= 3) award("up3");
    if (S.bestUptime >= 7) award("up7");
    if (S.bestUptime >= 30) award("up30");
    const l = level();
    if (l >= 5) award("lvl5"); if (l >= 10) award("lvl10"); if (l >= 20) award("lvl20");
    if (S.cardsReviewed >= 100) award("shards100");
    if (S.cardsReviewed >= 500) award("shards500");
    if (EJU.districts.some(d => control(d.subject) >= 1)) award("district");
    if (trackSubjects().every(s => control(s) >= 0.6)) award("allcity");
  }

  /* ---------- Save files ---------- */
  function exportSave() { return JSON.stringify(S); }
  function importSave(text) { const o = JSON.parse(text); if (typeof o !== "object" || o.v !== 1) throw new Error("Not a save file"); S = Object.assign(fresh(), o); save(); }
  function reset() { S = fresh(); save(); }

  window.Game = {
    get s() { return S; }, save, on(f) { listeners.push(f); },
    today, dayKey, daysBetween, rollDay, drain, events,
    level, levelInfo, xpFor, addXP, addCreds, mult,
    answer, control, mistakes,
    dueCards, gradeCard, deckMastery, cardKey,
    gigs, progressGig, trackSubjects,
    finishMission, finishBoss, finishListen, award, checkBadges,
    buyWare, buySkin, exportSave, importSave, reset
  };
  rollDay();
})();
