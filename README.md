# Solar System Explorer

Een interactief 3D zonnestelsel gebouwd met Three.js en Astro. Je kan vrij rondvliegen door de ruimte, op een planeet klikken om er naartoe te vliegen, en dan via de Le Système Solaire API echte data over dat hemellichaam bekijken.

---

## Concept

Het originele idee was een Star Wars schepenselector (Racer-style), maar na het eerste feedback gesprek is dit veranderd. Het nieuwe idee: een volledig 3D zonnestelsel waar je doorheen kan vliegen. Elk hemellichaam is klikbaar en laadt live data in via een externe API.

**Web API's gebruikt:**
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [WebGL (via Three.js)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)
- [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)

**Content API:**
- [Le Système Solaire API](https://api.le-systeme-solaire.net/en/)

---

## Tech stack

| Technologie | Gebruik |
|---|---|
| [Astro](https://astro.build/) | Framework / SSR / routing |
| [Three.js](https://threejs.org/) | 3D render engine |
| [GSAP](https://gsap.com/) | Camera animaties |
| FlyControls | Vrije vluchtbesturing |
| UnrealBloomPass | Gloei-effect op de zon |
| Le Système Solaire API | Planeetdata |

---

## Hoe starten

```bash
npm install
npm run dev
```

Maak een `.env` bestand aan met:

```
SOLAR_API_KEY=jouw_api_key_hier
```

---

## Weeklog

### Week 1 — 01/04/2026

#### Wat heb ik gedaan?

Gezocht naar een bruikbare API, een eerste concept bedacht (Star Wars starships) en Astro opgezet als framework.

#### Wat heb ik geleerd?

Hoe je een basis Astro project opzet met routing en components.

#### Wat ga ik morgen doen?

Feedback gesprek houden en als het idee goedgekeurd wordt Three.js proberen toe te voegen.

#### Week 1 reflectie

Na het feedback gesprek bleek mijn eerste idee niet goed over te komen. Ik had een ruimteschepen-selector in mijn hoofd (een beetje zoals een auto kiezen in Mario Kart), maar dit was lastig uitlegbaar. Mijn nieuwe idee: een 3D zonnestelsel met Three.js, planeten met textures, en data ingeladen via de NASA of een solar API.

---

### Week 3 — 22/04/2026

#### Wat heb ik gedaan?

De aarde en de maan hebben nu echte textures gekregen. De aarde begint ook om de zon te draaien. De zon werkt nu ook als een echte lichtbron (`PointLight`) in plaats van alleen een bloom effect. Ook shaders toegevoegd en de Astro deployment opgezet.

De zon als lichtbron zodat planeten echt belicht worden:

```js
const sunLight = new THREE.PointLight(0xffffff, 2.0, 0, 0);
scene.add(sunLight); // licht straalt vanuit het midden van de zon

scene.add(new THREE.AmbientLight(0x223355, 1)); // zwak omgevingslicht zodat de achterkant niet puur zwart is
```

Texture toevoegen aan de aarde en maan:

```js
const earthMat = new THREE.MeshPhongMaterial({
  map: loader.load('/textures/earthmap1k.jpg'),
});
const earthMesh = new THREE.Mesh(earthGeo, earthMat);
earthGroup.add(earthMesh);

const moonMat = new THREE.MeshPhongMaterial({
  map: loader.load('/textures/moonmap1k.jpg'),
});
const moon = new THREE.Mesh(moonGeo, moonMat);
scene.add(moon);
```

Aarde in baan om de zon (angle wordt elke frame bijgewerkt):

```js
let earthAngle = 0;

// In de animatielus:
earthAngle += 0.58 * delta;
earthGroup.position.x = Math.cos(earthAngle) * EARTH_DIST;
earthGroup.position.z = Math.sin(earthAngle) * EARTH_DIST;
earthMesh.rotation.y += 0.50 * delta;
```

#### Wat heb ik geleerd?

Hoe je een texture inlaadt via `TextureLoader` en koppelt aan een `MeshPhongMaterial`. Hoe je een baan simuleert met `Math.cos` en `Math.sin`.

#### Wat ga ik volgende keer doen?

Verder werken aan de transitie zodat de camera vloeiend naar een planeet gaat.

---

### Week 3 — 23/04/2026

#### Wat heb ik gedaan?

Gezorgd dat de camera vloeiend naar een planeet vliegt en hem daarna blijft volgen. De maan roteert nu ook correct om de aarde.

Camera fly-to via GSAP met `lerp` interpolatie:

```js
function flyTo(body) {
  localStorage.setItem('activePlanet', body.id);
  trackedBody  = null;
  controls.enabled = false;
  if (currentTween) currentTween.kill();

  const startPos = camera.position.clone();
  const progress = { t: 0 };

  currentTween = gsap.to(progress, {
    t: 1,
    duration: 5,
    ease: 'power4.out',
    onUpdate() {
      const target = body.getPosition(); // .clone() pakt de huidige positie
      const dest   = target.clone().add(new THREE.Vector3(0, body.camOffset * 0.3, body.camOffset));
      camera.position.lerpVectors(startPos, dest, progress.t);
      camera.lookAt(startPos.clone().lerp(target, progress.t));
    },
    onComplete() {
      trackedBody  = body; // camera volgt nu automatisch mee
      currentTween = null;
    },
  });
}
```

Maan positie update per frame (los van de `earthGroup` zodat de baan apart berekend wordt):

```js
moonAngle += 0.002;
moon.position.x = earthGroup.position.x + Math.cos(moonAngle) * MOON_DIST;
moon.position.z = earthGroup.position.z + Math.sin(moonAngle) * MOON_DIST;
moon.position.y = earthGroup.position.y;
```

#### Wat heb ik geleerd?

Hoe `.clone()` werkt om de huidige positie van een bewegend object op te halen. Zonder `.clone()` krijg je een referentie die meteen verandert.

#### Wat ga ik volgende keer doen?

Feedback gesprek houden en planeetdata inladen via de API binnen het infopaneel.

---

### Week 2 — 08/04/2026

#### Wat heb ik gedaan?

Workshop gevolgd over hoe Astro werkt, hoe components inladen en hoe het framework in elkaar zit. Daarna begonnen met een zon, een aarde als blauwe bol en een maan als bolletje, allemaal nog zonder textures. De eerste scene is opgezet met renderer en bloom.

<img width="746" height="512" alt="image" src="https://github.com/user-attachments/assets/a989b4df-0e77-4bbf-b290-169588637bfe" />

Eerste scene setup met renderer, camera en bloom postprocessing:

```js
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 20000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Bloom via postprocessing pipeline
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, 0.4, 0.85
));
```

Aarde als simpele blauwe bol (nog geen texture):

```js
const earthGeo  = new THREE.IcosahedronGeometry(EARTH_RADIUS, 24);
const earthMat  = new THREE.MeshPhongMaterial({ color: 0x2266cc });
const earthMesh = new THREE.Mesh(earthGeo, earthMat);
scene.add(earthMesh);

// Maan ook als simpele bol
const moonGeo = new THREE.IcosahedronGeometry(MOON_RADIUS, 12);
const moonMat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
const moon    = new THREE.Mesh(moonGeo, moonMat);
scene.add(moon);
```

#### Wat heb ik geleerd?

Hoe je een sphere maakt in Three.js en een glow (bloom) effect toevoegt via `UnrealBloomPass`.

#### Wat ga ik morgen doen?

Zorgen dat de maan om de aarde draait en dat je vrij kan rondkijken.

---

### Week 2 — 09/04/2026

#### Wat heb ik gedaan?

Workshop gevolgd over localStorage. De maan draait nu om de aarde. Je kan ook vrij rondkijken in de scene via FlyControls. Ook een sterrenveld toegevoegd als achtergrond.

Sterrenveld toevoegen via een hulpfunctie:

```js
const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

// In de animatielus langzaam laten roteren voor een levend gevoel:
stars.rotation.y -= 0.0002;
```

Maan laten roteren om de aarde:

```js
let moonAngle = 0;

// In de animatielus:
moonAngle += 0.002;
moon.position.x = earthMesh.position.x + Math.cos(moonAngle) * MOON_DIST;
moon.position.z = earthMesh.position.z + Math.sin(moonAngle) * MOON_DIST;
```

#### Wat heb ik geleerd?

Hoe je een object in een cirkel laat bewegen om een ander object met `Math.cos` en `Math.sin`. Hoe je FlyControls toevoegt voor vrije camerabesturing.

#### Wat ga ik volgende keer doen?

De aarde en maan een echte texture geven en de aarde om de zon laten draaien.

---

### Week 4 — 06/05/2026

#### Wat heb ik gedaan?

Alle andere planeten toegevoegd (Mercurius, Venus, Mars, Jupiter, Saturnus, Uranus, Neptunus, Pluto) met textures en correcte axiale kantelingen. Alle banen zijn samengevoegd in één `orbits` array. Planeetdata wordt nu live opgehaald via de Le Système Solaire API en getoond in een infopaneel. De klikdetectie werkt via een Raycaster.

Alle planeten in één orbits array zodat baan en rotatie centraal beheerd worden:

```js
const orbits = [
  { group: mercuryGroup, mesh: mercuryMesh, dist: MERCURY_DIST, angle: 0,   speed: 1.10,  spin: 0.25  },
  { group: venusGroup,   mesh: venusMesh,   dist: VENUS_DIST,   angle: 1.0, speed: 0.84,  spin: -0.15 },
  { group: earthGroup,   mesh: earthMesh,   dist: EARTH_DIST,   angle: 2.0, speed: 0.58,  spin: 0.50  },
  { group: marsGroup,    mesh: marsMesh,    dist: MARS_DIST,    angle: 3.0, speed: 0.31,  spin: 0.48  },
  { group: jupiterGroup, mesh: jupiterMesh, dist: JUPITER_DIST, angle: 4.0, speed: 0.049, spin: 1.20  },
  { group: saturnGroup,  mesh: saturnMesh,  dist: SATURN_DIST,  angle: 5.0, speed: 0.020, spin: 1.10  },
  { group: uranusGroup,  mesh: uranusMesh,  dist: URANUS_DIST,  angle: 0.5, speed: 0.0069,spin: -0.70 },
  { group: neptuneGroup, mesh: neptuneMesh, dist: NEPTUNE_DIST, angle: 1.5, speed: 0.0035,spin: 0.75  },
  { group: plutoGroup,   mesh: plutoMesh,   dist: PLUTO_DIST,   angle: 2.5, speed: 0.0023,spin: 0.15  },
];

// In de animatielus:
for (const o of orbits) {
  o.angle += o.speed * delta;
  o.group.position.x = Math.cos(o.angle) * o.dist;
  o.group.position.z = Math.sin(o.angle) * o.dist;
  o.mesh.rotation.y += o.spin * delta;
}
```

Planeet textures en axiale kanteling (Venus draait bijna omgekeerd, Uranus ligt op zijn zij):

```js
// Venus: -177.4° axiale kanteling
const venusGroup = new THREE.Group();
venusGroup.rotation.z = -177.4 * Math.PI / 180;

// Uranus: -97.8° (bijna op zijn zij)
const uranusGroup = new THREE.Group();
uranusGroup.rotation.z = -97.8 * Math.PI / 180;

// Saturnus met ring
const ringGeo    = new THREE.RingGeometry(SATURN_RADIUS * 1.4, SATURN_RADIUS * 2.3, 64);
const ringMat    = new THREE.MeshBasicMaterial({ color: 0xd4b483, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
const saturnRing = new THREE.Mesh(ringGeo, ringMat);
saturnRing.rotation.x = Math.PI / 2; // plat leggen
saturnGroup.add(saturnRing);
```

Raycaster detecteert welke planeet je aanklikt:

```js
const raycaster   = new THREE.Raycaster();
const pointer     = new THREE.Vector2();
const meshBodyMap = new Map();

// Koppel elke mesh aan een body-object
meshBodyMap.set(earthMesh, bodies.find(b => b.id === 'earth'));
// ...

renderer.domElement.addEventListener('click', (e) => {
  pointer.x =  (e.clientX / window.innerWidth)  * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);

  const hits = raycaster.intersectObjects([...meshBodyMap.keys()]);
  if (hits.length > 0) {
    const body = meshBodyMap.get(hits[0].object);
    if (body) { fetchAndShowInfo(body); flyTo(body); }
  }
});
```

API endpoint in Astro (`/api/planet/[id].js`) proxyt de externe API:

```js
export async function GET({ params }) {
  const res = await fetch(
    `https://api.le-systeme-solaire.net/rest/bodies/${params.id}`,
    { headers: { 'Authorization': `Bearer ${import.meta.env.SOLAR_API_KEY}` } }
  );
  const data = await res.text();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

Planeetdata ophalen en tonen in het infopaneel:

```js
async function fetchAndShowInfo(body) {
  infoPanel.classList.remove('hidden');
  gsap.fromTo(infoPanel, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4 });

  const res = await fetch(`/api/planet/${body.apiId}`);
  const d   = await res.json();

  document.getElementById('info-name').textContent    = d.englishName;
  document.getElementById('info-gravity').textContent = `${d.gravity} m/s²`;
  document.getElementById('info-mass').innerHTML      = `${d.mass.massValue} × 10<sup>${d.mass.massExponent}</sup> kg`;
  document.getElementById('info-temp').textContent    = `${(d.avgTemp - 273.15).toFixed(1)} °C`;
  document.getElementById('info-moons').textContent   = d.moons ? d.moons.length : '0';
}
```

De detail pagina in Astro laadt de API data in zodra je op een planeet klikt:

```js
async function fetchAndShowInfo(body) {
  infoPanel.classList.remove('hidden');
  gsap.fromTo(infoPanel, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.4 });

  const res = await fetch(`/api/planet/${body.apiId}`);
  const d   = await res.json();

  document.getElementById('info-name').textContent    = d.englishName;
  document.getElementById('info-gravity').textContent = `${d.gravity} m/s²`;
  document.getElementById('info-mass').innerHTML      = `${d.mass.massValue} × 10<sup>${d.mass.massExponent}</sup> kg`;
  document.getElementById('info-temp').textContent    = `${(d.avgTemp - 273.15).toFixed(1)} °C`;
  document.getElementById('info-moons').textContent   = d.moons ? d.moons.length : '0';
}
```

#### Wat heb ik geleerd?

Hoe je een Astro API route als proxy gebruikt zodat je een externe API key veilig server-side houdt. Hoe `Raycaster` muis-coördinaten omzet naar 3D-stralen. Hoe je een infopaneel dynamisch vult met data van een externe API.

#### Wat ga ik morgen doen?

De render deployen en testen of alles correct werkt.

---

### Week 4 — 07/05/2026

#### Wat heb ik gedaan?

Render-problemen opgelost bij de deploy. De aarde heeft ook een nachtlichten-laag (`AdditiveBlending`) en een Fresnel atmosfeer-glow gekregen.

Nachtlichten via `AdditiveBlending` over de dagkaart:

```js
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load('/textures/earthlights1k.jpg'),
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -1,
});
const lightsMesh = new THREE.Mesh(earthGeo, lightsMat);
lightsMesh.scale.setScalar(1.001); // iets groter om z-fighting te voorkomen
earthGroup.add(lightsMesh);
```

#### Wat heb ik geleerd?

Hoe `AdditiveBlending` en `polygonOffset` z-fighting voorkomen bij twee overlappende meshes. Hoe je een Fresnel-shader gebruikt om een atmosferische gloed te simuleren.

#### Wat ga ik volgende keer doen?

Project afronden en README bijwerken.

---

## Bronnen

### Three.js

- [Three.js documentatie](https://threejs.org/docs/) — scene, renderer, geometrie en materialen
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls) — camera besturen met muis
- [FlyControls](https://threejs.org/docs/#examples/en/controls/FlyControls) — vrije vluchtbesturing
- [UnrealBloomPass](https://threejs.org/docs/#examples/en/postprocessing/UnrealBloomPass) — gloei-effect op de zon
- [EffectComposer](https://threejs.org/docs/#examples/en/postprocessing/EffectComposer) — post-processing pipeline
- [Raycaster](https://threejs.org/docs/#api/en/core/Raycaster) — klikdetectie op 3D-objecten
- [TextureLoader](https://threejs.org/docs/#api/en/loaders/TextureLoader) — planeet textures inladen
- [Group](https://threejs.org/docs/#api/en/core/Group) — objecten groeperen voor rotatie/positie
- [IcosahedronGeometry](https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry) — hoge-resolutie bol
- [RingGeometry](https://threejs.org/docs/#api/en/geometries/RingGeometry) — Saturnus-ringen
- [MeshPhongMaterial](https://threejs.org/docs/#api/en/materials/MeshPhongMaterial) — verlicht materiaal voor planeten
- [MeshBasicMaterial](https://threejs.org/docs/#api/en/materials/MeshBasicMaterial) — niet-verlicht materiaal (zon, nachtlichten)

### Camera & animatie

- [GSAP docs](https://gsap.com/docs/v3/) — camera fly-to animaties
- [How to control Three.js camera like a pro](https://medium.com/geekculture/how-to-control-three-js-camera-like-a-pro-a8575a717a2) — damping instellen bij OrbitControls
- [Circular motion with JavaScript](https://medium.com/@wwdhfernando/circular-motion-with-javascript-48d49a713bf4) — maan laten roteren
- [Rotate around another object in Three.js](https://waelyasmina.net/articles/how-to-make-an-object-rotate-around-another-object-in-three-js/)
- [Matt Loftus Three.js tutorial](https://mattloftus.github.io/2016/02/03/threejs-p2/)

### Object & positie

- [Object hierarchy Three.js](https://sbcode.net/threejs/object-hierarchy/)
- [Position, rotation and scale](https://www.ramijames.com/learn-threejs/foundational-threejs/position-rotation-and-scale)
- [getWorldPosition](https://threejs.org/docs/#Object3D.getWorldPosition) — wereldpositie van een genest object opvragen

### API & web

- [Le Système Solaire API](https://api.le-systeme-solaire.net/en/) — planeetdata
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [MDN WebGL API](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)

### Textures

- [Planet Pixel Emporium](https://planetpixelemporium.com/planets.html) — planeet textures

### Referentie

- [NASA Solar System Exploration](https://solarsystem.nasa.gov/)
- [JPL Solar System Dynamics](https://ssd.jpl.nasa.gov/)
- [JPL Horizons](https://ssd.jpl.nasa.gov/horizons/)
