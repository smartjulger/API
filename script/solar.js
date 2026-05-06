// Three.js core + postprocessing
import * as THREE from 'three';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { gsap } from 'gsap';
import getStarfield from './getStarfield.js';
import { getFresnelMat } from './getFresnelMat.js';


const SUN_RADIUS     = 15;
const EARTH_RADIUS   = 4;
const EARTH_DIST     = 120;
const MOON_RADIUS    = .8;
const MOON_DIST      = 16;
const MERCURY_RADIUS = 1.5;
const MERCURY_DIST   = 55;
const VENUS_RADIUS   = 3.5;
const VENUS_DIST     = 90;
const MARS_RADIUS    = 2;
const MARS_DIST      = 190;
const JUPITER_RADIUS = 9;
const JUPITER_DIST   = 550;
const SATURN_RADIUS  = 7.5;
const SATURN_DIST    = 950;
const URANUS_RADIUS  = 5.5;
const URANUS_DIST    = 1500;
const NEPTUNE_RADIUS = 5;
const NEPTUNE_DIST   = 2200;
const PLUTO_RADIUS   = 1;
const PLUTO_DIST     = 2800;

// --- SCENE SETUP ---
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 20000);
camera.position.set(EARTH_DIST - 10, 5, 20);
camera.lookAt(EARTH_DIST, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 30;
controls.rollSpeed = Math.PI / 12;
controls.dragToLook = true;

// --- STERRENVELD ---
const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// --- VERLICHTING ---
const sunLight = new THREE.PointLight(0xffffff, 2.0, 0, 0);
scene.add(sunLight);
scene.add(new THREE.AmbientLight(0x223355, 1));

const loader = new THREE.TextureLoader();

// --- ZON ---
const sunGeo = new THREE.SphereGeometry(SUN_RADIUS, 32, 16);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffffaa });
const sun    = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// --- MERCURIUS ---
const mercuryGroup = new THREE.Group();
mercuryGroup.rotation.z = -0.03 * Math.PI / 180;
mercuryGroup.position.set(MERCURY_DIST, 0, 0);
scene.add(mercuryGroup);
const mercuryGeo  = new THREE.IcosahedronGeometry(MERCURY_RADIUS, 12);
const mercuryMat  = new THREE.MeshPhongMaterial({ map: loader.load('/textures/mercurymap.jpg') });
const mercuryMesh = new THREE.Mesh(mercuryGeo, mercuryMat);
mercuryGroup.add(mercuryMesh);

// --- VENUS ---
const venusGroup = new THREE.Group();
venusGroup.rotation.z = -177.4 * Math.PI / 180;
venusGroup.position.set(VENUS_DIST, 0, 0);
scene.add(venusGroup);
const venusGeo  = new THREE.IcosahedronGeometry(VENUS_RADIUS, 12);
const venusMat  = new THREE.MeshPhongMaterial({ map: loader.load('/textures/venusmap.jpg') });
const venusMesh = new THREE.Mesh(venusGeo, venusMat);
venusGroup.add(venusMesh);

// --- AARDE ---
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
earthGroup.position.set(EARTH_DIST, 0, 0);
scene.add(earthGroup);

const detail   = 24;
const earthGeo = new THREE.IcosahedronGeometry(EARTH_RADIUS, detail);

const earthMat  = new THREE.MeshPhongMaterial({ map: loader.load('/textures/earthmap1k.jpg') });
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

const fresnelMat = getFresnelMat();
const glowMesh   = new THREE.Mesh(earthGeo, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

// --- MAAN ---
const moonGeo = new THREE.IcosahedronGeometry(MOON_RADIUS, 12);
const moonMat = new THREE.MeshPhongMaterial({ map: loader.load('/textures/moonmap1k.jpg') });
const moon    = new THREE.Mesh(moonGeo, moonMat);
scene.add(moon);

// --- MARS ---
const marsGroup = new THREE.Group();
marsGroup.rotation.z = -25.2 * Math.PI / 180;
marsGroup.position.set(MARS_DIST, 0, 0);
scene.add(marsGroup);
const marsGeo  = new THREE.IcosahedronGeometry(MARS_RADIUS, 12);
const marsMat  = new THREE.MeshPhongMaterial({ map: loader.load('/textures/mars_1k_color.jpg') });
const marsMesh = new THREE.Mesh(marsGeo, marsMat);
marsGroup.add(marsMesh);

// --- JUPITER ---
const jupiterGroup = new THREE.Group();
jupiterGroup.rotation.z = -3.1 * Math.PI / 180;
jupiterGroup.position.set(JUPITER_DIST, 0, 0);
scene.add(jupiterGroup);
const jupiterGeo  = new THREE.IcosahedronGeometry(JUPITER_RADIUS, 12);
const jupiterMat  = new THREE.MeshPhongMaterial({ map: loader.load('/textures/jupitermap.jpg') });
const jupiterMesh = new THREE.Mesh(jupiterGeo, jupiterMat);
jupiterGroup.add(jupiterMesh);

// --- SATURNUS ---
const saturnGroup = new THREE.Group();
saturnGroup.rotation.z = -26.7 * Math.PI / 180;
saturnGroup.position.set(SATURN_DIST, 0, 0);
scene.add(saturnGroup);
const saturnGeo  = new THREE.IcosahedronGeometry(SATURN_RADIUS, 12);
const saturnMat  = new THREE.MeshPhongMaterial({ map: loader.load('/textures/saturnmap.jpg') });
const saturnMesh = new THREE.Mesh(saturnGeo, saturnMat);
saturnGroup.add(saturnMesh);
const ringGeo    = new THREE.RingGeometry(SATURN_RADIUS * 1.4, SATURN_RADIUS * 2.3, 64);
const ringMat    = new THREE.MeshBasicMaterial({ color: 0xd4b483, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
const saturnRing = new THREE.Mesh(ringGeo, ringMat);
saturnRing.rotation.x = Math.PI / 2;
saturnGroup.add(saturnRing);

// --- URANUS ---
const uranusGroup = new THREE.Group();
uranusGroup.rotation.z = -97.8 * Math.PI / 180;
uranusGroup.position.set(URANUS_DIST, 0, 0);
scene.add(uranusGroup);
const uranusGeo  = new THREE.IcosahedronGeometry(URANUS_RADIUS, 12);
const uranusMat  = new THREE.MeshPhongMaterial({ map: loader.load('/textures/uranusmap.jpg') });
const uranusMesh = new THREE.Mesh(uranusGeo, uranusMat);
uranusGroup.add(uranusMesh);

// --- NEPTUNUS ---
const neptuneGroup = new THREE.Group();
neptuneGroup.rotation.z = -28.3 * Math.PI / 180;
neptuneGroup.position.set(NEPTUNE_DIST, 0, 0);
scene.add(neptuneGroup);
const neptuneGeo  = new THREE.IcosahedronGeometry(NEPTUNE_RADIUS, 12);
const neptuneMat  = new THREE.MeshPhongMaterial({ map: loader.load('/textures/neptunemap.jpg') });
const neptuneMesh = new THREE.Mesh(neptuneGeo, neptuneMat);
neptuneGroup.add(neptuneMesh);

// --- PLUTO ---
const plutoGroup = new THREE.Group();
plutoGroup.rotation.z = -57.5 * Math.PI / 180;
plutoGroup.position.set(PLUTO_DIST, 0, 0);
scene.add(plutoGroup);
const plutoGeo  = new THREE.IcosahedronGeometry(PLUTO_RADIUS, 12);
const plutoMat  = new THREE.MeshPhongMaterial({ map: loader.load('/textures/plutomap2k.jpg') });
const plutoMesh = new THREE.Mesh(plutoGeo, plutoMat);
plutoGroup.add(plutoMesh);

// --- BANEN OM DE ZON + AXIALE ROTATIE ---
const orbits = [
  { group: mercuryGroup, mesh: mercuryMesh, dist: MERCURY_DIST, angle: 0,   speed: 1.10,   spin:  0.25  },
  { group: venusGroup,   mesh: venusMesh,   dist: VENUS_DIST,   angle: 1.0, speed: 0.84,   spin: -0.15  },
  { group: earthGroup,   mesh: earthMesh,   dist: EARTH_DIST,   angle: 2.0, speed: 0.58,   spin:  0.50  },
  { group: marsGroup,    mesh: marsMesh,    dist: MARS_DIST,    angle: 3.0, speed: 0.31,   spin:  0.48  },
  { group: jupiterGroup, mesh: jupiterMesh, dist: JUPITER_DIST, angle: 4.0, speed: 0.049,  spin:  1.20  },
  { group: saturnGroup,  mesh: saturnMesh,  dist: SATURN_DIST,  angle: 5.0, speed: 0.020,  spin:  1.10  },
  { group: uranusGroup,  mesh: uranusMesh,  dist: URANUS_DIST,  angle: 0.5, speed: 0.0069, spin: -0.70  },
  { group: neptuneGroup, mesh: neptuneMesh, dist: NEPTUNE_DIST, angle: 1.5, speed: 0.0035, spin:  0.75  },
  { group: plutoGroup,   mesh: plutoMesh,   dist: PLUTO_DIST,   angle: 2.5, speed: 0.0023, spin:  0.15  },
];

// --- BODIES ARRAY ---
const bodies = [
  { id: 'sun',     apiId: 'sun',     radius: SUN_RADIUS,     getPosition: () => sun.position.clone(),           camOffset: SUN_RADIUS * 4 },
  { id: 'mercury', apiId: 'mercury', radius: MERCURY_RADIUS, getPosition: () => mercuryGroup.position.clone(),  camOffset: MERCURY_RADIUS * 5 },
  { id: 'venus',   apiId: 'venus',   radius: VENUS_RADIUS,   getPosition: () => venusGroup.position.clone(),    camOffset: VENUS_RADIUS * 4 },
  { id: 'earth',   apiId: 'earth',   radius: EARTH_RADIUS,   getPosition: () => earthGroup.position.clone(),    camOffset: EARTH_RADIUS * 3 },
  { id: 'moon',    apiId: 'moon',    radius: MOON_RADIUS,    getPosition: () => moon.position.clone(),          camOffset: MOON_RADIUS * 3 },
  { id: 'mars',    apiId: 'mars',    radius: MARS_RADIUS,    getPosition: () => marsGroup.position.clone(),     camOffset: MARS_RADIUS * 4 },
  { id: 'jupiter', apiId: 'jupiter', radius: JUPITER_RADIUS, getPosition: () => jupiterGroup.position.clone(),  camOffset: JUPITER_RADIUS * 3 },
  { id: 'saturn',  apiId: 'saturn',  radius: SATURN_RADIUS,  getPosition: () => saturnGroup.position.clone(),   camOffset: SATURN_RADIUS * 4 },
  { id: 'uranus',  apiId: 'uranus',  radius: URANUS_RADIUS,  getPosition: () => uranusGroup.position.clone(),   camOffset: URANUS_RADIUS * 4 },
  { id: 'neptune', apiId: 'neptune', radius: NEPTUNE_RADIUS, getPosition: () => neptuneGroup.position.clone(),  camOffset: NEPTUNE_RADIUS * 4 },
  { id: 'pluto',   apiId: 'pluto',   radius: PLUTO_RADIUS,   getPosition: () => plutoGroup.position.clone(),    camOffset: PLUTO_RADIUS * 8 },
];

// --- BLOOM POSTPROCESSING ---
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, 0.4, 0.85
));

// --- INFO PANEEL ---
const infoPanel = document.getElementById('info-panel');
const infoClose = document.getElementById('info-close');

infoClose?.addEventListener('click', () => {
  gsap.to(infoPanel, {
    opacity: 0, x: 20, duration: 0.3, ease: 'power2.in',
    onComplete: () => infoPanel.classList.add('hidden'),
  });
});

function formatMass(mass) {
  if (!mass) return '—';
  return `${mass.massValue} × 10<sup>${mass.massExponent}</sup> kg`;
}

function formatNumber(value, unit) {
  if (value == null) return '—';
  return `${value.toLocaleString()} ${unit}`;
}

function kelvinToCelsius(k) {
  if (k == null || k === 0) return '—';
  return `${(k - 273.15).toFixed(1)} °C`;
}

async function fetchAndShowInfo(body) {
  infoPanel.classList.remove('hidden');
  gsap.fromTo(infoPanel,
    { opacity: 0, x: 20 },
    { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }
  );

  // Laadtekst
  document.getElementById('info-name').textContent     = body.id.charAt(0).toUpperCase() + body.id.slice(1);
  document.getElementById('info-type').textContent     = '';
  document.getElementById('info-gravity').textContent  = '…';
  document.getElementById('info-mass').innerHTML       = '…';
  document.getElementById('info-radius').textContent   = '…';
  document.getElementById('info-temp').textContent     = '…';
  document.getElementById('info-density').textContent  = '…';
  document.getElementById('info-escape').textContent   = '…';
  document.getElementById('info-orbit').textContent    = '…';
  document.getElementById('info-rotation').textContent = '…';
  document.getElementById('info-moons').textContent    = '…';

  try {
    const res = await fetch(`/api/planet/${body.apiId}`);
    
    if (!res.ok) {
      console.error(`API error for ${body.apiId}: ${res.status}`);
      throw new Error(`API returned ${res.status}`);
    }
    
    const d = await res.json();

    document.getElementById('info-name').textContent     = d.englishName || body.id;
    document.getElementById('info-type').textContent     = d.bodyType    || '—';
    document.getElementById('info-gravity').textContent  = d.gravity     != null ? `${d.gravity} m/s²`    : '—';
    document.getElementById('info-mass').innerHTML       = formatMass(d.mass);
    document.getElementById('info-radius').textContent   = formatNumber(d.meanRadius, 'km');
    document.getElementById('info-temp').textContent     = kelvinToCelsius(d.avgTemp);
    document.getElementById('info-density').textContent  = d.density     != null ? `${d.density} g/cm³`   : '—';
    document.getElementById('info-escape').textContent   = d.escape      != null ? `${d.escape} m/s`      : '—';
    document.getElementById('info-orbit').textContent    = d.sideralOrbit    != null ? `${d.sideralOrbit} days`  : '—';
    document.getElementById('info-rotation').textContent = d.sideralRotation != null ? `${d.sideralRotation} h` : '—';
    document.getElementById('info-moons').textContent    = d.moons ? d.moons.length : '0';
  } catch (err) {
    document.getElementById('info-name').textContent    = body.id;
    document.getElementById('info-gravity').textContent = 'Failed to load';
    console.error('Fetch error:', err);
  }
}

// --- RAYCASTER ---
const raycaster   = new THREE.Raycaster();
const pointer     = new THREE.Vector2();
const meshBodyMap = new Map();

meshBodyMap.set(sun,         bodies.find(b => b.id === 'sun'));
meshBodyMap.set(mercuryMesh, bodies.find(b => b.id === 'mercury'));
meshBodyMap.set(venusMesh,   bodies.find(b => b.id === 'venus'));
meshBodyMap.set(earthMesh,   bodies.find(b => b.id === 'earth'));
meshBodyMap.set(moon,        bodies.find(b => b.id === 'moon'));
meshBodyMap.set(marsMesh,    bodies.find(b => b.id === 'mars'));
meshBodyMap.set(jupiterMesh, bodies.find(b => b.id === 'jupiter'));
meshBodyMap.set(saturnMesh,  bodies.find(b => b.id === 'saturn'));
meshBodyMap.set(uranusMesh,  bodies.find(b => b.id === 'uranus'));
meshBodyMap.set(neptuneMesh, bodies.find(b => b.id === 'neptune'));
meshBodyMap.set(plutoMesh,   bodies.find(b => b.id === 'pluto'));

const clickableMeshes = [...meshBodyMap.keys()];

renderer.domElement.addEventListener('click', (e) => {
  pointer.x =  (e.clientX / window.innerWidth)  * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(clickableMeshes);
  if (hits.length > 0) {
    const body = meshBodyMap.get(hits[0].object);
    if (body) { fetchAndShowInfo(body); flyTo(body); }
  }
});

// --- CAMERA FLY-TO ---
let trackedBody  = null;
let currentTween = null;

function flyTo(body) {
  localStorage.setItem('activePlanet', body.id);
  trackedBody = null;
  controls.enabled = false;
  if (currentTween) currentTween.kill();

  const startPos    = camera.position.clone();
  const startLookAt = startPos.clone().add(camera.getWorldDirection(new THREE.Vector3()));
  const progress    = { t: 0 };

  currentTween = gsap.to(progress, {
    t: 1,
    duration: 5,
    ease: 'power4.out',
    onUpdate() {
      const target = body.getPosition();
      const dest   = target.clone().add(new THREE.Vector3(0, body.camOffset * 0.3, body.camOffset));
      camera.position.lerpVectors(startPos, dest, progress.t);
      camera.lookAt(startLookAt.clone().lerp(target, progress.t));
    },
    onComplete() {
      trackedBody  = body;
      currentTween = null;
    },
  });
}

// --- ANIMATIELUS ---
let moonAngle = 0;
let prevTime  = performance.now();

function animate() {
  requestAnimationFrame(animate);
  const now   = performance.now();
  const delta = (now - prevTime) / 1000;
  prevTime    = now;

  for (const o of orbits) {
    o.angle += o.speed * delta;
    o.group.position.x = Math.cos(o.angle) * o.dist;
    o.group.position.z = Math.sin(o.angle) * o.dist;
    o.mesh.rotation.y += o.spin * delta;
  }

  lightsMesh.rotation.y = earthMesh.rotation.y;
  glowMesh.rotation.y   = earthMesh.rotation.y;

  sun.rotation.y  += 0.05 * delta;
  moon.rotation.y += 0.05 * delta;

  moonAngle += 0.002;
  moon.position.x = earthGroup.position.x + Math.cos(moonAngle) * MOON_DIST;
  moon.position.z = earthGroup.position.z + Math.sin(moonAngle) * MOON_DIST;
  moon.position.y = earthGroup.position.y;

  if (trackedBody) {
    const target = trackedBody.getPosition();
    const dest   = target.clone().add(new THREE.Vector3(0, trackedBody.camOffset * 0.3, trackedBody.camOffset));
    camera.position.copy(dest);
    camera.lookAt(target);
  }

  controls.update(delta);
  stars.rotation.y -= 0.0002;
  composer.render();
}

animate();

// --- HERSTEL VORIGE SELECTIE ---
const saved = localStorage.getItem('activePlanet');
if (saved) {
  const body = bodies.find(b => b.id === saved);
  if (body) { fetchAndShowInfo(body); flyTo(body); }
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && trackedBody) {
    trackedBody = null;
    controls.enabled = true;
    gsap.to(infoPanel, {
      opacity: 0, x: 20, duration: 0.3, ease: 'power2.in',
      onComplete: () => infoPanel.classList.add('hidden'),
    });
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
    if (body) { fetchAndShowInfo(body); flyTo(body); }
  });
});