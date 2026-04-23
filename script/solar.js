import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import getStarfield from './getStarfield.js';
import { getFresnelMat } from './getFresnelMat.js';

const SUN_RADIUS   = 15;
const EARTH_RADIUS = 4;
const EARTH_DIST   = 120;
const MOON_RADIUS  = 1;
const MOON_DIST    = 16;

const bodies = [
  { id: 'sun',   getPosition: () => sun.position.clone(),        camOffset: SUN_RADIUS * 3 },
  { id: 'earth', getPosition: () => earthGroup.position.clone(), camOffset: EARTH_RADIUS * 6 },
  { id: 'moon',  getPosition: () => moon.position.clone(),       camOffset: MOON_RADIUS * 10 },
];


// Scene
const scene = new THREE.Scene();

// Camera — zon-kant van de aarde, iets opzij zodat beide zichtbaar zijn
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 10000);
camera.position.set(EARTH_DIST - 10, 5, 20);
camera.lookAt(EARTH_DIST, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// FlyControls — vrij bewegen: WASD + muis ingedrukt om te kijken
const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 15;
controls.rollSpeed = Math.PI / 12;
controls.dragToLook = true;

// Sterren imported
const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// Licht vanuit de zon 
const sunLight = new THREE.PointLight(0xffffff, 2.0, 0, 0);
scene.add(sunLight);

// Omgevingslicht zodat de nacht-kant niet helemaal zwart is
scene.add(new THREE.AmbientLight(0x223355, 1));

// --- ZON ---
const loader = new THREE.TextureLoader();
const sunGeo = new THREE.SphereGeometry(SUN_RADIUS, 32, 16);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffffaa });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// --- AARDE ---
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
earthGroup.position.x = EARTH_DIST;
scene.add(earthGroup);

const detail   = 24;
const earthGeo = new THREE.IcosahedronGeometry(EARTH_RADIUS, detail);
const earthMat = new THREE.MeshPhongMaterial({
  map: loader.load('/textures/earthmap1k.jpg'),
});
const earthMesh = new THREE.Mesh(earthGeo, earthMat);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load('/textures/earthlights1k.jpg'),
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -1,
  polygonOffsetUnits: -4,
});
const lightsMesh = new THREE.Mesh(earthGeo, lightsMat);
lightsMesh.scale.setScalar(1.001);
earthGroup.add(lightsMesh);

// Fresnel atmosfeer glow
const fresnelMat = getFresnelMat();
const glowMesh   = new THREE.Mesh(earthGeo, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

// --- MAAN ---
const moonGeo = new THREE.IcosahedronGeometry(MOON_RADIUS, 12);
const moonMat = new THREE.MeshPhongMaterial({ map: loader.load('/textures/moonmap1k.jpg') });
const moon    = new THREE.Mesh(moonGeo, moonMat);
scene.add(moon);

// Bloom voor zongloed
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, 0.4, 0.85
));

// Camera fly-to
let flyTarget    = null;
let trackedBody  = null;

function flyTo(body) {
  trackedBody = null;
  flyTarget = {
    body,
    startPos: camera.position.clone(),
    duration: 2.0,
    elapsed: 0,
  };
  controls.enabled = false;
}

// Animatie
let moonAngle = 0;
let prevTime  = performance.now();


function animate() {
  requestAnimationFrame(animate);
  const now   = performance.now();
  const delta = (now - prevTime) / 1000;
  prevTime    = now;

  // gemaakt door owen 
  if (flyTarget) {
    flyTarget.elapsed += delta;
    const t = Math.min(flyTarget.elapsed / flyTarget.duration, 1);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const target = flyTarget.body.getPosition();
    const dest = target.clone().add(new THREE.Vector3(0, flyTarget.body.camOffset * 0.3, flyTarget.body.camOffset));
    camera.position.lerpVectors(flyTarget.startPos, dest, ease);
    camera.lookAt(target);

    if (t >= 1) {
      trackedBody = flyTarget.body;
      flyTarget = null;
    }
  }

  if (trackedBody) {
    const target = trackedBody.getPosition();
    const dest = target.clone().add(new THREE.Vector3(0, trackedBody.camOffset * 0.3, trackedBody.camOffset));
    camera.position.copy(dest);
    camera.lookAt(target);
  }

  controls.update(delta);

  // Aarde draait om eigen as
  lightsMesh.rotation.y += 0.002;
  earthMesh.rotation.y   = lightsMesh.rotation.y;
  glowMesh.rotation.y    = lightsMesh.rotation.y;

  // earthAngle += 0.005;
  // earth.position.x = EARTH_DIST + Math.cos(sunAngle) * SUN_DIST;
  // earth.position.z = Math.sin(earthAngle) * SUN_DIST;
  // earth.rotation.y += 0.001;


  // Maan omloopbaan rond aarde
  moonAngle += 0.01;
  moon.position.x = earthGroup.position.x + Math.cos(moonAngle) * MOON_DIST;
  moon.position.z = earthGroup.position.z + Math.sin(moonAngle) * MOON_DIST;
  moon.position.y = earthGroup.position.y;

  // rotation planeten
  sun.rotation.y += 0.003;
  moon.rotation.y += 0.008;

  stars.rotation.y -= 0.0002;

  composer.render();
}

animate();

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && trackedBody) {
    trackedBody = null;
    controls.enabled = true;
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

document.querySelectorAll('#planet-nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    const id   = btn.dataset.planet;
    const body = bodies.find(b => b.id === id);
    if (body) flyTo(body);
  });
});