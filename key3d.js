// A 3D brass key for the hero, built with three.js.
// Turns slowly, tilts toward the pointer, pauses when off screen,
// and stays still for people who turn off motion.
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const box = document.getElementById("key3d");
if (box) {
  try { start(box); } catch (e) { /* no WebGL: the flat SVG key stays */ }
}

function keyShape() {
  const R = 1.55, top = 0.45, bot = -0.95;
  const a1 = Math.asin(top / R), a2 = Math.asin(-bot / R);
  const s = new THREE.Shape();
  s.moveTo(R * Math.cos(a1), top);
  s.lineTo(6.1, top);             // top edge of the blade
  s.lineTo(6.6, top - 0.4);       // tip
  s.lineTo(6.6, bot + 0.2);
  s.lineTo(6.4, bot);
  // the cuts (bitting) that make each key unique
  const cuts = [0.5, 0.2, 0.6, 0.35, 0.55, 0.25, 0.45];
  let x = 6.4;
  for (const d of cuts) {
    s.lineTo(x - 0.16, bot + d);
    s.lineTo(x - 0.34, bot + d);
    s.lineTo(x - 0.5, bot);
    x -= 0.56;
  }
  s.lineTo(R * Math.cos(a2), bot);
  s.absarc(0, 0, R, -a2, a1, true); // the round bow
  const hole = new THREE.Path();
  hole.absarc(-0.25, 0, 0.55, 0, Math.PI * 2, false);
  s.holes.push(hole);
  return s;
}

function start(box) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  box.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 15);

  const geo = new THREE.ExtrudeGeometry(keyShape(), {
    depth: 0.32, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.07,
    bevelSegments: 4, curveSegments: 48
  });
  geo.computeBoundingBox();
  const mid = geo.boundingBox.getCenter(new THREE.Vector3());
  geo.center();

  const brass = new THREE.MeshStandardMaterial({ color: 0xffc20e, metalness: 1, roughness: 0.28 });
  const key = new THREE.Mesh(geo, brass);

  // a thin groove along the blade, like a real key blank
  const groove = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.1, 0.5),
    new THREE.MeshStandardMaterial({ color: 0xb38400, metalness: 1, roughness: 0.45 })
  );
  groove.position.set(4.0 - mid.x, -0.05 - mid.y, 0);
  key.add(groove);

  const holder = new THREE.Group();
  holder.add(key);
  holder.rotation.z = 0.42;
  scene.add(holder);

  const light = new THREE.DirectionalLight(0xffffff, 1.6);
  light.position.set(4, 6, 8);
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x8fa0ff, 0.35));

  function resize() {
    const c = renderer.domElement;
    const w = c.clientWidth, h = c.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the whole key in view on narrow screens
    camera.position.z = camera.aspect < 1.1 ? 15 / Math.max(camera.aspect, 0.55) * 0.95 : 12.5;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(box);
  resize();

  // pointer tilt
  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener("pointermove", (e) => {
    const r = box.getBoundingClientRect();
    tx = ((e.clientX - (r.left + r.width / 2)) / window.innerWidth) * 1.2;
    ty = ((e.clientY - (r.top + r.height / 2)) / window.innerHeight) * 0.8;
  }, { passive: true });

  // drag to spin
  let spin = 0, vel = 0, dragging = false, lastX = 0;
  box.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; box.style.cursor = "grabbing"; });
  window.addEventListener("pointerup", () => { dragging = false; box.style.cursor = ""; });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    vel = (e.clientX - lastX) * 0.01; lastX = e.clientX;
  }, { passive: true });

  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !reduce) loop(); })
    .observe(box);

  const clock = new THREE.Clock();
  let raf = 0;
  function frame() {
    const t = clock.getElapsedTime();
    cx += (tx - cx) * 0.06;
    cy += (ty - cy) * 0.06;
    spin += vel; vel *= 0.94;
    key.rotation.y = Math.sin(t * 0.6) * 0.55 + spin + cx;
    key.rotation.x = Math.sin(t * 0.4) * 0.12 + cy;
    holder.position.y = Math.sin(t * 0.9) * 0.12;
    renderer.render(scene, camera);
  }
  function loop() {
    cancelAnimationFrame(raf);
    const tick = () => { if (!visible) return; frame(); raf = requestAnimationFrame(tick); };
    tick();
  }

  if (reduce) {
    key.rotation.y = -0.35;
    renderer.render(scene, camera);
    new ResizeObserver(() => renderer.render(scene, camera)).observe(box);
  } else {
    loop();
  }
  box.classList.add("is-live");
}
