# Solar System Explorer

Een interactief 3D zonnestelsel gebouwd met Three.js en Astro. Je kan vrij rondvliegen door de ruimte, op een planeet klikken om er naartoe te vliegen, en dan via de api kan je data inzien over de planeet

---



**Web API's gebruikt:**
- [WebGL (via Three.js)](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)

- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 

**Content API:**
- [Le Système Solaire API](https://api.le-systeme-solaire.net/en/)

---




### Week 1

#### 1e idee
Mijn 1e idee was dat je ruimteschepen kon kiezen in een mario style je zou dan stats kunnen zien van de ruimteschepen zoals hoe snel ze zouden zijn en hoe groot. De modellen wilde ik inladen met three js zo kan een gebruiker ook een 3D model zien en zou je ook wat extra dingen zien over het ruimteschip.

### Week 2 — woensdag 08/04/2026

#### 2e idee

voor mijn 2e idee wil ik een solar systeem maken in 3D en dat je dan vrij kan rond bewegen erbinnen in en dat je ook op een planeet zou kunnen klikken en dan extra informatie over de planeet krijgt. Ik ga zelf de planeten aanmaken met three js.

#### Wat heb ik gedaan?

Astro opgezet en na het feedback gesprek overgestapt op het zonnestelsel-concept. De zon aangemaakt als lichtgevende bol met een bloom effect via `UnrealBloomPass`.

```js
const sunGeo = new THREE.SphereGeometry(SUN_RADIUS, 32, 16);
const sunMat = new THREE.MeshBasicMaterial({ color: 0xffffaa });
const sun    = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5, 0.4, 0.85
));

```
<img width="746" height="512" alt="image" src="https://github.com/user-attachments/assets/a989b4df-0e77-4bbf-b290-169588637bfe" />

#### Wat heb ik geleerd?

Hoe je een basis Astro project opzet en hoe je een bloom effect toevoegt via `UnrealBloomPass`.

#### Wat ga ik morgen doen?

De aarde en maan toevoegen en de maan om de aarde laten draaien.

---

### Week 2 — donderdag 09/04/2026

#### Wat heb ik gedaan?

Twee extra planeten toegevoegd aarde en maan De maan Draait nu om de aarde heen. `Math.cos` en `Math.sin`.

Aarde en maan als simpele gekleurde bollen:

```js
const earthGeo  = new THREE.IcosahedronGeometry(EARTH_RADIUS, 24);
const earthMat  = new THREE.MeshPhongMaterial({ color: 0x2266cc });
const earthMesh = new THREE.Mesh(earthGeo, earthMat);
scene.add(earthMesh);

const moonGeo = new THREE.IcosahedronGeometry(MOON_RADIUS, 12);
const moonMat = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
const moon    = new THREE.Mesh(moonGeo, moonMat);
scene.add(moon);
```

Maan in een cirkel om de aarde:

```js
let moonAngle = 0;

// In de animatielus:
moonAngle += 0.002;
moon.position.x = earthGroup.position.x + Math.cos(moonAngle) * MOON_DIST;
moon.position.z = earthGroup.position.z + Math.sin(moonAngle) * MOON_DIST;
```

#### Wat heb ik geleerd?

Hoe je meerdere 3D-objecten aanmaakt in Three.js. Hoe je een object in een cirkel laat bewegen met `Math.cos` en `Math.sin`.

#### Wat ga ik volgende keer doen?

De aarde om de zon laten draaien en textures toevoegen.

---

### Week 3 — woensdag 15/04/2026

#### Wat heb ik gedaan?

De aarde draait nu om de zon via hetzelfde orbit-systeem als de maan alleen wel in een andere group. De zon functioneert nu als echte lichtbron via `PointLight`.

```js
// In de animatielus:
earthAngle += 0.58 * delta;
earthGroup.position.x = Math.cos(earthAngle) * EARTH_DIST;
earthGroup.position.z = Math.sin(earthAngle) * EARTH_DIST;
earthMesh.rotation.y += 0.50 * delta;
```

```js
const sunLight = new THREE.PointLight(0xffffff, 2.0, 0, 0);
scene.add(sunLight);
scene.add(new THREE.AmbientLight(0x223355, 1));
```

#### Wat heb ik geleerd?

Hoe je hetzelfde orbit-systeem hergebruikt voor meerdere objecten en hoe een `PointLight` werkt als lichtbron.

#### Wat ga ik morgen doen?

Textures toevoegen aan de aarde en maan.

---

### Week 3 — donderdag 16/04/2026

#### Wat heb ik gedaan?

Textures toegevoegd aan de aarde en maan via `TextureLoader`. De aarde heeft ook een aparte nachtlichten-laag gekregen via `AdditiveBlending`.

```js
const earthMat = new THREE.MeshPhongMaterial({
  map: loader.load('/textures/earthmap1k.jpg'),
});

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load('/textures/earthlights1k.jpg'),
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  polygonOffset: true,
  polygonOffsetFactor: -1,
});
const lightsMesh = new THREE.Mesh(earthGeo, lightsMat);
lightsMesh.scale.setScalar(1.001);
earthGroup.add(lightsMesh);
```

#### Wat heb ik geleerd?

Hoe je een texture inlaadt via `TextureLoader`. Hoe `AdditiveBlending` en `polygonOffset` z-fighting voorkomen bij twee overlappende meshes.

#### Wat ga ik volgende keer doen?

Alle andere planeten toevoegen en beginnen met de detailpagina.

---

### Week 4 — woensdag 22/04/2026

#### Wat heb ik gedaan?

Alle andere planeten toegevoegd (Mercurius, Venus, Mars, Jupiter, Saturnus, Uranus, Neptunus, Pluto) met textures en correcte axiale kantelingen. Alle banen samengevoegd in één `orbits` array. Klikdetectie via een Raycaster opgezet.

```js
const orbits = [
  { group: mercuryGroup, mesh: mercuryMesh, dist: MERCURY_DIST, angle: 0,   speed: 1.10,  spin: 0.25  },
  { group: venusGroup,   mesh: venusMesh,   dist: VENUS_DIST,   angle: 1.0, speed: 0.84,  spin: -0.15 },
  { group: earthGroup,   mesh: earthMesh,   dist: EARTH_DIST,   angle: 2.0, speed: 0.58,  spin: 0.50  },
  // ...
];

for (const o of orbits) {
  o.angle += o.speed * delta;
  o.group.position.x = Math.cos(o.angle) * o.dist;
  o.group.position.z = Math.sin(o.angle) * o.dist;
  o.mesh.rotation.y += o.spin * delta;
}
```

#### Wat heb ik geleerd?

Hoe je een `Raycaster` gebruikt voor klikdetectie op 3D-objecten. Hoe je een array gebruikt om herhalende logica voor meerdere planeten samen te vatten.

#### Wat ga ik morgen doen?

Camera fly-to afmaken en de detailpagina met API data vullen.

---

### Week 4 — donderdag 23/04/2026

#### Wat heb ik gedaan?

De camera vliegt nu vloeiend naar een planeet toe via GSAP en blijft hem daarna volgen. De detailpagina vult zich met echte data via de Le Système Solaire API.

```js
function flyTo(body) {
  const startPos = camera.position.clone();
  const progress = { t: 0 };

  currentTween = gsap.to(progress, {
    t: 1, duration: 5, ease: 'power4.out',
    onUpdate() {
      const target = body.getPosition();
      const dest   = target.clone().add(new THREE.Vector3(0, body.camOffset * 0.3, body.camOffset));
      camera.position.lerpVectors(startPos, dest, progress.t);
      camera.lookAt(startPos.clone().lerp(target, progress.t));
    },
    onComplete() { trackedBody = body; },
  });
}
```

#### Wat heb ik geleerd?

Hoe je GSAP gebruikt voor vloeiende camera-animaties. Hoe `.clone()` de huidige positie van een bewegend object vastzet.

#### Wat ga ik volgende keer doen?

De deploy op Render.com werkend krijgen en de detailpagina afmaken.

---

### Week 5 — 06/05/2026

#### Wat heb ik gedaan?

render deployment proberen op te lossen werkt wel locaal maar gaat niet leer via render komt waarschijnlijk omdat ik niet de juiste api key heb op render waardoor hij via render niet de api data inlaad.



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
