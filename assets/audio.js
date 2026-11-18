/* Synthesised sound effects (Web Audio). No audio files, so nothing to license. */
(function () {
  let ctx = null, master = null, musicGain = null, musicNodes = null;
  const state = { muted: false, music: false, volume: 0.6 };

  function ensure() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = state.muted ? 0 : state.volume;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);
    return ctx;
  }

  function tone({ f = 440, f2 = null, type = "square", dur = 0.12, vol = 0.18, at = 0, attack = 0.004, filter = null }) {
    const c = ensure(); if (!c || state.muted) return;
    const t = c.currentTime + at;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let node = o;
    if (filter) { const bq = c.createBiquadFilter(); bq.type = "lowpass"; bq.frequency.value = filter; o.connect(bq); node = bq; }
    node.connect(g).connect(master);
    o.start(t); o.stop(t + dur + 0.02);
  }

  function noise({ dur = 0.15, vol = 0.12, at = 0, hp = 1200 }) {
    const c = ensure(); if (!c || state.muted) return;
    const t = c.currentTime + at;
    const buf = c.createBuffer(1, Math.max(1, c.sampleRate * dur), c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const s = c.createBufferSource(); s.buffer = buf;
    const f = c.createBiquadFilter(); f.type = "highpass"; f.frequency.value = hp;
    const g = c.createGain(); g.gain.value = vol;
    s.connect(f).connect(g).connect(master); s.start(t);
  }

  const sfx = {
    tap()     { tone({ f: 1200, f2: 900, type: "square", dur: 0.04, vol: 0.06, filter: 3000 }); },
    hover()   { tone({ f: 2400, type: "sine", dur: 0.025, vol: 0.025 }); },
    nav()     { tone({ f: 520, f2: 780, type: "triangle", dur: 0.08, vol: 0.09 }); },
    correct() { [660, 880, 1320].forEach((f, i) => tone({ f, type: "square", dur: 0.09, vol: 0.09, at: i * 0.055, filter: 4000 })); },
    combo(n)  { const b = 520 * Math.pow(1.06, Math.min(n, 12)); [b, b * 1.5, b * 2].forEach((f, i) => tone({ f, type: "sawtooth", dur: 0.07, vol: 0.06, at: i * 0.04, filter: 3500 })); },
    wrong()   { tone({ f: 180, f2: 70, type: "sawtooth", dur: 0.28, vol: 0.16, filter: 900 }); noise({ dur: 0.12, vol: 0.05, hp: 400 }); },
    flip()    { noise({ dur: 0.07, vol: 0.06, hp: 2500 }); tone({ f: 900, f2: 1400, type: "sine", dur: 0.06, vol: 0.05 }); },
    coin()    { tone({ f: 988, type: "square", dur: 0.07, vol: 0.08 }); tone({ f: 1319, type: "square", dur: 0.16, vol: 0.08, at: 0.07 }); },
    buy()     { [523, 659, 784, 1047].forEach((f, i) => tone({ f, type: "triangle", dur: 0.12, vol: 0.1, at: i * 0.06 })); },
    deny()    { tone({ f: 220, type: "square", dur: 0.08, vol: 0.08 }); tone({ f: 196, type: "square", dur: 0.12, vol: 0.08, at: 0.09 }); },
    levelup() { [392, 523, 659, 784, 1047].forEach((f, i) => tone({ f, type: "sawtooth", dur: 0.22, vol: 0.08, at: i * 0.07, filter: 5000 }));
                tone({ f: 130, f2: 260, type: "sine", dur: 0.6, vol: 0.14 }); },
    badge()   { [880, 1175, 1568].forEach((f, i) => tone({ f, type: "triangle", dur: 0.18, vol: 0.09, at: i * 0.08 })); },
    glitch()  { for (let i = 0; i < 5; i++) tone({ f: 200 + Math.random() * 2000, type: "square", dur: 0.03, vol: 0.05, at: i * 0.03 }); noise({ dur: 0.18, vol: 0.05 }); },
    boot()    { tone({ f: 80, f2: 400, type: "sawtooth", dur: 0.5, vol: 0.08, filter: 1200 }); [0.25, 0.32, 0.39].forEach(a => tone({ f: 1600, type: "square", dur: 0.03, vol: 0.05, at: a })); },
    tick()    { tone({ f: 1800, type: "square", dur: 0.02, vol: 0.03 }); },
    alarm()   { tone({ f: 880, f2: 440, type: "square", dur: 0.18, vol: 0.07 }); },
    fail()    { [392, 330, 262, 196].forEach((f, i) => tone({ f, type: "sawtooth", dur: 0.2, vol: 0.08, at: i * 0.12, filter: 1500 })); }
  };

  /* A soft ambient pad, off by default. */
  function startMusic() {
    const c = ensure(); if (!c || musicNodes) return;
    musicGain = c.createGain(); musicGain.gain.value = 0;
    musicGain.connect(master);
    const filt = c.createBiquadFilter(); filt.type = "lowpass"; filt.frequency.value = 700; filt.connect(musicGain);
    const lfo = c.createOscillator(); const lfoG = c.createGain(); lfo.frequency.value = 0.05; lfoG.gain.value = 300;
    lfo.connect(lfoG).connect(filt.frequency); lfo.start();
    const notes = [55, 82.4, 110, 164.8];
    const oscs = notes.map((f, i) => { const o = c.createOscillator(); o.type = i % 2 ? "sawtooth" : "triangle"; o.frequency.value = f; o.detune.value = (i - 1.5) * 6; o.connect(filt); o.start(); return o; });
    musicGain.gain.linearRampToValueAtTime(0.05, c.currentTime + 3);
    musicNodes = { oscs, lfo };
  }
  function stopMusic() {
    if (!musicNodes || !ctx) return;
    const n = musicNodes; musicNodes = null;
    musicGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
    setTimeout(() => { n.oscs.forEach(o => o.stop()); n.lfo.stop(); }, 1100);
  }

  window.SFX = {
    play(name, arg) { try { if (!state.muted && sfx[name]) { ensure(); if (ctx.state === "suspended") ctx.resume(); sfx[name](arg); } } catch (e) {} },
    setMuted(m) { state.muted = m; if (master) master.gain.value = m ? 0 : state.volume; if (m) stopMusic(); else if (state.music) startMusic(); },
    setMusic(on) { state.music = on; if (on && !state.muted) startMusic(); else stopMusic(); },
    get muted() { return state.muted; },
    unlock() { const c = ensure(); if (c && c.state === "suspended") c.resume(); if (state.music && !state.muted) startMusic(); }
  };
})();
