// Hero 3D scene: a nickel house key and a car-key fob on a steel key ring,
// lit like a studio product shot. Built entirely in three.js (no downloads).
// It sways gently, follows the pointer, pauses off screen,
// and holds still for people who turn off motion.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

const box = document.getElementById("key3d");
if (box) {
  try { start(box); } catch (e) { console.warn("3D scene unavailable", e); }
}

/* ---------- Studio lighting: soft boxes rendered into an environment map ---------- */
function studioEnvironment(renderer) {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x3a3f4a);
  const panel = (w, h, color, intensity, pos) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide })
    );
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  panel(10, 6, 0xfff4e6, 4.0, [-3, 6, 6]);  // big warm key light, top left front
  panel(9, 5, 0xffffff, 0.7, [2, 0, 9]);    // soft front fill, so faces catch light
  panel(2, 10, 0xdfe8ff, 4.0, [7, 1, 1]);  // cool strip rim light, right
  panel(8, 1.2, 0xffffff, 1.4, [0, -4, 5]);  // low fill
  panel(3, 3, 0xffc20e, 1.4, [-6, 0, -4]);   // warm yellow bounce from the background
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.02).texture;
  pmrem.dispose();
  return tex;
}

/* ---------- Engraving and button icons drawn on canvas ---------- */
function canvasTexture(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const g = c.getContext("2d");
  draw(g, w, h);
  const t = new THREE.CanvasTexture(c);
  t.anisotropy = 8;
  t.center.set(0.5, 0.5);
  return t;
}

/* ---------- House key ---------- */
function keyShape() {
  const s = new THREE.Shape();
  // bow (the part you hold): rounded square
  s.moveTo(-0.62, 1.25);
  s.lineTo(0.62, 1.25);
  s.quadraticCurveTo(1.25, 1.25, 1.25, 0.62);
  s.lineTo(1.25, 0.56);
  s.quadraticCurveTo(1.32, 0.5, 1.5, 0.5);
  // blade top edge and tip
  s.lineTo(6.4, 0.5);
  s.lineTo(6.9, -0.02);
  s.lineTo(6.62, -0.55);
  // bitting: the cuts that make the key unique
  const cuts = [0.3, 0.14, 0.36, 0.2, 0.33, 0.1];
  let x = 6.38;
  for (const d of cuts) {
    s.lineTo(x - 0.17, -0.55 + d);
    s.lineTo(x - 0.27, -0.55 + d);
    s.lineTo(x - 0.46, -0.55);
    x -= 0.64;
  }
  s.lineTo(1.98, -0.55);
  // shoulder stop
  s.lineTo(1.98, -0.78);
  s.quadraticCurveTo(1.98, -0.84, 1.9, -0.84);
  s.lineTo(1.62, -0.84);
  s.quadraticCurveTo(1.5, -0.62, 1.25, -0.62);
  s.quadraticCurveTo(1.25, -1.25, 0.62, -1.25);
  s.lineTo(-0.62, -1.25);
  s.quadraticCurveTo(-1.25, -1.25, -1.25, -0.62);
  s.lineTo(-1.25, 0.62);
  s.quadraticCurveTo(-1.25, 1.25, -0.62, 1.25);
  const hole = new THREE.Path();
  hole.absarc(-0.6, 0, 0.32, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
}

function makeKey() {
  const depth = 0.16, bevel = 0.05;
  const geo = new THREE.ExtrudeGeometry(keyShape(), {
    depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: 0.045,
    bevelSegments: 6, curveSegments: 40
  });
  geo.translate(0, 0, -depth / 2);

  // "MORALES" stamped into the bow
  const stamp = canvasTexture(512, 512, (g, w, h) => {
    g.fillStyle = "#fff"; g.fillRect(0, 0, w, h);
    g.fillStyle = "#000";
    g.textAlign = "center"; g.textBaseline = "middle";
    g.font = "800 58px Arial, sans-serif";
    g.save(); g.translate(w * 0.62, h * 0.5); g.rotate(-Math.PI / 2);
    g.fillText("MORALES", 0, 0);
    g.restore();
  });
  stamp.center.set(0, 0);
  stamp.repeat.set(1 / 2.5, 1 / 2.5);
  stamp.offset.set(0.5, 0.5);

  const brassFace = new THREE.MeshPhysicalMaterial({
    color: 0xd5dae0, metalness: 1, roughness: 0.24,
    anisotropy: 0.55, bumpMap: stamp, bumpScale: 1.2
  });
  const brassEdge = new THREE.MeshPhysicalMaterial({ color: 0xdfe3e8, metalness: 1, roughness: 0.16 });
  const key = new THREE.Mesh(geo, [brassFace, brassEdge]);

  // milled keyway ridges along both faces of the blade
  const ridgeMat = new THREE.MeshPhysicalMaterial({ color: 0xc3c9d0, metalness: 1, roughness: 0.3, anisotropy: 0.6 });
  for (const zSign of [1, -1]) {
    for (const [y, w] of [[0.24, 0.1], [-0.08, 0.07]]) {
      const r = new THREE.Mesh(new RoundedBoxGeometry(4.3, w, 0.05, 3, 0.02), ridgeMat);
      r.position.set(4.2, y, zSign * (depth / 2 + bevel));
      key.add(r);
    }
  }
  return key;
}

/* ---------- Car key fob ---------- */
function iconTexture(kind) {
  return canvasTexture(256, 256, (g, w, h) => {
    g.fillStyle = "#2a2e36"; g.fillRect(0, 0, w, h);
    g.strokeStyle = "#e8ecf2";
    g.lineWidth = 14; g.lineCap = "round"; g.lineJoin = "round";
    const cx = w / 2, cy = h / 2 + 14;
    if (kind === "lock" || kind === "unlock") {
      g.strokeRect(cx - 44, cy - 20, 88, 66);
      g.beginPath();
      g.moveTo(cx - 28, cy - 20); g.lineTo(cx - 28, cy - 46);
      if (kind === "lock") { g.arc(cx, cy - 46, 28, Math.PI, 0); g.lineTo(cx + 28, cy - 20); }
      else { g.arc(cx, cy - 46, 28, Math.PI, -0.1); }
      g.stroke();
    } else {
      g.beginPath();
      g.moveTo(cx - 70, cy + 30); g.lineTo(cx - 50, cy - 20); g.lineTo(cx + 50, cy - 20); g.lineTo(cx + 70, cy + 30); g.closePath();
      g.stroke();
      g.beginPath(); g.moveTo(cx - 40, cy - 44); g.lineTo(cx + 40, cy - 44); g.stroke();
    }
  });
}

function makeFob() {
  const fob = new THREE.Group();
  const shell = new THREE.MeshPhysicalMaterial({
    color: 0x14161b, metalness: 0.1, roughness: 0.42, clearcoat: 1, clearcoatRoughness: 0.12
  });
  const chrome = new THREE.MeshPhysicalMaterial({ color: 0xe9edf2, metalness: 1, roughness: 0.08 });
  const rubber = new THREE.MeshPhysicalMaterial({ color: 0x2a2e36, roughness: 0.75 });

  fob.add(new THREE.Mesh(new RoundedBoxGeometry(2.3, 4.0, 0.9, 8, 0.42), shell));

  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.1, 20, 48, Math.PI), chrome);
  loop.position.set(0, 1.98, 0);
  loop.rotation.y = Math.PI / 2;
  fob.add(loop);

  for (const [kind, y] of [["lock", 0.95], ["unlock", 0.0], ["trunk", -0.95]]) {
    const top = new THREE.MeshPhysicalMaterial({ map: iconTexture(kind), roughness: 0.7 });
    top.map.colorSpace = THREE.SRGBColorSpace;
    top.map.rotation = Math.PI / 2;
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.42, 0.12, 48), [rubber, top, rubber]);
    b.rotation.x = Math.PI / 2;
    b.position.set(0, y, 0.47);
    fob.add(b);
  }
  const panic = new THREE.Mesh(
    new THREE.CylinderGeometry(0.2, 0.22, 0.12, 40),
    new THREE.MeshPhysicalMaterial({ color: 0xc8372d, roughness: 0.55, clearcoat: 0.6 })
  );
  panic.rotation.x = Math.PI / 2;
  panic.position.set(0, -1.62, 0.43);
  fob.add(panic);
  return fob;
}

/* ---------- Split key ring ---------- */
function makeRing() {
  const steel = new THREE.MeshPhysicalMaterial({ color: 0xcfd5dc, metalness: 1, roughness: 0.18 });
  const ring = new THREE.Group();
  for (const off of [-0.05, 0.05]) {
    const t = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.06, 24, 180), steel);
    t.position.z = off;
    ring.add(t);
  }
  return ring;
}

function start(box) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  box.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.environment = studioEnvironment(renderer);

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  camera.position.set(0, 0, 18);

  const rig = new THREE.Group();
  scene.add(rig);

  const ring = makeRing();
  ring.rotation.y = 0.75; // turned partly toward the viewer
  ring.position.set(0, 2.6, 0);
  rig.add(ring);

  const ringPoint = (deg) => {
    const t = THREE.MathUtils.degToRad(deg);
    return new THREE.Vector3(Math.cos(t) * 1.6, Math.sin(t) * 1.6, 0)
      .applyEuler(ring.rotation).add(ring.position);
  };
  const pivotA = new THREE.Group(); // key hangs here
  const pivotB = new THREE.Group(); // fob hangs here
  pivotA.position.copy(ringPoint(-168));
  pivotB.position.copy(ringPoint(-12));
  rig.add(pivotA, pivotB);

  const key = makeKey();
  key.rotation.z = -Math.PI / 2;  // blade points down, bow up
  key.position.set(0, -0.6, 0);   // puts the key's hole right on the ring
  const keyHolder = new THREE.Group();
  keyHolder.add(key);
  keyHolder.rotation.set(0, 0.5, -0.22);
  pivotA.add(keyHolder);

  const fob = makeFob();
  fob.position.set(0, -2.05, 0);
  fob.scale.setScalar(1.3);
  fob.position.y = -2.05 * 1.3;
  const fobHolder = new THREE.Group();
  fobHolder.add(fob);
  fobHolder.rotation.set(0, -0.35, 0.2);
  pivotB.add(fobHolder);

  function resize() {
    const c = renderer.domElement;
    const w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const fitH = 11, fitW = 9.5; // keep the whole key ring in frame
    const half = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    camera.position.z = Math.max(fitH / 2 / half, fitW / 2 / (half * camera.aspect));
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(box);
  resize();

  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener("pointermove", (e) => {
    tx = e.clientX / window.innerWidth - 0.5;
    ty = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  let spin = 0, vel = 0, dragging = false, lastX = 0;
  box.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; box.style.cursor = "grabbing"; });
  window.addEventListener("pointerup", () => { dragging = false; box.style.cursor = ""; });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    vel += (e.clientX - lastX) * 0.004; lastX = e.clientX;
  }, { passive: true });

  function pose(t) {
    cx += (tx - cx) * 0.05;
    cy += (ty - cy) * 0.05;
    spin += vel; vel *= 0.92;
    rig.rotation.y = Math.sin(t * 0.35) * 0.35 + cx * 0.6 + spin;
    rig.rotation.x = cy * 0.18;
    pivotA.rotation.z = Math.sin(t * 1.1) * 0.06 + vel * 2;
    pivotA.rotation.x = Math.sin(t * 0.8 + 1) * 0.05;
    pivotB.rotation.z = Math.sin(t * 1.0 + 2) * 0.05 + vel * 2;
    pivotB.rotation.x = Math.sin(t * 0.7) * 0.05;
    rig.position.y = 0.5 + Math.sin(t * 0.9) * 0.08;
  }

  let visible = true, raf = 0;
  const clock = new THREE.Clock();
  function loop() {
    cancelAnimationFrame(raf);
    const tick = () => {
      if (!visible) return;
      pose(clock.getElapsedTime());
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();
  }
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !reduce) loop(); }).observe(box);

  if (reduce) {
    pose(1.2);
    renderer.render(scene, camera);
    new ResizeObserver(() => renderer.render(scene, camera)).observe(box);
  } else {
    loop();
  }
  box.classList.add("is-live");
}
