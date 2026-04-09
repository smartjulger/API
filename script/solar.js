import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// Speelbare schaal — zon duidelijk groter, navigeerbare afstanden
const SUN_RADIUS   = 15;
const EARTH_RADIUS = 2;
const EARTH_DIST   = 120;
const MOON_RADIUS  = 0.5;
const MOON_DIST    = 8;


// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000010);

// Camera — ver genoeg om beide te zien, near klein voor details
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.001,
  10000
);
camera.position.set(EARTH_DIST + 5, 3, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// FlyControls — vrij bewegen: WASD + muis ingedrukt om te kijken
// https://threejs.org/docs/#FlyControls
const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 15
controls.rollSpeed = Math.PI / 12;
controls.dragToLook = true;


let prevTime = performance.now();

renderer.domElement.addEventListener('contextmenu', e => e.preventDefault());

// Sterren — verspreid over groot gebied
const starGeo = new THREE.BufferGeometry();
const starCount = 3000;
const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
  starPositions[i] = (Math.random() - 0.5) * 9000;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
scene.add(new THREE.Points(starGeo, starMat));

// Zon (radius ~696.340 km op schaal)
const sunGeo = new THREE.SphereGeometry(SUN_RADIUS, 32, 16);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffdd00 });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Aarde (radius ~6.371 km op schaal, afstand ~149.6 miljoen km)
const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 32, 16);
const earthMat = new THREE.MeshBasicMaterial({ color: 0x2244ff });
const earth = new THREE.Mesh(earthGeo, earthMat);
earth.position.x = EARTH_DIST;
scene.add(earth);

// Maan (radius ~1.737 km op schaal, afstand ~384.400 km van aarde)
const moonGeo = new THREE.SphereGeometry(MOON_RADIUS, 32, 16);
const moonMat = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const moon = new THREE.Mesh(moonGeo, moonMat);
moon.position.x = EARTH_DIST + MOON_DIST;
scene.add(moon);

// Composer
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  2,
  1,
  0.6
);
composer.addPass(bloomPass);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

// Animatielus
function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const delta = (now - prevTime) / 1000;
  prevTime = now;
  controls.update(delta);
  composer.render();
  sun.rotation.y += 0.003;
  sun.rotation.x +=0.0005
}

animate();
