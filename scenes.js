// Morales Locksmith 3D: every model on the page is drawn by ONE shared
// three.js renderer (a transparent layer over the page), so many models stay fast.
// Each element with data-scene="..." gets its own little product shot.
// Models are built from scratch here; nothing is downloaded.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const els = [...document.querySelectorAll("[data-scene]")];

/* ===================== materials ===================== */
const M = {};
function makeMaterials() {
  M.nickel = new THREE.MeshPhysicalMaterial({ color: 0xd5dae0, metalness: 1, roughness: 0.24, anisotropy: 0.5 });
  M.nickelEdge = new THREE.MeshPhysicalMaterial({ color: 0xdfe3e8, metalness: 1, roughness: 0.16 });
  M.groove = new THREE.MeshPhysicalMaterial({ color: 0x9aa1aa, metalness: 1, roughness: 0.4 });
  M.chrome = new THREE.MeshPhysicalMaterial({ color: 0xeef1f5, metalness: 1, roughness: 0.07 });
  M.brass = new THREE.MeshPhysicalMaterial({ color: 0xd4a94e, metalness: 1, roughness: 0.28, anisotropy: 0.4 });
  M.shell = new THREE.MeshPhysicalMaterial({ color: 0x15171c, metalness: 0.1, roughness: 0.42, clearcoat: 1, clearcoatRoughness: 0.12 });
  M.matte = new THREE.MeshPhysicalMaterial({ color: 0x1b1d22, roughness: 0.62, clearcoat: 0.3, clearcoatRoughness: 0.5 });
  M.rubber = new THREE.MeshPhysicalMaterial({ color: 0x2a2e36, roughness: 0.75 });
  M.red = new THREE.MeshPhysicalMaterial({ color: 0xc8372d, roughness: 0.5, clearcoat: 0.6 });
  M.dark = new THREE.MeshPhysicalMaterial({ color: 0x0c0d10, roughness: 0.6 });
  M.blue = new THREE.MeshPhysicalMaterial({ color: 0x2d2e9f, roughness: 0.35, clearcoat: 0.8 });
}

/* ===================== helpers ===================== */
function canvasTexture(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 8;
  t.center.set(0.5, 0.5);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const iconCache = {};
function icon(kind) {
  if (iconCache[kind]) return iconCache[kind];
  const t = canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = kind === "panic" ? "#c8372d" : "#2a2e36"; g.fillRect(0, 0, w, h);
    g.strokeStyle = "#e8ecf2"; g.fillStyle = "#e8ecf2";
    g.lineWidth = 14; g.lineCap = "round"; g.lineJoin = "round";
    const cx = w / 2, cy = h / 2 + 14;
    if (kind === "lock" || kind === "unlock") {
      g.strokeRect(cx - 44, cy - 20, 88, 66);
      g.beginPath();
      g.moveTo(cx - 28, cy - 20); g.lineTo(cx - 28, cy - 46);
      if (kind === "lock") { g.arc(cx, cy - 46, 28, Math.PI, 0); g.lineTo(cx + 28, cy - 20); }
      else g.arc(cx, cy - 46, 28, Math.PI, -0.1);
      g.stroke();
    } else if (kind === "trunk") {
      g.beginPath();
      g.moveTo(cx - 70, cy + 30); g.lineTo(cx - 50, cy - 20); g.lineTo(cx + 50, cy - 20); g.lineTo(cx + 70, cy + 30); g.closePath();
      g.stroke();
      g.beginPath(); g.moveTo(cx - 40, cy - 44); g.lineTo(cx + 40, cy - 44); g.stroke();
    } else if (kind === "panic") {
      g.font = "800 64px Arial"; g.textAlign = "center"; g.textBaseline = "middle";
      g.fillText("!", cx, cy - 14);
    } else if (kind === "start") {
      g.beginPath(); g.arc(cx, cy - 10, 44, -1.1, Math.PI + 1.1); g.stroke();
      g.beginPath(); g.moveTo(cx, cy - 64); g.lineTo(cx, cy - 18); g.stroke();
    }
  });
  t.rotation = Math.PI / 2;
  return (iconCache[kind] = t);
}

function button(kind, r, x, y, z) {
  const top = new THREE.MeshPhysicalMaterial({ map: icon(kind), roughness: 0.7 });
  const side = kind === "panic" ? M.red : M.rubber;
  const b = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.05, 0.12, 48), [side, top, side]);
  b.rotation.x = Math.PI / 2;
  b.position.set(x, y, z);
  return b;
}

/* --- blades --- */
// classic edge-cut blade (house keys, older car keys) running along +x
function edgeBlade(len, h = 1.0, cuts = [0.3, 0.14, 0.36, 0.2, 0.33, 0.1]) {
  const top = h / 2, bot = -h / 2;
  const s = new THREE.Shape();
  s.moveTo(0, top);
  s.lineTo(len - 0.5, top);
  s.lineTo(len, 0);
  s.lineTo(len - 0.28, bot);
  let x = len - 0.5;
  const step = (len - 0.9) / cuts.length;
  for (const d of cuts) {
    s.lineTo(x - step * 0.27, bot + d);
    s.lineTo(x - step * 0.42, bot + d);
    s.lineTo(x - step * 0.72, bot);
    x -= step;
  }
  s.lineTo(0, bot);
  s.closePath();
  const depth = 0.16;
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.035, bevelSegments: 4, curveSegments: 12 });
  geo.translate(0, 0, -depth / 2);
  const g = new THREE.Group();
  g.add(new THREE.Mesh(geo, [M.nickel, M.nickelEdge]));
  for (const zs of [1, -1]) for (const [y, w] of [[top * 0.45, 0.09], [-top * 0.15, 0.065]]) {
    const r = new THREE.Mesh(new RoundedBoxGeometry(len - 1.0, w, 0.05, 2, 0.02), M.groove);
    r.position.set((len - 1.0) / 2 + 0.25, y, zs * 0.12);
    g.add(r);
  }
  return g;
}

// laser-cut ("sidewinder") blade for newer cars, along +x
function laserBlade(len) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(len, 0.62, 0.22, 4, 0.08), M.nickel);
  body.position.x = len / 2;
  g.add(body);
  for (const zs of [1, -1]) {
    const pts = [];
    for (let i = 0; i <= 40; i++) {
      const x = 0.35 + (len - 0.7) * (i / 40);
      pts.push(new THREE.Vector3(x, Math.sin(x * 3.1) * 0.12, zs * 0.11));
    }
    const groove = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 80, 0.045, 8, false), M.groove);
    g.add(groove);
  }
  return g;
}

/* ===================== models ===================== */
function houseKey() {
  const s = new THREE.Shape();
  s.moveTo(-0.62, 1.25); s.lineTo(0.62, 1.25);
  s.quadraticCurveTo(1.25, 1.25, 1.25, 0.62); s.lineTo(1.25, 0.56);
  s.quadraticCurveTo(1.32, 0.5, 1.5, 0.5);
  s.lineTo(6.4, 0.5); s.lineTo(6.9, -0.02); s.lineTo(6.62, -0.55);
  let x = 6.38;
  for (const d of [0.3, 0.14, 0.36, 0.2, 0.33, 0.1]) {
    s.lineTo(x - 0.17, -0.55 + d); s.lineTo(x - 0.27, -0.55 + d); s.lineTo(x - 0.46, -0.55);
    x -= 0.64;
  }
  s.lineTo(1.98, -0.55); s.lineTo(1.98, -0.78);
  s.quadraticCurveTo(1.98, -0.84, 1.9, -0.84); s.lineTo(1.62, -0.84);
  s.quadraticCurveTo(1.5, -0.62, 1.25, -0.62);
  s.quadraticCurveTo(1.25, -1.25, 0.62, -1.25); s.lineTo(-0.62, -1.25);
  s.quadraticCurveTo(-1.25, -1.25, -1.25, -0.62); s.lineTo(-1.25, 0.62);
  s.quadraticCurveTo(-1.25, 1.25, -0.62, 1.25);
  const hole = new THREE.Path(); hole.absarc(-0.6, 0, 0.32, 0, Math.PI * 2, true);
  s.holes.push(hole);
  const depth = 0.16;
  const geo = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.045, bevelSegments: 6, curveSegments: 40 });
  geo.translate(0, 0, -depth / 2);
  const stamp = canvasTexture(512, 512, (g, w, h) => {
    g.fillStyle = "#fff"; g.fillRect(0, 0, w, h); g.fillStyle = "#000";
    g.textAlign = "center"; g.textBaseline = "middle"; g.font = "800 58px Arial";
    g.save(); g.translate(w * 0.62, h * 0.5); g.rotate(-Math.PI / 2); g.fillText("MORALES", 0, 0); g.restore();
  });
  stamp.colorSpace = THREE.NoColorSpace;
  stamp.center.set(0, 0); stamp.repeat.set(1 / 2.5, 1 / 2.5); stamp.offset.set(0.5, 0.5);
  const face = M.nickel.clone(); face.bumpMap = stamp; face.bumpScale = 1.2;
  const key = new THREE.Mesh(geo, [face, M.nickelEdge]);
  for (const zs of [1, -1]) for (const [y, w] of [[0.24, 0.1], [-0.08, 0.07]]) {
    const r = new THREE.Mesh(new RoundedBoxGeometry(4.3, w, 0.05, 3, 0.02), M.groove);
    r.position.set(4.2, y, zs * 0.13);
    key.add(r);
  }
  return key; // hole at (-0.6, 0), blade along +x
}

function smartFob() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new RoundedBoxGeometry(2.3, 4.0, 0.9, 8, 0.42), M.shell));
  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.1, 20, 48, Math.PI), M.chrome);
  loop.position.set(0, 1.98, 0); loop.rotation.y = Math.PI / 2;
  g.add(loop);
  g.add(button("lock", 0.4, 0, 0.95, 0.47));
  g.add(button("unlock", 0.4, 0, 0.0, 0.47));
  g.add(button("trunk", 0.4, 0, -0.95, 0.47));
  g.add(button("panic", 0.2, 0, -1.62, 0.43));
  // chrome accent strip on the back
  const strip = new THREE.Mesh(new RoundedBoxGeometry(1.6, 0.18, 0.06, 2, 0.03), M.chrome);
  strip.position.set(0, -1.5, -0.47);
  g.add(strip);
  return g;
}

function flipKey() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new RoundedBoxGeometry(1.55, 3.0, 0.78, 6, 0.32), M.shell));
  g.add(button("lock", 0.3, 0, 0.62, 0.41));
  g.add(button("unlock", 0.3, 0, -0.1, 0.41));
  g.add(button("trunk", 0.3, 0, -0.82, 0.41));
  // flip-out release button on the side
  const rel = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.2, 32), M.chrome);
  rel.rotation.z = Math.PI / 2; rel.position.set(0.8, 0.9, 0);
  g.add(rel);
  // hinge + laser-cut blade folding out of the top
  const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.5, 36), M.chrome);
  hinge.rotation.x = Math.PI / 2; hinge.position.set(0, 1.5, 0);
  g.add(hinge);
  const blade = laserBlade(3.3);
  blade.rotation.z = Math.PI / 2; blade.position.set(0, 1.55, 0);
  g.add(blade);
  return g;
}

function remoteHeadKey() {
  const g = new THREE.Group();
  const head = new THREE.Mesh(new RoundedBoxGeometry(1.8, 2.1, 0.62, 6, 0.3), M.matte);
  g.add(head);
  g.add(button("lock", 0.26, -0.42, 0.42, 0.33));
  g.add(button("unlock", 0.26, 0.42, 0.42, 0.33));
  g.add(button("trunk", 0.26, -0.42, -0.36, 0.33));
  g.add(button("panic", 0.26, 0.42, -0.36, 0.33));
  const collar = new THREE.Mesh(new RoundedBoxGeometry(0.9, 0.3, 0.5, 3, 0.1), M.matte);
  collar.position.set(0, 1.15, 0);
  g.add(collar);
  const blade = edgeBlade(3.4, 0.82, [0.24, 0.12, 0.3, 0.16, 0.26]);
  blade.rotation.z = Math.PI / 2; blade.position.set(0, 1.25, 0);
  g.add(blade);
  return g;
}

function transponderKey() {
  const g = new THREE.Group();
  const s = new THREE.Shape();
  s.absellipse(0, 0, 1.15, 1.0, 0, Math.PI * 2, false);
  const hole = new THREE.Path(); hole.absarc(0, 0.45, 0.24, 0, Math.PI * 2, true);
  s.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.38, bevelEnabled: true, bevelThickness: 0.14, bevelSize: 0.12, bevelSegments: 6, curveSegments: 48 });
  geo.translate(0, 0, -0.19);
  const head = new THREE.Mesh(geo, M.matte);
  g.add(head);
  // small chip badge on the head (the transponder)
  const chip = new THREE.Mesh(new RoundedBoxGeometry(0.5, 0.32, 0.06, 2, 0.04), M.blue);
  chip.position.set(0, -0.35, 0.34);
  g.add(chip);
  const blade = edgeBlade(3.6, 0.82, [0.22, 0.32, 0.12, 0.28, 0.18]);
  blade.rotation.z = Math.PI / 2; blade.position.set(0, 0.95, 0);
  g.add(blade);
  return g;
}

function deadbolt() {
  const g = new THREE.Group();
  const ros = new THREE.Mesh(new THREE.CylinderGeometry(1.35, 1.45, 0.42, 96), M.nickel);
  ros.rotation.x = Math.PI / 2;
  g.add(ros);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.09, 24, 96), M.chrome);
  ring.position.z = 0.24;
  g.add(ring);
  const plug = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.32, 96), M.brass);
  plug.rotation.x = Math.PI / 2; plug.position.z = 0.15;
  g.add(plug);
  // keyway
  const slot = new THREE.Mesh(new RoundedBoxGeometry(0.16, 0.9, 0.2, 2, 0.05), M.dark);
  slot.position.set(0, -0.05, 0.27);
  g.add(slot);
  const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.2, 32), M.dark);
  pin.rotation.x = Math.PI / 2; pin.position.set(0, 0.42, 0.27);
  g.add(pin);
  // a short throw bolt sticking out the side, so it reads as a deadbolt
  const bolt = new THREE.Mesh(new RoundedBoxGeometry(1.0, 0.55, 0.55, 3, 0.08), M.chrome);
  bolt.position.set(1.7, 0, -0.3);
  g.add(bolt);
  g.rotation.y = -0.35;
  return g;
}

function padlock() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new RoundedBoxGeometry(2.6, 2.3, 1.0, 6, 0.28), M.brass);
  g.add(body);
  // shackle: a U-shaped steel bar
  const R = 0.8, legs = 0.9;
  const path = new THREE.CurvePath();
  path.add(new THREE.LineCurve3(new THREE.Vector3(-R, 0.9, 0), new THREE.Vector3(-R, 0.9 + legs, 0)));
  const arc = new THREE.EllipseCurve(0, 0.9 + legs, R, R, Math.PI, 0, true);
  const arcPts = arc.getPoints(40).map(p => new THREE.Vector3(p.x, p.y, 0));
  path.add(new THREE.CatmullRomCurve3(arcPts));
  path.add(new THREE.LineCurve3(new THREE.Vector3(R, 0.9 + legs, 0), new THREE.Vector3(R, 1.25, 0)));
  const shackle = new THREE.Mesh(new THREE.TubeGeometry(path, 160, 0.2, 24, false), M.chrome);
  g.add(shackle);
  // keyhole plate
  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.08, 64), M.nickel);
  face.rotation.x = Math.PI / 2; face.position.set(0, -0.3, 0.5);
  g.add(face);
  const slot = new THREE.Mesh(new RoundedBoxGeometry(0.12, 0.5, 0.1, 2, 0.04), M.dark);
  slot.position.set(0, -0.3, 0.53);
  g.add(slot);
  return g;
}

function keyRing() {
  const rig = new THREE.Group();
  const ring = new THREE.Group();
  for (const off of [-0.05, 0.05]) {
    const t = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.06, 24, 180), M.chrome);
    t.position.z = off;
    ring.add(t);
  }
  ring.rotation.y = 0.75;
  ring.position.set(0, 2.6, 0);
  rig.add(ring);
  const ringPoint = (deg) => {
    const t = THREE.MathUtils.degToRad(deg);
    return new THREE.Vector3(Math.cos(t) * 1.6, Math.sin(t) * 1.6, 0).applyEuler(ring.rotation).add(ring.position);
  };
  const pA = new THREE.Group(), pB = new THREE.Group();
  pA.position.copy(ringPoint(-168));
  pB.position.copy(ringPoint(-12));
  rig.add(pA, pB);
  const key = houseKey();
  key.rotation.z = -Math.PI / 2; key.position.set(0, -0.6, 0);
  const kh = new THREE.Group(); kh.add(key); kh.rotation.set(0, 0.5, -0.22);
  pA.add(kh);
  const fob = smartFob();
  fob.scale.setScalar(1.3); fob.position.y = -2.05 * 1.3;
  const fh = new THREE.Group(); fh.add(fob); fh.rotation.set(0, -0.35, 0.2);
  pB.add(fh);
  rig.userData.pivots = [pA, pB];
  return rig;
}

const BUILDERS = {
  keyring: keyRing,
  smartfob: smartFob,
  flipkey: flipKey,
  remotekey: remoteHeadKey,
  transponder: transponderKey,
  housekey: () => { const k = houseKey(); k.rotation.z = Math.PI / 2; k.position.y = -3; return k; },
  deadbolt,
  padlock,
};

/* ===================== studio lighting ===================== */
function studioEnvironment(renderer) {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x3a3f4a);
  const panel = (w, h, color, k, pos) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(...pos); m.lookAt(0, 0, 0); env.add(m);
  };
  panel(10, 6, 0xfff4e6, 4.0, [-3, 6, 6]);
  panel(9, 5, 0xffffff, 0.7, [2, 0, 9]);
  panel(2, 10, 0xdfe8ff, 4.0, [7, 1, 1]);
  panel(8, 1.2, 0xffffff, 1.4, [0, -4, 5]);
  panel(3, 3, 0xf5a922, 1.4, [-6, 0, -4]);
  panel(3, 3, 0x2d2e9f, 1.6, [6, -2, -5]);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.02).texture;
  pmrem.dispose();
  return tex;
}

/* ===================== one renderer, many views ===================== */
function start() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canvas = document.createElement("canvas");
  canvas.className = "gl-layer";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.setClearColor(0x000000, 0);
  renderer.setScissorTest(true);

  makeMaterials();
  const envTex = studioEnvironment(renderer);

  const views = els.map((el) => {
    const kind = el.dataset.scene;
    const scene = new THREE.Scene();
    scene.environment = envTex;
    const obj = (BUILDERS[kind] || smartFob)();
    const holder = new THREE.Group();
    holder.add(obj);
    scene.add(holder);
    // centre the model and measure it so the camera can frame it
    const box = new THREE.Box3().setFromObject(holder);
    const centre = box.getCenter(new THREE.Vector3());
    obj.position.sub(centre);
    const size = box.getSize(new THREE.Vector3());
    const camera = new THREE.PerspectiveCamera(kind === "keyring" ? 28 : 26, 1, 0.1, 200);
    const tilt = Number(el.dataset.tilt || 0);
    holder.rotation.z = tilt;
    const v = { el, kind, scene, camera, holder, obj, size, spin: 0, vel: 0, hover: 0, seed: Math.random() * 10, visible: false };
    el.classList.add("is-live");
    // drag to spin, hover to speed up
    let dragging = false, lastX = 0;
    el.addEventListener("pointerenter", () => { v.hover = 1; });
    el.addEventListener("pointerleave", () => { v.hover = 0; });
    el.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; });
    window.addEventListener("pointerup", () => { dragging = false; });
    window.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      v.vel += (e.clientX - lastX) * 0.006; lastX = e.clientX;
    }, { passive: true });
    new IntersectionObserver(([en]) => { v.visible = en.isIntersecting; if (v.visible) kick(); }, { rootMargin: "100px" }).observe(el);
    return v;
  });

  function frame(v, aspect) {
    const pad = v.kind === "keyring" ? 1.15 : 1.35;
    const fitH = Math.max(v.size.y, v.size.x * 0.6) * pad;
    const fitW = Math.max(v.size.x, v.size.y * 0.55) * pad;
    const half = Math.tan(THREE.MathUtils.degToRad(v.camera.fov) / 2);
    v.camera.aspect = aspect;
    v.camera.position.set(0, 0, Math.max(fitH / 2 / half, fitW / 2 / (half * aspect)) + v.size.z);
    v.camera.updateProjectionMatrix();
  }

  let px = 0, py = 0;
  window.addEventListener("pointermove", (e) => {
    px = e.clientX / window.innerWidth - 0.5;
    py = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  function pose(v, t, dt) {
    v.spin += v.vel; v.vel *= 0.93;
    if (v.kind === "keyring") {
      v.holder.rotation.y = Math.sin(t * 0.35) * 0.35 + px * 0.6 + v.spin;
      v.holder.rotation.x = py * 0.18;
      const [a, b] = v.obj.userData.pivots;
      a.rotation.z = Math.sin(t * 1.1) * 0.06 + v.vel * 2;
      a.rotation.x = Math.sin(t * 0.8 + 1) * 0.05;
      b.rotation.z = Math.sin(t * 1.0 + 2) * 0.05 + v.vel * 2;
      b.rotation.x = Math.sin(t * 0.7) * 0.05;
      v.holder.position.y = Math.sin(t * 0.9) * 0.08;
    } else {
      // turntable: slow by default, faster while hovered
      v.base = (v.base || 0) + dt * (0.45 + v.hover * 1.4);
      v.holder.rotation.y = Math.sin(v.base * 0.9 + v.seed) * 0.7 + v.spin;
      v.holder.rotation.x = Math.sin(t * 0.6 + v.seed) * 0.08;
      v.holder.position.y = Math.sin(t * 1.1 + v.seed) * 0.06 * v.size.y;
    }
  }

  let raf = 0, last = performance.now(), running = false;
  const clock = new THREE.Clock();

  function render() {
    const W = window.innerWidth, H = window.innerHeight;
    const c = renderer.domElement;
    if (c.width !== Math.floor(W * renderer.getPixelRatio()) || c.height !== Math.floor(H * renderer.getPixelRatio())) {
      renderer.setSize(W, H, false);
    }
    renderer.setScissor(0, 0, W, H);
    renderer.clear();
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    const t = clock.getElapsedTime();
    let any = false;
    for (const v of views) {
      if (!v.visible) continue;
      const r = v.el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > H || r.width < 2 || r.height < 2) continue;
      any = true;
      if (v.w !== r.width || v.h !== r.height) { frame(v, r.width / r.height); v.w = r.width; v.h = r.height; }
      if (!reduce) pose(v, t, dt);
      const bottom = H - r.bottom;
      renderer.setViewport(r.left, bottom, r.width, r.height);
      renderer.setScissor(r.left, bottom, r.width, r.height);
      renderer.render(v.scene, v.camera);
    }
    return any;
  }

  function loop() {
    const any = render();
    if (any && !reduce) raf = requestAnimationFrame(loop);
    else running = false;
  }
  function kick() {
    if (reduce) { render(); return; }
    if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
  }
  window.addEventListener("scroll", () => (reduce ? render() : kick()), { passive: true });
  window.addEventListener("resize", () => (reduce ? render() : kick()));
  if (reduce) views.forEach((v) => pose(v, 1.2, 0));
  kick();
}

if (els.length) {
  try { start(); } catch (e) { console.warn("3D unavailable", e); }
}
