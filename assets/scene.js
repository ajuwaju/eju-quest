/* 3D neon alley behind the HUD. Procedural city + CC0 models from 3dassets.dev. */
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const PREFIX = "cyberpunk-apartment-and-neon-block-";
const MODELS = {
  sign:    PREFIX + "neon-sign-frame-ea334e2a",
  blade:   PREFIX + "neon-sign-frame-tal-6047d9cc",
  strip:   PREFIX + "neon-strip-run-863a00d1",
  stripC:  PREFIX + "neon-strip-run-cyan-9e882f74",
  drone:   PREFIX + "drone-on-charge-pad-a5197423",
  mast:    PREFIX + "rooftop-antenna-mas-595b8b11",
  dish:    PREFIX + "satellite-dish-55e036e2",
  lantern: PREFIX + "paper-lantern-strip-a42f9198",
  camera:  PREFIX + "camera-on-mount-df549d71",
  puddle:  PREFIX + "puddle-plate-a0e6077e",
  aircon:  PREFIX + "aircon-condenser-bo-b44b253e",
  tank:    PREFIX + "rooftop-water-tank-06290dbf"
};

const canvas = document.getElementById("scene");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

function supportsGL() { try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; } }

if (canvas && supportsGL()) start();

function start() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const fogColor = new THREE.Color(0x07060f);
  scene.background = fogColor;
  scene.fog = new THREE.FogExp2(fogColor, 0.045);

  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 200);
  const camBase = new THREE.Vector3(0.6, 1.75, 9);
  camera.position.copy(camBase);

  scene.add(new THREE.HemisphereLight(0x3a2a6a, 0x05040a, 0.6));
  const keyA = new THREE.PointLight(0xff2e88, 30, 18, 1.6); keyA.position.set(-3.2, 3.2, 3); scene.add(keyA);
  const keyB = new THREE.PointLight(0x18e0ff, 26, 18, 1.6); keyB.position.set(3.4, 2.6, -2); scene.add(keyB);
  const keyC = new THREE.PointLight(0xf5e626, 14, 14, 1.8); keyC.position.set(0, 4.5, -9); scene.add(keyC);

  /* Wet ground */
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(14, 80),
    new THREE.MeshStandardMaterial({ color: 0x0b0a14, roughness: 0.22, metalness: 0.75 }));
  ground.rotation.x = -Math.PI / 2; ground.position.z = -25; scene.add(ground);

  /* Procedural buildings lining the alley, with lit windows */
  function windowTexture(seed, tint) {
    const c = document.createElement("canvas"); c.width = 128; c.height = 256;
    const g = c.getContext("2d"); g.fillStyle = "#0c0b16"; g.fillRect(0, 0, 128, 256);
    let s = seed; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    for (let y = 6; y < 256; y += 14) for (let x = 6; x < 128; x += 12) {
      const v = r(); if (v > 0.62) { g.fillStyle = v > 0.93 ? tint : v > 0.8 ? "#ffd27a" : "#2a2f55"; g.fillRect(x, y, 7, 8); }
    }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.magFilter = THREE.NearestFilter; return t;
  }
  const tints = ["#ff2e88", "#18e0ff", "#f5e626", "#7cff9a"];
  for (let side = -1; side <= 1; side += 2) {
    let z = 6;
    let i = 0;
    while (z > -60) {
      const depth = 4 + ((i * 7) % 5);
      const h = 7 + ((i * 13 + (side > 0 ? 5 : 0)) % 17);
      const w = 4 + (i % 3);
      const tex = windowTexture(i * 17 + (side > 0 ? 99 : 0), tints[i % 4]);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(depth / 4, h / 8);
      const mat = new THREE.MeshStandardMaterial({ color: 0x15132a, roughness: 0.8, metalness: 0.2, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.9 });
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, depth), mat);
      b.position.set(side * (4 + w / 2), h / 2, z - depth / 2); scene.add(b);
      // neon trim on some buildings
      if (i % 2 === 0) {
        const col = new THREE.Color(tints[(i + (side > 0 ? 1 : 0)) % 4]);
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, depth * 0.9), new THREE.MeshBasicMaterial({ color: col }));
        bar.position.set(side * 4.02, 2.6 + (i % 3) * 1.4, z - depth / 2); scene.add(bar);
      }
      z -= depth + 0.4; i++;
    }
  }

  /* Distant skyline glow */
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(120, 40), new THREE.MeshBasicMaterial({ color: 0x1a0b2e }));
  sky.position.set(0, 18, -70); scene.add(sky);

  /* Our own logo on a holo panel (original mark). */
  function logoTexture() {
    const c = document.createElement("canvas"); c.width = 1024; c.height = 512; const g = c.getContext("2d");
    g.clearRect(0, 0, 1024, 512);
    g.font = "800 210px 'Big Shoulders Display', 'Arial Narrow', sans-serif"; g.textAlign = "center"; g.textBaseline = "middle";
    g.shadowColor = "#ff2e88"; g.shadowBlur = 30; g.fillStyle = "#ffe9f4"; g.fillText("NEON PASS", 512, 210);
    g.font = "700 120px 'Zen Kaku Gothic New', sans-serif"; g.shadowColor = "#18e0ff"; g.fillStyle = "#d9fbff"; g.fillText("合格", 512, 390);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }
  const holo = new THREE.Mesh(new THREE.PlaneGeometry(4, 2), new THREE.MeshBasicMaterial({ map: logoTexture(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  holo.position.set(0, 5.6, -10); scene.add(holo);
  document.fonts && document.fonts.ready.then(() => { holo.material.map = logoTexture(); holo.material.needsUpdate = true; });

  /* Rain */
  const RAIN = reduce ? 0 : 1400;
  const rainGeo = new THREE.BufferGeometry();
  const rp = new Float32Array(RAIN * 6);
  for (let i = 0; i < RAIN; i++) {
    const x = (Math.random() - 0.5) * 12, y = Math.random() * 14, z = 8 - Math.random() * 40;
    rp.set([x, y, z, x - 0.02, y - 0.35, z], i * 6);
  }
  rainGeo.setAttribute("position", new THREE.BufferAttribute(rp, 3));
  const rain = new THREE.LineSegments(rainGeo, new THREE.LineBasicMaterial({ color: 0x8aa6ff, transparent: true, opacity: 0.28 }));
  scene.add(rain);

  /* CC0 models */
  const loader = new GLTFLoader();
  const placed = {};
  async function resolveUrl(slug) {
    const local = "assets/models/" + slug + ".glb";
    try { const h = await fetch(local, { method: "HEAD" }); if (h.ok) return local; } catch (e) {}
    try {
      const r = await fetch("https://3dassets.dev/api/v1/assets/" + slug);
      if (r.ok) { const j = await r.json(); return j.data && j.data.cdnUrl; }
    } catch (e) {}
    return null;
  }
  function fit(obj, height) {
    const box = new THREE.Box3().setFromObject(obj); const size = box.getSize(new THREE.Vector3());
    const s = height / Math.max(size.y, 0.001); obj.scale.setScalar(s);
    const b2 = new THREE.Box3().setFromObject(obj); obj.position.y -= b2.min.y;
    return obj;
  }
  function place(key, { h, pos, rotY = 0, onLoad }) {
    resolveUrl(MODELS[key]).then(url => {
      if (!url) return;
      loader.load(url, (gltf) => {
        const root = new THREE.Group(); const m = gltf.scene;
        m.traverse(o => { if (o.isMesh && o.material) { o.material.envMapIntensity = 0.6; if (o.material.emissive && o.material.emissiveIntensity) o.material.emissiveIntensity *= 2.2; } });
        fit(m, h);
        const box = new THREE.Box3().setFromObject(m); const c = box.getCenter(new THREE.Vector3());
        m.position.x -= c.x; m.position.z -= c.z;
        root.add(m); root.position.set(pos[0], pos[1], pos[2]); root.rotation.y = rotY;
        scene.add(root); placed[key] = root;
        if (gltf.animations && gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(m); gltf.animations.forEach(a => mixer.clipAction(a).play()); mixers.push(mixer);
        }
        onLoad && onLoad(root);
      }, undefined, () => {});
    });
  }
  const mixers = [];
  place("sign",    { h: 1.1, pos: [-3.85, 3.4, 1.5],  rotY: Math.PI / 2 });
  place("blade",   { h: 2.4, pos: [3.8, 3.2, -3],     rotY: -Math.PI / 2 });
  place("strip",   { h: 0.25, pos: [-3.9, 2.3, -1],   rotY: Math.PI / 2 });
  place("stripC",  { h: 0.25, pos: [-3.9, 2.3, -2.3], rotY: Math.PI / 2 });
  place("strip",   { h: 0.25, pos: [3.9, 1.9, 2.5],   rotY: -Math.PI / 2 });
  place("drone",   { h: 0.55, pos: [1.2, 0, 3.6],     rotY: -0.5 });
  place("puddle",  { h: 0.03, pos: [-0.8, 0.01, 4.4], rotY: 0.3 });
  place("lantern", { h: 2.5, pos: [0, 0, -6],         rotY: 0 });
  place("camera",  { h: 0.45, pos: [3.85, 3.0, 4.5],  rotY: -Math.PI / 2 });
  place("aircon",  { h: 0.62, pos: [-3.75, 1.4, 5.2], rotY: Math.PI / 2 });
  place("mast",    { h: 3.3, pos: [-6, 14, -8],       rotY: 0.4 });
  place("dish",    { h: 1.3, pos: [5.5, 9.5, -4],     rotY: -2.2 });
  place("tank",    { h: 2.4, pos: [6.5, 12, -14],     rotY: 0.2 });

  /* Post-processing bloom */
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.85, 0.6, 0.18);
  composer.addPass(bloom); composer.addPass(new OutputPass());

  function resize() {
    const w = innerWidth, h = innerHeight;
    renderer.setSize(w, h, false); composer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  addEventListener("resize", resize); resize();

  /* Pointer parallax */
  const look = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener("pointermove", e => { look.tx = (e.clientX / innerWidth - 0.5); look.ty = (e.clientY / innerHeight - 0.5); }, { passive: true });

  /* Moods per screen and reactions to answers */
  const mood = { a: new THREE.Color(0xff2e88), b: new THREE.Color(0x18e0ff), boost: 0, shake: 0 };
  const moods = {
    hub: [0xff2e88, 0x18e0ff], jp: [0xff2e88, 0xffb000], m1: [0x18e0ff, 0x2f6bff], m2: [0x18e0ff, 0xf5e626],
    phy: [0xff7a18, 0x18e0ff], chem: [0x7cff9a, 0xff2e88], bio: [0x7cff9a, 0x18e0ff], jw: [0xf5e626, 0xff2e88],
    boss: [0xff1b3d, 0xff1b3d], shop: [0xf5e626, 0x18e0ff]
  };
  let target = moods.hub;
  window.Scene3D = {
    mood(name) { target = moods[name] || moods.hub; },
    pulse() { mood.boost = 1; },
    hit() { mood.shake = 1; },
    levelUp() { mood.boost = 2.2; }
  };

  let running = true;
  document.addEventListener("visibilitychange", () => { running = !document.hidden; if (running) loop(); });
  const clock = new THREE.Clock();
  function loop() {
    if (!running) return;
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    look.x += (look.tx - look.x) * 0.04; look.y += (look.ty - look.y) * 0.04;
    const drift = reduce ? 0 : Math.sin(t * 0.08) * 0.6;
    camera.position.set(camBase.x + look.x * 1.2 + drift, camBase.y - look.y * 0.5, camBase.z);
    if (mood.shake > 0.01) { camera.position.x += (Math.random() - 0.5) * 0.12 * mood.shake; camera.position.y += (Math.random() - 0.5) * 0.08 * mood.shake; mood.shake *= 0.88; }
    camera.lookAt(look.x * 2, 2.6 - look.y, -8);
    keyA.color.lerp(new THREE.Color(target[0]), 0.03); keyB.color.lerp(new THREE.Color(target[1]), 0.03);
    bloom.strength = 0.85 + mood.boost * 0.7; mood.boost *= 0.94;
    holo.material.opacity = 0.8 + Math.sin(t * 7) * 0.06 + (Math.random() > 0.985 ? -0.5 : 0);
    if (RAIN) {
      const p = rainGeo.attributes.position.array;
      for (let i = 0; i < RAIN; i++) { const k = i * 6; p[k + 1] -= dt * 14; p[k + 4] -= dt * 14; if (p[k + 4] < 0) { p[k + 1] += 14; p[k + 4] += 14; } }
      rainGeo.attributes.position.needsUpdate = true;
    }
    mixers.forEach(m => m.update(dt));
    composer.render();
    if (!reduce) requestAnimationFrame(loop);
    else setTimeout(() => requestAnimationFrame(loop), 500);
  }
  loop();
  document.documentElement.classList.add("has-3d");
}
